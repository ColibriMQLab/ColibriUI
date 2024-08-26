import React, { forwardRef } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import type { ReactNode } from "react";

const clx = classNames.bind(styles);

export const HorizontalSliderNative = forwardRef<
  HTMLDivElement,
  { children: ReactNode }
>(({ children }, ref) => {
  return (
    <div className={clx(styles.root)}>
      <div className={clx(styles.container)} ref={ref}>
        {children}
      </div>
    </div>
  );
});
