import React from "react";
import classNames from "classnames/bind";
import styles from "./InputRoot.module.scss";
import type { InputProps } from "./index.props";

const clx = classNames.bind(styles);

const InputRoot = ({
  className,
  startIcon,
  endIcon,
  children,
  variant = "primary",
  disabled,
  error,
  style,
  size,
  ref,
}: InputProps) => (
  <div
    ref={ref}
    style={style}
    className={clx(
      styles.root,
      {
        [`variant_${variant}_disabled`]: disabled ? 1 : 0,
        [`variant_${variant}_error`]: error ? 1 : 0,
        [`size_${size}`]: !!size,
        [`variant_${variant}`]: !!variant,
      },
      className,
    )}
  >
    {startIcon && <div className={clx(styles["base-icon"])}>{startIcon}</div>}
    {children}
    {endIcon && <div className={clx(styles["base-icon"])}>{endIcon}</div>}
    {disabled && <div className={clx(styles["base-disable-wrapper"])} />}
  </div>
);

export default InputRoot;
