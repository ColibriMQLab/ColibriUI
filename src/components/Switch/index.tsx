import React from "react";
import classNames from "classnames/bind";
import Typography from "../Typography";
import styles from "./Switch.module.scss";
import type { SwitchProps } from "./index.props";

const clx = classNames.bind(styles);

const Switch = ({
  disabled,
  className,
  variant = "primary",
  hint,
  hasError,
  id,
  label,
  ref,
  ...props
}: SwitchProps) => (
  <div
    className={clx(
      styles.root,
      {
        root_disabled: disabled,
      },
      className,
    )}
  >
    <label className={clx(styles.label)} htmlFor={id}>
      <input
        className={clx(styles.checkbox)}
        ref={ref}
        id={id}
        type="checkbox"
        disabled={disabled}
        {...props}
      />
      <div
        className={clx(styles.wrapper, {
          [`wrapper_variant_${variant}`]: variant,
          wrapper_disabled: disabled,
          wrapper_error: hasError,
        })}
      >
        <div className={clx(styles["base-switch"])} />
      </div>
      {label && <span className={clx(styles.text)}>{label}</span>}
    </label>
    {hint && (
      <Typography variant={hasError ? "alert" : "secondary"} tag="span">
        {hint}
      </Typography>
    )}
  </div>
);

export default Switch;
