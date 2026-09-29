export type StreamInput = {
  id: string;
  name: string;
  enabled: boolean;
  count: number;
  frequencyHz: number;
  recordSizeKb: number;
};

export type WorkloadInput = {
  units: number;
  recordingHoursPerDay: number;
  streams: StreamInput[];
};

export type BackendId = "aws" | "azure" | "minio";

export type StorageInput = {
  backend: BackendId;
  edgeDiskTbPerUnit: number;
  hotDays: number;
  retentionDays: number;
  readPercentPerMonth: number;
  minioEurPerTbMonth?: number;
};

export type ErasureCoding = {
  dataShards: number;
  parityShards: number;
  diskBlockKb: number;
};

export type StorageTier = {
  storageEurPerTbMonth: number;
  erasure?: ErasureCoding;
  getEurPer1000: number;
  retrievalEurPerTb: number;
  minBillableObjectKb: number;
  minResidenceDays: number;
  transitionEurPer1000: number;
};

export type BackendPricing = {
  name: string;
  putEurPer1000: number;
  hot: StorageTier;
  cold?: StorageTier;
  archive?: StorageTier;
};

export type LicenseTier = {
  upToTb: number;
  eurPerTbYear: number;
};

export type CostBreakdown = {
  storageEurYear: number;
  operationsEurYear: number;
  retrievalEurYear: number;
  licenseEurYear: number;
  totalEurYear: number;
};

export type WorkloadPreset = {
  id: string;
  name: string;
  unitLabel: string;
  units: number;
  recordingHoursPerDay: number;
  hotDays: number;
  retentionDays: number;
  streams: StreamInput[];
};
