import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  LuActivity,
  LuCamera,
  LuCar,
  LuCpu,
  LuFactory,
  LuPlane,
  LuRoute,
  LuSlidersHorizontal,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { compare } from "./calculate";
import type { Route } from "./calculate";
import {
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
import { formatPercent, formatTb } from "./format";
import { bucket, track } from "../../lib/analytics";
import styles from "./styles.module.css";

const PRESET_ICONS: Record<string, IconType> = {
  "mobile-robot": LuRoute,
  "autonomous-vehicle": LuCar,
  drone: LuPlane,
  "industrial-robot": LuFactory,
  vibration: LuActivity,
  plc: LuCpu,
  "computer-vision": LuCamera,
  custom: LuSlidersHorizontal,
};

const BACKENDS: { id: BackendId; label: string; name: string }[] = [
  { id: "aws", label: "S3", name: "AWS S3" },
  { id: "azure", label: "Azure", name: "Azure Blob" },
  { id: "minio", label: "On-prem", name: "On-prem" },
];

const COMPETITORS: { id: CompetitorId; label: string }[] = [
  { id: "foxglove", label: "Foxglove" },
  { id: "influx", label: "InfluxDB" },
  { id: "timescale", label: "TimescaleDB" },
];

const ASSUMPTIONS: CompetitorAssumptions = {
  foxgloveDeveloperSeats: pricingConfig.foxglove.includedDeveloperSeats,
  foxgloveQueryHoursPerMonth: 20,
};
const READ_PERCENT_PER_MONTH = 5;
const DEFAULT_INSTANCES = 2;
const DEFAULT_COMPRESSION = 5;

const PRICE_SOURCES = [
  pricingConfig.aws,
  pricingConfig.azure,
  pricingConfig.foxglove,
  pricingConfig.influx,
  pricingConfig.timescale,
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

const backendName = (backend: BackendId) =>
  BACKENDS.find((b) => b.id === backend)?.name ?? "";

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
  const [hotPercent, setHotPercent] = useState(
    String(preset.retention.hotPercent),
  );
  const [hotDays, setHotDays] = useState(String(preset.retention.hotDays));
  const [coldPercent, setColdPercent] = useState(
    String(preset.retention.coldPercent),
  );
  const [coldDays, setColdDays] = useState(String(preset.retention.coldDays));
  const [minioCost, setMinioCost] = useState(
    String(DEFAULT_MINIO_PER_TB_MONTH),
  );
  const [competitor, setCompetitor] = useState<CompetitorId>(preset.competitor);
  const [instances, setInstances] = useState(String(DEFAULT_INSTANCES));
  const [compression, setCompression] = useState(String(DEFAULT_COMPRESSION));

  const selectPreset = (id: string) => {
    const next = PRESETS.find((p) => p.id === id);
    if (!next) return;
    setPresetId(id);
    setUnits(String(next.units));
    setHours(String(next.recordingHoursPerDay));
    setStreams(toDraft(next.streams));
    setHotPercent(String(next.retention.hotPercent));
    setHotDays(String(next.retention.hotDays));
    setColdPercent(String(next.retention.coldPercent));
    setColdDays(String(next.retention.coldDays));
    setCompetitor(next.competitor);
    track("calculator_preset_selected", { preset: id });
  };

  const valid = (value: string, min: number, max = Infinity) => {
    const n = num(value);
    return Number.isFinite(n) && n >= min && n <= max;
  };
  const errors = {
    units: valid(units, 1) ? null : "At least 1",
    hours: valid(hours, 0.1, 24) ? null : "Between 0 and 24",
    hotPercent: valid(hotPercent, 1, 100) ? null : "Between 1 and 100",
    hotDays: valid(hotDays, 1) ? null : "At least 1 day",
    coldPercent: valid(coldPercent, 0, num(hotPercent) || 100)
      ? null
      : "Between 0 and the hot share",
    coldDays: valid(coldDays, 0) ? null : "Cannot be negative",
    minioCost: valid(minioCost, 0) ? null : "Cannot be negative",
    instances:
      valid(instances, 1) && Number.isInteger(num(instances))
        ? null
        : "A whole number, at least 1",
    compression: valid(compression, 1) ? null : "At least 1",
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
    const hot = safe(hotPercent, 100, 1, 100);
    const retention = {
      hotPercent: hot,
      hotDays: safe(hotDays, 30, 1),
      coldPercent: safe(coldPercent, 0, 0, hot),
      coldDays: safe(coldDays, 0, 0),
    };
    return compare(workload, retention, {
      pricing: backendPricing(backend, currency, safe(minioCost, 0)),
      backendName: backendName(backend),
      licenseTiers: licenseTiers(REDUCTSTORE_PRICING[currency].perTbMonth),
      licenseMinTb: REDUCTSTORE_MIN_TB,
      block: REDUCT_BLOCK,
      prices: pricingConfig,
      usdRate: usdRate(currency),
      competitor,
      assumptions: ASSUMPTIONS,
      readPercentPerMonth: READ_PERCENT_PER_MONTH,
      instances: Math.round(safe(instances, DEFAULT_INSTANCES, 1)),
      telemetryCompression: safe(compression, 1, 1),
    });
  }, [
    currency,
    units,
    hours,
    streams,
    backend,
    hotPercent,
    hotDays,
    coldPercent,
    coldDays,
    minioCost,
    competitor,
    instances,
    compression,
  ]);

  const workload = result.workload;
  const hasData = workload.recordsMonth > 0;
  const saving = result.savingYear;
  const retained = workload.retainedTb;

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
          workload.generatedMonthTb,
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
    saving >= 0 ? (
      <>
        <strong className={styles.percent}>
          {formatPercent(result.savingPercent)}
        </strong>{" "}
        cheaper
      </>
    ) : (
      <>
        <strong className={styles.percent}>
          {formatPercent(-result.savingPercent)}
        </strong>{" "}
        more expensive
      </>
    );

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
                hint={`How many ${preset.unitLabel.toLowerCase()} record data. Each one records the streams in the table.`}
                value={units}
                onChange={setUnits}
                min={1}
                step={1}
                error={errors.units}
              />
              <NumberField
                label="Recording per day"
                hint="Hours a day each unit records. Use 24 for equipment that runs all day."
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
                ? `≈ ${formatTb(workload.generatedMonthTb)} recorded per month`
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
                label="Hot data kept"
                hint="Share of the recorded data kept in standard storage, ready to query. 100% keeps everything."
                value={hotPercent}
                onChange={setHotPercent}
                min={1}
                max={100}
                step={5}
                suffix="%"
                error={errors.hotPercent}
              />
              <NumberField
                label="Hot retention"
                hint="Days the hot data stays in standard storage."
                value={hotDays}
                onChange={setHotDays}
                min={1}
                step={1}
                suffix="days"
                error={errors.hotDays}
              />
              <NumberField
                label="Cold data kept"
                hint="Share of the recorded data kept longer after the hot window, for example events and samples for training. It cannot be more than the hot share."
                value={coldPercent}
                onChange={setColdPercent}
                min={0}
                max={100}
                step={5}
                suffix="%"
                error={errors.coldPercent}
              />
              <NumberField
                label="Cold retention"
                hint="Days the cold data is kept after the hot window, in the cheapest storage class whose minimum storage time fits."
                value={coldDays}
                onChange={setColdDays}
                min={0}
                step={1}
                suffix="days"
                error={errors.coldDays}
              />
              <NumberField
                label="ReductStore instances"
                hint="Servers running ReductStore, by default a primary and a standby. More instances add server cost only: the license counts stored data once."
                value={instances}
                onChange={setInstances}
                min={1}
                step={1}
                error={errors.instances}
              />
              <NumberField
                label="Telemetry compression"
                hint="How much smaller telemetry, metadata, and logs get when compressed, applied the same on every side. ReductStore compresses batched records in the client; time-series databases and Foxglove compress internally. Images and other binary data stay as they are."
                value={compression}
                onChange={setCompression}
                min={1}
                step={1}
                suffix="×"
                error={errors.compression}
              />
              {backend === "minio" && (
                <NumberField
                  label="On-prem storage cost"
                  hint="What one TB of your own object storage (for example MinIO) costs per month, with disks, servers, and power. Hot and cold data both use this price."
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
            {hasData && (
              <p className={styles.generated}>
                {formatTb(workload.hotTb)} hot + {formatTb(workload.coldTb)}{" "}
                cold
                {backend !== "minio" && workload.coldTb > 0
                  ? ` in ${result.coldTier}`
                  : ""}
              </p>
            )}
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

              <dl className={styles.summary}>
                <div>
                  <dt>Recorded / mo</dt>
                  <dd>{formatTb(workload.generatedMonthTb)}</dd>
                </div>
                <div>
                  <dt>Hot</dt>
                  <dd>{formatTb(workload.hotTb)}</dd>
                </div>
                <div>
                  <dt>Cold</dt>
                  <dd>{formatTb(workload.coldTb)}</dd>
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
            This is an estimate from public list prices, not a quote. Both sides
            store the same data for the same time on the same storage, and costs
            are per year once the retention window is full.
          </p>

          <h3>Your data</h3>
          <p>
            Each stream records count × frequency × record size for every hour
            it records, over 30-day months. Hot data is the hot share of that,
            kept for the hot retention. Cold data is the cold share, kept for
            the cold retention after the hot window. So stored hot data =
            recorded per month × hot share × hot days / 30, and the same for
            cold. Telemetry, metadata, and logs are stored smaller by the
            telemetry compression; binary data is stored as recorded. Both sides
            store exactly this data. Each month, {READ_PERCENT_PER_MONTH}% of
            the stored data is read back and leaves the cloud at its data out
            price.
          </p>

          <h3>ReductStore</h3>
          <p>
            ReductStore Pro costs{" "}
            {formatCurrency(REDUCTSTORE_PRICING[currency].perTbMonth, currency)}{" "}
            per TB per month of stored data, hot and cold, with a{" "}
            {REDUCTSTORE_MIN_TB} TB minimum. It is a fixed price in each
            currency, never converted. Each instance runs on an{" "}
            {pricingConfig.aws.server.instance} on AWS, a{" "}
            {pricingConfig.azure.server.instance} on Azure, or a server priced
            like the AWS one on-prem. Telemetry faster than 1 Hz is written as
            one record per second, and ReductStore groups records into blocks of
            up to 64 MB before writing them to storage, so storage sees few,
            large objects.
          </p>

          <h3>Storage</h3>
          <p>
            Hot data is in the standard class (S3 Standard, Azure Hot). Cold
            data moves to the cheapest class whose minimum storage time fits the
            cold retention: S3 Standard-IA or Azure Cool from 30 days, S3
            Glacier Instant Retrieval or Azure Cold from 90 days. Moving and
            reading cold data has its own request and retrieval prices, which
            are included. On-prem, hot and cold data both cost the price you
            enter per TB per month.
          </p>

          <h3>Foxglove</h3>
          <p>
            Foxglove Pro with {ASSUMPTIONS.foxgloveDeveloperSeats} developer
            seats, one device per unit, and{" "}
            {ASSUMPTIONS.foxgloveQueryHoursPerMonth} query hours a month. Every
            stream is uploaded to Foxglove, which charges for indexing what is
            uploaded, for storing hot and cold data at the same price, and for
            bandwidth.
          </p>

          <h3>InfluxDB and TimescaleDB</h3>
          <p>
            Telemetry, metadata, and logs go to the database; binary data goes
            to the same object storage as one object per record. InfluxDB runs
            on {pricingConfig.influx.instances} Amazon Timestream for InfluxDB 3
            instances with data in object storage. TimescaleDB runs on Tiger
            Cloud with a primary and an HA replica, hot data on primary storage
            and cold data on tiered storage. Tiger Cloud publishes only its
            entry compute price, so a 4 CPU service is estimated at 8 times
            that.
          </p>

          <h3>Not included</h3>
          <p>Support, VAT, extra backups, engineering time, and migration.</p>

          <h3>Prices</h3>
          <p>
            Cloud and vendor prices are in USD
            {currency === "EUR"
              ? `, converted to EUR at $1 = €${pricingConfig.fx.usdToEur} (rate of ${formatDate(pricingConfig.fx.lastVerified)})`
              : ""}
            , for {pricingConfig.aws.region} on AWS and{" "}
            {pricingConfig.azure.region} on Azure. They vary by region,
            workload, and agreement.
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
                  <tr key={source.product}>
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
