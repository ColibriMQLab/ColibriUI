import React, { forwardRef } from "react";
import classNames from "classnames/bind";
import { type ButtonProps } from "./index.props";
import styles from "./Button.module.scss";

const clx = classNames.bind(styles);

const getWidth = (size?: string) => {
  switch (size) {
    case "xs":
      return "29px";
    case "s":
      return "32px";
    case "l":
      return "42px";
    default:
      return "36px";
  }
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      fullWidth = false,
      variant = "primary",
      iconStart,
      iconEnd,
      icon,
      size,
      children,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={{ width: fullWidth ? "100%" : "fit-content" }}
        onClick={onClick}
        ref={ref}
        className={clx(
          {
            root: true,
            disabled: disabled,
            [`size_${size}`]: !!size,
            [`variant_${variant}`]: !!variant,
          },
          className,
        )}
        disabled={disabled}
        data-cy="button"
        {...props}
      >
        {icon && (
          <span
            style={{
              padding: 0,
              margin: 0,
              borderRadius: "50%",
              width: getWidth(size),
            }}
            className={clx(styles.icon)}
          >
            {icon}
          </span>
        )}
        {iconStart && <span className={clx(styles.icon)}>{iconStart}</span>}
        {children && children}
        {iconEnd && <span className={clx(styles.icon)}>{iconEnd}</span>}
      </button>
    );
  },
);

export default Button;
