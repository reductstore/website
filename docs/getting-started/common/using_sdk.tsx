import React from 'react';
import CodeBlock from "@theme/CodeBlock";

interface Props {
    language: string;
    example: string;
};

export default function UsingSdkSection(props: Readonly<Props>): JSX.Element {
    return (
        <div>
            <p>
                Now when you have the {props.language} SDK installed and a ReductStore instance running, you can start using the SDK to
                interact with the ReductStore database.
                Here is an example of using the SDK to perform basic operations on a ReductStore instance:
            </p>

            <CodeBlock language={props.language}>
                {props.example}
            </CodeBlock>

            <p>
                Let's break down what this example is doing.
            </p>
        </div>
    );
}