import React, { JSX } from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import styles from "./styles.module.css";

export default function FleetAuditPage(): JSX.Element {
  return (
    <Layout
      title="Fleet Audit Introduction Call"
      description="Schedule a free fleet audit introduction call to discuss your robotics data pipeline and CRA compliance requirements."
    >
      <main>
        <SimpleHeader pageTitle="Fleet Audit Introduction Call" />
        <div className={clsx("container", styles.container)}>
          <p className={styles.intro}>
            Pick a time that works for you and we will analyze your current data
            pipeline against CRA requirements and show how ReductStore fits your
            production fleet.
          </p>

          <div className={styles.calendarWrapper}>
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3kZddaxQGWWPyFXzdgh5c3S151bCObkRQMnp5KcpeeVGUewaiTr6EKo_8dbZhBdZPnhk9MytZ6?gv=true"
              style={{ border: 0 }}
              width="100%"
              height="900"
              title="Fleet Audit Introduction Call"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
