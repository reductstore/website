import type {
  BackendPricing,
  CompetitorAssumptions,
  CompetitorId,
  LicenseTier,
  Retention,
  StorageTier,
  StreamInput,
  WorkloadInput,
} from "./types";

export const KB_PER_TB = 1_000_000_000;
export const DAYS_PER_MONTH = 30;
export const SECONDS_PER_HOUR = 3600;

type Prices = typeof import("./pricing").pricingConfig;

export type BlockConfig = {
  sizeKb: number;
  maxRecords: number;
  backendOpsPerBlock: number;
};

export type BatchConfig = {
  sizeKb: number;
  maxRecords: number;
  opsPerObject: number;
};

export type StreamWorkload = {
  stream: StreamInput;
  recordsMonth: number;
  generatedMonthTb: number;
  hotTb: number;
  coldTb: number;
};

export type Workload = {
  streams: StreamWorkload[];
  recordsMonth: number;
  generatedMonthTb: number;
  hotTb: number;
  coldTb: number;
  retainedTb: number;
};

export type CostComponent = { label: string; amountYear: number };

export type Route = { target: string; streams: string[] };

export type CostSide = {
  label: string;
  components: CostComponent[];
  totalYear: number;
  routes: Route[];
};

export type ComparisonConfig = {
  pricing: BackendPricing;
  backendName: string;
  licenseTiers: LicenseTier[];
  licenseMinTb: number;
  block: BlockConfig;
  batch: BatchConfig;
  prices: Prices;
  usdRate: number;
  competitor: CompetitorId;
  assumptions: CompetitorAssumptions;
  readPercentPerMonth: number;
};

export type Comparison = {
  workload: Workload;
  coldTier: string;
  reduct: CostSide;
  alternative: CostSide;
  savingYear: number;
  savingPercent: number;
};

const finite = (value: number) => (Number.isFinite(value) ? value : 0);
const nonNegative = (value: number) => Math.max(0, finite(value));
const share = (percent: number) => Math.min(100, nonNegative(percent)) / 100;

// Cold data is a subset of the hot data that is kept longer, so its share
// can never exceed the hot share.
export function normalizeRetention(retention: Retention): Retention {
  const hotPercent = Math.min(100, nonNegative(retention.hotPercent));
  return {
    hotPercent,
    hotDays: nonNegative(retention.hotDays),
    coldPercent: Math.min(hotPercent, nonNegative(retention.coldPercent)),
    coldDays: nonNegative(retention.coldDays),
  };
}

export function calculateWorkload(
  input: WorkloadInput,
  retention: Retention,
): Workload {
  const r = normalizeRetention(retention);
  const secondsMonth =
    nonNegative(input.units) *
    nonNegative(input.recordingHoursPerDay) *
    SECONDS_PER_HOUR *
    DAYS_PER_MONTH;

  const streams = input.streams
    .filter((stream) => stream.enabled && stream.recordSizeKb > 0)
    .map((stream) => {
      const recordsMonth =
        nonNegative(stream.count) *
        nonNegative(stream.frequencyHz) *
        secondsMonth;
      const generatedMonthTb = (recordsMonth * stream.recordSizeKb) / KB_PER_TB;
      return {
        stream,
        recordsMonth,
        generatedMonthTb,
        hotTb:
          (generatedMonthTb * share(r.hotPercent) * r.hotDays) / DAYS_PER_MONTH,
        coldTb:
          (generatedMonthTb * share(r.coldPercent) * r.coldDays) /
          DAYS_PER_MONTH,
      };
    })
    .filter((stream) => stream.recordsMonth > 0);

  const sum = (pick: (s: StreamWorkload) => number) =>
    streams.reduce((total, s) => total + pick(s), 0);
  const hotTb = sum((s) => s.hotTb);
  const coldTb = sum((s) => s.coldTb);
  return {
    streams,
    recordsMonth: sum((s) => s.recordsMonth),
    generatedMonthTb: sum((s) => s.generatedMonthTb),
    hotTb,
    coldTb,
    retainedTb: hotTb + coldTb,
  };
}

