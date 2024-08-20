import React, {ReactNode} from 'react';
import MDXComponents from '@theme-original/MDXComponents';

interface Props {
    children: ReactNode;
}

export default function InstallSdk(props: Readonly<Props>) {
    return (
        [
            <p>
                {props.children}
            </p>
        ]
    );
}