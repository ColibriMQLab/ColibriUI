import React, { forwardRef } from "react";
import classNames from "classnames/bind";
import { type ButtonProps } from "./index.props";
import styles from "./Button.module.scss";

const clx = classNames.bind(styles);

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
        onClick={onClick}
        ref={ref}
        className={clx(
          styles.root,
          {
            root_icon: !!icon,
            root_disabled: disabled ? 1 : 0,
            root_fullWidth: fullWidth ? 1 : 0,
            [`size_${size}`]: !!size,
            [`variant_${variant}`]: !!variant,
          },
          className,
        )}
        disabled={disabled}
        data-cy="button"
        {...props}
      >
        {icon && <span className={clx(styles.icon)}>{icon}</span>}
        {iconStart && <span className={clx(styles.icon)}>{iconStart}</span>}
        {children && children}
        {iconEnd && <span className={clx(styles.icon)}>{iconEnd}</span>}
      </button>
    );
  },
);

export default Button;
