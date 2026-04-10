import Link from "@docusaurus/Link";
import Admonition from "@theme/Admonition";

const DemoLicenseNote = () => {
  return (
    <Admonition type="info" title="License Information">
      <p>
        This feature is available in <strong>ReductStore Pro</strong> under a
        commercial license. For testing, you can either use a free demo server
        or request a demo license for your own deployment.
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
          to="/demo-license"
          style={{ textDecoration: "none" }}
        >
          Request Demo License
        </Link>
      </div>
    </Admonition>
  );
};

export default DemoLicenseNote;
