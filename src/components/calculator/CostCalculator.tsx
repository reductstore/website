import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  LuBot,
  LuCamera,
  LuCar,
  LuCpu,
  LuFactory,
  LuActivity,
  LuPlane,
  LuRoute,
  LuSlidersHorizontal,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { estimate } from "./calculate";
import {
  LICENSE_TIERS,
  LICENSE_MIN_TB,
  REDUCT_BLOCK,
  DEFAULT_MINIO_EUR_PER_TB_MONTH,
  backendPricing,
} from "./pricing";
import { PRESETS } from "./presets";
import type { BackendId, StreamInput } from "./types";
import CostComparison from "./CostComparison";
import StreamEditor, { StreamDraft } from "./StreamEditor";
import NumberField from "./NumberField";
import {
  formatCount,
  formatReduction,
  formatDays,
  formatEur,
  formatPercent,
  formatTb,
} from "./format";
import { bucket, track } from "./analytics";
import styles from "./styles.module.css";

const PRESET_ICONS: Record<string, IconType> = {
  drone: LuPlane,
  "mobile-robot": LuRoute,
  "autonomous-vehicle": LuCar,
  "industrial-robot": LuFactory,
  "computer-vision": LuCamera,
  vibration: LuActivity,
  plc: LuCpu,
  ros: LuBot,
  custom: LuSlidersHorizontal,
};

const BACKENDS: { id: BackendId; label: string }[] = [
  { id: "aws", label: "AWS S3" },
  { id: "azure", label: "Azure Blob" },
  { id: "minio", label: "MinIO / on premises" },
];

const toDraft = (streams: StreamInput[]): StreamDraft[] =>
  streams.map((s) => ({
    ...s,
    count: String(s.count),
    frequencyHz: String(s.frequencyHz),
    recordSizeKb: String(s.recordSizeKb),
  }));

const num = (value: string) => (value.trim() === "" ? NaN : Number(value));

type Check = (value: number) => string | null;
const atLeast =
  (min: number, message: string): Check =>
  (value) =>
    Number.isFinite(value) && value >= min ? null : message;

function useDebouncedEffect(effect: () => void, deps: unknown[], ms: number) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return undefined;
    }
    const timer = setTimeout(effect, ms);
    return () => clearTimeout(timer);
  }, deps);
}

