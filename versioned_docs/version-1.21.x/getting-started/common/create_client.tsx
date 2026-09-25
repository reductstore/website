import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function CreateClientSection(
  props: Readonly<Props>,
): JSX.Element {
  const children = props.children;
  return (
    <div>
      <p>
        Before you can interact with a ReductStore instance, you must create a{" "}
        <code>Client</code> object that represents a connection to the
        ReductStore instance.
      </p>

      <p> {children} </p>
    </div>
  );
}
