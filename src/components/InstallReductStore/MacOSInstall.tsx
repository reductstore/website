import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default function MacOSInstall(props) {
    const binaryInstall = `
wget https://github.com/reductstore/reductstore/releases/download/${props.version}/reductstore.macos-amd64.tar.gz
tar xfv reductstore.macos-amd64.tar.gz
chmod +x reductstore
RS_DATA_PATH=./data ./reductstore
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

