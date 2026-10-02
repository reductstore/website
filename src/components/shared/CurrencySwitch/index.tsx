import React, { JSX } from "react";
import clsx from "clsx";
import { CURRENCIES, currencySymbol } from "@site/src/lib/currency";
import useCurrency, { setCurrency } from "@site/src/lib/useCurrency";
import styles from "./styles.module.css";

export default function CurrencySwitch({
  className,
}: {
  className?: string;
}): JSX.Element {
  const currency = useCurrency();
  return (
    <div
      className={clsx(styles.switch, className)}
      role="radiogroup"
      aria-label="Currency"
    >
      {CURRENCIES.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={option === currency}
          className={clsx({ [styles.active]: option === currency })}
          onClick={() => setCurrency(option)}
        >
          {option} {currencySymbol(option)}
        </button>
      ))}
    </div>
  );
}
