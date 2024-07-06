import React from "react";
import { Close as CloseIcon } from "../../../Icons";
import type { FC } from "react";
import classNames from "classnames";
import styles from './Close.module.scss'

const Close: FC<{ onClick?: () => void }> = ({ onClick }) => {
  return <CloseIcon className={classNames(styles.close)} onClick={onClick} />;
};

export default Close;
