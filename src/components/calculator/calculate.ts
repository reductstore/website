import type {
  BackendPricing,
  CostBreakdown,
  LicenseTier,
  ErasureCoding,
  StorageInput,
  StorageTier,
  StreamInput,
  WorkloadInput,
} from "./types";

export const KB_PER_TB = 1_000_000_000;
export const DAYS_PER_MONTH = 30;
export const SECONDS_PER_HOUR = 3600;
const COLD_BAND_DAYS = 90;

export type BlockConfig = {
  sizeKb: number;
  maxRecords: number;
  backendOpsPerBlock: number;
};

export type CalculatorConfig = {
  pricing: BackendPricing;
  licenseTiers: LicenseTier[];
  block: BlockConfig;
};

export type StreamWorkload = {
  stream: StreamInput;
  recordsMonth: number;
  dataMonthTb: number;
  packFactor: number;
};

export type Workload = {
  streams: StreamWorkload[];
  totalRecordsMonth: number;
  totalDataMonthTb: number;
  totalRetainedTb: number;
};

export type Bands = { hot: number; cold: number; archive: number };

export type TierName = "hot" | "cold" | "archive";

export type StreamCost = {
  path: [TierName, TierName, TierName];
  storageEurMonth: number;
  operationsEurMonth: number;
  retrievalEurMonth: number;
};

export type Estimate = {
  workload: Workload;
  direct: CostBreakdown;
  reduct: CostBreakdown;
  savingEurYear: number;
  savingPercent: number;
  directIngestObjectsMonth: number;
  reductIngestOperationsMonth: number;
  ingestReduction: number;
  localHistoryDays: number;
};

const finite = (value: number) => (Number.isFinite(value) ? value : 0);
const nonNegative = (value: number) => Math.max(0, finite(value));

export function packFactor(recordSizeKb: number, block: BlockConfig): number {
  if (!(recordSizeKb > 0)) return 1;
  return Math.max(
    1,
    Math.min(block.maxRecords, Math.floor(block.sizeKb / recordSizeKb)),
  );
}

export function calculateWorkload(
  input: WorkloadInput,
  retentionDays: number,
  block: BlockConfig,
): Workload {
  const units = nonNegative(input.units);
  const activeSecondsMonth =
    nonNegative(input.recordingHoursPerDay) * SECONDS_PER_HOUR * DAYS_PER_MONTH;

  const streams = input.streams
    .filter((stream) => stream.enabled && stream.recordSizeKb > 0)
    .map((stream) => {
      const recordsMonth =
        units *
        nonNegative(stream.count) *
        nonNegative(stream.frequencyHz) *
        activeSecondsMonth;
      return {
        stream,
        recordsMonth,
        dataMonthTb: (recordsMonth * stream.recordSizeKb) / KB_PER_TB,
        packFactor: packFactor(stream.recordSizeKb, block),
      };
    })
    .filter((stream) => stream.recordsMonth > 0);

  const totalRecordsMonth = streams.reduce((sum, s) => sum + s.recordsMonth, 0);
  const totalDataMonthTb = streams.reduce((sum, s) => sum + s.dataMonthTb, 0);
  return {
    streams,
    totalRecordsMonth,
    totalDataMonthTb,
    totalRetainedTb:
      (totalDataMonthTb * nonNegative(retentionDays)) / DAYS_PER_MONTH,
  };
}

export function ageBands(hotDays: number, retentionDays: number): Bands {
  const retention = nonNegative(retentionDays);
  const hot = Math.min(retention, Math.max(1, finite(hotDays)));
  const remaining = Math.max(0, retention - hot);
  const cold = Math.min(remaining, COLD_BAND_DAYS);
  return { hot, cold, archive: Math.max(0, remaining - cold) };
}

export function licenseEurYear(retainedTb: number, tiers: LicenseTier[]) {
  let cost = 0;
  let lower = 0;
  for (const tier of tiers) {
    const inTier = Math.min(retainedTb, tier.upToTb) - lower;
    if (inTier <= 0) break;
    cost += inTier * tier.eurPerTbYear;
    lower = tier.upToTb;
  }
  return cost;
}

// Raw disk used per logical byte when every object is split into erasure
// shards and each shard occupies whole disk blocks.
export function erasureFactor(objectSizeKb: number, erasure: ErasureCoding) {
  if (!(objectSizeKb > 0)) return 1;
  const shardKb = objectSizeKb / erasure.dataShards;
  const onDiskKb =
    Math.max(1, Math.ceil(shardKb / erasure.diskBlockKb)) * erasure.diskBlockKb;
  return (
    ((erasure.dataShards + erasure.parityShards) * onDiskKb) / objectSizeKb
  );
}

const TIER_ORDER: TierName[] = ["hot", "cold", "archive"];

// The cold age band may stay hot or move to cold; the archive band may use
// any tier that is not hotter than the cold band's.
function lifecyclePaths(pricing: BackendPricing) {
  const available = TIER_ORDER.filter((name) => pricing[name]);
  const paths: [TierName, TierName, TierName][] = [];
  for (const cold of available.filter((name) => name !== "archive")) {
    for (const archive of available) {
      if (TIER_ORDER.indexOf(archive) >= TIER_ORDER.indexOf(cold)) {
        paths.push(["hot", cold, archive]);
      }
    }
  }
  return paths;
}

