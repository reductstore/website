import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default function WindowsInstall() {
  return (
    <>
      <p>Compatible with the amd64 architecture.</p>
      <CodeBlock className="language-bash">
        {binaryInstall}
      </CodeBlock>
    </>
  );
}

const binaryInstall = `
Invoke-WebRequest -Uri  https://github.com/reductstore/reductstore/releases/download/v1.7.3/reductstore.win-amd64.zip -OutFile reductstore.zip
Expand-Archive -LiteralPath reductstore.zip -DestinationPath .
.\\reductstore.exe
`.trim();