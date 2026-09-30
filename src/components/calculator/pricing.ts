import type { Currency } from "../../lib/currency";
import type { BackendId, BackendPricing, LicenseTier } from "./types";

export type MarginalTier = {
  upTo: number | null;
  rate: number;
};

// Vendor prices are kept in their source currency (USD). For a EUR display
// they are converted only through fx.usdToEur, which never applies to
// ReductStore's own list prices.
export const pricingConfig = {
  lastVerified: "2026-09-30",

  fx: {
    usdToEur: 0.880906,
    lastVerified: "2026-09-30",
  },

  aws: {
    vendor: "Amazon Web Services",
    product: "S3 Standard, Standard-IA, Glacier Instant Retrieval",
    currency: "USD",
    units: "per GB-month stored, per 1,000 requests, per GB retrieved",
    source: "https://aws.amazon.com/s3/pricing/",
    classesSource:
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    region: "US East (N. Virginia)",
    lastVerified: "2026-09-30",
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
    vendor: "Microsoft",
    product: "Azure Blob Storage (LRS hot, cool, cold)",
    currency: "USD",
    units: "per GB-month stored, per 10,000 operations, per GB retrieved",
    source: "https://azure.microsoft.com/pricing/details/storage/blobs/",
    region: "placeholder",
    lastVerified: "placeholder",
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
    vendor: "Foxglove",
    product: "Pro",
    currency: "USD",
    units:
      "per month base, per seat and device per month, per TB stored per month, per TB indexed, per TB of bandwidth, per query hour",
    source: "https://docs.foxglove.dev/docs/pricing",
    publicPlanUrl: "https://www.foxglove.dev/pricing",
    lastVerified: "2026-09-30",
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
    vendor: "Tiger Data",
    product: "Tiger Cloud Scale",
    currency: "USD",
    units: "per month minimum compute, per GB-month hot and tiered storage",
    source: "https://www.tigerdata.com/pricing",
    lastVerified: "2026-09-30",
    scaleMinComputeUsdPerMonth: 36,
    scaleStorageUsdPerGbMonth: 0.212,
    tieredStorageUsdPerGbMonth: 0.021,
    defaultCompressionRatio: 5,
  },

  influx: {
    vendor: "InfluxData",
    product: "InfluxDB Cloud Serverless (usage-based)",
    currency: "USD",
    units: "per MB written, per 100 queries, per GB-hour stored, per GB out",
    source: "https://www.influxdata.com/influxdb-pricing/",
    plansSource:
      "https://docs.influxdata.com/influxdb3/cloud-serverless/admin/billing/pricing-plans/",
    lastVerified: "2026-09-30",
    dataInUsdPerMb: 0.0025,
    queryUsdPer100: 0.012,
    storageUsdPerGbHour: 0.002,
    dataOutUsdPerGb: 0.09,
    defaultQueriesPerMonth: 10_000,
  },

  mongodb: {
    vendor: "MongoDB",
    product: "Atlas dedicated clusters (AWS)",
    currency: "USD",
    units: "per cluster hour, including the tier's default storage",
    source: "https://www.mongodb.com/pricing",
    billingSource:
      "https://www.mongodb.com/docs/atlas/billing/invoice-breakdown/",
    lastVerified: "2026-09-30",
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
};

export const usdRate = (currency: Currency) =>
  currency === "EUR" ? pricingConfig.fx.usdToEur : 1;

function awsPricing(rate: number): BackendPricing {
  const aws = pricingConfig.aws;
  const perTb = (usdPerGb: number) => usdPerGb * 1000 * rate;
  return {
    name: "AWS S3",
    putPer1000: aws.putUsdPer1000 * rate,
    hot: {
      storagePerTbMonth: perTb(aws.standard.storageUsdPerGbMonth),
      getPer1000: aws.standard.getUsdPer1000 * rate,
      retrievalPerTb: 0,
      minBillableObjectKb: 0,
      minResidenceDays: 0,
      transitionPer1000: 0,
    },
    cold: {
      storagePerTbMonth: perTb(aws.standardIa.storageUsdPerGbMonth),
      getPer1000: aws.standardIa.getUsdPer1000 * rate,
      retrievalPerTb: perTb(aws.standardIa.retrievalUsdPerGb),
      minBillableObjectKb: aws.standardIa.minBillableObjectKb,
      minResidenceDays: aws.standardIa.minStorageDays,
      transitionPer1000: aws.standardIa.transitionUsdPer1000 * rate,
    },
    archive: {
      storagePerTbMonth: perTb(aws.glacierIr.storageUsdPerGbMonth),
      getPer1000: aws.glacierIr.getUsdPer1000 * rate,
      retrievalPerTb: perTb(aws.glacierIr.retrievalUsdPerGb),
      minBillableObjectKb: aws.glacierIr.minBillableObjectKb,
      minResidenceDays: aws.glacierIr.minStorageDays,
      transitionPer1000: aws.glacierIr.transitionUsdPer1000 * rate,
    },
  };
}

function azurePricing(rate: number): BackendPricing {
  const az = pricingConfig.azure;
  const perTb = (usdPerGb: number) => usdPerGb * 1000 * rate;
  return {
    name: "Azure Blob",
    putPer1000: az.putUsdPer1000 * rate,
    hot: {
      storagePerTbMonth: perTb(az.hot.storageUsdPerGbMonth),
      getPer1000: az.hot.getUsdPer1000 * rate,
      retrievalPerTb: 0,
      minBillableObjectKb: 0,
      minResidenceDays: 0,
      transitionPer1000: 0,
    },
    cold: {
      storagePerTbMonth: perTb(az.cool.storageUsdPerGbMonth),
      getPer1000: az.cool.getUsdPer1000 * rate,
      retrievalPerTb: perTb(az.cool.retrievalUsdPerGb),
      minBillableObjectKb: 0,
      minResidenceDays: az.cool.minStorageDays,
      transitionPer1000: az.cool.transitionUsdPer1000 * rate,
    },
    archive: {
      storagePerTbMonth: perTb(az.cold.storageUsdPerGbMonth),
      getPer1000: az.cold.getUsdPer1000 * rate,
      retrievalPerTb: perTb(az.cold.retrievalUsdPerGb),
      minBillableObjectKb: 0,
      minResidenceDays: az.cold.minStorageDays,
      transitionPer1000: az.cold.transitionUsdPer1000 * rate,
    },
  };
}

export const DEFAULT_MINIO_PER_TB_MONTH = 10;

export function minioPricing(storagePerTbMonth: number): BackendPricing {
  return {
    name: "MinIO",
    putPer1000: 0,
    hot: {
      storagePerTbMonth,
      getPer1000: 0,
      retrievalPerTb: 0,
      minBillableObjectKb: 0,
      minResidenceDays: 0,
      transitionPer1000: 0,
    },
  };
}

// minioPerTbMonth is entered by the visitor in the display currency.
export function backendPricing(
  backend: BackendId,
  currency: Currency,
  minioPerTbMonth = DEFAULT_MINIO_PER_TB_MONTH,
): BackendPricing {
  if (backend === "aws") return awsPricing(usdRate(currency));
  if (backend === "azure") return azurePricing(usdRate(currency));
  return minioPricing(minioPerTbMonth);
}

export const licenseTiers = (perTbMonth: number): LicenseTier[] => [
  { upToTb: Infinity, perTbYear: perTbMonth * 12 },
];

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