function respectsResidence(
  path: TierName[],
  bandDays: number[],
  pricing: BackendPricing,
) {
  for (const name of new Set(path)) {
    const tier = pricing[name] as StorageTier;
    const days = path.reduce(
      (sum, tierName, i) => (tierName === name ? sum + bandDays[i] : sum),
      0,
    );
    if (days > 0 && days < tier.minResidenceDays) return false;
  }
  return true;
}

// One month of a stream, stored either as individual objects (direct) or as
// ReductStore blocks. objectsPerRecord is 1 for direct and
// backendOpsPerBlock / packFactor for ReductStore.
export function streamCost(
  workload: StreamWorkload,
  bands: Bands,
  readPercent: number,
  pricing: BackendPricing,
  objectSizeKb: number,
  objectsPerRecord: number,
): StreamCost {
  const bandDays = [bands.hot, bands.cold, bands.archive];
  const readShare = Math.min(100, nonNegative(readPercent)) / 100;
  const ingestOps = workload.recordsMonth * objectsPerRecord;

  let best: StreamCost | null = null;
  for (const path of lifecyclePaths(pricing)) {
    if (!respectsResidence(path, bandDays, pricing)) continue;
    let storage = 0;
    let operations = (ingestOps / 1000) * pricing.putEurPer1000;
    let retrieval = 0;

    path.forEach((name, i) => {
      const days = bandDays[i];
      if (days <= 0) return;
      const tier = pricing[name] as StorageTier;
      const bandTb = (workload.dataMonthTb * days) / DAYS_PER_MONTH;
      const bandRecords = (workload.recordsMonth * days) / DAYS_PER_MONTH;
      const billable = tier.erasure
        ? erasureFactor(objectSizeKb, tier.erasure)
        : tier.minBillableObjectKb > 0
          ? Math.max(1, tier.minBillableObjectKb / objectSizeKb)
          : 1;
      storage += bandTb * tier.storageEurPerTbMonth * billable;
      operations +=
        ((bandRecords * readShare * objectsPerRecord) / 1000) *
        tier.getEurPer1000;
      retrieval += bandTb * readShare * tier.retrievalEurPerTb;

      const previous = i > 0 ? path[i - 1] : "hot";
      if (i > 0 && name !== previous) {
        operations += (ingestOps / 1000) * tier.transitionEurPer1000;
      }
    });

    const total = storage + operations + retrieval;
    if (
      !best ||
      total <
        best.storageEurMonth + best.operationsEurMonth + best.retrievalEurMonth
    ) {
      best = {
        path,
        storageEurMonth: storage,
        operationsEurMonth: operations,
        retrievalEurMonth: retrieval,
      };
    }
  }
  return best as StreamCost;
}

function breakdown(costs: StreamCost[], licenseEur: number): CostBreakdown {
  const storageEurYear =
    12 * costs.reduce((sum, c) => sum + c.storageEurMonth, 0);
  const operationsEurYear =
    12 * costs.reduce((sum, c) => sum + c.operationsEurMonth, 0);
  const retrievalEurYear =
    12 * costs.reduce((sum, c) => sum + c.retrievalEurMonth, 0);
  return {
    storageEurYear,
    operationsEurYear,
    retrievalEurYear,
    licenseEurYear: licenseEur,
    totalEurYear:
      storageEurYear + operationsEurYear + retrievalEurYear + licenseEur,
  };
}

export function estimate(
  workloadInput: WorkloadInput,
  storage: StorageInput,
  config: CalculatorConfig,
): Estimate {
  const retentionDays = Math.max(storage.retentionDays, storage.hotDays);
  const workload = calculateWorkload(
    workloadInput,
    retentionDays,
    config.block,
  );
  const bands = ageBands(storage.hotDays, retentionDays);
  const opsPerBlock = config.block.backendOpsPerBlock;

  const directCosts = workload.streams.map((s) =>
    streamCost(
      s,
      bands,
      storage.readPercentPerMonth,
      config.pricing,
      s.stream.recordSizeKb,
      1,
    ),
  );
  const reductCosts = workload.streams.map((s) =>
    streamCost(
      s,
      bands,
      storage.readPercentPerMonth,
      config.pricing,
      s.stream.recordSizeKb * s.packFactor,
      opsPerBlock / s.packFactor,
    ),
  );

  const direct = breakdown(directCosts, 0);
  const reduct = breakdown(
    reductCosts,
    licenseEurYear(workload.totalRetainedTb, config.licenseTiers),
  );
  const savingEurYear = direct.totalEurYear - reduct.totalEurYear;

  const directIngestObjectsMonth = workload.totalRecordsMonth;
  const reductIngestOperationsMonth = workload.streams.reduce(
    (sum, s) => sum + (opsPerBlock * s.recordsMonth) / s.packFactor,
    0,
  );
  const units = nonNegative(workloadInput.units);
  const dailyPerUnitTb =
    units > 0 ? workload.totalDataMonthTb / units / DAYS_PER_MONTH : 0;

  return {
    workload,
    direct,
    reduct,
    savingEurYear,
    savingPercent:
      direct.totalEurYear > 0 ? (savingEurYear / direct.totalEurYear) * 100 : 0,
    directIngestObjectsMonth,
    reductIngestOperationsMonth,
    ingestReduction:
      directIngestObjectsMonth > 0
        ? 1 - reductIngestOperationsMonth / directIngestObjectsMonth
        : 0,
    localHistoryDays:
      dailyPerUnitTb > 0
        ? nonNegative(storage.edgeDiskTbPerUnit) / dailyPerUnitTb
        : Infinity,
  };
}
