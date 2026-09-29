import React, { JSX } from "react";
import type { StreamInput } from "./types";
import type { Workload } from "./calculate";
import { formatTb } from "./format";
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
  step: number;
  min: number;
}[] = [
  { key: "count", label: "Count per unit", step: 1, min: 0 },
  { key: "frequencyHz", label: "Frequency, Hz", step: 1, min: 0 },
  { key: "recordSizeKb", label: "Record size, KB", step: 1, min: 0 },
];

const invalid = (key: string, value: string) => {
  const n = value.trim() === "" ? NaN : Number(value);
  if (!Number.isFinite(n) || n < 0) return true;
  return key === "recordSizeKb" && n === 0;
};

export default function StreamEditor({
  streams,
  workload,
  onChange,
}: {
  streams: StreamDraft[];
  workload: Workload;
  onChange: (streams: StreamDraft[]) => void;
}): JSX.Element {
  const update = (id: string, patch: Partial<StreamDraft>) =>
    onChange(streams.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const volume = (id: string) =>
    workload.streams.find((s) => s.stream.id === id)?.dataMonthTb ?? 0;

  return (
    <div className={styles.streamTable}>
      <table>
        <thead>
          <tr>
            <th scope="col">On</th>
            <th scope="col">Stream</th>
            {NUMERIC.map((field) => (
              <th key={field.key} scope="col">
                {field.label}
              </th>
            ))}
            <th scope="col">Data / month</th>
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
                  <input
                    type="number"
                    inputMode="decimal"
                    min={field.min}
                    step={field.step}
                    value={stream[field.key]}
                    aria-label={`${stream.name}: ${field.label}`}
                    aria-invalid={invalid(field.key, stream[field.key])}
                    onChange={(event) =>
                      update(stream.id, { [field.key]: event.target.value })
                    }
                  />
                </td>
              ))}
              <td className={styles.volume}>
                {stream.enabled ? formatTb(volume(stream.id)) : "off"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
