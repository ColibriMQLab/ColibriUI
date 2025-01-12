import React from "react";
import classNames from "classnames/bind";
import styles from "./Switch.module.scss";
import type { SwitchProps } from "./index.props";

const clx = classNames.bind(styles);

const Switch = ({
  disabled,
  className,
  variant = "primary",
  ref,
  ...props
}: SwitchProps) => (
  <div
    className={clx(
      styles.root,
      {
        root_disabled: disabled ? 1 : 0,
      },
      className,
    )}
  >
    <input
      className={clx(styles.checkbox)}
      ref={ref}
      type="checkbox"
      {...props}
    />
    <div
      className={clx(styles.wrapper, {
        [`wrapper_variant_${variant}`]: variant ? 1 : 0,
      })}
    >
      <div className={clx(styles["base-switch"])} />
    </div>
  </div>
);

export default Switch;
