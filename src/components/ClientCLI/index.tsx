import React from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import CodeBlock from '@theme/CodeBlock';

export default function ClientCLI(): JSX.Element {
  return (
    <div className="container">
      <h3>CLI Client</h3>
      <CodeBlock className="language-bash">
        {cliClientCode}
      </CodeBlock>
    </div>
  );
}

const cliClientCode = `
pip install -U reduct-cli
rcli --help
`.trim();