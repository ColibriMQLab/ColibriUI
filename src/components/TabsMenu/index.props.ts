import type { RefObject } from "react";
import type { TabProps } from "./Tab/Tab.props";

export type Size = "s" | "m" | "l";

export type TabsMenuProps = {
  activeTab?: string;
  onChange?: (tabId: string) => void;
  tabs: TabProps[];
  innerRef?: RefObject<HTMLUListElement>;
  className?: string;
  size?: Size;
};
