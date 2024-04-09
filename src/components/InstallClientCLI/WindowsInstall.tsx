import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default function WindowsInstall(props) {
    const binaryInstall = `
Invoke-WebRequest -Uri  https://github.com/reductstore/reduct-cli/releases/latest/download/reduct-cli.win-amd64.zip -OutFile reductstore.zip
Expand-Archive -LiteralPath reductstore.zip -DestinationPath .
.\\reductstore.exe
`.trim();
  return (
    <>
      <p>Compatible with the amd64 architecture.</p>
      <CodeBlock className="language-bash">
        {binaryInstall}
      </CodeBlock>
    </>
  );
}

