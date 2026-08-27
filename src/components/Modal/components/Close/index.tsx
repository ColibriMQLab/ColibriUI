import React from "react";
import { Close as CloseIcon } from "../../../Icons";
import styles from "./Close.module.scss";
import type { FC } from "react";
import type { CloseButtonProps } from "./index.props";

export const Close: FC<CloseButtonProps> = ({
  onClick,
  "aria-label": ariaLabel,
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel ?? "Close"}
    className={styles["close-button"]}
  >
    <CloseIcon width={18} height={18} />
  </button>
);
