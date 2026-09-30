import React, { JSX } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import rosJson from "!!raw-loader!./_examples/ros_json.py";
import rosJpeg from "!!raw-loader!./_examples/ros_jpeg.py";
import rosLabels from "!!raw-loader!./_examples/ros_labels.py";
import rosMcap from "!!raw-loader!./_examples/ros_mcap.py";
import factoryVibration from "!!raw-loader!./_examples/factory_vibration.py";
import factorySql from "!!raw-loader!./_examples/factory_sql.py";
import factoryMqtt from "!!raw-loader!./_examples/factory_mqtt.py";
import datasetLabels from "!!raw-loader!./_examples/dataset_labels.py";
import styles from "./styles.module.css";

const SERVER = "https://play.reduct.store";
const TOKEN = "reductstore";

const SETUP = `import asyncio
from datetime import datetime, timedelta, timezone

from reduct import Client


async def main():
    async with Client("${SERVER}", api_token="${TOKEN}") as client:
        stop = datetime.now(timezone.utc)
        start = stop - timedelta(hours=1)
        ...  # one of the examples below


asyncio.run(main())`;
type Example = {
  id: string;
  title: string;
  summary: string;
  file: string;
  code: string;
  output?: string;
  images?: { src: string; alt: string }[];
  docs: { label: string; to: string };
};

const GROUPS: { title: string; bucket: string; examples: Example[] }[] = [
  {
    title: "Robotics",
    bucket: "orion",
    examples: [
      {
        id: "ros-json",
        title: "Decode ROS messages to JSON",
        summary:
          "ReductROS decodes the stored ROS 2 messages on the server. Here, the boat's GPS fixes.",
        file: "ros_json.py",
        code: rosJson,
        output: `1790784087 42.35824 -71.08775
1790784313 42.35819 -71.08763
1790784477 42.35816 -71.08755
1790784654 42.35818 -71.08761
...`,
        docs: {
          label: "ReductROS raw messages",
          to: "/docs/extensions/official/ros-ext/raw",
        },
      },
      {
        id: "ros-jpeg",
        title: "Get camera frames as JPEG",
        summary:
          "Raw sensor_msgs/Image frames from the infrared camera, converted to JPEG on the server.",
        file: "ros_jpeg.py",
        code: rosJpeg,
        output: `1790784334847174.jpg 640 512
1790784498326544.jpg 640 512
1790784675706322.jpg 640 512
...`,
        images: [1, 2, 3].map((i) => ({
          src: `/img/playground/orion-ir-${i}.jpg`,
          alt: `Infrared frame ${i} from the orion boat`,
        })),
        docs: {
          label: "Encoding binary fields",
          to: "/docs/extensions/official/ros-ext/raw#encoding-binary-fields",
        },
      },
      {
        id: "ros-labels",
        title: "Filter by label",
        summary:
          "Only colour camera frames recorded while the GPS altitude label was between 110 and 120 m.",
        file: "ros_labels.py",
        code: rosLabels,
        output: `1790784328478195 118.0331 50676
1790784669343610 113.8821 50048
1790785497907116 119.8687 39300
...`,
        docs: { label: "Conditional queries", to: "/docs/conditional-query" },
      },
      {
        id: "ros-mcap",
        title: "Export an hour as MCAP",
        summary:
          "Camera, GPS, odometry, and TF merged into one MCAP file you can open in Foxglove.",
        file: "ros_mcap.py",
        code: rosMcap,
        output: "orion.mcap application/mcap 395404 bytes",
        docs: {
          label: "Exporting MCAP",
          to: "/docs/extensions/official/ros-ext/raw#data-export",
        },
      },
    ],
  },
  {
    title: "Industrial",
    bucket: "factory",
    examples: [
      {
        id: "vibration",
        title: "Find vibration above a threshold",
        summary:
          "1-second vibration chunks labeled with their RMS. The query returns only the bearing fault.",
        file: "factory_vibration.py",
        code: factoryVibration,
        output: `1790786100000000 0.922 1.769 4000
1790786130000000 0.922 1.858 4000
1790786160000000 0.923 1.792 4000
...`,
        docs: { label: "Conditional queries", to: "/docs/conditional-query" },
      },
      {
        id: "sql",
        title: "Run SQL on PLC data",
        summary:
          "ReductSelect runs SQL on each stored CSV record. The temperature climbs during the fault.",
        file: "factory_sql.py",
        code: factorySql,
        output: `1790784060000000 [{"temperature":60.9,"pressure":4.25}]
1790784090000000 [{"temperature":60.9,"pressure":4.27}]
...
1790786220000000 [{"temperature":64.5,"pressure":4.6}]
1790786280000000 [{"temperature":66.4,"pressure":4.58}]
...`,
        docs: {
          label: "ReductSelect",
          to: "/docs/extensions/official/select-ext",
        },
      },
      {
        id: "mqtt",
        title: "Read MQTT topics",
        summary:
          "Each MQTT topic is its own entry, so topics are queried by name like any other stream.",
        file: "factory_mqtt.py",
        code: factoryMqtt,
        output: `mqtt/line1/temperature 1790784065000000 {"value": 60.86, "unit": "C"}
mqtt/line1/temperature 1790784095000000 {"value": 61.24, "unit": "C"}
...
mqtt/line1/pressure 1790784065000000 {"value": 4.177, "unit": "bar"}
...
mqtt/line1/state 1790784065000000 {"value": "running"}
...`,
        docs: {
          label: "MQTT data storage",
          to: "/blog/advice/database/mqtt-data-storage",
        },
      },
    ],
  },
  {
    title: "Datasets",
    bucket: "datasets",
    examples: [
      {
        id: "dataset-labels",
        title: "Select labeled training images",
        summary:
          "Cat images with keypoint labels. The query picks images where the left eye is right of x = 150.",
        file: "dataset_labels.py",
        code: datasetLabels,
        output: `1 175 160
3 318 222
4 167 173
...`,
        images: [1, 2, 3].map((i) => ({
          src: `/img/playground/cats-${i}.jpg`,
          alt: `Cat image ${i} with its keypoint labels drawn`,
        })),
        docs: {
          label: "Stream a dataset into PyTorch",
          to: "/blog/ai/datastreaming/pytorch/implement-database-data-streaming-pytorch",
        },
      },
    ],
  },
];

