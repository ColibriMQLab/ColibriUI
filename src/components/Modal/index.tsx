import React, { useCallback, useEffect, useRef } from "react";
import clsx from "clsx";
import useScrollLock from "../hooks/useScrollLock";
import useTrapFocus from "../hooks/useTrapFocus";
import Portal from "../Portal";
import useMediaSizes from "../hooks/useMediaSizes";
import Content from "./components/Content";
import Close from "./components/Close";
import Title from "./components/Title";
import styles from "./Modal.module.scss";
import type { FC, PropsWithChildren } from "react";
import type { ModalProps } from "./index.props";

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  className,
  onClose,
  title,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useMediaSizes((bp) => bp.up("md"));

  useScrollLock();
  useTrapFocus(modalRef);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  return (
    <Portal>
      <div
        className={styles.root}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <div
          className={styles["modal-overlay"]}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
        <div
          className={clsx(
            styles["modal-wrapper"],
            {
              [styles["modal-wrapper_desktop"]]: isDesktop,
              [styles["modal-wrapper_mobile"]]: !isDesktop,
            },
            className,
          )}
          ref={modalRef}
        >
          {title ? (
            <div className={styles["title-wrapper"]}>
              <Title>{title}</Title>
              <Close onClick={handleClose} aria-label="Close modal" />
            </div>
          ) : (
            <div className={styles["close-wrapper"]}>
              <Close onClick={handleClose} aria-label="Close modal" />
            </div>
          )}
          <Content>{children}</Content>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
