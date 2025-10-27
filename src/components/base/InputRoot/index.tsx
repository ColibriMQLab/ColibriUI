import React from "react";
import classNames from "classnames";
import styles from "./InputRoot.module.scss";
import type { InputProps } from "./index.props";

const InputRoot = ({
  className,
  startIcon,
  endIcon,
  children,
  variant = "primary",
  disabled,
  hasError,
  style,
  size,
  inputRef,
}: InputProps) => (
  <div
    ref={inputRef}
    style={style}
    className={classNames(
      styles.root,
      styles[`variant_${variant}`],
      size && styles[`size_${size}`],
      {
        [styles[`variant_${variant}_disabled`]]: disabled,
        [styles[`variant_${variant}_error`]]: hasError,
      },
      className,
    )}
  >
    {startIcon && <div className={styles["base-icon"]}>{startIcon}</div>}
    {children}
    {endIcon && <div className={styles["base-icon"]}>{endIcon}</div>}
    {disabled && <div className={styles["base-disable-wrapper"]} />}
  </div>
);

export default InputRoot;
