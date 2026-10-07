import React from "react";
import clsx from "clsx";
import {
  type TypographyProps,
  type TypographyResponsiveSize,
  type TypographySize,
} from "./index.props";
import styles from "./Typography.module.scss";
import type { CSSProperties, FC, PropsWithChildren } from "react";

const getSizeClassNames = (
  size: TypographySize | TypographyResponsiveSize | undefined,
): string[] => {
  if (!size) return [];
  if (typeof size === "string") return [styles[`size_${size}`]];

  return Object.entries(size).flatMap(([breakpoint, name]) => {
    if (!name) return [];

    return [
      styles[
        breakpoint === "base" ? `size_${name}` : `size_${breakpoint}_${name}`
      ],
    ];
  });
};

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
      getSizeClassNames(size),
      {
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
