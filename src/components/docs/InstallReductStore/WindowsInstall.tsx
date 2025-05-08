import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default function WindowsInstall(props) {
  const binaryInstall = `
Invoke-WebRequest -Uri  https://github.com/reductstore/reductstore/releases/latest/download/reductstore.x86_64-pc-windows-gnu.zip -OutFile reductstore.zip
Expand-Archive -LiteralPath reductstore.zip -DestinationPath .
$env:RS_DATA_PATH = 'C:\\DataFolder'
.\\reductstore.exe
`.trim();
  return (
    <>
      <p>Compatible with the amd64 architecture.</p>
      <CodeBlock className="language-bash">{binaryInstall}</CodeBlock>
    </>
  );
}
