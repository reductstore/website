import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default function DockerContent() {
  return (
    <>
      <p>Runs on amd64, arm64, and arm32 platforms.</p>
      <CodeBlock className="language-bash">
        {
          'docker run -p 8383:8383 -v ${PWD}/data:/data -e RS_API_TOKEN="my-token" reduct/store:latest'
        }
      </CodeBlock>
    </>
  );
}
