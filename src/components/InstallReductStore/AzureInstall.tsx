import React from "react";
import CodeBlock from "@theme/CodeBlock";
import Link from "@docusaurus/Link";

export default function AzureInstall() {
  return (
    <>
      <p>Runs on amd64, arm64, and arm32 platforms.</p>

      <p>
        Discover{" "}
        <strong><Link
          href="https://azuremarketplace.microsoft.com/en-US/marketplace/apps/reductstorellc1689939980623.reductstore"
          target="_blank"
          rel="noopener noreferrer"
        >
          ReductStore on Azure Marketplace
        </Link></strong>
        . For more detailed information and guidance, refer to our{" "}
        <strong><Link
          to="/docs/azure"
        >
          official documentation
        </Link></strong>
        .
      </p>
    </>
  );
}
