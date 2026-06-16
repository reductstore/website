import React, { JSX } from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import styles from "./styles.module.css";

export interface BookingCallProps {
  /** Page title, used for the document title, header and iframe label. */
  title: string;
  /** Meta description for the page. */
  description: string;
  /** Intro paragraph shown above the calendar. */
  intro: string;
  /** Google Calendar appointment schedule URL. */
  calendarSrc: string;
}

export default function BookingCall({
  title,
  description,
  intro,
  calendarSrc,
}: BookingCallProps): JSX.Element {
  return (
    <Layout title={title} description={description}>
      <main>
        <SimpleHeader pageTitle={title} />
        <div className={clsx("container", styles.container)}>
          <p className={styles.intro}>{intro}</p>

          <div className={styles.calendarWrapper}>
            <iframe
              src={calendarSrc}
              style={{ border: 0 }}
              width="100%"
              height="900"
              title={title}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
