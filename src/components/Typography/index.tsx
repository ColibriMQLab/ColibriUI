import React from "react";
import classNames from "classnames/bind";
import { type Props } from "./index.props";
import styles from "./Typography.module.scss";
import type { FC, PropsWithChildren } from "react";

const clx = classNames.bind(styles);

const Typography: FC<PropsWithChildren<Props>> = ({
  tag: Element = "span",
  children,
  variant,
  size,
  style,
  fontWeight,
  className,
  ...props
}) => (
  <Element
    {...props}
    style={style}
    className={clx(
      {
        root: true,
        [`size_${size}`]: !!size,
        [`font-weight_${fontWeight}`]: !!fontWeight,
        [`variant_${variant}`]: !!variant,
      },
      className,
    )}
  >
    {children}
  </Element>
);

export default Typography;
