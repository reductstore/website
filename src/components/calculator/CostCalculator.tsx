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
  LuScanSearch,
  LuSlidersHorizontal,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { compare } from "./calculate";
import {
  LICENSE_TIERS,
  LICENSE_MIN_TB,
  OBJECT_STORAGE_BATCH,
  REDUCT_BLOCK,
  DEFAULT_MINIO_EUR_PER_TB_MONTH,
  backendPricing,
  pricingConfig,
} from "./pricing";
import { PRESETS } from "./presets";
import type { BackendId, CompetitorId, StreamInput } from "./types";
import type { Route } from "./calculate";
import { CostBars, CostBreakdowns } from "./CostComparison";
import StreamEditor, { StreamDraft } from "./StreamEditor";
import NumberField from "./NumberField";
import {
  formatCount,
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
  "machine-vision-qa": LuScanSearch,
  ros: LuBot,
  custom: LuSlidersHorizontal,
};

const BACKENDS: { id: BackendId; label: string }[] = [
  { id: "aws", label: "AWS S3" },
  { id: "azure", label: "Azure Blob" },
  { id: "minio", label: "MinIO" },
];

const COMPETITORS: Record<CompetitorId, { label: string; about: string }> = {
  foxglove: {
    label: "Foxglove",
    about: "Managed robotics data platform. Every stream is uploaded to it.",
  },
  tiger: {
    label: "Tiger Cloud",
    about:
      "Time-series database for metrics and metadata; binary data and logs go to object storage.",
  },
  influx: {
    label: "InfluxDB",
    about:
      "InfluxDB Cloud Serverless for metrics; everything else goes to object storage.",
  },
  mongodb: {
    label: "MongoDB Atlas",
    about:
      "Document database for results and metadata; images and logs go to object storage.",
  },
  direct: {
    label: "Object storage only",
    about:
      "A custom pipeline that batches records into objects of about 64 MB.",
  },
};

const PRICE_SOURCES = [
  pricingConfig.aws,
  pricingConfig.azure,
  pricingConfig.foxglove,
  pricingConfig.tiger,
  pricingConfig.influx,
  pricingConfig.mongodb,
];

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? iso
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

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

const backendLabel = (backend: BackendId) =>
  BACKENDS.find((b) => b.id === backend)?.label ?? "";

