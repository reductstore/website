import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={clsx("modal-overlay", styles.modalOverlay)}
      onClick={onClose}
    >
      <div
        className={clsx("modal-content shadow--md", styles.modalContent)}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
