import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ageBands,
  compare,
  estimate,
  licenseCostYear,
  marginalCost,
  packFactor,
} from "./calculate.ts";
import {
  OBJECT_STORAGE_BATCH,
  REDUCT_BLOCK,
  backendPricing,
  licenseTiers,
  pricingConfig,
  usdRate,
} from "./pricing.ts";
import { REDUCTSTORE_MIN_TB, REDUCTSTORE_PRICING } from "../../lib/currency.ts";
import { PRESETS } from "./presets.ts";

// The reference tests from the calculator specification use this tiered
// license; the published Pro price is tested separately.
const SPEC_LICENSE_TIERS = [
  { upToTb: 100, perTbYear: 150 },
  { upToTb: 1000, perTbYear: 100 },
  { upToTb: Infinity, perTbYear: 50 },
];

// The AWS numbers of the calculator specification, used as-is so the
// reference results do not depend on the exchange rate.
const SPEC_AWS = {
  name: "AWS S3",
  putPer1000: 0.005,
  hot: {
    storagePerTbMonth: 23,
    getPer1000: 0.0004,
    retrievalPerTb: 0,
    minBillableObjectKb: 0,
    minResidenceDays: 0,
    transitionPer1000: 0,
  },
  cold: {
    storagePerTbMonth: 12.5,
    getPer1000: 0.001,
    retrievalPerTb: 10,
    minBillableObjectKb: 128,
    minResidenceDays: 30,
    transitionPer1000: 0.01,
  },
  archive: {
    storagePerTbMonth: 4,
    getPer1000: 0.01,
    retrievalPerTb: 30,
    minBillableObjectKb: 128,
    minResidenceDays: 90,
    transitionPer1000: 0.02,
  },
};

const config = (pricing = SPEC_AWS) => ({
  pricing,
  licenseTiers: SPEC_LICENSE_TIERS,
  block: REDUCT_BLOCK,
});

const published = (currency = "EUR", backend = "aws") => ({
  pricing: backendPricing(backend, currency, 10),
  licenseTiers: licenseTiers(REDUCTSTORE_PRICING[currency].perTbMonth),
  licenseMinTb: REDUCTSTORE_MIN_TB,
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
  close(licenseCostYear(50, SPEC_LICENSE_TIERS), 7_500);
  close(licenseCostYear(500, SPEC_LICENSE_TIERS), 55_000);
  close(licenseCostYear(1_500, SPEC_LICENSE_TIERS), 130_000);
  assert.equal(licenseCostYear(0, SPEC_LICENSE_TIERS), 0);
});

test("published Pro prices: €15 and $18 per TB per month, 1 TB minimum", () => {
  close(licenseCostYear(100, published("EUR").licenseTiers), 18_000);
  close(licenseCostYear(100, published("USD").licenseTiers), 21_600);
  for (const [currency, minimum] of [
    ["EUR", 180],
    ["USD", 216],
  ]) {
    const tiny = estimate(
      { units: 1, recordingHoursPerDay: 1, streams: [stream("s", 1, 1, 1)] },
      storage(),
      published(currency),
    );
    close(tiny.reduct.licenseYear, minimum);
  }
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
  close(result.reduct.licenseYear, 75_167.6);
  close(result.direct.totalYear, 180_237.74);
  close(result.reduct.totalYear - result.reduct.licenseYear, 75_654.77);
  close(result.reduct.totalYear, 150_822.37);
  close(result.savingYear, 29_415.37);
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
  close(result.direct.totalYear, 29_474.15);
  assert.ok(result.savingYear > 0);
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
  close(result.direct.totalYear, 45_464.72);
  close(result.reduct.totalYear, 70_172.9);
  close(result.savingYear, -24_708.19);
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
    mixed.direct.totalYear,
    small.direct.totalYear + large.direct.totalYear,
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
    result.direct.totalYear,
    result.reduct.totalYear,
    result.savingYear,
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
    config(backendPricing("minio", "EUR", 10)),
  );
  const retained = result.workload.totalRetainedTb;
  close(result.reduct.storageYear, retained * 10 * 12, 1e-9);
  close(result.direct.storageYear, retained * 10 * 12, 1e-9);
  assert.equal(result.reduct.operationsYear, 0);
});

