import React from 'react';
import CodeBlock from '@theme/CodeBlock';

export default function LinuxInstall(props) {
    const binaryInstall = `
wget https://github.com/reductstore/reduct-cli/releases/latest/download/reduct-cli.linux-amd64.tar.gz
tar -xvf reduct-cli.linux-amd64.tar.gz
chmod +x reduct-cli
mv reduct-cli /usr/local/bin
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