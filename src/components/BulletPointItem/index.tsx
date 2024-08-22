import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

type BulletPointItemProps = {
  children: React.ReactNode;
  icon?: IconDefinition;
  size?: "xs" | "sm" | "lg" | "1x" | "2x" | "3x" | "4x" | "5x";
};

export default function BulletPointItem({
  children,
  icon,
  size = "1x",
}: BulletPointItemProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <li className={styles.bulletPointItem}>
      {isLoaded && (
        <FontAwesomeIcon
          icon={icon || faCheckCircle}
          className={styles.bulletIcon}
          size={size}
        />
      )}
      {children}
    </li>
  );
}
