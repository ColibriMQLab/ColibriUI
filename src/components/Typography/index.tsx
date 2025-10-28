import React from "react";
import clsx from "clsx";
import { type TypographyProps } from "./index.props";
import styles from "./Typography.module.scss";
import type { FC, PropsWithChildren } from "react";

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
    className={clsx(
      {
        [styles[`size_${size}`]]: Boolean(size),
        [styles[`font-weight_${fontWeight}`]]: Boolean(fontWeight),
        [styles[`variant_${variant}`]]: Boolean(variant),
      },
      className,
    )}
  >
    {children}
  </Component>
);

export default Typography;
