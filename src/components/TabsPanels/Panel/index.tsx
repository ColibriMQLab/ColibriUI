import React from "react";
import clsx from "clsx";
import type { PanelProps } from "./index.props";
import type { FC } from "react";

export const TabsPanel: FC<PanelProps> = ({
  content,
  className,
  id,
  ...props
}) => (
  <div {...props} id={id} role="tabpanel" className={clsx(className)}>
    {content}
  </div>
);
