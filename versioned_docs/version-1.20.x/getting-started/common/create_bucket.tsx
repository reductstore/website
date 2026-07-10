import React, { ReactNode } from "react";
import Link from "@docusaurus/Link";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";

interface Props {
  children: ReactNode;
}

export default function CreateBucketSection(
  props: Readonly<Props>,
): JSX.Element[] {
  const children = props.children;
  const activeVersion = useActiveVersion("default");
  return [
    <p>
      ReductStore organizes data into buckets, each of which has its own quota
      and settings. It's a necessary step to create a bucket before writing data
      to it. You can read more about buckets in the{" "}
      <b>
        <Link to={`${activeVersion.path}/guides/buckets`}>Buckets Guide</Link>
      </b>
      , but for now, let's just create one.
    </p>,

    <p> {children} </p>,

    <p>
      In this example we create a bucket with a FIFO quota of 1GB. This means
      that the oldest data will be deleted when the bucket reaches 1GB.
    </p>,
  ];
}
