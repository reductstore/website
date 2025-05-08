import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default function WindowsInstall(props) {
  const binaryInstall = `
Invoke-WebRequest -Uri https://github.com/reductstore/reduct-cli/releases/latest/download/reduct-cli.x86_64-pc-windows-gnu.zip -OutFile reduct-cli.zip
Expand-Archive -LiteralPath reduct-cli.zip -DestinationPath .
.\\reduct-cli.exe
`.trim();
  return (
    <>
      <p>Compatible with the amd64 architecture.</p>
      <CodeBlock className="language-powershell">{binaryInstall}</CodeBlock>
    </>
  );
}
