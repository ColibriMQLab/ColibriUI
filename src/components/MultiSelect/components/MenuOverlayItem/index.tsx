import React, { forwardRef } from "react";
import MenuItem from "../../../Menu/components/MenuItem";
import Check from "../../../Icons/Check";
import type { PropsWithChildren } from "react";

type SelectItemProps = {
  option: {
    value: string;
    label: React.ReactNode;
    selected: boolean;
    disabled?: boolean;
  };
  onClick?: () => void;
};

const SelectItem: React.ForwardRefRenderFunction<
  HTMLLIElement,
  PropsWithChildren<SelectItemProps>
> = ({ option, onClick }, ref) => (
  <MenuItem
    ref={ref}
    onClick={onClick}
    isSelected={option.selected}
    disabled={option.disabled}
  >
    {option.label}
    {option.selected && <Check width={16} height={16} />}
  </MenuItem>
);

export default forwardRef(SelectItem);
