import React from "react";
import clsx from "clsx";
import Typography from "../Typography";
import styles from "./Checkbox.module.scss";
import type { FC } from "react";
import type { CheckboxProps } from "./index.props";

const Checkbox: FC<CheckboxProps> = ({
  id,
  name,
  value,
  label,
  hint,
  checked,
  onChange,
  onFocus,
  onBlur,
  variant = "primary",
  className,
  disabled,
  hasError,
}) => (
  <div className={styles.root}>
    <label className={styles.label} htmlFor={id}>
      <input
        className={clsx(
          styles.control,
          styles[`control_variant_${variant}`],
          className,
        )}
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      />
      <span
        className={clsx(styles["fake-checkbox"], styles[`variant_${variant}`], {
          [styles[`variant_${variant}_disabled`]]: Boolean(disabled),
          [styles[`variant_${variant}_error`]]: Boolean(hasError),
          [styles[`variant_${variant}_checked`]]: Boolean(checked),
          [styles.checked]: Boolean(checked),
        })}
      />
      <span className={styles.text}>{label}</span>
    </label>
    {hint && (
      <Typography variant={hasError ? "alert" : "secondary"} tag="span">
        {hint}
      </Typography>
    )}
  </div>
);

export default Checkbox;