export default function CostCalculator(): JSX.Element {
  const [presetId, setPresetId] = useState("mobile-robot");
  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0];
  const [units, setUnits] = useState(String(preset.units));
  const [hours, setHours] = useState(String(preset.recordingHoursPerDay));
  const [streams, setStreams] = useState<StreamDraft[]>(
    toDraft(preset.streams),
  );
  const [backend, setBackend] = useState<BackendId>("aws");
  const [edgeDisk, setEdgeDisk] = useState("2");
  const [hotDays, setHotDays] = useState(String(preset.hotDays));
  const [retentionDays, setRetentionDays] = useState(
    String(preset.retentionDays),
  );
  const [readPercent, setReadPercent] = useState("5");
  const [minioCost, setMinioCost] = useState(
    String(DEFAULT_MINIO_EUR_PER_TB_MONTH),
  );

  const selectPreset = (id: string) => {
    const next = PRESETS.find((p) => p.id === id);
    if (!next) return;
    setPresetId(id);
    setUnits(String(next.units));
    setHours(String(next.recordingHoursPerDay));
    setStreams(toDraft(next.streams));
    setHotDays(String(next.hotDays));
    setRetentionDays(String(next.retentionDays));
    track("calculator_preset_selected", { preset: id });
  };

  const changeHotDays = (value: string) => {
    setHotDays(value);
    const hot = num(value);
    if (Number.isFinite(hot) && hot > num(retentionDays)) {
      setRetentionDays(value);
    }
  };

  const errors = {
    units: atLeast(1, "At least 1")(num(units)),
    hours:
      Number.isFinite(num(hours)) && num(hours) > 0 && num(hours) <= 24
        ? null
        : "Between 0 and 24",
    edgeDisk:
      Number.isFinite(num(edgeDisk)) && num(edgeDisk) > 0
        ? null
        : "Greater than 0",
    hotDays: atLeast(1, "At least 1 day")(num(hotDays)),
    retentionDays:
      Number.isFinite(num(retentionDays)) &&
      num(retentionDays) >= Math.max(1, num(hotDays) || 1)
        ? null
        : "Not less than hot storage days",
    readPercent:
      Number.isFinite(num(readPercent)) &&
      num(readPercent) >= 0 &&
      num(readPercent) <= 100
        ? null
        : "Between 0 and 100",
    minioCost: atLeast(0, "Cannot be negative")(num(minioCost)),
  };

  const safe = (value: string, fallback: number, min = 0, max = Infinity) => {
    const n = num(value);
    return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
  };

  const result = useMemo(() => {
    const workload = {
      units: safe(units, 1, 1),
      recordingHoursPerDay: safe(hours, 0, 0, 24),
      streams: streams.map((s) => ({
        ...s,
        count: safe(s.count, 0),
        frequencyHz: safe(s.frequencyHz, 0),
        recordSizeKb: safe(s.recordSizeKb, 0),
      })),
    };
    const hot = safe(hotDays, 30, 1);
    const storage = {
      backend,
      edgeDiskTbPerUnit: safe(edgeDisk, 0),
      hotDays: hot,
      retentionDays: Math.max(hot, safe(retentionDays, hot)),
      readPercentPerMonth: safe(readPercent, 0, 0, 100),
      minioEurPerTbMonth: safe(minioCost, 0),
    };
    return estimate(workload, storage, {
      pricing: backendPricing(backend, storage.minioEurPerTbMonth),
      licenseTiers: LICENSE_TIERS,
      licenseMinTb: LICENSE_MIN_TB,
      block: REDUCT_BLOCK,
    });
  }, [
    units,
    hours,
    streams,
    backend,
    edgeDisk,
    hotDays,
    retentionDays,
    readPercent,
    minioCost,
  ]);

  const hasData = result.workload.totalRecordsMonth > 0;
  const saving = result.savingEurYear;
  const backendName = BACKENDS.find((b) => b.id === backend)?.label ?? "";
  const retained = result.workload.totalRetainedTb;

  useEffect(() => {
    track("calculator_viewed");
  }, []);

  useDebouncedEffect(
    () => {
      if (!hasData) return;
      const props = {
        preset: presetId,
        backend,
        units_bucket: bucket(safe(units, 1, 1), [2, 5, 10, 50, 100, 1000]),
        monthly_tb_bucket: bucket(
          result.workload.totalDataMonthTb,
          [1, 10, 50, 100, 500, 1000],
        ),
        retained_tb_bucket: bucket(retained, [10, 100, 500, 1000, 5000]),
        saving_percent_bucket: bucket(
          result.savingPercent,
          [-50, -10, 0, 10, 25, 50],
        ),
      };
      track("calculator_input_changed", props);
      track(
        saving >= 0
          ? "calculator_result_positive"
          : "calculator_result_negative",
        props,
      );
    },
    [result],
    2000,
  );

  return (
    <div className={styles.calculator}>
      <div className={styles.inputs}>
        <section className={styles.step}>
          <h2 className={styles.stepTitle}>1. Choose a workload</h2>
          <div
            className={styles.presets}
            role="radiogroup"
            aria-label="Workload"
          >
            {PRESETS.map((p) => {
              const Icon = PRESET_ICONS[p.id];
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={p.id === presetId}
                  className={clsx(styles.preset, {
                    [styles.presetActive]: p.id === presetId,
                  })}
                  onClick={() => selectPreset(p.id)}
                >
                  {Icon && <Icon aria-hidden="true" />}
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.fields}>
            <NumberField
              label={preset.unitLabel}
              value={units}
              onChange={setUnits}
              min={1}
              step={1}
              error={errors.units}
            />
            <NumberField
              label="Recording hours per day"
              value={hours}
              onChange={setHours}
              min={0}
              max={24}
              step={1}
              suffix="h"
              error={errors.hours}
            />
          </div>

          <p className={styles.streamSummary}>
            {streams.filter((s) => s.enabled).length === 0
              ? "No data streams enabled."
              : streams
                  .filter((s) => s.enabled)
                  .map(
                    (s) =>
                      `${s.count} × ${s.name} (${s.frequencyHz} Hz, ${s.recordSizeKb} KB)`,
                  )
                  .join(" · ")}
          </p>

          <details
            className={styles.disclosure}
            onToggle={(event) => {
              if ((event.target as HTMLDetailsElement).open) {
                track("calculator_advanced_opened", { preset: presetId });
              }
            }}
          >
            <summary>Customize data streams</summary>
            <StreamEditor
              streams={streams}
              workload={result.workload}
              onChange={setStreams}
            />
          </details>
        </section>

        <section className={styles.step}>
          <h2 className={styles.stepTitle}>2. Choose backend and retention</h2>
          <div
            className={styles.segmented}
            role="radiogroup"
            aria-label="Storage backend"
          >
            {BACKENDS.map((b) => (
              <button
                key={b.id}
                type="button"
                role="radio"
                aria-checked={b.id === backend}
                className={clsx({ [styles.segmentActive]: b.id === backend })}
                onClick={() => {
                  setBackend(b.id);
                  track("calculator_backend_selected", { backend: b.id });
                }}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className={styles.fields}>
            {backend === "minio" && (
              <NumberField
                label="Raw disk cost"
                value={minioCost}
                onChange={setMinioCost}
                min={0}
                step={1}
                prefix="€"
                suffix="/ TB / month"
                error={errors.minioCost}
                wide
              />
            )}
            <NumberField
              label="Edge disk per unit"
              value={edgeDisk}
              onChange={setEdgeDisk}
              min={0}
              step={0.5}
              suffix="TB"
              error={errors.edgeDisk}
            />
            <NumberField
              label="Hot storage duration"
              value={hotDays}
              onChange={changeHotDays}
              min={1}
              step={1}
              suffix="days"
              error={errors.hotDays}
            />
            <NumberField
              label="Total retention"
              value={retentionDays}
              onChange={setRetentionDays}
              min={1}
              step={1}
              suffix="days"
              error={errors.retentionDays}
            />
            <NumberField
              label="Data read per month"
              value={readPercent}
              onChange={setReadPercent}
              min={0}
              max={100}
              step={1}
              suffix="% of retained"
              error={errors.readPercent}
            />
          </div>
        </section>

        <details className={clsx(styles.disclosure, styles.assumptions)}>
          <summary>Calculation assumptions</summary>
          <div className={styles.assumptionsBody}>
            <p>
              An estimate, not a quote. Both sides use the same workload,
              retention, and reads.
            </p>
            <ul>
              <li>
                Each stream is costed with its own record size. Months have 30
                days; 1 TB is 10<sup>9</sup> KB.
              </li>
              <li>
                Data moves from hot to cold (up to 90 days) to archive only when
                that is cheaper, respecting minimum storage durations and
                billable object sizes.
              </li>
              <li>
                ReductStore packs up to 1,024 records into 64 MB blocks, with
                two backend operations per block.
              </li>
              <li>
                License: ReductStore Pro at €0.015 per GB per month on retained
                data, 1 TB minimum.
              </li>
              <li>
                Cloud prices are list price estimates in EUR. MinIO stores each
                object as 8 + 4 erasure shards on 4 KB disk blocks; ReductStore
                uses a file system with the same protection.
              </li>
            </ul>
            <p>
              Excludes compute, egress, networking, support, VAT, extra backups,
              labor, and migration.
            </p>
          </div>
        </details>
      </div>

      <aside className={styles.result} aria-live="polite">
        {!hasData ? (
          <p className={styles.empty}>
            Enable at least one data stream with a frequency and record size to
            see an estimate.
          </p>
        ) : (
          <>
            <p
              className={clsx(styles.headline, {
                [styles.headlineHigher]: saving < 0,
              })}
            >
              {saving >= 0
                ? `Save ${formatEur(saving)} / year`
                : `${formatEur(-saving)} / year higher`}
            </p>
            <p className={styles.subline}>
              {saving >= 0
                ? `${formatPercent(result.savingPercent)} lower TCO`
                : "for this configuration"}
            </p>
            <p className={styles.compare}>
              {backend === "minio"
                ? "MinIO vs ReductStore on a file system, on the same disks, including the ReductStore license."
                : `Direct ${backendName} vs ReductStore + ${backendName}, including the ReductStore license.`}
            </p>

            <CostComparison
              directLabel={
                backend === "minio" ? "Direct MinIO" : `Direct ${backendName}`
              }
              reductLabel={
                backend === "minio"
                  ? "ReductStore on a file system"
                  : `ReductStore + ${backendName}`
              }
              direct={result.direct}
              reduct={result.reduct}
            />

            <dl className={styles.summary}>
              <div>
                <dt>Generated data</dt>
                <dd>{formatTb(result.workload.totalDataMonthTb)} / month</dd>
              </div>
              <div>
                <dt>Retained data</dt>
                <dd>{formatTb(retained)}</dd>
              </div>
              <div>
                <dt>Records</dt>
                <dd>
                  {formatCount(result.workload.totalRecordsMonth)} / month
                </dd>
              </div>
              <div>
                <dt>Backend ingest writes</dt>
                <dd>{formatReduction(result.ingestReduction)} fewer</dd>
              </div>
              <div>
                <dt>Local history (estimate)</dt>
                <dd>{formatDays(result.localHistoryDays)} on the edge disk</dd>
              </div>
            </dl>

            <div className={styles.cta}>
              <Link
                className="button button--primary button--lg"
                to="/architecture-review"
                onClick={() =>
                  track("calculator_cta_clicked", {
                    preset: presetId,
                    backend,
                  })
                }
              >
                Book an architecture review
              </Link>
              <Link to="/docs/how-does-it-work">
                See how ReductStore stores data →
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
