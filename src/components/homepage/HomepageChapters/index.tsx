import React, { JSX } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";
import {
  SiPython,
  SiJavascript,
  SiRust,
  SiCplusplus,
  SiGo,
} from "react-icons/si";
import FeatureChapter, { ChapterItem } from "../FeatureChapter";
import HomepageRobotics from "../HomepageRobotics";
import CodeSnippetExample from "../../docs/CodeSnippetExample";
import PerformanceComparison from "@site/src/components/tables/PerformanceComparison";
import BridgeDiagram from "@site/static/img/landing/reduct-bridge.svg";
import BridgeDiagramPhone from "@site/static/img/landing/reduct-bridge-phone.svg";
import SelectDiagram from "@site/static/img/landing/reduct-select.svg";
import SelectDiagramPhone from "@site/static/img/landing/reduct-select-phone.svg";
import ZenohDiagram from "@site/static/img/landing/zenoh-api.svg";
import styles from "./styles.module.css";

const webConsoleImage =
  require("@site/static/img/landing/web-console.png").default;
const grafanaImage =
  require("@site/static/img/solutions/cloud/grafana.png").default;
const cliImage = require("@site/static/img/landing/cli-demo.webp").default;

const BRIDGE_LABEL =
  "ROS 1, ROS 2, MQTT, HTTP, system metrics and shell inputs flow into ReductBridge, which sends labeled data to ReductStore";
const SELECT_LABEL =
  "JSON logs, CSV telemetry, Parquet tables and Protobuf events stored in ReductStore are queried with DataFusion SQL by ReductSelect and exported as Parquet batched by time, CSV batched by rows, or computed labels";

function Responsive({
  desktop,
  phone,
}: {
  desktop: JSX.Element;
  phone: JSX.Element;
}): JSX.Element {
  return (
    <div>
      <div className={styles.desktop}>{desktop}</div>
      <div className={styles.phone}>{phone}</div>
    </div>
  );
}

const sdks = [
  { icon: SiPython, to: "/docs/getting-started/with-python", name: "Python" },
  {
    icon: SiJavascript,
    to: "/docs/getting-started/with-javascript",
    name: "JavaScript",
  },
  { icon: SiGo, to: "/docs/getting-started/with-go", name: "Go" },
  { icon: SiRust, to: "/docs/getting-started/with-rust", name: "Rust" },
  { icon: SiCplusplus, to: "/docs/getting-started/with-cpp", name: "C++" },
];

const collect: ChapterItem[] = [
  {
    title: "ReductBridge",
    summary: "ROS, MQTT, HTTP, metrics, shell",
    text: (
      <p>
        Record ROS, MQTT, HTTP, and system data with labels, straight into
        ReductStore.
      </p>
    ),
    cta: { label: "Learn More", to: "/docs/reduct-bridge" },
    visual: (
      <Responsive
        desktop={
          <BridgeDiagram
            className={clsx("rs-diagram", styles.diagram)}
            role="img"
            aria-label={BRIDGE_LABEL}
          />
        }
        phone={
          <BridgeDiagramPhone
            className={clsx("rs-diagram", styles.diagram)}
            role="img"
            aria-label={BRIDGE_LABEL}
          />
        }
      />
    ),
  },
  {
    title: "Native Zenoh API",
    summary: "a peer on your Zenoh network",
    text: (
      <p>
        ReductStore joins your Zenoh network as a peer: it stores every sample
        and answers get() queries. No glue code.
      </p>
    ),
    cta: { label: "Learn More", to: "/docs/integrations/zenoh" },
    visual: (
      <ZenohDiagram
        className={clsx("rs-diagram", styles.diagram, styles.narrow)}
        role="img"
        aria-label="ReductStore joins a Zenoh network as a peer. Zenoh keys become entries, encodings become content types, attachments become labels, HLC timestamps become record timestamps, and get() selectors become queries."
      />
    ),
  },
  {
    title: "Client SDKs",
    summary: "Python, JavaScript, Go, Rust, C++",
    text: <p>Write, label, and query data from your own code.</p>,
    cta: { label: "Try SDKs", to: "/docs/getting-started" },
    visual: <CodeSnippetExample />,
  },
];

const query: ChapterItem[] = [
  {
    title: "SQL with DataFusion",
    summary: "JSON, CSV, Parquet, Protobuf",
    text: (
      <p>
        Run SQL on stored JSON, CSV, Parquet, and Protobuf records and export
        them in bigger batches.
      </p>
    ),
    cta: {
      label: "Learn More",
      to: "/docs/extensions/official/select-ext#sql-source",
    },
    visual: (
      <Responsive
        desktop={
          <SelectDiagram
            className={clsx("rs-diagram", styles.diagram)}
            role="img"
            aria-label={SELECT_LABEL}
          />
        }
        phone={
          <SelectDiagramPhone
            className={clsx("rs-diagram", styles.diagram)}
            role="img"
            aria-label={SELECT_LABEL}
          />
        }
      />
    ),
  },
  {
    title: "Grafana",
    summary: "dashboards and alerts",
    text: <p>Dashboards and alerts on labels and record content.</p>,
    cta: { label: "Setup Grafana", to: "/docs/integrations/grafana" },
    visual: <img src={grafanaImage} alt="Grafana dashboard" loading="lazy" />,
  },
  {
    title: "Performance",
    summary: "10x faster writes, 16x faster reads",
    text: (
      <p>
        10x faster writes than TimescaleDB and 16x faster reads than MinIO for
        100 KB images.
      </p>
    ),
    cta: { label: "See Benchmarks", to: "/blog/tags/comparison" },
    visual: (
      <div>
        <PerformanceComparison />
      </div>
    ),
  },
];

const operate: ChapterItem[] = [
  {
    title: "Web Console",
    summary: "browse data, manage access",
    text: <p>Browse data and manage access and settings.</p>,
    cta: { label: "Try Web Console", to: "/docs/getting-started" },
    visual: (
      <img src={webConsoleImage} alt="ReductStore Web Console" loading="lazy" />
    ),
  },
  {
    title: "CLI",
    summary: "scripts and automation",
    text: <p>Manage data and configuration from scripts.</p>,
    cta: { label: "Try CLI", to: "/docs/cli" },
    visual: (
      <Responsive
        desktop={
          <BrowserOnly>
            {() => {
              const TerminalAnimation = require("../TerminalAnimation").default;
              return <TerminalAnimation />;
            }}
          </BrowserOnly>
        }
        phone={<img src={cliImage} alt="ReductStore CLI" loading="lazy" />}
      />
    ),
  },
];

export default function HomepageChapters(): JSX.Element {
  return (
    <>
      <FeatureChapter
        eyebrow="Collect"
        title="Get data in from any machine"
        items={collect}
        footer={<HomepageRobotics />}
      />
      <hr className={styles.divider} />
      <FeatureChapter
        eyebrow="Query"
        title="Use the data where it lives"
        items={query}
      />
      <hr className={styles.divider} />
      <FeatureChapter
        eyebrow="Operate"
        title="Run it every day"
        items={operate}
      />
    </>
  );
}
