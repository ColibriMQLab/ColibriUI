import React from "react";
import clsx from "clsx";
import { useModalContext } from "../../context";
import { Close } from "../Close";
import styles from "./Header.module.scss";
import type { FC } from "react";
import type { HeaderProps } from "./index.props";

export const Header: FC<HeaderProps> = ({
  children,
  className,
  overlay = false,
  closeAriaLabel = "Close modal",
  ...props
}) => {
  const { onClose } = useModalContext();

  return (
    <div
      {...props}
      className={clsx(
        styles.root,
        { [styles.root_overlay]: overlay },
        className,
      )}
    >
      {children}
      <Close
        className={styles.close}
        onClick={onClose}
        aria-label={closeAriaLabel}
      />
    </div>
  );
};
