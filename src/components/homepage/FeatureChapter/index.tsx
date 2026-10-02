import React, { JSX, ReactNode, useId, useRef, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export interface ChapterItem {
  title: string;
  summary: string;
  text?: ReactNode;
  cta: { label: string; to: string };
  extra?: ReactNode;
  visual: ReactNode;
}

export default function FeatureChapter({
  eyebrow,
  title,
  items,
  footer,
}: {
  eyebrow: string;
  title: string;
  items: ChapterItem[];
  footer?: ReactNode;
}): JSX.Element {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[
      event.key
    ];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className={styles.chapter}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.layout}>
        <div className={styles.side}>
          <div className={styles.tabList} role="tablist" aria-label={title}>
            {items.map((item, index) => (
              <button
                key={item.title}
                ref={(el) => {
                  tabs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-selected={active === index}
                aria-controls={`${id}-panel-${index}`}
                tabIndex={active === index ? 0 : -1}
                className={clsx(styles.tab, {
                  [styles.tabActive]: active === index,
                })}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className={styles.tabTitle}>{item.title}</span>
                <span className={styles.tabSummary}>{item.summary}</span>
              </button>
            ))}
          </div>
          {items.map((item, index) => (
            <div
              key={item.title}
              className={styles.details}
              hidden={active !== index}
            >
              {item.extra}
              <Link
                className="button button--primary button--lg"
                to={item.cta.to}
              >
                {item.cta.label} →
              </Link>
            </div>
          ))}
        </div>
        {items.map((item, index) => (
          <div
            key={item.title}
            role="tabpanel"
            id={`${id}-panel-${index}`}
            aria-labelledby={`${id}-tab-${index}`}
            className={styles.panel}
            hidden={active !== index}
          >
            {item.visual}
          </div>
        ))}
      </div>
      {footer}
    </section>
  );
}
