import React, { useMemo, useState } from "react";
import classNames from "classnames/bind";
import Dropdown from "../Dropdown";
import styles from "./index.module.scss";
import MenuOverlay from "./components/MenuOverlay";
import type { MultiSelectProps } from "./index.props";

const clx = classNames.bind(styles);

const MultiSelect = ({
  className,
  groups,
  value,
  zIndex,
  fontSize,
  disabled,
  onChange,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const preparedGroups = useMemo(
    () =>
      groups.map((group) => ({
        title: group.title,
        options: group.options.map((option) => ({
          ...option,
          selected: value?.includes(option.value) || false,
        })),
      })),
    [value, groups],
  );

  return (
    <div className={clx(styles.root, className)}>
      <Dropdown
        placement="bottom-start"
        onVisibleChange={setIsOpen}
        trigger={["click"]}
        zIndex={zIndex}
        fontSize={fontSize}
        disabled={!!disabled}
        overlay={<MenuOverlay groups={preparedGroups} onChange={onChange} />}
        samewidth
      >
        <div>ffffffffffddggggggggggggggggg</div>
      </Dropdown>
    </div>
  );
};

export default MultiSelect;
