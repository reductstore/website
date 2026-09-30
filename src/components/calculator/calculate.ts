import type {
  BackendPricing,
  CompetitorAssumptions,
  CompetitorId,
  CostBreakdown,
  LicenseTier,
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
  licenseMinTb?: number;
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
  stored: StreamWorkload[];
  storedRetainedTb: number;
};

const finite = (value: number) => (Number.isFinite(value) ? value : 0);
const nonNegative = (value: number) => Math.max(0, finite(value));

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

// Records as they land in storage when both sides store the same compressed
// payloads.
export function storedStreams(
  streams: StreamWorkload[],
  compressionRatio: number | undefined,
  block: { sizeKb: number; maxRecords: number },
): StreamWorkload[] {
  const ratio = Math.max(1, finite(compressionRatio ?? 1));
  return streams.map((s) => {
    const recordSizeKb = s.stream.recordSizeKb / ratio;
    return {
      ...s,
      stream: { ...s.stream, recordSizeKb },
      dataMonthTb: s.dataMonthTb / ratio,
      packFactor: packFactor(recordSizeKb, block),
    };
  });
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
      const billable =
        tier.minBillableObjectKb > 0
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
  const stored = storedStreams(
    workload.streams,
    storage.compressionRatio,
    config.block,
  );
  const storedRetainedTb =
    (stored.reduce((sum, s) => sum + s.dataMonthTb, 0) * retentionDays) /
    DAYS_PER_MONTH;

  const directCosts = stored.map((s) =>
    streamCost(
      s,
      bands,
      storage.readPercentPerMonth,
      config.pricing,
      s.stream.recordSizeKb,
      1,
    ),
  );
  const reductCosts = stored.map((s) =>
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
    licenseEurYear(
      storedRetainedTb > 0
        ? Math.max(storedRetainedTb, config.licenseMinTb ?? 0)
        : 0,
      config.licenseTiers,
    ),
  );
  const savingEurYear = direct.totalEurYear - reduct.totalEurYear;

  const directIngestObjectsMonth = workload.totalRecordsMonth;
  const reductIngestOperationsMonth = stored.reduce(
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
    stored,
    storedRetainedTb,
  };
}

// ---------------------------------------------------------------------------
// Alternative architectures

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

type Prices = typeof import("./pricing").pricingConfig;

export type CostComponent = { label: string; eurYear: number };

export type Route = { target: string; streams: string[] };

export type CostSide = {
  label: string;
  components: CostComponent[];
  totalEurYear: number;
  lowerBound: boolean;
  notes: string[];
  routes: Route[];
};

export type BatchConfig = {
  sizeKb: number;
  maxRecords: number;
  opsPerObject: number;
};

export type ComparisonConfig = CalculatorConfig & {
  backendName: string;
  batch: BatchConfig;
  prices: Prices;
  competitor: CompetitorId;
  assumptions: CompetitorAssumptions;
};

export type Comparison = {
  estimate: Estimate;
  reduct: CostSide;
  alternative: CostSide;
  savingEurYear: number;
  savingPercent: number;
};

const sumEur = (components: CostComponent[]) =>
  components.reduce((sum, c) => sum + c.eurYear, 0);

// Object storage for a subset of streams, written as batched objects.
export function objectStorageEurYear(
  streams: StreamWorkload[],
  bands: Bands,
  readPercent: number,
  pricing: BackendPricing,
  batch: BatchConfig,
): number {
  let monthly = 0;
  for (const s of streams) {
    const perObject = packFactor(s.stream.recordSizeKb, batch);
    const cost = streamCost(
      s,
      bands,
      readPercent,
      pricing,
      s.stream.recordSizeKb * perObject,
      batch.opsPerObject / perObject,
    );
    monthly +=
      cost.storageEurMonth + cost.operationsEurMonth + cost.retrievalEurMonth;
  }
  return 12 * monthly;
}

const retainedTb = (streams: StreamWorkload[], retentionDays: number) =>
  streams.reduce((sum, s) => sum + s.dataMonthTb, 0) *
  (retentionDays / DAYS_PER_MONTH);

const monthlyTb = (streams: StreamWorkload[]) =>
  streams.reduce((sum, s) => sum + s.dataMonthTb, 0);

const names = (streams: StreamWorkload[]) => streams.map((s) => s.stream.name);

