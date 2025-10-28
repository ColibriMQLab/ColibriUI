import React from "react";
import clsx from "clsx";
import Typography from "../Typography";
import styles from "./Switch.module.scss";
import type { SwitchProps } from "./index.props";

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
    className={clsx(
      styles.root,
      {
        [styles["root_disabled"]]: Boolean(disabled),
      },
      className,
    )}
  >
    <label className={styles.label} htmlFor={id}>
      <input
        className={styles.checkbox}
        ref={ref}
        id={id}
        type="checkbox"
        disabled={disabled}
        {...props}
      />
      <div
        className={clsx(styles.wrapper, {
          [styles[`wrapper_variant_${variant}`]]: Boolean(variant),
          [styles["wrapper_disabled"]]: Boolean(disabled),
          [styles["wrapper_error"]]: Boolean(hasError),
        })}
      >
        <div className={styles["base-switch"]} />
      </div>
      {label && <span className={styles.text}>{label}</span>}
    </label>
    {hint && (
      <Typography variant={hasError ? "alert" : "secondary"} tag="span">
        {hint}
      </Typography>
    )}
  </div>
);

export default Switch;
