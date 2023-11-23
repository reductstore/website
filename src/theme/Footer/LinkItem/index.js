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
} from "@fortawesome/free-brands-svg-icons";

export default function FooterLinkItem({ item }) {
  const { to, href, label, prependBaseUrlToHref, ...props } = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  const getSocialIcon = (label) => {
    switch (label) {
      case "GitHub":
        return <FontAwesomeIcon icon={faGithub} />;
      case "Twitter":
        return <FontAwesomeIcon icon={faXTwitter} />;
      case "LinkedIn":
        return <FontAwesomeIcon icon={faLinkedin} />;
      case "Discord":
        return <FontAwesomeIcon icon={faDiscord} />;
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
