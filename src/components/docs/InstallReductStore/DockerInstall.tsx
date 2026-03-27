import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default function DockerContent() {
  return (
    <>
      <p>Runs on amd64, arm64, and arm32 platforms.</p>
      <CodeBlock className="language-bash">
        docker run -p 8383:8383 -v $&#123;PWD&#125;/data:/data
        reduct/store:latest
      </CodeBlock>
      <p>
        Since v1.19, the container runs as a non-root user, so the mounted
        directory must exist and be writable by UID/GID <code>10001:10001</code>.
      </p>
    </>
  );
}
