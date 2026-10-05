import React from "react";
import clsx from "clsx";
import { type TypographyProps } from "./index.props";
import styles from "./Typography.module.scss";
import type { CSSProperties, FC, PropsWithChildren } from "react";

export const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  tag: Component = "span",
  children,
  variant,
  size,
  style,
  fontWeight,
  lines,
  className,
  ...props
}) => (
  <Component
    {...props}
    style={
      lines
        ? ({ ...style, "--typography-lines": lines } as CSSProperties)
        : { ...style }
    }
    className={clsx(
      {
        [styles[`size_${size}`]]: Boolean(size),
        [styles[`font-weight_${fontWeight}`]]: Boolean(fontWeight),
        [styles[`variant_${variant}`]]: Boolean(variant),
        [styles.clamp]: Boolean(lines),
      },
      className,
    )}
  >
    {children}
  </Component>
);
