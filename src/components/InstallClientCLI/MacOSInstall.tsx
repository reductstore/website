import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default function MacOSInstall(props) {
    const binaryInstall = `
wget https://github.com/reductstore/reduct-cli/releases/latest/download/reduct-cli.macos-amd64.tar.gz
tar -xvf reduct-cli.macos-amd64.tar.gz
chmod +x reduct-cli
sudo mv reduct-cli /usr/local/bin
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

