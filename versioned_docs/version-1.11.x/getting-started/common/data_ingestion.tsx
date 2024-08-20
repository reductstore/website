import React, {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useActiveVersion} from "@docusaurus/plugin-content-docs/client";

interface Props {
    children: ReactNode;
}

export default function DataIngestionSection(props: Readonly<Props>): JSX.Element {
    const children = props.children;
    const activeVersion = useActiveVersion('default');
    return (
        <div>
            <p>
                Time series data is stored in entries within a bucket. An entry is a collection of records with unique
                timestamps. It must have a unique name within the bucket and usually represents a data source,
                such as <b>
                <Link to="/use-cases/vibration-sensors">a vibration sensor</Link>
            </b> or <b>
                <Link to="/blog/tutorials/computer-vision/3-ways-stora-data-for-computer-vision-applications">a CV
                    camera</Link>
            </b>.
            </p>

            <p> {children} </p>

            <p>
                This is the simplest case of writing data using the Python SDK. You can also write data in chunks and
                annotate records with labels. You can find more information and examples in the <b><Link
                to={`${activeVersion.path}/guides/data-ingestion`}>Data Ingestion Guide</Link></b>.
            </p>
        </div>
    );
}