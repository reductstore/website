import React, { JSX, useId } from "react";
import clsx from "clsx";
import InfoTip from "./InfoTip";
import styles from "./styles.module.css";

export default function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
  error,
  hint,
  wide,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  error?: string | null;
  hint?: string;
  wide?: boolean;
}): JSX.Element {
  const id = useId();
  return (
    <div className={clsx(styles.field, { [styles.fieldWide]: wide })}>
      <div className={styles.labelRow}>
        <label htmlFor={id}>{label}</label>
        {hint && <InfoTip text={hint} />}
      </div>
      <div className={clsx(styles.inputWrap, { [styles.invalid]: error })}>
        {prefix && <span className={styles.affix}>{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(event.target.value)}
        />
        {suffix && <span className={styles.affix}>{suffix}</span>}
      </div>
      {error && (
        <span id={`${id}-error`} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}
