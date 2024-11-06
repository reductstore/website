import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

interface RenderButtonLinkProps {
  buttonLabel: string;
  isHighlight: boolean;
  buttonUrl?: string;
  onClick?: () => void;
}

const RenderButtonLink = ({
  buttonLabel,
  isHighlight,
  buttonUrl,
  onClick,
}: RenderButtonLinkProps) => {
  if (!buttonUrl && !onClick) return null;

  const isExternalLink =
    buttonUrl &&
    (buttonUrl.startsWith("http://") || buttonUrl.startsWith("https://"));

  const buttonClass = clsx("button button--lg button--block button--primary", {
    "button--primary": !isHighlight,
    "button--secondary": isHighlight,
  });

  if (isExternalLink) {
    return (
      <a
        href={buttonUrl}
        onClick={onClick}
        className={buttonClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonLabel}
      </a>
    );
  }

  return (
    <Link to={buttonUrl || "#"} onClick={onClick} className={buttonClass}>
      {buttonLabel}
    </Link>
  );
};

export default RenderButtonLink;
