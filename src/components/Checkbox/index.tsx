import React from "react";
import classNames from "classnames/bind";
import Typography from "../Typography";
import styles from "./Checkbox.module.scss";
import type { FC } from "react";
import type { CheckboxProps } from "./index.props";

const clx = classNames.bind(styles);

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
  <div className={clx(styles.root)}>
    <label className={clx(styles.label)} htmlFor={id}>
      <input
        className={clx(
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
        className={clx(styles["fake-checkbox"], styles[`variant_${variant}`], {
          [styles[`variant_${variant}_disabled`]]: disabled,
          [styles[`variant_${variant}_error`]]: hasError,
          [styles[`variant_${variant}_checked`]]: checked,
          [styles.checked]: checked,
        })}
      />
      <span className={clx(styles.text)}>{label}</span>
    </label>
    {hint && (
      <Typography variant={hasError ? "alert" : "secondary"} tag="span">
        {hint}
      </Typography>
    )}
  </div>
);

export default Checkbox;
