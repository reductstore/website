import React, {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useActiveVersion} from "@docusaurus/plugin-content-docs/client";

interface Props {
    children: ReactNode;
}

export default function DataQueryingSection(props: Readonly<Props>): JSX.Element {
    const children = props.children;
    const activeVersion = useActiveVersion('default');

    return (
        <div>
            <p>
                Usually, we don't read a particular record by its timestamp, but query records in a time range.
            </p>

            <p> {children} </p>

            <p>
                The query method has many parameters for filtering and returning sample records. For more information
                and examples, see the <b><Link to={`${activeVersion.path}/guides/data-querying`}>Data Querying Guide</Link></b>.
            </p>
        </div>
    );
}