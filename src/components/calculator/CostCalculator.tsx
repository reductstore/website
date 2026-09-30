import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { LuCar, LuFactory, LuPlane, LuRoute } from "react-icons/lu";
import type { IconType } from "react-icons";
import { compare } from "./calculate";
import type { Route } from "./calculate";
import {
  OBJECT_STORAGE_BATCH,
  REDUCT_BLOCK,
  DEFAULT_MINIO_PER_TB_MONTH,
  backendPricing,
  licenseTiers,
  pricingConfig,
  usdRate,
} from "./pricing";
import {
  REDUCTSTORE_MIN_TB,
  REDUCTSTORE_PRICING,
  currencySymbol,
  formatCurrency,
} from "../../lib/currency";
import useCurrency from "../../lib/useCurrency";
import CurrencySwitch from "../shared/CurrencySwitch";
import { PRESETS } from "./presets";
import type {
  BackendId,
  CompetitorAssumptions,
  CompetitorId,
  StreamInput,
} from "./types";
import { CostBars, CostBreakdowns } from "./CostComparison";
import StreamEditor, { StreamDraft } from "./StreamEditor";
import NumberField from "./NumberField";
import { formatCount, formatPercent, formatTb } from "./format";
import { bucket, track } from "./analytics";
import styles from "./styles.module.css";

const PRESET_ICONS: Record<string, IconType> = {
  "mobile-robot": LuRoute,
  "autonomous-vehicle": LuCar,
  drone: LuPlane,
  "industrial-robot": LuFactory,
};

const BACKENDS: { id: BackendId; label: string }[] = [
  { id: "aws", label: "AWS S3" },
  { id: "azure", label: "Azure Blob" },
  { id: "minio", label: "MinIO" },
];

const COMPETITORS: { id: CompetitorId; label: string; about: string }[] = [
  {
    id: "foxglove",
    label: "Foxglove",
    about: "Managed robotics data platform. Every stream is uploaded to it.",
  },
  {
    id: "influx",
    label: "InfluxDB + object storage",
    about:
      "InfluxDB Cloud Serverless for metrics; images, scans, and logs go to object storage in 64 MB batches.",
  },
];

const ASSUMPTIONS: CompetitorAssumptions = {
  foxgloveDeveloperSeats: pricingConfig.foxglove.includedDeveloperSeats,
  foxgloveQueryHoursPerMonth: 20,
  influxQueriesPerMonth: pricingConfig.influx.defaultQueriesPerMonth,
  influxStorageToRawRatio: 1,
};
const READ_PERCENT_PER_MONTH = 5;

