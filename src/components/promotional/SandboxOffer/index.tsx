import Link from "@docusaurus/Link";
import Admonition from "@theme/Admonition";

const SandboxOffer = () => {
  return (
    <>
      <Admonition type="info" title="Get Started with ReductStore Pro">
        <p>
          Run ReductStore Pro in production with simple{" "}
          <strong>pay-as-you-go pricing</strong> — billed on peak storage, with
          no upfront commitment.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            className="button button--primary"
            to="/pricing"
            style={{ textDecoration: "none" }}
          >
            Get Started
          </Link>
        </div>
      </Admonition>
    </>
  );
};

export default SandboxOffer;
