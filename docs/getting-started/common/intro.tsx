import React from 'react';
import Link from '@docusaurus/Link';

interface Props {
    language: string;
    repository: string;
};

export default function Intro(props: Readonly<Props>) {
    const repoHref = `https://github.com/reductstore/${props.repository}`;
    return (
        <p>
            This quick start guide will walk you through the process of installing and using the <b><Link
            href={repoHref}>ReductStore {props.language} Client SDK</Link></b> to read and write data to a <b><Link
            href="https://www.reduct.store">ReductStore</Link></b> instance.
        </p>
    );
}