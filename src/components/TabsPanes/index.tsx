import React from "react";

import classNames from "classnames";
import { TabsPanesPane } from "./Pane/Pane";
import type { TabsPanesProps } from "./index.props";
import type { FC } from "react";
import type { PaneProps } from "./Pane/index.props";

const TabsPanes: FC<TabsPanesProps> = ({
  activePane,
  className,
  innerRef,
  panes,
  ...props
}) => {
  const currentPane = panes.reduce<PaneProps | null>((acc, pane) => {
    if (acc !== null) {
      return acc;
    }
    return pane.id === activePane ? pane : null;
  }, null);

  const { id, ...paneProps }: any = currentPane || {};

  return (
    <div
      {...props}
      ref={innerRef}
      role="menutabpanes"
      className={classNames(null, [className])}
    >
      {currentPane && <TabsPanesPane {...paneProps} />}
    </div>
  );
};

export default TabsPanes;
