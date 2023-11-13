import React from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import CodeBlock from '@theme/CodeBlock';

export default function ClientCLI(): JSX.Element {
  return (
    <>
      <h3>CLI Client</h3>
      <CodeBlock className="language-bash">
        {cliClientCode}
      </CodeBlock>
    </>
  );
}

const cliClientCode = `
pip install -U reduct-cli
rcli --help
`.trim();