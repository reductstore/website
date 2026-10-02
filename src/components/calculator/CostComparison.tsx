import React, { JSX } from "react";
import type { CostSide } from "./calculate";
import { type Currency, formatCurrency } from "../../lib/currency";
import styles from "./styles.module.css";

const LICENSE = "ReductStore license";

const segmentClass = (label: string, index: number) =>
  label === LICENSE ? styles.segLicense : styles[`seg${index % 6}`];

type Sides = { alternative: CostSide; reduct: CostSide; currency: Currency };

const total = (side: CostSide, currency: Currency) =>
  `${formatCurrency(side.totalYear, currency)} / year`;

function Bar({
  side,
  max,
  currency,
}: {
  side: CostSide;
  max: number;
  currency: Currency;
}) {
  const parts = side.components.filter((c) => c.amountYear > 0);
  return (
    <div className={styles.barRow}>
      <div className={styles.barLabel}>
        <span>{side.label}</span>
        <strong>{total(side, currency)}</strong>
      </div>
      <div
        className={styles.barTrack}
        role="img"
        aria-label={`${side.label}: ${parts
          .map((c) => `${c.label} ${formatCurrency(c.amountYear, currency)}`)
          .join(", ")}`}
      >
        {side.components.map((c, i) =>
          c.amountYear > 0 ? (
            <span
              key={c.label}
              className={segmentClass(c.label, i)}
              style={{ width: `${(c.amountYear / max) * 100}%` }}
              title={`${c.label}: ${formatCurrency(c.amountYear, currency)}`}
            />
          ) : null,
        )}
      </div>
    </div>
  );
}

export function CostBars({
  alternative,
  reduct,
  currency,
}: Sides): JSX.Element {
  const max = Math.max(alternative.totalYear, reduct.totalYear, 1);
  return (
    <div className={styles.comparison}>
      <Bar side={alternative} max={max} currency={currency} />
      <Bar side={reduct} max={max} currency={currency} />
    </div>
  );
}

function Breakdown({ side, currency }: { side: CostSide; currency: Currency }) {
  return (
    <table className={styles.legend}>
      <thead>
        <tr>
          <th scope="col" colSpan={2}>
            {side.label}
          </th>
        </tr>
      </thead>
      <tbody>
        {side.components.map((c, i) => (
          <tr key={c.label}>
            <th scope="row">
              <span className={segmentClass(c.label, i)} aria-hidden="true" />
              {c.label}
            </th>
            <td>{formatCurrency(c.amountYear, currency)}</td>
          </tr>
        ))}
        <tr className={styles.totalRow}>
          <th scope="row">Total</th>
          <td>{formatCurrency(side.totalYear, currency)}</td>
        </tr>
      </tbody>
    </table>
  );
}

export function CostBreakdowns({
  alternative,
  reduct,
  currency,
}: Sides): JSX.Element {
  return (
    <div className={styles.breakdowns}>
      <Breakdown side={alternative} currency={currency} />
      <Breakdown side={reduct} currency={currency} />
    </div>
  );
}
