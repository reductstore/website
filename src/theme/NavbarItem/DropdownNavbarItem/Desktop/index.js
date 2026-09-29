import React, { useState, useRef, useEffect, useId } from "react";
import clsx from "clsx";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";
import Link from "@docusaurus/Link";
import useCases from "@site/src/data/useCases";
import { ICONS } from "@site/src/data/icons";
import styles from "./styles.module.css";

/** One-line descriptions keyed by the item's `to` or `href`. */
const DESCRIPTIONS = {
  // Product
  "/docs/how-does-it-work": "Architecture and core concepts",
  "/whitepaper": "Technical deep-dive paper",
  "/blog/comparisons/computer-vision/iot/performance-comparison-reductstore-vs-minio":
    "Benchmark vs MinIO for blob storage",
  "/blog/comparison/iot/reductstore-benchmark": "Benchmark vs MinIO & InfluxDB",
  "/blog/comparisons/iot/reductstore-vs-timescaledb": "Compared to TimescaleDB",
  "/blog/comparisons/iot/reductstore-vs-mongodb": "Compared to MongoDB",
  "/solutions/cloud": "Managed cloud deployments",
  // Developers
  "/download": "Binaries, Docker images, and packages",
  "/docs/getting-started": "Guides, API reference, and SDK docs",
  "/datasets": "Sample datasets for local testing",
  "https://github.com/reductstore/reductstore": "Open source, Apache-2.0",
  "https://community.reduct.store": "Forums, Discord, and GitHub issues",
  ...Object.fromEntries(useCases.map(({ link, data }) => [link, data])),
};

const ICON_NAMES = {
  "/docs/how-does-it-work": "LuBookOpen",
  "/whitepaper": "LuFileText",
  "/blog/comparisons/computer-vision/iot/performance-comparison-reductstore-vs-minio":
    "LuScale",
  "/blog/comparison/iot/reductstore-benchmark": "LuScale",
  "/blog/comparisons/iot/reductstore-vs-timescaledb": "LuScale",
  "/blog/comparisons/iot/reductstore-vs-mongodb": "LuScale",
  "/solutions/cloud": "LuCloud",
  "/download": "LuDownload",
  "/docs/getting-started": "LuBook",
  "/datasets": "LuDatabase",
  "https://github.com/reductstore/reductstore": "LuCode",
  "https://community.reduct.store": "LuUsers",
  ...Object.fromEntries(useCases.map(({ link, icon }) => [link, icon])),
};

export default function DropdownNavbarItemDesktop({
  items,
  position,
  className,
  onClick,
  ...props
}) {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [panelGap, setPanelGap] = useState(null);
  const closeTimer = useRef(null);

  // A short grace period so moving the pointer diagonally onto a narrow
  // panel does not close it.
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setShowDropdown(false), 250);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const dropdownId = useId();
  useEffect(() => {
    const closeOthers = (event) => {
      if (event.detail !== dropdownId) {
        clearTimeout(closeTimer.current);
        setShowDropdown(false);
      }
    };
    window.addEventListener("navbar-dropdown-open", closeOthers);
    return () =>
      window.removeEventListener("navbar-dropdown-open", closeOthers);
  }, [dropdownId]);

  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    window.dispatchEvent(
      new CustomEvent("navbar-dropdown-open", { detail: dropdownId }),
    );
    const item = dropdownRef.current;
    const navbar = item?.closest(".navbar");
    if (item && navbar) {
      setPanelGap(
        navbar.getBoundingClientRect().bottom -
          item.getBoundingClientRect().bottom,
      );
    }
    setShowDropdown(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
        return;
      }
      setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("focusin", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("focusin", handleClickOutside);
    };
  }, [dropdownRef]);

  const isVersionDropdown = className?.includes("navbar-version-dropdown");
  const twoCol = !isVersionDropdown && items.length > 5;

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        styles.navbarDropdown,
        "navbar__item",
        "dropdown",
        className,
        {
          "dropdown--right": position === "right",
        },
      )}
      onMouseEnter={openDropdown}
      onMouseLeave={scheduleClose}
    >
      <NavbarNavLink
        aria-haspopup="true"
        aria-expanded={showDropdown}
        role="button"
        href={props.to ? undefined : "#"}
        className={clsx("navbar__link", className)}
        {...props}
        onClick={props.to ? undefined : (e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (showDropdown) {
              setShowDropdown(false);
            } else {
              openDropdown();
            }
          }
          if (e.key === "Escape") {
            setShowDropdown(false);
          }
        }}
      >
        {props.children ?? props.label}
      </NavbarNavLink>

      {showDropdown && (
        <div
          className={clsx(styles.megaPanel, {
            [styles.compactPanel]: isVersionDropdown,
            [styles.twoCol]: twoCol,
            [styles.alignRight]: position === "right",
          })}
          style={
            panelGap === null ? undefined : { "--panel-gap": `${panelGap}px` }
          }
        >
          {items.map((item, i) => {
            const target = item.to ?? item.href;
            const desc = DESCRIPTIONS[target] ?? item.description;
            const Icon = ICONS[ICON_NAMES[target]];
            return (
              <Link
                key={i}
                to={target}
                className={clsx(styles.megaItem, { [styles.withIcon]: Icon })}
                onClick={() => setShowDropdown(false)}
              >
                {Icon && (
                  <span className={styles.megaIcon} aria-hidden="true">
                    <Icon />
                  </span>
                )}
                <span className={styles.megaLabel}>{item.label}</span>
                {desc && <span className={styles.megaDesc}>{desc}</span>}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
