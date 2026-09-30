import type { BackendId, BackendPricing, LicenseTier } from "./types";

export type MarginalTier = {
  upTo: number | null;
  rate: number;
};

// Vendor prices are kept in their source currency (USD) and converted to EUR
// only through usdToEur.
export const pricingConfig = {
  verifiedAt: "2026-09-30",

  fx: {
    usdToEur: 0.880906,
    verifiedAt: "2026-09-30",
  },

  aws: {
    source: "https://aws.amazon.com/s3/pricing/",
    classesSource:
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    region: "US East (N. Virginia)",
    verifiedAt: "2026-09-30",
    putUsdPer1000: 0.005,
    standard: { storageUsdPerGbMonth: 0.023, getUsdPer1000: 0.0004 },
    standardIa: {
      storageUsdPerGbMonth: 0.0125,
      getUsdPer1000: 0.001,
      retrievalUsdPerGb: 0.01,
      transitionUsdPer1000: 0.01,
      minBillableObjectKb: 128,
      minStorageDays: 30,
    },
    glacierIr: {
      storageUsdPerGbMonth: 0.004,
      getUsdPer1000: 0.01,
      retrievalUsdPerGb: 0.03,
      transitionUsdPer1000: 0.02,
      minBillableObjectKb: 128,
      minStorageDays: 90,
    },
  },

  // Development placeholders for Azure Blob (LRS hot / cool / cold). Replace
  // them with current prices for the chosen region before relying on them.
  azure: {
    source: "https://azure.microsoft.com/pricing/details/storage/blobs/",
    region: "placeholder",
    verifiedAt: "placeholder",
    putUsdPer1000: 0.005,
    hot: { storageUsdPerGbMonth: 0.018, getUsdPer1000: 0.0004 },
    cool: {
      storageUsdPerGbMonth: 0.01,
      getUsdPer1000: 0.001,
      retrievalUsdPerGb: 0.01,
      transitionUsdPer1000: 0.01,
      minStorageDays: 30,
    },
    cold: {
      storageUsdPerGbMonth: 0.0036,
      getUsdPer1000: 0.01,
      retrievalUsdPerGb: 0.03,
      transitionUsdPer1000: 0.018,
      minStorageDays: 90,
    },
  },

  foxglove: {
    source: "https://docs.foxglove.dev/docs/pricing",
    publicPlanUrl: "https://www.foxglove.dev/pricing",
    verifiedAt: "2026-09-30",
    baseUsdPerMonth: 20,
    includedDeveloperSeats: 3,
    extraDeveloperSeatUsdPerMonth: 42,
    includedDevices: 5,
    extraDeviceUsdPerMonth: 20,
    storageIncludedTb: 1,
    storageUsdPerTbMonth: [
      { upTo: 10, rate: 50 },
      { upTo: 100, rate: 40 },
      { upTo: 1000, rate: 30 },
      { upTo: null, rate: 26 },
    ] as MarginalTier[],
    indexingIncludedTb: 1,
    indexingUsdPerTb: [
      { upTo: 10, rate: 35 },
      { upTo: 100, rate: 28 },
      { upTo: 1000, rate: 24 },
      { upTo: null, rate: 22 },
    ] as MarginalTier[],
    bandwidthIncludedTb: 0.1,
    bandwidthUsdPerTb: [
      { upTo: 10, rate: 150 },
      { upTo: 100, rate: 135 },
      { upTo: 1000, rate: 125 },
      { upTo: null, rate: 115 },
    ] as MarginalTier[],
    queryIncludedHours: 1,
    queryUsdPerHour: [
      { upTo: 10, rate: 3.65 },
      { upTo: 100, rate: 2.75 },
      { upTo: 500, rate: 2.35 },
      { upTo: 1000, rate: 2.15 },
      { upTo: null, rate: 2.05 },
    ] as MarginalTier[],
  },

  tiger: {
    source: "https://www.tigerdata.com/pricing",
    verifiedAt: "2026-09-30",
    scaleMinComputeUsdPerMonth: 36,
    scaleStorageUsdPerGbMonth: 0.212,
    tieredStorageUsdPerGbMonth: 0.021,
    defaultCompressionRatio: 5,
  },

  influx: {
    source: "https://www.influxdata.com/influxdb-pricing/",
    plansSource:
      "https://docs.influxdata.com/influxdb3/cloud-serverless/admin/billing/pricing-plans/",
    verifiedAt: "2026-09-30",
    dataInUsdPerMb: 0.0025,
    queryUsdPer100: 0.012,
    storageUsdPerGbHour: 0.002,
    dataOutUsdPerGb: 0.09,
    defaultQueriesPerMonth: 10_000,
  },

  mongodb: {
    source: "https://www.mongodb.com/pricing",
    billingSource:
      "https://www.mongodb.com/docs/atlas/billing/invoice-breakdown/",
    verifiedAt: "2026-09-30",
    hoursPerMonth: 730,
    defaultTier: "M30",
    tiers: {
      M10: { usdPerHour: 0.08, defaultStorageGb: 10 },
      M20: { usdPerHour: 0.2, defaultStorageGb: 20 },
      M30: { usdPerHour: 0.54, defaultStorageGb: 40 },
      M40: { usdPerHour: 1.04, defaultStorageGb: 80 },
      M50: { usdPerHour: 2.0, defaultStorageGb: 160 },
      M60: { usdPerHour: 3.95, defaultStorageGb: 320 },
      M80: { usdPerHour: 7.3, defaultStorageGb: 750 },
      M140: { usdPerHour: 10.99, defaultStorageGb: 1000 },
      M200: { usdPerHour: 14.59, defaultStorageGb: 1500 },
      M300: { usdPerHour: 21.85, defaultStorageGb: 2000 },
      M400: { usdPerHour: 22.4, defaultStorageGb: 3000 },
      M700: { usdPerHour: 33.26, defaultStorageGb: 4000 },
    } as Record<string, { usdPerHour: number; defaultStorageGb: number }>,
  },

  // ReductStore Pro as published on the pricing page: €0.015 per GB per month
  // on peak storage, 1 TB minimum.
  reductstore: {
    source: "/pricing",
    eurPerGbMonth: 0.015,
    minTb: 1,
  },
};

