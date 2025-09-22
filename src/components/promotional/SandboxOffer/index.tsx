import Link from "@docusaurus/Link";
import Admonition from "@theme/Admonition";

const SandboxOffer = () => {
  return (
    <>
      <Admonition type="info" title="Get Started for Free">
        <p>
          Get your own ReductStore environment with{" "}
          <strong>10GB free cloud storage</strong> or a{" "}
          <strong>test license for on-premise</strong> deployment — no credit
          card required.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            className="button button--primary"
            to="/solutions/cloud#cloud-signup"
            style={{ textDecoration: "none" }}
          >
            Get Test Server
          </Link>
          <Link
            className="button button--secondary"
            to="/contact?subject=TestLicense"
            style={{ textDecoration: "none" }}
          >
            Request a Test License
          </Link>
        </div>
      </Admonition>
    </>
  );
};

export default SandboxOffer;
