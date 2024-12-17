import React, { useMemo, useState } from "react";
import classNames from "classnames/bind";
import Dropdown from "../Dropdown";
import styles from "./index.module.scss";
import MenuOverlay from "./components/MenuOverlay";
import type { MultiSelectProps } from "./index.props";

const clx = classNames.bind(styles);

export function createGroupOptionString(
  groupIndex: number,
  optionValue: string,
) {
  return `group-${groupIndex}-option-${optionValue}`;
}

const MultiSelect = ({
  className,
  groups,
  zIndex,
  fontSize,
  disabled,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string[]>([]);

  const preparedGroups = useMemo(
    () =>
      groups.map((group, groupIndex) => ({
        title: group.title,
        options: group.options.map((option) => ({
          ...option,
          selected:
            value?.includes(
              createGroupOptionString(groupIndex, option.value),
            ) || false,
        })),
      })),
    [value, groups],
  );

  const handleChange = (key: string) => {
    setValue((prev) => {
      if (prev.indexOf(key) !== -1) {
        return prev.filter((prevValue) => prevValue !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  return (
    <div className={clx(styles.root, className)}>
      <Dropdown
        placement="bottom-start"
        onVisibleChange={setIsOpen}
        trigger={["click"]}
        zIndex={zIndex}
        fontSize={fontSize}
        disabled={!!disabled}
        overlay={
          <MenuOverlay groups={preparedGroups} onChange={handleChange} />
        }
        samewidth
      >
        <div>ffffffffffddggggggggggggggggg</div>
      </Dropdown>
    </div>
  );
};

export default MultiSelect;
