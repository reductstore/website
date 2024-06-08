import React from 'react';

interface Props {
    language: string;
    repository: string;
};

export default function Intro(props: Readonly<Props>) {
    const repoHref = `https://github.com/reductstore/${props.repository}`;
    return (
        <p>
            This quick start guide will walk you through the process of installing and using the <b><a
            href={repoHref}>ReductStore {props.language} Client SDK</a></b> to read and write data to a <b><a
            href="https://wwww.reduct.store">ReductStore</a></b> instance.
        </p>
    );
}