export const usdToEur = (usd: number) => usd * pricingConfig.fx.usdToEur;

const perTb = (usdPerGb: number) => usdToEur(usdPerGb * 1000);
const eur = (usd: number) => usdToEur(usd);

const aws = pricingConfig.aws;
export const AWS_S3: BackendPricing = {
  name: "AWS S3",
  putEurPer1000: eur(aws.putUsdPer1000),
  hot: {
    storageEurPerTbMonth: perTb(aws.standard.storageUsdPerGbMonth),
    getEurPer1000: eur(aws.standard.getUsdPer1000),
    retrievalEurPerTb: 0,
    minBillableObjectKb: 0,
    minResidenceDays: 0,
    transitionEurPer1000: 0,
  },
  cold: {
    storageEurPerTbMonth: perTb(aws.standardIa.storageUsdPerGbMonth),
    getEurPer1000: eur(aws.standardIa.getUsdPer1000),
    retrievalEurPerTb: perTb(aws.standardIa.retrievalUsdPerGb),
    minBillableObjectKb: aws.standardIa.minBillableObjectKb,
    minResidenceDays: aws.standardIa.minStorageDays,
    transitionEurPer1000: eur(aws.standardIa.transitionUsdPer1000),
  },
  archive: {
    storageEurPerTbMonth: perTb(aws.glacierIr.storageUsdPerGbMonth),
    getEurPer1000: eur(aws.glacierIr.getUsdPer1000),
    retrievalEurPerTb: perTb(aws.glacierIr.retrievalUsdPerGb),
    minBillableObjectKb: aws.glacierIr.minBillableObjectKb,
    minResidenceDays: aws.glacierIr.minStorageDays,
    transitionEurPer1000: eur(aws.glacierIr.transitionUsdPer1000),
  },
};

const az = pricingConfig.azure;
export const AZURE_BLOB: BackendPricing = {
  name: "Azure Blob",
  putEurPer1000: eur(az.putUsdPer1000),
  hot: {
    storageEurPerTbMonth: perTb(az.hot.storageUsdPerGbMonth),
    getEurPer1000: eur(az.hot.getUsdPer1000),
    retrievalEurPerTb: 0,
    minBillableObjectKb: 0,
    minResidenceDays: 0,
    transitionEurPer1000: 0,
  },
  cold: {
    storageEurPerTbMonth: perTb(az.cool.storageUsdPerGbMonth),
    getEurPer1000: eur(az.cool.getUsdPer1000),
    retrievalEurPerTb: perTb(az.cool.retrievalUsdPerGb),
    minBillableObjectKb: 0,
    minResidenceDays: az.cool.minStorageDays,
    transitionEurPer1000: eur(az.cool.transitionUsdPer1000),
  },
  archive: {
    storageEurPerTbMonth: perTb(az.cold.storageUsdPerGbMonth),
    getEurPer1000: eur(az.cold.getUsdPer1000),
    retrievalEurPerTb: perTb(az.cold.retrievalUsdPerGb),
    minBillableObjectKb: 0,
    minResidenceDays: az.cold.minStorageDays,
    transitionEurPer1000: eur(az.cold.transitionUsdPer1000),
  },
};

export const DEFAULT_MINIO_EUR_PER_TB_MONTH = 10;

// On premises, both sides pay for raw disk. MinIO splits every object into
// erasure shards on separate drives, and each shard takes at least one disk
// block; ReductStore writes large blocks to a file system with the same
// protection overhead.
export const MINIO_ERASURE = { dataShards: 8, parityShards: 4, diskBlockKb: 4 };

export function minioPricing(storageEurPerTbMonth: number): BackendPricing {
  return {
    name: "MinIO",
    putEurPer1000: 0,
    hot: {
      storageEurPerTbMonth,
      erasure: MINIO_ERASURE,
      getEurPer1000: 0,
      retrievalEurPerTb: 0,
      minBillableObjectKb: 0,
      minResidenceDays: 0,
      transitionEurPer1000: 0,
    },
  };
}

export function backendPricing(
  backend: BackendId,
  minioEurPerTbMonth = DEFAULT_MINIO_EUR_PER_TB_MONTH,
): BackendPricing {
  if (backend === "aws") return AWS_S3;
  if (backend === "azure") return AZURE_BLOB;
  return minioPricing(minioEurPerTbMonth);
}

export const LICENSE_TIERS: LicenseTier[] = [
  {
    upToTb: Infinity,
    eurPerTbYear: pricingConfig.reductstore.eurPerGbMonth * 1000 * 12,
  },
];
export const LICENSE_MIN_TB = pricingConfig.reductstore.minTb;

export const REDUCT_BLOCK = {
  sizeKb: 64_000,
  maxRecords: 1_024,
  backendOpsPerBlock: 2,
};

// Alternative stacks that keep data in object storage are assumed to batch
// records into objects of about 64 MB, like ReductStore does.
export const OBJECT_STORAGE_BATCH = {
  sizeKb: 64_000,
  maxRecords: 1_024,
  opsPerObject: 1,
};
