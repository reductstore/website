import React, { useState } from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import Layout from "@theme/Layout";
import InstallReductStore from "@site/src/components/InstallReductStore";
import ClientSDKs from "@site/src/components/ClientSDKs";
import ClientCLI from "@site/src/components/ClientCLI";
import Link from "@docusaurus/Link";

export default function DownloadPage(): JSX.Element {
  return (
    <Layout
      title="Download for Linux, Windows, and macOS: Get Started in Minutes"
      description="Get started with ReductStore by downloading our latest software and SDKs for Linux, Windows, and macOS. 
      This page provides direct download links and step-by-step instructions to ensure a smooth installation process."
    >
      <main>
        <SimpleHeader pageTitle="Download ReductStore" />
        <div className="container">
          <InstallReductStore />
          <hr />
          <ClientSDKs />
          <hr />
          <ClientCLI />
          <hr />
          <p>
            All the binaries and source code are available on{" "}
            <strong>
              <Link
                href="https://github.com/reductstore/reductstore/releases"
                target="_blank"
              >
                the release page
              </Link>.
            </strong>
          </p>
        </div>
      </main>
    </Layout>
  );
}
