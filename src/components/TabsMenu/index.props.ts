import { RefObject } from "react";
import { TabProps } from "./Tab/Tab.props";

export type TabsMenuProps = {
  activeTab?: string;
  onChange?: (tabId: string) => void;
  tabs: TabProps[];
  tabsRefs?: RefObject<HTMLLIElement>[];
  innerRef?: RefObject<HTMLUListElement>;
  className?: string;
}