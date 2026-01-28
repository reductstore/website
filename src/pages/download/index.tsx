import React, { JSX, useState } from "react";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import Layout from "@theme/Layout";
import InstallReductStore from "@site/src/components/docs/InstallReductStore";
import ClientSDKs from "@site/src/components/homepage/ClientSDKs";
import InstallClientCLI from "@site/src/components/docs/InstallClientCLI";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import PlaygroundOffer from "@site/src/components/promotional/PlaygroundOffer";

export default function DownloadPage(): JSX.Element {
  return (
    <Layout
      title="Download for Linux, Windows, and macOS"
      description="Get started with ReductStore by downloading our latest software and SDKs for Linux, Windows, and macOS. 
      This page provides direct download links and step-by-step instructions to ensure a smooth installation process."
    >
      <main>
        <SimpleHeader pageTitle="Download ReductStore" />
        <div className="container">
          <div className={styles.introSection}>
            <p className={styles.introText}>
              ReductStore is available for Linux, Windows, and macOS. You can
              download the latest version of ReductStore, as well as our client
              SDKs and CLI. Once you have downloaded the software, follow the{" "}
              <Link to="/docs/getting-started">
                <b>Getting Started</b>
              </Link>{" "}
              guide to set up your first ReductStore instance.
            </p>
            <PlaygroundOffer />
          </div>
          <InstallReductStore />
          <hr />
          <ClientSDKs />
          <hr />
          <InstallClientCLI />
          <hr />
          <p>
            All the binaries and source code are available on{" "}
            <strong>
              <Link
                href="https://github.com/reductstore/reductstore/releases"
                target="_blank"
              >
                the release page
              </Link>
              .
            </strong>
          </p>
        </div>
      </main>
    </Layout>
  );
}
