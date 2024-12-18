import React, { useLayoutEffect, useRef } from "react";
import MenuItem from "../../../Menu/components/MenuItem";
import Check from "../../../Icons/Check";
import type { Coordinates, Group } from "../../index.props";

type SelectItemProps = {
  option: {
    value: string;
    label: React.ReactNode;
    selected: boolean;
    disabled?: boolean;
  };
  onClick?: () => void;
  setScrollView: (value: Coordinates) => void;
  groups?: any;
  ref: React.RefObject<HTMLLIElement>;
};

const SelectItem = ({ groups, option, onClick, setScrollView, ref }: SelectItemProps) => {
  // const ref = useRef<null | HTMLLIElement>(null);

  function scrollToItem(): void {
    if (!ref.current) {
      return;
    }

    const { offsetTop, offsetHeight } = ref.current;

    setScrollView({
      top: offsetTop,
      height: offsetHeight,
    });
  }

  useLayoutEffect(() => {
    const allOptions = groups.flatMap((group: Group) => group.options);
    const firstSelectedOption =  allOptions.find((option: SelectItemProps['option']) => option.selected);

    if (firstSelectedOption) {
      scrollToItem();
    }
  }, []);

  return (
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
};

export default SelectItem;