const PRICE_SOURCES = [
  pricingConfig.aws,
  pricingConfig.azure,
  pricingConfig.foxglove,
  pricingConfig.influx,
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
  const currency = useCurrency();
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0];
  const [units, setUnits] = useState(String(preset.units));
  const [hours, setHours] = useState(String(preset.recordingHoursPerDay));
  const [streams, setStreams] = useState<StreamDraft[]>(
    toDraft(preset.streams),
  );
  const [backend, setBackend] = useState<BackendId>("aws");
  const [retentionDays, setRetentionDays] = useState(
    String(preset.retentionDays),
  );
  const [minioCost, setMinioCost] = useState(
    String(DEFAULT_MINIO_PER_TB_MONTH),
  );
  const [competitor, setCompetitor] = useState<CompetitorId>("foxglove");

  const selectPreset = (id: string) => {
    const next = PRESETS.find((p) => p.id === id);
    if (!next) return;
    setPresetId(id);
    setUnits(String(next.units));
    setHours(String(next.recordingHoursPerDay));
    setStreams(toDraft(next.streams));
    setRetentionDays(String(next.retentionDays));
    track("calculator_preset_selected", { preset: id });
  };

  const valid = (value: string, min: number, max = Infinity) => {
    const n = num(value);
    return Number.isFinite(n) && n >= min && n <= max;
  };
  const errors = {
    units: valid(units, 1) ? null : "At least 1",
    hours: valid(hours, 0.1, 24) ? null : "Between 0 and 24",
    retentionDays: valid(retentionDays, 1) ? null : "At least 1 day",
    minioCost: valid(minioCost, 0) ? null : "Cannot be negative",
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
    const hot = preset.hotDays;
    const storage = {
      backend,
      edgeDiskTbPerUnit: 0,
      hotDays: hot,
      retentionDays: Math.max(1, safe(retentionDays, hot)),
      readPercentPerMonth: READ_PERCENT_PER_MONTH,
      minioPerTbMonth: safe(minioCost, 0),
    };
    return compare(workload, storage, {
      pricing: backendPricing(backend, currency, storage.minioPerTbMonth),
      licenseTiers: licenseTiers(REDUCTSTORE_PRICING[currency].perTbMonth),
      licenseMinTb: REDUCTSTORE_MIN_TB,
      block: REDUCT_BLOCK,
      backendName: backendLabel(backend),
      batch: OBJECT_STORAGE_BATCH,
      prices: pricingConfig,
      usdRate: usdRate(currency),
      competitor,
      assumptions: ASSUMPTIONS,
    });
  }, [
    currency,
    preset,
    units,
    hours,
    streams,
    backend,
    retentionDays,
    minioCost,
    competitor,
  ]);

  const workload = result.estimate.workload;
  const hasData = workload.totalRecordsMonth > 0;
  const saving = result.savingYear;
  const retained = workload.totalRetainedTb;

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
        currency,
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

  const headline =
    saving >= 0
      ? `Save ${formatCurrency(saving, currency)} / year`
      : `${formatCurrency(-saving, currency)} / year higher`;
  const subline =
    saving >= 0
      ? `${formatPercent(result.savingPercent)} lower TCO`
      : "for this configuration";

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

            <StreamEditor streams={streams} onChange={setStreams} />
            <p className={styles.generated}>
              {hasData
                ? `≈ ${formatTb(workload.totalDataMonthTb)} generated per month`
                : "Enable at least one stream with a frequency and record size."}
            </p>
          </section>

          <section className={styles.step}>
            <h2 className={styles.stepTitle}>2. Where should the data live?</h2>
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
              <NumberField
                label="Retention"
                value={retentionDays}
                onChange={setRetentionDays}
                min={1}
                step={1}
                suffix="days"
                error={errors.retentionDays}
              />
              {backend === "minio" && (
                <NumberField
                  label="MinIO storage cost"
                  value={minioCost}
                  onChange={setMinioCost}
                  min={0}
                  step={1}
                  prefix={currencySymbol(currency)}
                  suffix="/ TB / month"
                  error={errors.minioCost}
                />
              )}
            </div>
          </section>

          <section className={styles.step}>
            <h2 className={styles.stepTitle}>3. Compare ReductStore with</h2>
            <div
              className={styles.segmented}
              role="radiogroup"
              aria-label="Compare ReductStore with"
            >
              {COMPETITORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={c.id === competitor}
                  className={clsx({
                    [styles.segmentActive]: c.id === competitor,
                  })}
                  onClick={() => {
                    setCompetitor(c.id);
                    track("calculator_competitor_selected", {
                      competitor: c.id,
                    });
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <p className={styles.competitorAbout}>
              {COMPETITORS.find((c) => c.id === competitor)?.about}
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
              <div className={styles.resultHeader}>
                <h2 className={styles.resultTitle}>Estimated annual cost</h2>
                <CurrencySwitch />
              </div>
              <CostBars
                alternative={result.alternative}
                reduct={result.reduct}
                currency={currency}
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
                currency={currency}
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
              ReductStore writes records in blocks of up to 64 MB or 1,024
              records to the storage backend, with two requests per block.
              InfluxDB + object storage batches raw data into objects of about
              64 MB as well, with one request per object.
            </li>
            <li>
              Each month {READ_PERCENT_PER_MONTH}% of retained data is read
              back. On AWS S3 and Azure Blob, data older than {preset.hotDays}{" "}
              days moves to colder storage classes only when that is cheaper,
              respecting minimum storage durations and billable object sizes.
              MinIO costs retained TB × the infrastructure price × 12.
            </li>
            <li>
              ReductStore license: ReductStore Pro list price of{" "}
              {formatCurrency(
                REDUCTSTORE_PRICING[currency].perTbMonth,
                currency,
              )}{" "}
              per TB per month on retained data, {REDUCTSTORE_MIN_TB} TB
              minimum. It is a fixed price in each currency and is never
              converted.
            </li>
            <li>
              Foxglove Pro: base plan with {ASSUMPTIONS.foxgloveDeveloperSeats}{" "}
              developer seats, one device per unit, storage on retained data,
              indexing on uploaded data, bandwidth on data read, and{" "}
              {ASSUMPTIONS.foxgloveQueryHoursPerMonth} query hours per month,
              each with its public marginal tiers.
            </li>
            <li>
              InfluxDB Cloud Serverless: metrics only, with data in, storage,{" "}
              {ASSUMPTIONS.influxQueriesPerMonth.toLocaleString("en")} queries
              per month, and data out. At larger production scale InfluxData
              positions Cloud Dedicated, whose pricing is not public.
            </li>
            <li>
              Excludes compute outside the listed services, egress, networking,
              support, VAT, extra backups, labor, and migration.
            </li>
          </ul>
          <p>
            Competitor and cloud prices are public list prices in USD
            {currency === "EUR"
              ? `, converted for comparison at $1 = €${pricingConfig.fx.usdToEur} (FX reference date ${formatDate(pricingConfig.fx.lastVerified)})`
              : ""}
            . They vary by region, workload, and commercial agreement. AWS uses{" "}
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
