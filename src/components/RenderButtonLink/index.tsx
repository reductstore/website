import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const RenderButtonLink = ({ buttonUrl, buttonLabel, isHighlight, disabled, onClick }) => {
  const isExternalLink = buttonUrl.startsWith('http://') || buttonUrl.startsWith('https://');

  const buttonClass = clsx("button button--lg button--block", {
    "button--primary": isHighlight,
    "button--secondary": !isHighlight,
  });

  const handleClick = (event) => {
    onClick();
    if (disabled) {
      event.preventDefault();
    }
  };

  if (isExternalLink) {
    return (
      <a
        href={buttonUrl}
        onClick={handleClick}
        className={buttonClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonLabel}
      </a>
    );
  }

  return (
    <Link
      to={buttonUrl}
      onClick={handleClick}
      className={buttonClass}
    >
      {buttonLabel}
    </Link>
  );
};

export default RenderButtonLink;
