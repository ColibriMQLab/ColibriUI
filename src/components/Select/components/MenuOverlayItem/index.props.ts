import type { ReactNode } from "react";
import type { Coordinates } from "../../index.props";

export type SelectItemProps = {
  option: {
    value: string;
    label: ReactNode;
    selected: boolean;
    disabled?: boolean;
  };
  onClick?: () => void;
  setScrollView: (value: Coordinates) => void;
  isPrevDisabled?: boolean;
  isDisabled?: boolean;
};
