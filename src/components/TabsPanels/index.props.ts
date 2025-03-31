import type { RefObject } from "react";
import type { PanelProps } from "./Panel/index.props";

export type TabsPanelsProps = {
  activePanel?: string;
  panels: PanelProps[];
  innerRef?: RefObject<HTMLDivElement>;
  className?: string;
};