const BUCKETS = [
  {
    name: "orion",
    title: "Autonomous boat",
    text: "A boat on the Charles River in Boston, recorded with ROS 2 and replayed live.",
    image: "/img/playground/orion-camera.jpg",
    entries: [
      ["right_camera/image_color/compressed", "colour camera"],
      ["right_ir/rotated/image_raw", "infrared camera"],
      ["Pablo05/sensor/gps/fix", "GPS"],
      ["Pablo05/odom", "odometry"],
      ["tf", "transforms"],
      ["rosout", "logs"],
    ],
  },
  {
    name: "factory",
    title: "Factory line",
    text: "A simulated pump with a bearing fault for 7 minutes every hour.",
    image: "/img/playground/factory-vibration.svg",
    entries: [
      ["vibration", "1 kHz chunks, rms and peak labels"],
      ["plc", "PLC samples as CSV"],
      ["mqtt/line1/…", "temperature, pressure, state"],
    ],
  },
  {
    name: "datasets",
    title: "Training datasets",
    text: "Labeled images for machine learning.",
    image: "/img/playground/cats-2.jpg",
    entries: [
      ["cats", "10k images, keypoint labels"],
      ["mnist_training", "60k handwritten digits"],
      ["imdb", "47k celebrity photos, name and birth date labels"],
    ],
  },
];

// The part of an example script that differs from the others: constants
// other than URL and TOKEN, and the body from the bucket lookup on.
function snippet(code: string): string {
  const lines = code.split("\n");
  const constants: string[] = [];
  let i = lines.findIndex((line) => line.startsWith("TOKEN ="));
  for (i += 1; i < lines.length && !lines[i].startsWith("async def"); i++) {
    constants.push(lines[i]);
  }
  const start = lines.findIndex((line) => line.includes("client.get_bucket"));
  const end = lines.findIndex((line) => line.startsWith("asyncio.run"));
  const body = lines
    .slice(start, end)
    .filter((line) => !/^\s+(stop|start) = /.test(line))
    .map((line) => line.replace(/^ {8}/, ""))
    .join("\n")
    .trim();
  const head = constants.join("\n").trim();
  return head ? `${head}\n\n${body}` : body;
}