export function packFactor(
  recordSizeKb: number,
  block: { sizeKb: number; maxRecords: number },
): number {
  if (!(recordSizeKb > 0)) return 1;
  return Math.max(
    1,
    Math.min(block.maxRecords, Math.floor(block.sizeKb / recordSizeKb)),
  );
}

export function licenseCostYear(retainedTb: number, tiers: LicenseTier[]) {
  let cost = 0;
  let lower = 0;
  for (const tier of tiers) {
    const inTier = Math.min(retainedTb, tier.upToTb) - lower;
    if (inTier <= 0) break;
    cost += inTier * tier.perTbYear;
    lower = tier.upToTb;
  }
  return cost;
}

export type MarginalTier = { upTo: number | null; rate: number };

export function marginalCost(
  usage: number,
  included: number,
  tiers: MarginalTier[],
): number {
  let remaining = Math.max(0, finite(usage) - included);
  let lower = included;
  let total = 0;
  for (const tier of tiers) {
    if (remaining <= 0) break;
    const capacity =
      tier.upTo == null ? remaining : Math.max(0, tier.upTo - lower);
    const amount = Math.min(remaining, capacity);
    total += amount * tier.rate;
    remaining -= amount;
    if (tier.upTo != null) lower = tier.upTo;
  }
  return total;
}

export type ObjectStorageCost = {
  storageMonth: number;
  requestsMonth: number;
  retrievalMonth: number;
  coldTier: StorageTier;
};

// One month of a stream kept in object storage as objects of objectKb, with
// objectsPerRecord requests per record. Hot data sits in the hot class for
// the hot window; the cold share then moves to the cheapest class whose
// minimum storage time fits in the cold window.
export function objectStorageCost(
  s: StreamWorkload,
  retention: Retention,
  readPercent: number,
  pricing: BackendPricing,
  objectKb: number,
  objectsPerRecord: number,
): ObjectStorageCost {
  const r = normalizeRetention(retention);
  const read = share(readPercent);
  const billable = (tier: StorageTier) =>
    tier.minBillableObjectKb > 0 && objectKb > 0
      ? Math.max(1, tier.minBillableObjectKb / objectKb)
      : 1;
  const hot = pricing.hot;
  const writtenObjects =
    s.recordsMonth * share(r.hotPercent) * objectsPerRecord;
  const coldObjects = s.recordsMonth * share(r.coldPercent) * objectsPerRecord;
  const hotStoredObjects = (writtenObjects * r.hotDays) / DAYS_PER_MONTH;
  const coldStoredObjects = (coldObjects * r.coldDays) / DAYS_PER_MONTH;

  const hotPart = {
    storage: s.hotTb * hot.storagePerTbMonth * billable(hot),
    requests:
      (writtenObjects / 1000) * pricing.putPer1000 +
      ((hotStoredObjects * read) / 1000) * hot.getPer1000,
    retrieval: s.hotTb * read * hot.retrievalPerTb,
  };

  const candidates = [hot, pricing.cold, pricing.archive].filter(
    (tier): tier is StorageTier =>
      tier !== undefined && tier.minResidenceDays <= r.coldDays,
  );
  let best: ObjectStorageCost | null = null;
  for (const tier of candidates) {
    const storage = s.coldTb * tier.storagePerTbMonth * billable(tier);
    const requests =
      (tier === hot ? 0 : (coldObjects / 1000) * tier.transitionPer1000) +
      ((coldStoredObjects * read) / 1000) * tier.getPer1000;
    const retrieval = s.coldTb * read * tier.retrievalPerTb;
    const total = storage + requests + retrieval;
    if (
      !best ||
      total < best.storageMonth + best.requestsMonth + best.retrievalMonth
    ) {
      best = {
        storageMonth: storage,
        requestsMonth: requests,
        retrievalMonth: retrieval,
        coldTier: tier,
      };
    }
  }
  const cold = best as ObjectStorageCost;
  return {
    storageMonth: hotPart.storage + cold.storageMonth,
    requestsMonth: hotPart.requests + cold.requestsMonth,
    retrievalMonth: hotPart.retrieval + cold.retrievalMonth,
    coldTier: cold.coldTier,
  };
}

