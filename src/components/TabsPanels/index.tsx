import React from "react";

import classNames from "classnames";
import { TabsPanel } from "./Panel";
import type { TabsPanelsProps } from "./index.props";
import type { FC } from "react";
import type { PanelProps } from "./Panel/index.props";

const TabsPanels: FC<TabsPanelsProps> = ({
  activePanel,
  className,
  innerRef,
  panels,
  ...props
}) => {
  const currentPanel = panels.reduce<PanelProps | null>((acc, panel) => {
    if (acc !== null) {
      return acc;
    }
    return panel.id === activePanel ? panel : null;
  }, null);

  if (!currentPanel) {
    return null;
  }

  const { id, content, ...panelProps } = currentPanel;

  return (
    <div
      {...props}
      ref={innerRef}
      role="menutabpanels"
      className={classNames(null, [className])}
    >
      <TabsPanel
        aria-labelledby={`tab-${activePanel}`}
        id={id}
        content={content}
        {...panelProps}
      />
    </div>
  );
};

export default TabsPanels;
