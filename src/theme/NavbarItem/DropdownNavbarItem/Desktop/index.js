import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";
import Link from "@docusaurus/Link";
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
  // Use Cases
  "/blog/database-for-robotics": "Sensor and camera data pipelines",
  "/blog/daq-manufacture-system": "High-frequency acquisition pipelines",
  "/blog/computer-vision-applications": "Image and video dataset management",
  "/blog/how-to-store-vibration-sensor-data": "Waveform storage at the edge",
  "/blog/advice/database/mqtt-data-storage": "Ingest and store MQTT telemetry",
  "/use-cases": "Browse all industries and scenarios",
  // Developers
  "/download": "Binaries, Docker images, and packages",
  "/docs/getting-started": "Guides, API reference, and SDK docs",
  "/datasets": "Sample datasets for local testing",
  "https://github.com/reductstore/reductstore": "Open source, Apache-2.0",
  "https://community.reduct.store": "Forums, Discord, and GitHub issues",
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

  const openDropdown = () => {
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
      onMouseLeave={() => setShowDropdown(false)}
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
            return (
              <Link
                key={i}
                to={target}
                className={styles.megaItem}
                onClick={() => setShowDropdown(false)}
              >
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