type Costs = { storage: number; requests: number; tiers: StorageTier[] };

function storeAll(
  streams: StreamWorkload[],
  retention: Retention,
  config: ComparisonConfig,
  layout: (s: StreamWorkload) => { objectKb: number; objectsPerRecord: number },
): Costs {
  const costs: Costs = { storage: 0, requests: 0, tiers: [] };
  for (const s of streams) {
    const { objectKb, objectsPerRecord } = layout(s);
    const cost = objectStorageCost(
      s,
      retention,
      config.readPercentPerMonth,
      config.pricing,
      objectKb,
      objectsPerRecord,
    );
    costs.storage += 12 * cost.storageMonth;
    costs.requests += 12 * (cost.requestsMonth + cost.retrievalMonth);
    costs.tiers.push(cost.coldTier);
  }
  return costs;
}

const sumAmount = (components: CostComponent[]) =>
  components.reduce((sum, c) => sum + c.amountYear, 0);

const names = (streams: StreamWorkload[]) => streams.map((s) => s.stream.name);

function reductSide(
  workload: Workload,
  retention: Retention,
  config: ComparisonConfig,
): { side: CostSide; costs: Costs } {
  const costs = storeAll(workload.streams, retention, config, (s) => {
    const pack = packFactor(s.stream.recordSizeKb, config.block);
    return {
      objectKb: s.stream.recordSizeKb * pack,
      objectsPerRecord: config.block.backendOpsPerBlock / pack,
    };
  });
  const licensedTb =
    workload.retainedTb > 0
      ? Math.max(workload.retainedTb, config.licenseMinTb)
      : 0;
  const components: CostComponent[] = [
    {
      label: "ReductStore license",
      amountYear: licenseCostYear(licensedTb, config.licenseTiers),
    },
    { label: `${config.backendName} storage`, amountYear: costs.storage },
  ];
  if (costs.requests > 0) {
    components.push({
      label: "Requests and retrieval",
      amountYear: costs.requests,
    });
  }
  return {
    costs,
    side: {
      label: `ReductStore + ${config.backendName}`,
      components,
      totalYear: sumAmount(components),
      routes: [
        {
          target: `ReductStore → ${config.backendName}`,
          streams: names(workload.streams),
        },
      ],
    },
  };
}

function foxgloveSide(
  workload: Workload,
  retention: Retention,
  units: number,
  config: ComparisonConfig,
): CostSide {
  const f = config.prices.foxglove;
  const usd = (value: number) => value * config.usdRate;
  const { assumptions } = config;
  const uploadedMonthTb =
    workload.generatedMonthTb * share(normalizeRetention(retention).hotPercent);
  const seats = Math.max(0, assumptions.foxgloveDeveloperSeats);
  const components: CostComponent[] = [
    {
      label: "Platform",
      amountYear: usd(
        12 *
          (f.baseUsdPerMonth +
            Math.max(0, seats - f.includedDeveloperSeats) *
              f.extraDeveloperSeatUsdPerMonth +
            Math.max(0, Math.ceil(units) - f.includedDevices) *
              f.extraDeviceUsdPerMonth),
      ),
    },
    {
      label: "Storage",
      amountYear: usd(
        12 *
          marginalCost(
            workload.retainedTb,
            f.storageIncludedTb,
            f.storageUsdPerTbMonth,
          ),
      ),
    },
    {
      label: "Indexing",
      amountYear: usd(
        12 *
          marginalCost(
            uploadedMonthTb,
            f.indexingIncludedTb,
            f.indexingUsdPerTb,
          ),
      ),
    },
    {
      label: "Bandwidth",
      amountYear: usd(
        12 *
          marginalCost(
            workload.retainedTb * share(config.readPercentPerMonth),
            f.bandwidthIncludedTb,
            f.bandwidthUsdPerTb,
          ),
      ),
    },
    {
      label: "Query",
      amountYear: usd(
        12 *
          marginalCost(
            assumptions.foxgloveQueryHoursPerMonth,
            f.queryIncludedHours,
            f.queryUsdPerHour,
          ),
      ),
    },
  ];
  return {
    label: "Foxglove",
    components,
    totalYear: sumAmount(components),
    routes: [{ target: "Foxglove", streams: names(workload.streams) }],
  };
}

