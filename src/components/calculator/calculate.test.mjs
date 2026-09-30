import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ageBands,
  compare,
  estimate,
  licenseEurYear,
  marginalCost,
  packFactor,
} from "./calculate.ts";
import {
  AWS_S3,
  LICENSE_MIN_TB,
  LICENSE_TIERS,
  OBJECT_STORAGE_BATCH,
  REDUCT_BLOCK,
  backendPricing,
  pricingConfig,
} from "./pricing.ts";
import { PRESETS } from "./presets.ts";

// The reference tests from the calculator specification use this tiered
// license; the published Pro price is tested separately.
const SPEC_LICENSE_TIERS = [
  { upToTb: 100, eurPerTbYear: 150 },
  { upToTb: 1000, eurPerTbYear: 100 },
  { upToTb: Infinity, eurPerTbYear: 50 },
];

// The AWS numbers of the calculator specification, used as-is so the
// reference results do not depend on the exchange rate.
const SPEC_AWS = {
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

const config = (pricing = SPEC_AWS) => ({
  pricing,
  licenseTiers: SPEC_LICENSE_TIERS,
  block: REDUCT_BLOCK,
});

const published = (pricing = AWS_S3) => ({
  pricing,
  licenseTiers: LICENSE_TIERS,
  licenseMinTb: LICENSE_MIN_TB,
  block: REDUCT_BLOCK,
});

const stream = (
  name,
  count,
  frequencyHz,
  recordSizeKb,
  enabled = true,
  dataClass = "blob",
) => ({
  id: name,
  name,
  enabled,
  dataClass,
  count,
  frequencyHz,
  recordSizeKb,
});

const storage = (overrides = {}) => ({
  backend: "aws",
  edgeDiskTbPerUnit: 2,
  hotDays: 30,
  retentionDays: 365,
  readPercentPerMonth: 5,
  ...overrides,
});

const close = (actual, expected, tolerance = 0.01) =>
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${expected}, got ${actual}`,
  );

test("pack factor follows the block size and record limits", () => {
  const cases = [
    [1, 1024],
    [2, 1024],
    [64, 1000],
    [100, 640],
    [1000, 64],
    [2000, 32],
    [5000, 12],
    [100_000, 1],
  ];
  for (const [sizeKb, expected] of cases) {
    assert.equal(packFactor(sizeKb, REDUCT_BLOCK), expected);
  }
});

test("license tiers", () => {
  close(licenseEurYear(50, SPEC_LICENSE_TIERS), 7_500);
  close(licenseEurYear(500, SPEC_LICENSE_TIERS), 55_000);
  close(licenseEurYear(1_500, SPEC_LICENSE_TIERS), 130_000);
  assert.equal(licenseEurYear(0, SPEC_LICENSE_TIERS), 0);
});

test("published Pro price: €0.015 per GB per month, 1 TB minimum", () => {
  close(licenseEurYear(100, LICENSE_TIERS), 18_000);
  const tiny = estimate(
    { units: 1, recordingHoursPerDay: 1, streams: [stream("s", 1, 1, 1)] },
    storage(),
    published(),
  );
  close(tiny.reduct.licenseEurYear, 180);
});

test("age bands", () => {
  assert.deepEqual(ageBands(30, 365), { hot: 30, cold: 90, archive: 245 });
  assert.deepEqual(ageBands(30, 90), { hot: 30, cold: 60, archive: 0 });
  assert.deepEqual(ageBands(60, 30), { hot: 30, cold: 0, archive: 0 });
});

test("A: default mobile robot preset", () => {
  const result = estimate(
    {
      units: 5,
      recordingHoursPerDay: 8,
      streams: [
        stream("cameras", 2, 10, 150),
        stream("lidar", 1, 10, 1000),
        stream("telemetry", 1, 100, 2),
        stream("imu", 1, 100, 1),
        stream("logs", 1, 10, 5),
      ],
    },
    storage(),
    config(),
  );
  close(result.workload.totalDataMonthTb, 57.672, 1e-9);
  assert.equal(result.workload.totalRecordsMonth, 1_036_800_000);
  close(result.workload.totalRetainedTb, 701.676, 1e-9);
  close(result.reduct.licenseEurYear, 75_167.6);
  close(result.direct.totalEurYear, 180_237.74);
  close(result.reduct.totalEurYear - result.reduct.licenseEurYear, 75_654.77);
  close(result.reduct.totalEurYear, 150_822.37);
  close(result.savingEurYear, 29_415.37);
  close(result.savingPercent, 16.32);
});

test("B: small records stay in the hot tier for direct S3", () => {
  const result = estimate(
    {
      units: 1,
      recordingHoursPerDay: 24,
      streams: [stream("records", 1, 100, 64)],
    },
    storage({ retentionDays: 90 }),
    config(),
  );
  close(result.workload.totalDataMonthTb, 16.5888, 1e-9);
  close(result.workload.totalRetainedTb, 49.7664, 1e-9);
  close(result.direct.totalEurYear, 29_474.15);
  assert.ok(result.savingEurYear > 0);
});

test("C: large records can make ReductStore more expensive", () => {
  const result = estimate(
    {
      units: 1,
      recordingHoursPerDay: 24,
      streams: [stream("records", 1, 10, 1000)],
    },
    storage(),
    config(),
  );
  close(result.workload.totalDataMonthTb, 25.92, 1e-9);
  close(result.workload.totalRetainedTb, 315.36, 1e-9);
  close(result.direct.totalEurYear, 45_464.72);
  close(result.reduct.totalEurYear, 70_172.9);
  close(result.savingEurYear, -24_708.19);
});

test("streams are costed separately, not with an average record size", () => {
  const mixed = estimate(
    {
      units: 1,
      recordingHoursPerDay: 24,
      streams: [stream("small", 1, 100, 1), stream("large", 1, 1, 2000)],
    },
    storage(),
    config(),
  );
  const small = estimate(
    { units: 1, recordingHoursPerDay: 24, streams: [stream("s", 1, 100, 1)] },
    storage(),
    config(),
  );
  const large = estimate(
    { units: 1, recordingHoursPerDay: 24, streams: [stream("l", 1, 1, 2000)] },
    storage(),
    config(),
  );
  close(
    mixed.direct.totalEurYear,
    small.direct.totalEurYear + large.direct.totalEurYear,
  );
});

test("no NaN or Infinity when every stream is disabled", () => {
  const result = estimate(
    {
      units: 3,
      recordingHoursPerDay: 8,
      streams: [stream("off", 1, 10, 100, false)],
    },
    storage(),
    config(),
  );
  for (const value of [
    result.direct.totalEurYear,
    result.reduct.totalEurYear,
    result.savingEurYear,
    result.savingPercent,
    result.ingestReduction,
  ]) {
    assert.ok(Number.isFinite(value));
    assert.equal(value, 0);
  }
});

test("MinIO costs retained TB times the infrastructure price", () => {
  const result = estimate(
    { units: 1, recordingHoursPerDay: 24, streams: [stream("s", 1, 100, 2)] },
    storage({ backend: "minio" }),
    config(backendPricing("minio", 10)),
  );
  const retained = result.workload.totalRetainedTb;
  close(result.reduct.storageEurYear, retained * 10 * 12, 1e-9);
  close(result.direct.storageEurYear, retained * 10 * 12, 1e-9);
  assert.equal(result.reduct.operationsEurYear, 0);
});

test("compression shrinks stored data on both sides but not Tiger's database", () => {
  const plain = compare(mixed, storage(), comparison("tiger"));
  const packed = compare(
    mixed,
    storage({ compressionRatio: 2 }),
    comparison("tiger"),
  );
  const part = (result, side, label) =>
    result[side].components.find((c) => c.label === label).eurYear;
  const half = (a, b) => close(a / b, 0.5, 0.01);
  half(
    part(packed, "reduct", "AWS S3 storage"),
    part(plain, "reduct", "AWS S3 storage"),
  );
  close(
    part(packed, "reduct", "ReductStore license"),
    part(plain, "reduct", "ReductStore license") / 2,
    1e-6,
  );
  half(
    part(packed, "alternative", "AWS S3 storage"),
    part(plain, "alternative", "AWS S3 storage"),
  );
  assert.equal(
    part(packed, "alternative", "Hot database storage"),
    part(plain, "alternative", "Hot database storage"),
  );
});

test("every preset produces finite results on every backend", () => {
  for (const preset of PRESETS) {
    for (const backend of ["aws", "azure", "minio"]) {
      const result = estimate(
        preset,
        storage({ backend }),
        config(backendPricing(backend, 10)),
      );
      assert.ok(Number.isFinite(result.direct.totalEurYear), preset.id);
      assert.ok(Number.isFinite(result.reduct.totalEurYear), preset.id);
      assert.ok(result.workload.totalDataMonthTb > 0, preset.id);
    }
  }
});

const assumptions = {
  foxgloveDeveloperSeats: 3,
  foxgloveQueryHoursPerMonth: 20,
  tigerCompressionRatio: 5,
  influxQueriesPerMonth: 10_000,
  influxStorageToRawRatio: 1,
  atlasTier: "M30",
};

const comparison = (competitor, overrides = {}) => ({
  ...published(AWS_S3),
  backendName: "AWS S3",
  batch: OBJECT_STORAGE_BATCH,
  prices: pricingConfig,
  competitor,
  assumptions: { ...assumptions, ...overrides },
});

const mixed = {
  units: 5,
  recordingHoursPerDay: 8,
  streams: [
    stream("Cameras", 2, 10, 150, true, "blob"),
    stream("Telemetry", 1, 100, 2, true, "metric"),
    stream("Events", 1, 1, 2, true, "metadata"),
    stream("Logs", 1, 10, 5, true, "log"),
  ],
};

test("marginal cost applies each tier to its own range", () => {
  const tiers = [
    { upTo: 10, rate: 50 },
    { upTo: 100, rate: 40 },
    { upTo: null, rate: 30 },
  ];
  assert.equal(marginalCost(0.5, 1, tiers), 0);
  assert.equal(marginalCost(10, 1, tiers), 450);
  assert.equal(marginalCost(110, 1, tiers), 450 + 3_600 + 300);
});

test("Foxglove Pro reference: 701.7 TB stored, 57.7 TB indexed, 35.085 TB out", () => {
  const f = pricingConfig.foxglove;
  const storage = marginalCost(
    701.7,
    f.storageIncludedTb,
    f.storageUsdPerTbMonth,
  );
  const indexing = marginalCost(57.7, f.indexingIncludedTb, f.indexingUsdPerTb);
  const bandwidth = marginalCost(
    35.085,
    f.bandwidthIncludedTb,
    f.bandwidthUsdPerTb,
  );
  const query = marginalCost(20, f.queryIncludedHours, f.queryUsdPerHour);
  close(storage, 22_101, 1e-6);
  close(indexing, 1_650.6, 1e-6);
  close(bandwidth, 4_871.475, 1e-6);
  close(query, 60.35, 1e-6);
  const monthly = f.baseUsdPerMonth + storage + indexing + bandwidth + query;
  close(monthly, 28_703.425, 1e-6);
  close(monthly * 12 * pricingConfig.fx.usdToEur, 303_420, 1);
});

test("Foxglove receives every stream and charges extra devices", () => {
  const result = compare(mixed, storage(), comparison("foxglove"));
  assert.deepEqual(result.alternative.routes, [
    {
      target: "Foxglove",
      streams: ["Cameras", "Telemetry", "Events", "Logs"],
    },
  ]);
  assert.equal(result.alternative.lowerBound, false);
  const platform = (r) =>
    r.alternative.components.find((c) => c.label === "Platform").eurYear;
  close(platform(result), 20 * 12 * pricingConfig.fx.usdToEur);
  const more = compare(
    { ...mixed, units: 8 },
    storage(),
    comparison("foxglove"),
  );
  close(platform(more), (20 + 3 * 20) * 12 * pricingConfig.fx.usdToEur);
});

test("Tiger Cloud stores metrics and metadata, blobs and logs go to object storage", () => {
  const result = compare(mixed, storage(), comparison("tiger"));
  assert.deepEqual(result.alternative.routes, [
    { target: "Tiger Cloud", streams: ["Telemetry", "Events"] },
    { target: "AWS S3", streams: ["Cameras", "Logs"] },
  ]);
  assert.equal(result.alternative.lowerBound, true);
});

test("InfluxDB stores only metric streams", () => {
  const result = compare(mixed, storage(), comparison("influx"));
  assert.deepEqual(result.alternative.routes, [
    { target: "InfluxDB Cloud", streams: ["Telemetry"] },
    { target: "AWS S3", streams: ["Cameras", "Events", "Logs"] },
  ]);
});

test("MongoDB Atlas is a lower bound once data outgrows the tier's storage", () => {
  const small = compare(
    { ...mixed, units: 1, recordingHoursPerDay: 1 },
    storage({ retentionDays: 30 }),
    comparison("mongodb"),
  );
  assert.equal(small.alternative.lowerBound, false);
  const large = compare(mixed, storage(), comparison("mongodb"));
  assert.equal(large.alternative.lowerBound, true);
  assert.deepEqual(large.alternative.routes[1], {
    target: "AWS S3",
    streams: ["Cameras", "Logs"],
  });
});

test("direct object storage batches records like a well built pipeline", () => {
  const result = compare(mixed, storage(), comparison("direct"));
  const reductInfra =
    result.reduct.totalEurYear -
    result.reduct.components.find((c) => c.label === "ReductStore license")
      .eurYear;
  assert.ok(result.alternative.totalEurYear <= reductInfra);
  assert.ok(result.alternative.totalEurYear > 0.9 * reductInfra);
});

test("presets recommend an application-aware comparison", () => {
  const byId = Object.fromEntries(PRESETS.map((p) => [p.id, p.recommended]));
  assert.equal(byId["mobile-robot"], "foxglove");
  assert.equal(byId["autonomous-vehicle"], "foxglove");
  assert.equal(byId["industrial-robot"], "tiger");
  assert.equal(byId.vibration, "tiger");
  assert.equal(byId.plc, "tiger");
  assert.equal(byId["computer-vision"], "mongodb");
  assert.equal(byId["machine-vision-qa"], "mongodb");
  assert.equal(byId.custom, "direct");
  for (const preset of PRESETS) {
    assert.equal(preset.competitors[0], preset.recommended, preset.id);
  }
});

test("the default mobile robot example lands near 30% below Foxglove", () => {
  const preset = PRESETS.find((p) => p.id === "mobile-robot");
  const result = compare(
    preset,
    storage({
      hotDays: preset.hotDays,
      retentionDays: preset.retentionDays,
    }),
    comparison("foxglove"),
  );
  assert.ok(
    result.savingPercent > 25 && result.savingPercent < 35,
    `${result.savingPercent}`,
  );
});
