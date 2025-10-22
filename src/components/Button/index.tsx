import React from "react";
import classNames from "classnames/bind";
import { type ButtonProps } from "./index.props";
import styles from "./Button.module.scss";

const clx = classNames.bind(styles);

const Button = ({
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
  type,
  ref,
  ...props
}: ButtonProps) => (
  <button
    onClick={onClick}
    ref={ref}
    className={clx(
      "root",
      {
        root_icon: !!icon,
        root_fullWidth: !!fullWidth,
        [`size_${size}`]: !!size,
        [`variant_${variant}`]: !!variant,
        [`variant_${variant}_disabled`]: !!disabled,
      },
      className,
    )}
    disabled={disabled}
    data-testid="button"
    type={type || "button"}
    role="button"
    {...props}
  >
    {icon && <span className={clx(styles.icon)}>{icon}</span>}
    {iconStart && <span className={clx(styles.icon)}>{iconStart}</span>}
    {children && <span className={clx(styles.text)}>{children}</span>}
    {iconEnd && <span className={clx(styles.icon)}>{iconEnd}</span>}
  </button>
);

export default Button;
