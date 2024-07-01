import React from "react";
import classNames from "classnames/bind";
import { type TypographyProps } from "./index.props";
import styles from "./Typography.module.scss";
import type { FC, PropsWithChildren } from "react";

const cx = classNames.bind(styles);

const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  tag: Element = "span",
  children,
  variant,
  size,
  fontWeight,
  className,
  ...props
}) => (
  <Element
    {...props}
    className={cx(
      {
        root: true,
        [`size_${size}`]: !!size,
        [`fontWeight_${fontWeight}`]: !!fontWeight,
        [`variant_${variant}`]: !!variant,
      },
      className,
    )}
  >
    {children}
  </Element>
);

export default Typography;
