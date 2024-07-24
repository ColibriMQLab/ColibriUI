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
  isError,
}) => {
  const control = (
    <label className={clx(styles.label)}>
      <div className={clx(styles.wrapper)}>
        <input
          className={clx(
            styles.control,
            {
              [`control_variant_${variant}`]: !!variant,
            },
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
          className={clx(styles.fakeCheckbox, {
            [`variant_${variant}_disabled`]: disabled ? 1 : 0,
            [`variant_${variant}_error`]: isError ? 1 : 0,
            [`variant_${variant}_checked`]: checked ? 1 : 0,
            checked: checked ? 1 : 0,
            [`variant_${variant}`]: !!variant,
          })}
        />
        <span className={clx(styles.text)}>{label}</span>
      </div>
    </label>
  );

  return (
    <div className={clx(styles.root)}>
      {control}
      {hint && (
        <Typography variant={isError ? "alert" : "secondary"} tag="span">
          {hint}
        </Typography>
      )}
    </div>
  );
};

export default Checkbox;
