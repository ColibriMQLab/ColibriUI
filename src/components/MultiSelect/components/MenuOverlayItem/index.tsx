import React from "react";
import MenuItem from "../../../Menu/components/MenuItem";
import Check from "../../../Icons/Check";

type SelectItemProps = {
	option: {
		value: string;
		label: React.ReactNode;
		selected: boolean;
		disabled?: boolean;
	};
	onClick?: () => void;
	ref?: React.Ref<HTMLLIElement>;
};

const SelectItem = ({ option, onClick, ref }: SelectItemProps) => (
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

export default SelectItem;
