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
  lastVerified: "2026-10-01",
  hoursPerMonth: 730,

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
    lastVerified: "2026-10-01",
    egressUsdPerGb: 0.09,
    server: { instance: "m7i.xlarge", usdPerHour: 0.2016 },
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

  azure: {
    vendor: "Microsoft",
    product: "Azure Blob Storage (LRS hot, cool, cold)",
    currency: "USD",
    units: "per GB-month stored, per 10,000 operations, per GB retrieved",
    source: "https://azure.microsoft.com/pricing/details/storage/blobs/",
    // The same list prices as the page, from the public retail prices API
    // (General Block Blob v2, East US). Hot storage uses the first 50 TB tier.
    apiSource:
      "https://prices.azure.com/api/retail/prices?$filter=serviceName eq 'Storage' and armRegionName eq 'eastus' and productName eq 'General Block Blob v2'",
    region: "East US",
    lastVerified: "2026-10-01",
    egressUsdPerGb: 0.087,
    server: { instance: "D4s v5", usdPerHour: 0.192 },
    putUsdPer1000: 0.005,
    hot: { storageUsdPerGbMonth: 0.0208, getUsdPer1000: 0.0004 },
    cool: {
      storageUsdPerGbMonth: 0.0152,
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
    lastVerified: "2026-10-01",
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

  influx: {
    vendor: "Amazon Web Services",
    product: "Timestream for InfluxDB 3 (db.influxIOIncluded.xlarge)",
    currency: "USD",
    units: "per instance-hour, per GB-month stored, per GB out",
    source: "https://aws.amazon.com/timestream/pricing/",
    lastVerified: "2026-10-01",
    instanceUsdPerHour: 0.528,
    instances: 2,
    storageUsdPerGbMonth: 0.023,
    egressUsdPerGb: 0.09,
  },

  timescale: {
    vendor: "Tiger Data",
    product: "Tiger Cloud Performance (TimescaleDB), primary and HA replica",
    currency: "USD",
    units: "per service-month, per GB-month stored, per GB out",
    source: "https://www.tigerdata.com/pricing",
    lastVerified: "2026-10-01",
    // Only the entry price is public: $30 a month for 0.5 CPU. A 4 CPU
    // service is priced at 8 times that.
    serviceUsdPerMonth: 240,
    instances: 2,
    primaryStorageDays: 7,
    storageUsdPerGbMonth: 0.177,
    tieredUsdPerGbMonth: 0.021,
    egressUsdPerGb: 0.09,
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
    egressPerTb: perTb(aws.egressUsdPerGb),
    serverPerMonth: aws.server.usdPerHour * pricingConfig.hoursPerMonth * rate,
    hot: {
      label: "S3 Standard",
      storagePerTbMonth: perTb(aws.standard.storageUsdPerGbMonth),
      getPer1000: aws.standard.getUsdPer1000 * rate,
      retrievalPerTb: 0,
      minBillableObjectKb: 0,
      minResidenceDays: 0,
      transitionPer1000: 0,
    },
    cold: {
      label: "S3 Standard-IA",
      storagePerTbMonth: perTb(aws.standardIa.storageUsdPerGbMonth),
      getPer1000: aws.standardIa.getUsdPer1000 * rate,
      retrievalPerTb: perTb(aws.standardIa.retrievalUsdPerGb),
      minBillableObjectKb: aws.standardIa.minBillableObjectKb,
      minResidenceDays: aws.standardIa.minStorageDays,
      transitionPer1000: aws.standardIa.transitionUsdPer1000 * rate,
    },
    archive: {
      label: "S3 Glacier Instant Retrieval",
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
    egressPerTb: perTb(az.egressUsdPerGb),
    serverPerMonth: az.server.usdPerHour * pricingConfig.hoursPerMonth * rate,
    hot: {
      label: "Azure Hot",
      storagePerTbMonth: perTb(az.hot.storageUsdPerGbMonth),
      getPer1000: az.hot.getUsdPer1000 * rate,
      retrievalPerTb: 0,
      minBillableObjectKb: 0,
      minResidenceDays: 0,
      transitionPer1000: 0,
    },
    cold: {
      label: "Azure Cool",
      storagePerTbMonth: perTb(az.cool.storageUsdPerGbMonth),
      getPer1000: az.cool.getUsdPer1000 * rate,
      retrievalPerTb: perTb(az.cool.retrievalUsdPerGb),
      minBillableObjectKb: 0,
      minResidenceDays: az.cool.minStorageDays,
      transitionPer1000: az.cool.transitionUsdPer1000 * rate,
    },
    archive: {
      label: "Azure Cold",
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

// On-prem servers are priced like the AWS instance; there is no data out fee.
export function minioPricing(
  storagePerTbMonth: number,
  rate: number,
): BackendPricing {
  return {
    name: "MinIO",
    putPer1000: 0,
    egressPerTb: 0,
    serverPerMonth:
      pricingConfig.aws.server.usdPerHour * pricingConfig.hoursPerMonth * rate,
    hot: {
      label: "on-prem storage",
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
  return minioPricing(minioPerTbMonth, usdRate(currency));
}

export const licenseTiers = (perTbMonth: number): LicenseTier[] => [
  { upToTb: Infinity, perTbYear: perTbMonth * 12 },
];

export const REDUCT_BLOCK = {
  sizeKb: 64_000,
  maxRecords: 1_024,
  backendOpsPerBlock: 2,
};
