import React, { JSX } from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import styles from "./styles.module.css";

export default function DemoPage(): JSX.Element {
  return (
    <Layout
      title="Book a Demo"
      description="Schedule a ReductStore demo and discuss your robotics and industrial IoT data pipeline requirements."
    >
      <main>
        <SimpleHeader pageTitle="Book a Demo" />
        <div className={clsx("container", styles.demoContainer)}>
          <p className={styles.intro}>
            Pick a time that works for you and we will walk through your current
            setup, requirements, and how ReductStore can fit your production
            data pipeline.
          </p>

          <div className={styles.calendarWrapper}>
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3kZddaxQGWWPyFXzdgh5c3S151bCObkRQMnp5KcpeeVGUewaiTr6EKo_8dbZhBdZPnhk9MytZ6?gv=true"
              style={{ border: 0 }}
              width="100%"
              height="780"
              frameBorder="0"
              title="Book a ReductStore demo"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
