import type { ReactNode, Ref } from "react";

export type SelectItemProps = {
  option: {
    value: string;
    label: ReactNode;
    selected: boolean;
    disabled?: boolean;
  };
  onClick?: () => void;
  ref?: Ref<HTMLLIElement>;
};
