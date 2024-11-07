import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default function CargoInstall() {
  const binaryInstall = `
cargo install reduct-cli
`.trim();

  return (
    <>
      <p>Compatible with the amd64 architecture.</p>
      <CodeBlock className="language-bash">{binaryInstall}</CodeBlock>
    </>
  );
}
