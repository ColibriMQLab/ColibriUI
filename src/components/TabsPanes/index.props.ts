import type { RefObject } from "react";
import type { PaneProps } from "./Pane/index.props";

export type TabsPanesProps = {
  activePane?: string;
  panes: PaneProps[];
  innerRef?: RefObject<HTMLDivElement>;
  className?: string;
};
