import Link from "@docusaurus/Link";
import Admonition from "@theme/Admonition";

const SandboxOffer = () => {
  return (
    <>
      <Admonition type="info" title="Get Started for Free">
        <p>
          Get your own ReductStore environment with{" "}
          <strong>10GB free cloud storage</strong> or a{" "}
          <strong>demo license for on-premise</strong> deployment — no credit
          card required.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            className="button button--primary"
            to="/solutions/cloud"
            style={{ textDecoration: "none" }}
          >
            Get Demo Server
          </Link>
          <Link
            className="button button--secondary"
            to="/contact?subject=DemoLicense"
            style={{ textDecoration: "none" }}
          >
            Request Demo License
          </Link>
        </div>
      </Admonition>
    </>
  );
};

export default SandboxOffer;
