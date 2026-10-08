import React, { JSX, useId } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export default function InfoTip({
  text,
  align = "center",
  below = false,
}: {
  text: string;
  align?: "center" | "end";
  below?: boolean;
}): JSX.Element {
  const id = useId();
  return (
    <span className={styles.tip}>
      <button
        type="button"
        className={styles.tipButton}
        aria-label="More information"
        aria-describedby={id}
      >
        ?
      </button>
      <span
        role="tooltip"
        id={id}
        className={clsx(styles.tipText, {
          [styles.tipEnd]: align === "end",
          [styles.tipBelow]: below,
        })}
      >
        {text}
      </span>
    </span>
  );
}