function ExampleCard({ example }: { example: Example }) {
  return (
    <article className={styles.example} id={example.id}>
      <h3>{example.title}</h3>
      <p className={styles.summary}>{example.summary}</p>
      <div className={styles.exampleBody}>
        <div className={styles.exampleCode}>
          <CodeBlock language="python">{snippet(example.code)}</CodeBlock>
          <details className={styles.fullScript}>
            <summary>Full script ({example.file})</summary>
            <CodeBlock language="python">{example.code}</CodeBlock>
          </details>
        </div>
        <div className={styles.exampleOutput}>
          <p className={styles.outputTitle}>Expected output</p>
          {example.output && (
            <CodeBlock language="text">{example.output}</CodeBlock>
          )}
          {example.images && (
            <div className={styles.images}>
              {example.images.map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
              ))}
            </div>
          )}
          <Link className={styles.docsLink} to={example.docs.to}>
            {example.docs.label} →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Playground(): JSX.Element {
  return (
    <Layout
      title="Playground"
      description="Query live ROS 2 robot data, factory telemetry, and labeled image datasets on a public ReductStore server. Short Python examples with their expected output."
    >
      <main>
        <SimpleHeader pageTitle="Playground" />
        <div className="container">
          <p className={styles.intro}>
            A public ReductStore server with live ROS 2 robot data, a factory
            line, and labeled image datasets. Every example below reads the past
            hour, one record every 30 seconds.
          </p>

          <dl className={styles.connection}>
            <div>
              <dt>Server</dt>
              <dd>
                <code>{SERVER}</code>
              </dd>
            </div>
            <div>
              <dt>Read-only token</dt>
              <dd>
                <code>{TOKEN}</code>
              </dd>
            </div>
            <div>
              <dt>Python SDK</dt>
              <dd>
                <code>pip install reduct-py</code>
              </dd>
            </div>
          </dl>

          <p className={styles.setupIntro}>
            Each example below runs inside this setup, which reads the past
            hour:
          </p>
          <CodeBlock language="python">{SETUP}</CodeBlock>

          <h2 className={styles.sectionTitle}>What&apos;s on the server</h2>
          <div className={styles.buckets}>
            {BUCKETS.map((bucket) => (
              <section key={bucket.name} className={styles.bucket}>
                {bucket.image && (
                  <img
                    src={bucket.image}
                    alt=""
                    className={styles.bucketImage}
                  />
                )}
                <div className={styles.bucketBody}>
                  <h3>
                    {bucket.title} <code>{bucket.name}</code>
                  </h3>
                  <p>{bucket.text}</p>
                  <ul>
                    {bucket.entries.map(([entry, what]) => (
                      <li key={entry}>
                        <code>{entry}</code> {what}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>

          {GROUPS.map((group) => (
            <section key={group.title}>
              <h2 className={styles.sectionTitle}>
                {group.title} <code>{group.bucket}</code>
              </h2>
              <div className={styles.examples}>
                {group.examples.map((example) => (
                  <ExampleCard key={example.id} example={example} />
                ))}
              </div>
            </section>
          ))}

          <h2 className={styles.sectionTitle}>Use it in your tools</h2>
          <div className={styles.tools}>
            <Link className="button button--primary button--lg" to={SERVER}>
              Open the Web Console
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/integrations/grafana"
            >
              Connect Grafana
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/ros/using-foxglove"
            >
              Open in Foxglove
            </Link>
          </div>

          <p className={styles.footnote}>
            The factory line is simulated. Need another kind of data?{" "}
            <Link to="/contact">Tell us</Link>.
          </p>
        </div>
      </main>
    </Layout>
  );
}