test("compression shrinks stored data on both sides but not InfluxDB's metrics", () => {
  const plain = compare(mixed, storage(), comparison("influx"));
  const packed = compare(
    mixed,
    storage({ compressionRatio: 2 }),
    comparison("influx"),
  );
  const part = (result, side, label) =>
    result[side].components.find((c) => c.label === label).amountYear;
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
    part(packed, "alternative", "Storage"),
    part(plain, "alternative", "Storage"),
  );
});

test("every preset produces finite results on every backend", () => {
  for (const preset of PRESETS) {
    for (const backend of ["aws", "azure", "minio"]) {
      const result = estimate(
        preset,
        storage({ backend }),
        config(backendPricing(backend, "EUR", 10)),
      );
      assert.ok(Number.isFinite(result.direct.totalYear), preset.id);
      assert.ok(Number.isFinite(result.reduct.totalYear), preset.id);
      assert.ok(result.workload.totalDataMonthTb > 0, preset.id);
    }
  }
});

const assumptions = {
  foxgloveDeveloperSeats: 3,
  foxgloveQueryHoursPerMonth: 20,
  influxQueriesPerMonth: 10_000,
  influxStorageToRawRatio: 1,
};

const comparison = (competitor, overrides = {}, currency = "EUR") => ({
  ...published(currency),
  backendName: "AWS S3",
  batch: OBJECT_STORAGE_BATCH,
  prices: pricingConfig,
  usdRate: usdRate(currency),
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
  const platform = (r) =>
    r.alternative.components.find((c) => c.label === "Platform").amountYear;
  close(platform(result), 20 * 12 * pricingConfig.fx.usdToEur);
  const more = compare(
    { ...mixed, units: 8 },
    storage(),
    comparison("foxglove"),
  );
  close(platform(more), (20 + 3 * 20) * 12 * pricingConfig.fx.usdToEur);
});

test("InfluxDB stores only metric streams", () => {
  const result = compare(mixed, storage(), comparison("influx"));
  assert.deepEqual(result.alternative.routes, [
    { target: "InfluxDB Cloud", streams: ["Telemetry"] },
    { target: "AWS S3", streams: ["Cameras", "Events", "Logs"] },
  ]);
});

test("cloud and competitor prices stay in USD for a USD display", () => {
  const eur = compare(mixed, storage(), comparison("influx", {}, "EUR"));
  const usd = compare(mixed, storage(), comparison("influx", {}, "USD"));
  for (const component of usd.alternative.components) {
    const inEur = eur.alternative.components.find(
      (c) => c.label === component.label,
    );
    close(
      inEur.amountYear,
      component.amountYear * pricingConfig.fx.usdToEur,
      1e-6,
    );
  }
});

// Results of the four examples on AWS S3 with their defaults. A change here
// is a change of the published numbers, so review it rather than update it.
const regressions = [
  ["mobile-robot", "foxglove", 43.63, 42.0],
  ["mobile-robot", "influx", 50.26, 48.83],
  ["autonomous-vehicle", "foxglove", 38.92, 37.15],
  ["autonomous-vehicle", "influx", -5.66, -8.72],
  ["drone", "foxglove", 42.35, 40.59],
  ["drone", "influx", 29.54, 27.39],
  ["industrial-robot", "foxglove", 38.7, 37.02],
  ["industrial-robot", "influx", 96.3, 96.2],
  ["vibration", "foxglove", 41.75, 39.98],
  ["vibration", "influx", 80.3, 79.7],
  ["plc", "foxglove", 42.66, 41.12],
  ["plc", "influx", 98.01, 97.96],
  ["computer-vision", "foxglove", 40.05, 38.27],
  ["computer-vision", "influx", -109.71, -115.95],
  ["custom", "foxglove", 43.44, 41.76],
  ["custom", "influx", -109.61, -115.85],
];

const runPreset = (preset, competitor, currency) =>
  compare(
    preset,
    storage({ hotDays: preset.hotDays, retentionDays: preset.retentionDays }),
    comparison(competitor, {}, currency),
  );

