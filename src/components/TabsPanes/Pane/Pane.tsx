import React from "react";
import classNames from "classnames";
import type { PaneProps } from "./index.props";
import type { FC } from "react";

export const TabsPanesPane: FC<PaneProps> = ({
  content,
  className,
  ...props
}) => (
  <div {...props} role="tabpanel" className={classNames(null, className)}>
    {content}
  </div>
);
