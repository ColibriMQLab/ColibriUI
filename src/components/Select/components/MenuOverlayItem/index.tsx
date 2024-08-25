import React, { useLayoutEffect, useRef } from "react";
import MenuItem from "../../../Menu/components/MenuItem";
import Check from "../../../Icons/Check";
import type { Coordinates } from "../../index.props";

type SelectItemProps = {
  option: {
    value: string;
    label: React.ReactNode;
    selected: boolean;
  };
  onClick?: () => void;
  setScrollView: (value: Coordinates) => void;
};

const SelectItem = ({ option, onClick, setScrollView }: SelectItemProps) => {
  const ref = useRef<null | HTMLLIElement>(null);

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
    if (option.selected) {
      scrollToItem();
    }
  }, []);

  return (
    <MenuItem ref={ref} onClick={onClick} isSelected={option.selected}>
      {option.label}
      {option.selected && <Check width={16} height={16} />}
    </MenuItem>
  );
};

export default SelectItem;
