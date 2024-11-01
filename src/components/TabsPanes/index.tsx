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

  if (currentPane === null) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `Panel with id ${activePane} was not found in the list of elements.`,
      );
    }
  }

  const { id, ...paneProps }: any = currentPane || {};

  return (
    <div
      {...props}
      ref={innerRef}
      role="tabpanel"
      className={classNames(null, [className])}
    >
      {currentPane && <TabsPanesPane {...paneProps} />}
    </div>
  );
};

export default TabsPanes;
