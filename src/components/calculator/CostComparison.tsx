import React, { JSX } from "react";
import clsx from "clsx";
import type { CostSide } from "./calculate";
import { formatEur } from "./format";
import styles from "./styles.module.css";

const LICENSE = "ReductStore license";

const segmentClass = (label: string, index: number) =>
  label === LICENSE ? styles.segLicense : styles[`seg${index % 5}`];

const total = (side: CostSide) =>
  `${side.lowerBound ? "from " : ""}${formatEur(side.totalEurYear)} / year`;

function Bar({ side, max }: { side: CostSide; max: number }) {
  const parts = side.components.filter((c) => c.eurYear > 0);
  return (
    <div className={styles.barRow}>
      <div className={styles.barLabel}>
        <span>{side.label}</span>
        <strong>{total(side)}</strong>
      </div>
      <div
        className={styles.barTrack}
        role="img"
        aria-label={`${side.label}: ${parts
          .map((c) => `${c.label} ${formatEur(c.eurYear)}`)
          .join(", ")}`}
      >
        {side.components.map((c, i) =>
          c.eurYear > 0 ? (
            <span
              key={c.label}
              className={segmentClass(c.label, i)}
              style={{ width: `${(c.eurYear / max) * 100}%` }}
              title={`${c.label}: ${formatEur(c.eurYear)}`}
            />
          ) : null,
        )}
      </div>
    </div>
  );
}

function Breakdown({ side }: { side: CostSide }) {
  return (
    <table className={styles.legend}>
      <thead>
        <tr>
          <th scope="col">{side.label}</th>
          <th scope="col">Per year</th>
        </tr>
      </thead>
      <tbody>
        {side.components.map((c, i) => (
          <tr key={c.label}>
            <th scope="row">
              <span className={segmentClass(c.label, i)} aria-hidden="true" />
              {c.label}
            </th>
            <td>{formatEur(c.eurYear)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function CostComparison({
  alternative,
  reduct,
}: {
  alternative: CostSide;
  reduct: CostSide;
}): JSX.Element {
  const max = Math.max(alternative.totalEurYear, reduct.totalEurYear, 1);
  return (
    <div className={styles.comparison}>
      <Bar side={alternative} max={max} />
      <Bar side={reduct} max={max} />
      <div className={clsx(styles.breakdowns)}>
        <Breakdown side={alternative} />
        <Breakdown side={reduct} />
      </div>
    </div>
  );
}
