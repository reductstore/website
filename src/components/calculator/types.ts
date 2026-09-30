export type DataClass = "blob" | "metric" | "metadata" | "log";

export type StreamInput = {
  id: string;
  name: string;
  enabled: boolean;
  dataClass: DataClass;
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
  compressionRatio?: number;
  minioPerTbMonth?: number;
};

export type StorageTier = {
  storagePerTbMonth: number;
  getPer1000: number;
  retrievalPerTb: number;
  minBillableObjectKb: number;
  minResidenceDays: number;
  transitionPer1000: number;
};

export type BackendPricing = {
  name: string;
  putPer1000: number;
  hot: StorageTier;
  cold?: StorageTier;
  archive?: StorageTier;
};

export type LicenseTier = {
  upToTb: number;
  perTbYear: number;
};

export type CostBreakdown = {
  storageYear: number;
  operationsYear: number;
  retrievalYear: number;
  licenseYear: number;
  totalYear: number;
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

export type CompetitorId = "foxglove" | "influx";

export type CompetitorAssumptions = {
  foxgloveDeveloperSeats: number;
  foxgloveQueryHoursPerMonth: number;
  influxQueriesPerMonth: number;
  influxStorageToRawRatio: number;
};
