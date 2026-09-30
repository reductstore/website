import React, { JSX } from "react";
import type { StreamInput } from "./types";
import styles from "./styles.module.css";

export type StreamDraft = Omit<
  StreamInput,
  "count" | "frequencyHz" | "recordSizeKb"
> & {
  count: string;
  frequencyHz: string;
  recordSizeKb: string;
};

const NUMERIC: {
  key: "count" | "frequencyHz" | "recordSizeKb";
  label: string;
  unit?: string;
  step: number;
  min: number;
}[] = [
  { key: "count", label: "Count", step: 1, min: 0 },
  { key: "frequencyHz", label: "Frequency", unit: "Hz", step: 1, min: 0 },
  { key: "recordSizeKb", label: "Record size", unit: "KB", step: 1, min: 0 },
];

const invalid = (key: string, value: string) => {
  const n = value.trim() === "" ? NaN : Number(value);
  if (!Number.isFinite(n) || n < 0) return true;
  return key === "recordSizeKb" && n === 0;
};

export default function StreamEditor({
  streams,
  onChange,
}: {
  streams: StreamDraft[];
  onChange: (streams: StreamDraft[]) => void;
}): JSX.Element {
  const update = (id: string, patch: Partial<StreamDraft>) =>
    onChange(streams.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  return (
    <div className={styles.streamTable}>
      <table>
        <thead>
          <tr>
            <th scope="col" aria-label="Include" />
            <th scope="col">Stream</th>
            {NUMERIC.map((field) => (
              <th key={field.key} scope="col" className={styles.numeric}>
                {field.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {streams.map((stream) => (
            <tr key={stream.id} className={stream.enabled ? "" : styles.off}>
              <td>
                <input
                  type="checkbox"
                  checked={stream.enabled}
                  aria-label={`Include ${stream.name}`}
                  onChange={(event) =>
                    update(stream.id, { enabled: event.target.checked })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={stream.name}
                  aria-label="Stream name"
                  onChange={(event) =>
                    update(stream.id, { name: event.target.value })
                  }
                />
              </td>
              {NUMERIC.map((field) => (
                <td key={field.key}>
                  <label className={styles.cellInput}>
                    <input
                      type="number"
                      inputMode="decimal"
                      data-field={field.key}
                      min={field.min}
                      step={field.step}
                      value={stream[field.key]}
                      aria-label={`${stream.name}: ${field.label}${field.unit ? `, ${field.unit}` : ""}`}
                      aria-invalid={invalid(field.key, stream[field.key])}
                      onChange={(event) =>
                        update(stream.id, { [field.key]: event.target.value })
                      }
                    />
                    {field.unit && <span aria-hidden="true">{field.unit}</span>}
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
