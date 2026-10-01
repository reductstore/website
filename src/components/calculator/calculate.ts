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

export type StreamWorkload = {
  stream: StreamInput;
  recordsMonth: number;
  generatedMonthTb: number;
  storedKb: number;
  storedMonthTb: number;
  hotTb: number;
  coldTb: number;
};

export type Workload = {
  streams: StreamWorkload[];
  recordsMonth: number;
  generatedMonthTb: number;
  storedMonthTb: number;
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
  prices: Prices;
  usdRate: number;
  competitor: CompetitorId;
  assumptions: CompetitorAssumptions;
  readPercentPerMonth: number;
  instances: number;
  telemetryCompression: number;
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

export const isBinary = (stream: StreamInput) => stream.dataClass === "blob";

// Telemetry, metadata, and logs are stored compressed by the same ratio on
// every side; binary data such as images is already compressed.
export function calculateWorkload(
  input: WorkloadInput,
  retention: Retention,
  telemetryCompression = 1,
): Workload {
  const r = normalizeRetention(retention);
  const compression = Math.max(1, finite(telemetryCompression));
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
      const ratio = isBinary(stream) ? 1 : compression;
      const storedMonthTb = generatedMonthTb / ratio;
      return {
        stream,
        recordsMonth,
        generatedMonthTb,
        storedKb: stream.recordSizeKb / ratio,
        storedMonthTb,
        hotTb:
          (storedMonthTb * share(r.hotPercent) * r.hotDays) / DAYS_PER_MONTH,
        coldTb:
          (storedMonthTb * share(r.coldPercent) * r.coldDays) / DAYS_PER_MONTH,
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
    storedMonthTb: sum((s) => s.storedMonthTb),
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

const dataOutYear = (
  storedTb: number,
  perTb: number,
  config: ComparisonConfig,
) => 12 * storedTb * share(config.readPercentPerMonth) * perTb;

function reductSide(
  workload: Workload,
  retention: Retention,
  config: ComparisonConfig,
): { side: CostSide; costs: Costs } {
  // Telemetry faster than 1 Hz is batched into one record per second before
  // it is compressed, so a block holds seconds rather than single samples.
  const costs = storeAll(workload.streams, retention, config, (s) => {
    const batch = isBinary(s.stream)
      ? 1
      : Math.max(1, nonNegative(s.stream.frequencyHz));
    const pack = packFactor(s.storedKb * batch, config.block);
    return {
      objectKb: s.storedKb * batch * pack,
      objectsPerRecord: config.block.backendOpsPerBlock / (pack * batch),
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
  const dataOut = dataOutYear(
    workload.retainedTb,
    config.pricing.egressPerTb,
    config,
  );
  if (dataOut > 0) components.push({ label: "Data out", amountYear: dataOut });
  components.push({
    label: "Servers",
    amountYear:
      12 *
      Math.max(1, Math.round(nonNegative(config.instances))) *
      config.pricing.serverPerMonth,
  });
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
    workload.storedMonthTb * share(normalizeRetention(retention).hotPercent);
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

// Time-series databases keep telemetry, metadata, and logs; binary data goes
// to object storage as one object per record.
function databaseSide(
  workload: Workload,
  retention: Retention,
  config: ComparisonConfig,
  name: string,
): CostSide {
  const usd = (value: number) => value * config.usdRate;
  const db = workload.streams.filter((s) => !isBinary(s.stream));
  const binary = workload.streams.filter((s) => isBinary(s.stream));
  const dbHotTb = db.reduce((sum, s) => sum + s.hotTb, 0);
  const dbColdTb = db.reduce((sum, s) => sum + s.coldTb, 0);
  const components: CostComponent[] = [];
  const routes: Route[] = [];
  let dataOut = 0;

  if (db.length > 0) {
    const vendor =
      config.competitor === "influx"
        ? config.prices.influx
        : config.prices.timescale;
    let compute: number;
    let storage: number;
    if (config.competitor === "influx") {
      const i = config.prices.influx;
      compute =
        i.instances * i.instanceUsdPerHour * config.prices.hoursPerMonth;
      storage = (dbHotTb + dbColdTb) * 1000 * i.storageUsdPerGbMonth;
    } else {
      const t = config.prices.timescale;
      compute = t.instances * t.serviceUsdPerMonth;
      storage =
        dbHotTb * 1000 * t.storageUsdPerGbMonth * t.instances +
        dbColdTb * 1000 * t.tieredUsdPerGbMonth;
    }
    components.push(
      { label: "Compute", amountYear: usd(12 * compute) },
      { label: "Storage", amountYear: usd(12 * storage) },
    );
    dataOut += dataOutYear(
      dbHotTb + dbColdTb,
      usd(vendor.egressUsdPerGb * 1000),
      config,
    );
    routes.push({ target: name, streams: names(db) });
  }

  if (binary.length > 0) {
    const costs = storeAll(binary, retention, config, (s) => ({
      objectKb: s.storedKb,
      objectsPerRecord: 1,
    }));
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
    dataOut += dataOutYear(
      binary.reduce((sum, s) => sum + s.hotTb + s.coldTb, 0),
      config.pricing.egressPerTb,
      config,
    );
    routes.push({ target: config.backendName, streams: names(binary) });
  }

  if (dataOut > 0) components.push({ label: "Data out", amountYear: dataOut });
  return {
    label:
      db.length > 0 && binary.length > 0
        ? `${name} + ${config.backendName}`
        : db.length > 0
          ? name
          : config.backendName,
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
  const workload = calculateWorkload(
    input,
    retention,
    config.telemetryCompression,
  );
  const { side: reduct, costs } = reductSide(workload, retention, config);
  const alternative =
    config.competitor === "foxglove"
      ? foxgloveSide(workload, retention, nonNegative(input.units), config)
      : databaseSide(
          workload,
          retention,
          config,
          config.competitor === "influx" ? "InfluxDB" : "TimescaleDB",
        );
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
