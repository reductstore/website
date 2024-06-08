import React, {ReactNode} from 'react';

interface Props {
    children: ReactNode;
}

export default function DataQueryingSection(props: Readonly<Props>): JSX.Element {
    const children = props.children;
    return (
        <div>
            <p>
                Usually, we don't read a particular record by its timestamp, but query records in a time range.
            </p>

            <p> {children} </p>

            <p>
                The <code>query</code> method has many parameters for filtering and returning sample records. For more information
                and examples, see the <b><a href="/docs/guides/data-querying.mdx">Data Querying Guide</a></b>.
            </p>
        </div>
    );
}