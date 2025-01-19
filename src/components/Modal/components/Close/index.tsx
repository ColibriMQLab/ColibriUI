import React from "react";
import classNames from "classnames";
import { Close as CloseIcon } from "../../../Icons";
import styles from "./Close.module.scss";
import type { FC } from "react";

const Close: FC<{ onClick?: () => void }> = ({ onClick }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <CloseIcon className={classNames(styles.close)} onClick={onClick} />
);

export default Close;
