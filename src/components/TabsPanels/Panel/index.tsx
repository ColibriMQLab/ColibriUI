import React from "react";
import classNames from "classnames";
import type { PanelProps } from "./index.props";
import type { FC } from "react";

export const TabsPanel: FC<PanelProps> = ({
  content,
  className,
  id,
  ...props
}) => (
  <div
    {...props}
    id={id}
    role="tabpanel"
    className={classNames(null, className)}
  >
    {content}
  </div>
);