function withObjectStorage(
  components: CostComponent[],
  routes: Route[],
  rest: StreamWorkload[],
  ctx: {
    bands: Bands;
    readPercent: number;
    config: ComparisonConfig;
  },
) {
  if (rest.length === 0) return;
  components.push({
    label: `${ctx.config.backendName} storage`,
    eurYear: objectStorageEurYear(
      rest,
      ctx.bands,
      ctx.readPercent,
      ctx.config.pricing,
      ctx.config.batch,
    ),
  });
  routes.push({ target: ctx.config.backendName, streams: names(rest) });
}

const withBackend = (name: string, rest: StreamWorkload[], backend: string) =>
  rest.length > 0 ? `${name} + ${backend}` : name;

export function alternativeCost(
  workload: Workload,
  stored: StreamWorkload[],
  storage: StorageInput,
  units: number,
  config: ComparisonConfig,
): CostSide {
  const { prices, assumptions } = config;
  const usd = (value: number) => value * prices.fx.usdToEur;
  const retention = Math.max(storage.retentionDays, storage.hotDays);
  const bands = ageBands(storage.hotDays, retention);
  const readShare =
    Math.min(100, nonNegative(storage.readPercentPerMonth)) / 100;
  const ctx = { bands, readPercent: storage.readPercentPerMonth, config };
  const byClass = (...classes: string[]) =>
    workload.streams.filter((s) => classes.includes(s.stream.dataClass));
  const storedByClass = (...classes: string[]) =>
    stored.filter((s) => classes.includes(s.stream.dataClass));

  if (config.competitor === "foxglove") {
    const f = prices.foxglove;
    const uploadedMonthTb = monthlyTb(stored);
    const retained = retainedTb(stored, retention);
    const seats = Math.max(0, assumptions.foxgloveDeveloperSeats);
    const components: CostComponent[] = [
      {
        label: "Platform",
        eurYear: usd(
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
        eurYear: usd(
          12 *
            marginalCost(retained, f.storageIncludedTb, f.storageUsdPerTbMonth),
        ),
      },
      {
        label: "Indexing",
        eurYear: usd(
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
        eurYear: usd(
          12 *
            marginalCost(
              retained * readShare,
              f.bandwidthIncludedTb,
              f.bandwidthUsdPerTb,
            ),
        ),
      },
      {
        label: "Query",
        eurYear: usd(
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
      totalEurYear: sumEur(components),
      lowerBound: false,
      notes: ["Foxglove Pro public list prices. Enterprise pricing is custom."],
      routes: [{ target: "Foxglove", streams: names(workload.streams) }],
    };
  }

  if (config.competitor === "tiger") {
    const t = prices.tiger;
    const inDb = byClass("metric", "metadata");
    const rest = storedByClass("blob", "log");
    const ratio = Math.max(1, assumptions.tigerCompressionRatio);
    const monthly = monthlyTb(inDb);
    const hotGb = ((monthly * bands.hot) / DAYS_PER_MONTH / ratio) * 1000;
    const tieredGb =
      ((monthly * Math.max(0, retention - bands.hot)) /
        DAYS_PER_MONTH /
        ratio) *
      1000;
    const components: CostComponent[] = [
      {
        label: "Minimum published compute",
        eurYear: usd(12 * t.scaleMinComputeUsdPerMonth),
      },
      {
        label: "Hot database storage",
        eurYear: usd(12 * hotGb * t.scaleStorageUsdPerGbMonth),
      },
      {
        label: "Tiered database storage",
        eurYear: usd(12 * tieredGb * t.tieredStorageUsdPerGbMonth),
      },
    ];
    const routes: Route[] = [{ target: "Tiger Cloud", streams: names(inDb) }];
    withObjectStorage(components, routes, rest, ctx);
    return {
      label: withBackend("Tiger Cloud", rest, config.backendName),
      components,
      totalEurYear: sumEur(components),
      lowerBound: true,
      notes: [
        "Uses Tiger Cloud's minimum published compute price. Actual compute depends on workload.",
        `Tiger Cloud storage assumes ${ratio}× time-series compression, applied only to data in the database.`,
      ],
      routes,
    };
  }

  if (config.competitor === "influx") {
    const i = prices.influx;
    const inDb = byClass("metric");
    const rest = storedByClass("metadata", "blob", "log");
    const monthly = monthlyTb(inDb);
    const retainedGb =
      retainedTb(inDb, retention) *
      1000 *
      Math.max(0, assumptions.influxStorageToRawRatio);
    const components: CostComponent[] = [
      {
        label: "Data in",
        eurYear: usd(12 * monthly * 1_000_000 * i.dataInUsdPerMb),
      },
      {
        label: "Storage",
        eurYear: usd(
          12 *
            retainedGb *
            prices.mongodb.hoursPerMonth *
            i.storageUsdPerGbHour,
        ),
      },
      {
        label: "Queries",
        eurYear: usd(
          12 *
            (Math.max(0, assumptions.influxQueriesPerMonth) / 100) *
            i.queryUsdPer100,
        ),
      },
      {
        label: "Data out",
        eurYear: usd(
          12 *
            retainedTb(inDb, retention) *
            1000 *
            readShare *
            i.dataOutUsdPerGb,
        ),
      },
    ];
    const routes: Route[] = [
      { target: "InfluxDB Cloud", streams: names(inDb) },
    ];
    withObjectStorage(components, routes, rest, ctx);
    return {
      label: withBackend("InfluxDB Cloud", rest, config.backendName),
      components,
      totalEurYear: sumEur(components),
      lowerBound: false,
      notes: [
        "InfluxDB Cloud Serverless public list-price estimate.",
        "At larger production scale, InfluxData positions Cloud Dedicated; its pricing is not public.",
      ],
      routes,
    };
  }

  if (config.competitor === "mongodb") {
    const m = prices.mongodb;
    const tierName = m.tiers[assumptions.atlasTier]
      ? assumptions.atlasTier
      : m.defaultTier;
    const tier = m.tiers[tierName];
    const inDb = byClass("metadata", "metric");
    const rest = storedByClass("blob", "log");
    const components: CostComponent[] = [
      {
        label: `Atlas ${tierName} base cluster`,
        eurYear: usd(12 * tier.usdPerHour * m.hoursPerMonth),
      },
    ];
    const routes: Route[] = [{ target: "MongoDB Atlas", streams: names(inDb) }];
    withObjectStorage(components, routes, rest, ctx);
    const overflow = retainedTb(inDb, retention) * 1000 > tier.defaultStorageGb;
    return {
      label: withBackend("MongoDB Atlas", rest, config.backendName),
      components,
      totalEurYear: sumEur(components),
      lowerBound: overflow,
      notes: [
        "MongoDB Atlas public base price; region, storage, IOPS, and backups change the cluster price.",
        ...(overflow
          ? [
              `The ${tierName} tier includes ${tier.defaultStorageGb} GB. Additional Atlas storage is not included in this public base-price estimate.`,
            ]
          : []),
      ],
      routes,
    };
  }

  const components: CostComponent[] = [];
  const routes: Route[] = [];
  withObjectStorage(components, routes, stored, ctx);
  return {
    label: `${config.backendName} only`,
    components,
    totalEurYear: sumEur(components),
    lowerBound: false,
    notes: [
      "A custom pipeline that batches records into objects of about 64 MB.",
    ],
    routes,
  };
}

export function compare(
  workloadInput: WorkloadInput,
  storage: StorageInput,
  config: ComparisonConfig,
): Comparison {
  const result = estimate(workloadInput, storage, config);
  const reductComponents: CostComponent[] = [
    { label: "ReductStore license", eurYear: result.reduct.licenseEurYear },
    {
      label: `${config.backendName} storage`,
      eurYear: result.reduct.storageEurYear,
    },
  ];
  if (storage.backend !== "minio") {
    reductComponents.push({
      label: "Requests and retrieval",
      eurYear: result.reduct.operationsEurYear + result.reduct.retrievalEurYear,
    });
  }
  const reduct: CostSide = {
    label: `ReductStore + ${config.backendName}`,
    components: reductComponents,
    totalEurYear: result.reduct.totalEurYear,
    lowerBound: false,
    notes: [],
    routes: [
      {
        target: `ReductStore → ${config.backendName}`,
        streams: names(result.workload.streams),
      },
    ],
  };
  const alternative = alternativeCost(
    result.workload,
    result.stored,
    storage,
    nonNegative(workloadInput.units),
    config,
  );
  const savingEurYear = alternative.totalEurYear - reduct.totalEurYear;
  return {
    estimate: result,
    reduct,
    alternative,
    savingEurYear,
    savingPercent:
      alternative.totalEurYear > 0
        ? (savingEurYear / alternative.totalEurYear) * 100
        : 0,
  };
}
