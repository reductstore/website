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
      title="Download ReductStore"
      description="Download page for ReductStore and its SDKs with download links and instructions for Linux, Windows, and macOS."
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
