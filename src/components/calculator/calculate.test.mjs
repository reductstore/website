import { test } from "node:test";
import assert from "node:assert/strict";
import { ageBands, estimate, licenseEurYear, packFactor } from "./calculate.ts";
import {
  AWS_S3,
  LICENSE_TIERS,
  REDUCT_BLOCK,
  backendPricing,
} from "./pricing.ts";
import { PRESETS } from "./presets.ts";

const config = (pricing = AWS_S3) => ({
  pricing,
  licenseTiers: LICENSE_TIERS,
  block: REDUCT_BLOCK,
});

const stream = (name, count, frequencyHz, recordSizeKb, enabled = true) => ({
  id: name,
  name,
  enabled,
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
  close(licenseEurYear(50, LICENSE_TIERS), 7_500);
  close(licenseEurYear(500, LICENSE_TIERS), 55_000);
  close(licenseEurYear(1_500, LICENSE_TIERS), 130_000);
  assert.equal(licenseEurYear(0, LICENSE_TIERS), 0);
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

test("MinIO has no request cost, so the license can make ReductStore more expensive", () => {
  const result = estimate(
    PRESETS.find((preset) => preset.id === "mobile-robot"),
    storage({ backend: "minio" }),
    config(backendPricing("minio", 10)),
  );
  assert.equal(result.direct.operationsEurYear, 0);
  close(result.direct.storageEurYear, result.reduct.storageEurYear);
  assert.ok(result.savingEurYear < 0);
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