function Routes({ title, routes }: { title: string; routes: Route[] }) {
  return (
    <div className={styles.routeGroup}>
      <p className={styles.routeTitle}>{title}</p>
      <ul className={styles.routes}>
        {routes
          .filter((route) => route.streams.length > 0)
          .map((route) => (
            <li key={route.target}>
              <span>{route.streams.join(", ")}</span>
              <span aria-hidden="true">→</span>
              <strong>{route.target}</strong>
            </li>
          ))}
      </ul>
    </div>
  );
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
  const [competitor, setCompetitor] = useState<CompetitorId>(
    preset.recommended,
  );
  const [compressionRatio, setCompressionRatio] = useState("1");
  const [seats, setSeats] = useState(
    String(pricingConfig.foxglove.includedDeveloperSeats),
  );
  const [queryHours, setQueryHours] = useState("20");
  const [tigerRatio, setTigerRatio] = useState(
    String(pricingConfig.tiger.defaultCompressionRatio),
  );
  const [influxQueries, setInfluxQueries] = useState(
    String(pricingConfig.influx.defaultQueriesPerMonth),
  );
  const [influxRatio, setInfluxRatio] = useState("1");
  const [atlasTier, setAtlasTier] = useState(pricingConfig.mongodb.defaultTier);

  const selectPreset = (id: string) => {
    const next = PRESETS.find((p) => p.id === id);
    if (!next) return;
    setPresetId(id);
    setUnits(String(next.units));
    setHours(String(next.recordingHoursPerDay));
    setStreams(toDraft(next.streams));
    setHotDays(String(next.hotDays));
    setRetentionDays(String(next.retentionDays));
    setCompetitor(next.recommended);
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
    compressionRatio: atLeast(1, "At least 1")(num(compressionRatio)),
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
      compressionRatio: safe(compressionRatio, 1, 1),
      minioEurPerTbMonth: safe(minioCost, 0),
    };
    return compare(workload, storage, {
      pricing: backendPricing(backend, storage.minioEurPerTbMonth),
      licenseTiers: LICENSE_TIERS,
      licenseMinTb: LICENSE_MIN_TB,
      block: REDUCT_BLOCK,
      backendName: backendLabel(backend),
      batch: OBJECT_STORAGE_BATCH,
      prices: pricingConfig,
      competitor,
      assumptions: {
        foxgloveDeveloperSeats: safe(seats, 3),
        foxgloveQueryHoursPerMonth: safe(queryHours, 0),
        tigerCompressionRatio: safe(tigerRatio, 5, 1),
        influxQueriesPerMonth: safe(influxQueries, 0),
        influxStorageToRawRatio: safe(influxRatio, 1),
        atlasTier,
      },
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
    compressionRatio,
    minioCost,
    competitor,
    seats,
    queryHours,
    tigerRatio,
    influxQueries,
    influxRatio,
    atlasTier,
  ]);

  const workload = result.estimate.workload;
  const hasData = workload.totalRecordsMonth > 0;
  const saving = result.savingEurYear;
  const retained = workload.totalRetainedTb;
  const lowerBound = result.alternative.lowerBound;

  useEffect(() => {
    track("calculator_viewed");
  }, []);

  useDebouncedEffect(
    () => {
      if (!hasData) return;
      const props = {
        preset: presetId,
        backend,
        competitor,
        units_bucket: bucket(safe(units, 1, 1), [2, 5, 10, 50, 100, 1000]),
        monthly_tb_bucket: bucket(
          workload.totalDataMonthTb,
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

  let headline: string;
  let subline: string;
  if (saving >= 0) {
    headline = `Save ${lowerBound ? "at least " : ""}${formatEur(saving)} / year`;
    subline = lowerBound
      ? "Estimated from public pricing"
      : `${formatPercent(result.savingPercent)} lower TCO`;
  } else {
    headline = `${lowerBound ? "Up to " : ""}${formatEur(-saving)} / year higher`;
    subline = lowerBound
      ? "Estimated from public pricing"
      : "for this configuration";
  }

  return (
    <div className={styles.root}>
      <div className={styles.calculator}>
        <div className={styles.inputs}>
          <section className={styles.step}>
            <h2 className={styles.stepTitle}>
              1. What does your system record?
            </h2>
            <div
              className={styles.presets}
              role="radiogroup"
              aria-label="Application"
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
                label="Recording per day"
                value={hours}
                onChange={setHours}
                min={0}
                max={24}
                step={1}
                suffix="h"
                error={errors.hours}
              />
            </div>

            <StreamEditor
              streams={streams}
              classEditable={presetId === "custom"}
              onChange={setStreams}
            />
            <p className={styles.generated}>
              {hasData
                ? `≈ ${formatTb(workload.totalDataMonthTb)} generated per month`
                : "Enable at least one stream with a frequency and record size."}
            </p>
          </section>

          <section className={styles.step}>
            <h2 className={styles.stepTitle}>2. Where should the data live?</h2>
            <p className={styles.fieldLabel} id="calculator-backend">
              Storage backend
            </p>
            <div
              className={styles.segmented}
              role="radiogroup"
              aria-labelledby="calculator-backend"
            >
              {BACKENDS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  role="radio"
                  aria-checked={b.id === backend}
                  className={clsx({
                    [styles.segmentActive]: b.id === backend,
                  })}
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
                  label="Infrastructure storage cost"
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
                label="Retention"
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
            </div>
          </section>

          <section className={styles.step}>
            <h2 className={styles.stepTitle}>3. Compare ReductStore with</h2>
            <select
              aria-label="Compare ReductStore with"
              className={styles.select}
              value={competitor}
              onChange={(event) => {
                const value = event.target.value as CompetitorId;
                setCompetitor(value);
                track("calculator_competitor_selected", { competitor: value });
              }}
            >
              {preset.competitors.map((id) => (
                <option key={id} value={id}>
                  {COMPETITORS[id].label}
                </option>
              ))}
            </select>
            <p className={styles.competitorAbout}>
              {COMPETITORS[competitor].about}
            </p>

            <div className={styles.architectures}>
              <Routes
                title={result.alternative.label}
                routes={result.alternative.routes}
              />
              <Routes
                title={result.reduct.label}
                routes={result.reduct.routes}
              />
            </div>

            <details
              className={styles.disclosure}
              onToggle={(event) => {
                if ((event.target as HTMLDetailsElement).open) {
                  track("calculator_advanced_opened", { preset: presetId });
                }
              }}
            >
              <summary>Advanced assumptions</summary>
              <div className={clsx(styles.fields, styles.competitorFields)}>
                <NumberField
                  label="Compression ratio, both sides"
                  value={compressionRatio}
                  onChange={setCompressionRatio}
                  min={1}
                  step={0.5}
                  suffix="×"
                  error={errors.compressionRatio}
                />
                {competitor === "foxglove" && (
                  <>
                    <NumberField
                      label="Foxglove developer seats"
                      value={seats}
                      onChange={setSeats}
                      min={0}
                      step={1}
                    />
                    <NumberField
                      label="Foxglove query time"
                      value={queryHours}
                      onChange={setQueryHours}
                      min={0}
                      step={1}
                      suffix="h / month"
                    />
                  </>
                )}
                {competitor === "tiger" && (
                  <NumberField
                    label="Tiger Cloud compression"
                    value={tigerRatio}
                    onChange={setTigerRatio}
                    min={1}
                    step={0.5}
                    suffix="×"
                  />
                )}
                {competitor === "influx" && (
                  <>
                    <NumberField
                      label="InfluxDB queries"
                      value={influxQueries}
                      onChange={setInfluxQueries}
                      min={0}
                      step={1000}
                      suffix="/ month"
                    />
                    <NumberField
                      label="InfluxDB storage to raw data"
                      value={influxRatio}
                      onChange={setInfluxRatio}
                      min={0}
                      step={0.1}
                      suffix="×"
                    />
                  </>
                )}
                {competitor === "mongodb" && (
                  <div className={styles.field}>
                    <label htmlFor="calculator-atlas">Atlas cluster</label>
                    <select
                      id="calculator-atlas"
                      className={styles.select}
                      value={atlasTier}
                      onChange={(event) => setAtlasTier(event.target.value)}
                    >
                      {Object.entries(pricingConfig.mongodb.tiers).map(
                        ([name, tier]) => (
                          <option key={name} value={name}>
                            {name} ({tier.defaultStorageGb} GB)
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                )}
                <p className={styles.fieldHint}>
                  A compression ratio of 2× means 100 TB of recorded data takes
                  about 50 TB of storage.
                </p>
              </div>
            </details>
          </section>
        </div>

        <aside className={styles.result} aria-live="polite">
          {!hasData ? (
            <p className={styles.empty}>
              Enable at least one data stream with a frequency and record size
              to see an estimate.
            </p>
          ) : (
            <>
              <h2 className={styles.resultTitle}>Estimated annual cost</h2>
              <CostBars
                alternative={result.alternative}
                reduct={result.reduct}
              />
              <p
                className={clsx(styles.headline, {
                  [styles.headlineHigher]: saving < 0,
                })}
              >
                {headline}
              </p>
              <p className={styles.subline}>{subline}</p>

              <CostBreakdowns
                alternative={result.alternative}
                reduct={result.reduct}
              />

              <ul className={styles.notes}>
                {result.alternative.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>

              <dl className={styles.summary}>
                <div>
                  <dt>Generated</dt>
                  <dd>{formatTb(workload.totalDataMonthTb)} / month</dd>
                </div>
                <div>
                  <dt>Retained</dt>
                  <dd>{formatTb(retained)}</dd>
                </div>
                <div>
                  <dt>Records</dt>
                  <dd>{formatCount(workload.totalRecordsMonth)} / month</dd>
                </div>
                <div>
                  <dt>Local history</dt>
                  <dd>{formatDays(result.estimate.localHistoryDays)}</dd>
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

      <details className={clsx(styles.disclosure, styles.assumptions)}>
        <summary>Calculation assumptions</summary>
        <div className={styles.assumptionsBody}>
          <p>
            An estimate, not a quote. Both architectures use the same workload,
            retention, reads, and storage backend. Costs are annualized at
            steady state, once retained data has reached its full size.
          </p>
          <ul>
            <li>
              Data per month = units × count × frequency × record size ×
              recording hours × 30 days. Retained data = data per month ×
              retention / 30.
            </li>
            <li>
              ReductStore keeps recent data on the edge disk and writes records
              in blocks of up to 64 MB or 1,024 records to the storage backend,
              with two requests per block. Local history = edge disk / data
              recorded per unit per day.
            </li>
            <li>
              Alternatives that keep raw data in object storage are assumed to
              batch it into objects of about 64 MB as well, with one request per
              object. Only metrics, metadata, or results go into their database.
            </li>
            <li>
              Compression (default none) applies equally to raw data on both
              sides. Tiger Cloud's own compression applies only to data in its
              database.
            </li>
            <li>
              On AWS S3 and Azure Blob, data moves to colder storage classes
              only when that is cheaper, respecting minimum storage durations
              and billable object sizes. MinIO costs retained TB × the
              infrastructure price × 12.
            </li>
            <li>
              ReductStore license: ReductStore Pro at €
              {pricingConfig.reductstore.eurPerGbMonth} per GB per month on
              retained data, {pricingConfig.reductstore.minTb} TB minimum.
            </li>
            <li>
              Foxglove: base plan, extra seats and devices, storage on retained
              data, indexing on uploaded data, bandwidth on data read, and query
              hours, each with its public marginal tiers. Tiger Cloud: minimum
              published compute plus hot and tiered storage. InfluxDB Cloud
              Serverless: data in, storage, queries, and data out. MongoDB
              Atlas: cluster price including the tier's default storage.
            </li>
            <li>
              Excludes compute outside the listed services, egress, networking,
              support, VAT, extra backups, labor, and migration.
            </li>
          </ul>
          <p>
            Competitor and cloud prices are public list prices in USD, converted
            at 1 USD = {pricingConfig.fx.usdToEur} EUR (
            {formatDate(pricingConfig.fx.lastVerified)}). They vary by region,
            workload, and commercial agreement. AWS uses{" "}
            {pricingConfig.aws.region} rates; Azure prices are placeholders.
          </p>
          <div className={styles.sourcesTable}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Vendor</th>
                  <th scope="col">Product</th>
                  <th scope="col">Pricing units</th>
                  <th scope="col">Verified</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_SOURCES.map((source) => (
                  <tr key={source.vendor}>
                    <th scope="row">
                      <Link to={source.source}>{source.vendor}</Link>
                    </th>
                    <td>{source.product}</td>
                    <td>
                      {source.currency} {source.units}
                    </td>
                    <td>{formatDate(source.lastVerified)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </details>
    </div>
  );
}
