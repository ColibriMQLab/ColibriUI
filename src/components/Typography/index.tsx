import React from "react";
import classNames from "classnames/bind";
import { type TypographyProps } from "./index.props";
import styles from "./Typography.module.scss";
import type { FC, PropsWithChildren } from "react";

const clx = classNames.bind(styles);

const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  tag: Component = "span",
  children,
  variant,
  size,
  style,
  fontWeight,
  className,
  ...props
}) => (
  <Component
    {...props}
    style={{ ...style }}
    className={clx(
      {
        [`size_${size}`]: Boolean(size),
        [`font-weight_${fontWeight}`]: Boolean(fontWeight),
        [`variant_${variant}`]: Boolean(variant),
      },
      className,
    )}
  >
    {children}
  </Component>
);

export default Typography;
