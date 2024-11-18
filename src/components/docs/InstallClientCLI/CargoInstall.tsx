import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default function CargoInstall() {
  const binaryInstall = `
cargo install reduct-cli
`.trim();

  return (
    <>
      <CodeBlock className="language-bash">{binaryInstall}</CodeBlock>
      <p>
        You may need to install the latest version of Rust. Read more about it{" "}
        <b>
          <a href="https://www.rust-lang.org/tools/install">here</a>
        </b>
        .
      </p>
    </>
  );
}
