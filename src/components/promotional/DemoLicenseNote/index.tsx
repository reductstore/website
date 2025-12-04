import Link from "@docusaurus/Link";
import Admonition from "@theme/Admonition";

const DemoLicenseNote = () => {
  return (
    <Admonition type="info" title="License Information">
      <p>
        This feature is available under a <strong>commercial license</strong>.
        For testing, you can either use a free demo server (extension included)
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
          to="/contact?subject=DemoLicense"
          style={{ textDecoration: "none" }}
        >
          Request Demo License
        </Link>
      </div>
    </Admonition>
  );
};

export default DemoLicenseNote;
