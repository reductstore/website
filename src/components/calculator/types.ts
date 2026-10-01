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

// Hot: the share of recorded data kept in standard storage, and for how many
// days. Cold: the share of recorded data kept longer in a cheaper class, for
// how many days after the hot window.
export type Retention = {
  hotPercent: number;
  hotDays: number;
  coldPercent: number;
  coldDays: number;
};

export type BackendId = "aws" | "azure" | "minio";

export type StorageTier = {
  label: string;
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

export type WorkloadPreset = {
  id: string;
  name: string;
  unitLabel: string;
  units: number;
  recordingHoursPerDay: number;
  retention: Retention;
  streams: StreamInput[];
};

export type CompetitorId = "foxglove" | "influx";

export type CompetitorAssumptions = {
  foxgloveDeveloperSeats: number;
  foxgloveQueryHoursPerMonth: number;
  influxQueriesPerMonth: number;
  influxStorageToRawRatio: number;
};
