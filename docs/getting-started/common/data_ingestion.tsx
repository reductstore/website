import React, {ReactNode} from 'react';

interface Props {
    children: ReactNode;
}

export default function DataIngestionSection(props: Readonly<Props>): JSX.Element {
    const children = props.children;
    return (
        <div>
            <p>
                Time series data is stored in entries within a bucket. An entry is a collection of records with unique
                timestamps. It must have a unique name within the bucket and usually represents a data source,
                such as <b>
                <a href="src/pages/use-cases/vibration-sensors/index.tsx">a vibration sensor</a>
            </b> or <b>
                <a href="/blog/2024-02-16-3-ways-stora-data-for-computer-vision-applications/index.mdx">a CV
                    camera</a>
            </b>.
            </p>

            <p> {children} </p>

            <p>
                This is the simplest case of writing data using the Python SDK. You can also write data in chunks and
                annotate records with labels. You can find more information and examples in the <b><a
                href="/docs/guides/data-ingestion.mdx">Data Ingestion Guide</a></b>.
            </p>
        </div>
    );
}