import React, { useLayoutEffect, useRef } from "react";
import { MenuItem } from "../../../Menu/components/MenuItem";
import { Check } from "../../../Icons/Check";
import type { SelectItemProps } from "./index.props";

export const SelectItem = ({
  option,
  onClick,
  setScrollView,
  isPrevDisabled,
  isDisabled,
}: SelectItemProps) => {
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
    if (option.selected || (isPrevDisabled && !isDisabled)) {
      scrollToItem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