function influxSide(
  workload: Workload,
  retention: Retention,
  config: ComparisonConfig,
): CostSide {
  const i = config.prices.influx;
  const usd = (value: number) => value * config.usdRate;
  const metrics = workload.streams.filter(
    (s) => s.stream.dataClass === "metric",
  );
  const rest = workload.streams.filter((s) => s.stream.dataClass !== "metric");
  const r = normalizeRetention(retention);
  const writtenMb =
    metrics.reduce((sum, s) => sum + s.generatedMonthTb, 0) *
    share(r.hotPercent) *
    1_000_000;
  const retainedGb =
    metrics.reduce((sum, s) => sum + s.hotTb + s.coldTb, 0) * 1000;
  const components: CostComponent[] = [
    { label: "Data in", amountYear: usd(12 * writtenMb * i.dataInUsdPerMb) },
    {
      label: "Storage",
      amountYear: usd(
        12 *
          retainedGb *
          Math.max(0, config.assumptions.influxStorageToRawRatio) *
          i.hoursPerMonth *
          i.storageUsdPerGbHour,
      ),
    },
    {
      label: "Queries",
      amountYear: usd(
        12 *
          (Math.max(0, config.assumptions.influxQueriesPerMonth) / 100) *
          i.queryUsdPer100,
      ),
    },
    {
      label: "Data out",
      amountYear: usd(
        12 * retainedGb * share(config.readPercentPerMonth) * i.dataOutUsdPerGb,
      ),
    },
  ];
  const routes: Route[] = [
    { target: "InfluxDB Cloud", streams: names(metrics) },
  ];
  if (rest.length > 0) {
    const costs = storeAll(rest, retention, config, (s) => {
      const pack = packFactor(s.stream.recordSizeKb, config.batch);
      return {
        objectKb: s.stream.recordSizeKb * pack,
        objectsPerRecord: config.batch.opsPerObject / pack,
      };
    });
    components.push({
      label: `${config.backendName} storage`,
      amountYear: costs.storage,
    });
    if (costs.requests > 0) {
      components.push({
        label: "Requests and retrieval",
        amountYear: costs.requests,
      });
    }
    routes.push({ target: config.backendName, streams: names(rest) });
  }
  return {
    label:
      rest.length > 0
        ? `InfluxDB Cloud + ${config.backendName}`
        : "InfluxDB Cloud",
    components,
    totalYear: sumAmount(components),
    routes,
  };
}

export function compare(
  input: WorkloadInput,
  retention: Retention,
  config: ComparisonConfig,
): Comparison {
  const workload = calculateWorkload(input, retention);
  const { side: reduct, costs } = reductSide(workload, retention, config);
  const alternative =
    config.competitor === "foxglove"
      ? foxgloveSide(workload, retention, nonNegative(input.units), config)
      : influxSide(workload, retention, config);
  const savingYear = alternative.totalYear - reduct.totalYear;
  const largest = workload.streams.reduce(
    (best, s, i) => (s.coldTb > workload.streams[best].coldTb ? i : best),
    0,
  );
  return {
    workload,
    coldTier: costs.tiers[largest]?.label ?? config.pricing.hot.label,
    reduct,
    alternative,
    savingYear,
    savingPercent:
      alternative.totalYear > 0
        ? (savingYear / alternative.totalYear) * 100
        : 0,
  };
}
