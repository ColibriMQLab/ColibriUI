import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames/bind";
import Dropdown from "../Dropdown";
import InputRoot from "../base/InputRoot";
import FormField from "../base/FormField";
import { Chevron } from "../Icons";
import styles from "./index.module.scss";
import MenuOverlay from "./components/MenuOverlay";
import type { GroupOptions, MultiSelectProps } from "./index.props";

const clx = classNames.bind(styles);

export function createGroupOptionString(
  groupIndex: number,
  optionValue: string,
) {
  return `group-${groupIndex}-option-${optionValue}`;
}

type GroupOptionsWithSelected = GroupOptions & {
  selected: boolean;
};

const sortedItems = (items: string[]) =>
  items.sort((a, b) => {
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
  fullWidth = false,
  required,
  label,
  hint,
  error,
  size = "m",
  placeholder,
  name,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string[]>([]);

  const preparedGroups = useMemo(
    () =>
      groups.map(
        (group, groupIndex: number) => ({
          title: group.title,
          options: group.options.map((option: GroupOptions): GroupOptionsWithSelected => ({
            ...option,
            selected:
              value?.includes(
                createGroupOptionString(groupIndex, option.value),
              ) || false,
          })),
        }),
      ),
    [value, groups],
  );

  const handleChange = useCallback(
    (key: string) => {
      setValue((prev) => {
        if (prev.indexOf(key) !== -1) {
          return prev.filter((prevValue) => prevValue !== key);
        } else {
          return sortedItems([...prev, key]);
        }
      });
    },
    [sortedItems],
  );

  const prepraredLabel = useMemo(
    () =>
      preparedGroups.flatMap((group) =>
        group.options
          .filter((option) => option.selected)
          .map((option) => option.label),
      ),
    [preparedGroups],
  );

  return (
    <FormField
      className={clx(
        styles["form-field"],
        {
          "full-width": fullWidth ? 1 : 0,
        },
        className,
      )}
      required={required}
      label={label}
      hint={hint}
      error={error}
    >
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
        <InputRoot
          error={error}
          size={size}
          className={clx(styles.root)}
          endIcon={
            <Chevron
              className={clx(styles.icon, { icon_isOpen: isOpen ? 1 : 0 })}
            />
          }
          disabled={!!disabled}
        >
          <div className={clx(styles["base-input"])}>
            {prepraredLabel.length ? (
              prepraredLabel.join(", ")
            ) : (
              <span className={clx(styles.placeholder)}>{placeholder}</span>
            )}
          </div>
          <input type="hidden" name={name} tabIndex={-1} value={value || ""} />
        </InputRoot>
      </Dropdown>
    </FormField>
  );
};

export default MultiSelect;
