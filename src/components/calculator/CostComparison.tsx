import React, { JSX } from "react";
import type { CostBreakdown } from "./types";
import { formatEur } from "./format";
import styles from "./styles.module.css";

const SEGMENTS: {
  key: keyof Omit<CostBreakdown, "totalEurYear">;
  label: string;
  className: string;
}[] = [
  { key: "storageEurYear", label: "Storage", className: styles.segStorage },
  {
    key: "operationsEurYear",
    label: "API / object operations",
    className: styles.segOperations,
  },
  {
    key: "retrievalEurYear",
    label: "Cold retrieval",
    className: styles.segRetrieval,
  },
  {
    key: "licenseEurYear",
    label: "ReductStore license",
    className: styles.segLicense,
  },
];

function Bar({
  label,
  cost,
  max,
}: {
  label: string;
  cost: CostBreakdown;
  max: number;
}) {
  const title = SEGMENTS.filter((s) => cost[s.key] > 0)
    .map((s) => `${s.label}: ${formatEur(cost[s.key])}`)
    .join(", ");
  return (
    <div className={styles.barRow}>
      <div className={styles.barLabel}>
        <span>{label}</span>
        <strong>{formatEur(cost.totalEurYear)} / year</strong>
      </div>
      <div
        className={styles.barTrack}
        role="img"
        aria-label={`${label}: ${title}`}
      >
        {SEGMENTS.map((s) =>
          cost[s.key] > 0 ? (
            <span
              key={s.key}
              className={s.className}
              style={{ width: `${(cost[s.key] / max) * 100}%` }}
              title={`${s.label}: ${formatEur(cost[s.key])}`}
            />
          ) : null,
        )}
      </div>
    </div>
  );
}

export default function CostComparison({
  directLabel,
  reductLabel,
  direct,
  reduct,
}: {
  directLabel: string;
  reductLabel: string;
  direct: CostBreakdown;
  reduct: CostBreakdown;
}): JSX.Element {
  const max = Math.max(direct.totalEurYear, reduct.totalEurYear, 1);
  return (
    <div className={styles.comparison}>
      <Bar label={directLabel} cost={direct} max={max} />
      <Bar label={reductLabel} cost={reduct} max={max} />
      <table className={styles.legend}>
        <thead>
          <tr>
            <th scope="col">Per year</th>
            <th scope="col">Direct</th>
            <th scope="col">ReductStore</th>
          </tr>
        </thead>
        <tbody>
          {SEGMENTS.map((s) => (
            <tr key={s.key}>
              <th scope="row">
                <span className={s.className} aria-hidden="true" />
                {s.label}
              </th>
              <td>{formatEur(direct[s.key])}</td>
              <td>{formatEur(reduct[s.key])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
