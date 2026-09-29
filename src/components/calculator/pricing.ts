import type { BackendId, BackendPricing, LicenseTier } from "./types";

// Temporary calculator assumptions copied from the "S3 + ReductStore calculator"
// spreadsheet. They are USD list prices shown as EUR. Replace them with a
// maintained EUR table for the target AWS region before launch.
export const AWS_S3: BackendPricing = {
  name: "AWS S3",
  putEurPer1000: 0.005,
  hot: {
    storageEurPerTbMonth: 23,
    getEurPer1000: 0.0004,
    retrievalEurPerTb: 0,
    minBillableObjectKb: 0,
    minResidenceDays: 0,
    transitionEurPer1000: 0,
  },
  cold: {
    storageEurPerTbMonth: 12.5,
    getEurPer1000: 0.001,
    retrievalEurPerTb: 10,
    minBillableObjectKb: 128,
    minResidenceDays: 30,
    transitionEurPer1000: 0.01,
  },
  archive: {
    storageEurPerTbMonth: 4,
    getEurPer1000: 0.01,
    retrievalEurPerTb: 30,
    minBillableObjectKb: 128,
    minResidenceDays: 90,
    transitionEurPer1000: 0.02,
  },
};

// Development placeholders for Azure Blob (LRS, hot / cool / cold tiers).
// Choose the region and redundancy and replace them with current EUR prices
// before launch.
export const AZURE_BLOB: BackendPricing = {
  name: "Azure Blob",
  putEurPer1000: 0.005,
  hot: {
    storageEurPerTbMonth: 18,
    getEurPer1000: 0.0004,
    retrievalEurPerTb: 0,
    minBillableObjectKb: 0,
    minResidenceDays: 0,
    transitionEurPer1000: 0,
  },
  cold: {
    storageEurPerTbMonth: 10,
    getEurPer1000: 0.001,
    retrievalEurPerTb: 10,
    minBillableObjectKb: 0,
    minResidenceDays: 30,
    transitionEurPer1000: 0.01,
  },
  archive: {
    storageEurPerTbMonth: 3.6,
    getEurPer1000: 0.01,
    retrievalEurPerTb: 30,
    minBillableObjectKb: 0,
    minResidenceDays: 90,
    transitionEurPer1000: 0.018,
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

// Internal commercial assumption; the public pricing page does not publish
// these tiers yet.
export const LICENSE_TIERS: LicenseTier[] = [
  { upToTb: 100, eurPerTbYear: 150 },
  { upToTb: 1000, eurPerTbYear: 100 },
  { upToTb: Infinity, eurPerTbYear: 50 },
];

export const REDUCT_BLOCK = {
  sizeKb: 64_000,
  maxRecords: 1_024,
  backendOpsPerBlock: 2,
};