for (const [presetId, competitor, eurPercent, usdPercent] of regressions) {
  test(`${presetId} + AWS S3 vs ${competitor} in EUR and USD`, () => {
    const preset = PRESETS.find((p) => p.id === presetId);
    close(runPreset(preset, competitor, "EUR").savingPercent, eurPercent);
    close(runPreset(preset, competitor, "USD").savingPercent, usdPercent);
  });
}

test("every example keeps 70 to 160 TB and is 35 to 45% cheaper than Foxglove", () => {
  assert.deepEqual(
    PRESETS.map((p) => p.id),
    [
      "mobile-robot",
      "autonomous-vehicle",
      "drone",
      "industrial-robot",
      "vibration",
      "plc",
      "computer-vision",
      "custom",
    ],
  );
  for (const preset of PRESETS) {
    for (const currency of ["EUR", "USD"]) {
      const result = runPreset(preset, "foxglove", currency);
      const tag = `${preset.id} ${currency}`;
      const retained = result.estimate.workload.totalRetainedTb;
      assert.ok(retained >= 70 && retained <= 160, `${tag} ${retained} TB`);
      const percent = result.savingPercent;
      assert.ok(percent >= 35 && percent <= 45, `${tag} ${percent}%`);
    }
  }
});

test("data kept scales what is stored, not what is generated", () => {
  const all = estimate({ ...mixed, keepPercent: 100 }, storage(), config());
  const kept = estimate({ ...mixed, keepPercent: 25 }, storage(), config());
  close(kept.workload.generatedMonthTb, all.workload.generatedMonthTb, 1e-9);
  close(
    kept.workload.totalDataMonthTb,
    all.workload.totalDataMonthTb / 4,
    1e-9,
  );
  close(kept.workload.totalRecordsMonth, all.workload.totalRecordsMonth / 4, 1);
  close(kept.workload.totalRetainedTb, all.workload.totalRetainedTb / 4, 1e-9);
  assert.equal(
    estimate(mixed, storage(), config()).workload.totalDataMonthTb,
    all.workload.totalDataMonthTb,
  );
});

// The default example worked by hand from the published price lists, without
// the calculator's code: 10 robots, 8 h a day, 90 days on AWS S3.
test("cross-check: mobile robot vs Foxglove by hand", () => {
  const kbPerSecond = 2 * 10 * 150 + 10 * 1000 + 100 * 2 + 100 * 1 + 10 * 5;
  const monthTb = (kbPerSecond * 10 * 8 * 3600 * 30) / 1e9;
  const retainedTb = monthTb * 3;
  close(monthTb, 115.344, 1e-9);

  // Foxglove Pro, USD per month: first TB of storage and indexing and
  // 0.1 TB of bandwidth included, then marginal tiers.
  const storage = 9 * 50 + 90 * 40 + (retainedTb - 100) * 30;
  const indexing = 9 * 35 + 90 * 28 + (monthTb - 100) * 24;
  const readTb = retainedTb * 0.05;
  const bandwidth = 9.9 * 150 + (readTb - 10) * 135;
  const query = 9 * 3.65 + 10 * 2.75;
  const devices = (10 - 5) * 20;
  const foxgloveUsd =
    12 * (20 + devices + storage + indexing + bandwidth + query);

  // ReductStore + S3, USD per month: 30 days in S3 Standard, then 60 days
  // in Standard-IA, plus the license at $18 per TB.
  const s3StorageUsd = 12 * (monthTb * 23 + monthTb * 2 * 12.5);
  const licenseUsd = 12 * retainedTb * 18;

  const result = runPreset(
    { ...PRESETS[0], keepPercent: 100 },
    "foxglove",
    "USD",
  );
  close(result.alternative.totalYear, foxgloveUsd, 1);
  const part = (label) =>
    result.reduct.components.find((c) => c.label === label).amountYear;
  close(part("AWS S3 storage"), s3StorageUsd, 1);
  close(part("ReductStore license"), licenseUsd, 1e-6);
  // Requests, transitions, and IA retrieval are the rest, about 1% of the bill.
  assert.ok(part("Requests and retrieval") < 0.02 * result.reduct.totalYear);
});
