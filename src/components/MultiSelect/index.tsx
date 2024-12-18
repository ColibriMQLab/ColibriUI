import React, { useCallback, useMemo, useState } from "react";
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

const sortedItems = (items: string[]) => items.sort((a, b) => {

  if (!a || !b) return 0;

  const matchA = a.match(/group-(\d+)-option-(\d+)/);
  const matchB = b.match(/group-(\d+)-option-(\d+)/);

  if (!matchA || !matchB) {
    return 0;
  }

  const [, groupA, optionA] = matchA.map(Number);
  const [, groupB, optionB] = matchB.map(Number);

  return groupA - groupB || optionA - optionB;
});

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

  const handleChange = useCallback((key: string) => {
    setValue((prev) => {
      if (prev.indexOf(key) !== -1) {
        return prev.filter((prevValue) => prevValue !== key);
      } else {
        return sortedItems([...prev, key]);
      }
    });
  }, [sortedItems]);

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
