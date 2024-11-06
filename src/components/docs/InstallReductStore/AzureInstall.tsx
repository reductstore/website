import React from "react";
import CodeBlock from "@theme/CodeBlock";
import Link from "@docusaurus/Link";

export default function AzureInstall() {
  return (
    <>
      <p>Runs on amd64, arm64, and arm32 platforms.</p>

      <p>
        Discover{" "}
        <strong>
          <Link
            href="https://azuremarketplace.microsoft.com/en/marketplace/apps/reductsoftware.reductstore-server"
            target="_blank"
            rel="noopener noreferrer"
          >
            ReductStore on Azure Marketplace
          </Link>
        </strong>
        . For more detailed information and guidance, refer to the{" "}
        <strong>
          <Link to="docs/guides/integration/azure-vm">Azure VM guide</Link>
        </strong>
        .
      </p>
    </>
  );
}
