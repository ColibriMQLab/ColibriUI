import type { ReactNode } from "react";
import type { GroupProps } from "../../index.props";

export interface IOption {
  selected: boolean;
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export type MenuOverlayGroup = Omit<GroupProps, "options" | "value"> & {
  options: IOption[];
  value: string;
};

export type MenuOverlayProps = {
  groups: MenuOverlayGroup[];
  onChange: (key: string) => void;
};
