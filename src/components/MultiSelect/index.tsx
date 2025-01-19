import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames/bind";
import Dropdown from "../Dropdown";
import InputRoot from "../base/InputRoot";
import FormField from "../base/FormField";
import { Chevron, CrossFill } from "../Icons";
import Chip from "../Chip";
import styles from "./index.module.scss";
import MenuOverlay from "./components/MenuOverlay";
import { createGroupOptionString } from "./utils";
import type { GroupOptions, MultiSelectProps } from "./index.props";

const clx = classNames.bind(styles);

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
  type,
  onChange,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string[]>([]);

  const preparedGroups = useMemo(
    () =>
      groups.map((group) => ({
        ...group,
        options: group.options.map(
          (option: GroupOptions): GroupOptionsWithSelected => ({
            ...option,
            selected:
              value?.includes(
                createGroupOptionString(group.value, option.value),
              ) || false,
          }),
        ),
      })),
    [value, groups],
  );

  const handleChange = useCallback(
    (key: string) => {
      setValue((prev) => {
        const newValue =
          prev.indexOf(key) !== -1
            ? prev.filter((prevValue) => prevValue !== key)
            : sortedItems([...prev, key]);

        if (onChange) {
          onChange(newValue);
        }

        return newValue;
      });
    },
    [onChange],
  );

  const prepraredLabel = useMemo(
    () =>
      preparedGroups.flatMap((group) =>
        group.options
          .filter((option) => option.selected)
          .map((option) => ({
            label: option.label,
            key: createGroupOptionString(group.value, option.value),
          })),
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
        preventOverflow={true}
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
        {type === "chip" ? (
          <InputRoot
            error={error}
            size={size}
            className={clx(styles.root, {
              auto: !!prepraredLabel.length,
            })}
            endIcon={
              <Chevron
                className={clx(styles.icon, { icon_isOpen: isOpen ? 1 : 0 })}
              />
            }
            disabled={!!disabled}
          >
            <div
              className={clx(styles["base-input"], styles["base-input-flex"])}
            >
              {prepraredLabel.length ? (
                <>
                  {prepraredLabel.map((option, index) => (
                    <Chip
                      size="s"
                      iconEnd={<CrossFill />}
                      data-ignore-click={true}
                      key={`item-${index}`}
                      onClickIcon={() => handleChange(option.key)}
                    >
                      {option.label}
                    </Chip>
                  ))}
                </>
              ) : (
                <span className={clx(styles.placeholder)}>{placeholder}</span>
              )}
            </div>
            <input
              type="hidden"
              name={name}
              tabIndex={-1}
              value={value || ""}
            />
          </InputRoot>
        ) : (
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
            <div
              className={clx(styles["base-input"], styles["base-input-text"])}
            >
              {prepraredLabel.length ? (
                prepraredLabel.join(", ")
              ) : (
                <span className={clx(styles.placeholder)}>{placeholder}</span>
              )}
            </div>
            <input
              type="hidden"
              name={name}
              tabIndex={-1}
              value={value || ""}
            />
          </InputRoot>
        )}
      </Dropdown>
    </FormField>
  );
};

export default MultiSelect;
