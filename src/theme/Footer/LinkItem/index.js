import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import isInternalUrl from "@docusaurus/isInternalUrl";
import IconExternalLink from "@theme/Icon/ExternalLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faGithub,
  faLinkedin,
  faDiscord,
  faDiscourse,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const IconSize = { height: "1rem" };

export default function FooterLinkItem({ item }) {
  const { to, href, label, prependBaseUrlToHref, ...props } = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  const getSocialIcon = (label) => {
    switch (label) {
      case "GitHub":
        return <FontAwesomeIcon icon={faGithub} style={IconSize} />;
      case "X":
        return <FontAwesomeIcon icon={faXTwitter} style={IconSize} />;
      case "LinkedIn":
        return <FontAwesomeIcon icon={faLinkedin} style={IconSize} />;
      case "Discord":
        return <FontAwesomeIcon icon={faDiscord} style={IconSize} />;
      case "Discourse":
        return <FontAwesomeIcon icon={faDiscourse} style={IconSize} />;
      case "YouTube":
        return <FontAwesomeIcon icon={faYoutube} style={IconSize} />;
      default:
        return null;
    }
  };

  const iconLabel = getSocialIcon(label);

  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {iconLabel}
      {iconLabel && " "}
      {label}
      {href && !isInternalUrl(href) && <IconExternalLink />}
    </Link>
  );
}
