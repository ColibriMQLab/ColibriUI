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

type GroupOptionsWithSelected = GroupOptions & { selected: boolean };
type PreparedLabelProps = { label: string; key: string };

const clx = classNames.bind(styles);

const sortItems = (items: string[]): string[] =>
  [...items].sort((a, b) => {
    const parseKey = (key: string): number[] =>
      key
        .match(/group-(\d+)-option-(\d+)/)
        ?.slice(1)
        .map(Number) || [];
    const [groupA, optionA] = parseKey(a);
    const [groupB, optionB] = parseKey(b);
    return groupA - groupB || optionA - optionB;
  });

const getValue = (options: PreparedLabelProps[]): string =>
  options.map(({ label }) => label).join(", ");

const MultiSelect: React.FC<MultiSelectProps> = ({
  className,
  groups,
  zIndex,
  fontSize,
  disabled,
  fullWidth = false,
  required,
  label,
  hint,
  hasError,
  size = "m",
  placeholder,
  name,
  type,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string[]>([]);

  const preparedGroups = useMemo(
    () =>
      groups.map((group) => ({
        ...group,
        options: group.options.map(
          (option): GroupOptionsWithSelected => ({
            ...option,
            selected: value.includes(
              createGroupOptionString(group.value, option.value),
            ),
          }),
        ),
      })),
    [value, groups],
  );

  const handleChange = useCallback(
    (key: string) => {
      setValue((prev) => {
        const newValue = prev.includes(key)
          ? prev.filter((v) => v !== key)
          : sortItems([...prev, key]);
        onChange?.(newValue);
        return newValue;
      });
    },
    [onChange],
  );

  const preparedLabel = useMemo(
    () =>
      preparedGroups.flatMap(({ value: groupVal, options }) =>
        options
          .filter(({ selected }) => selected)
          .map(
            // eslint-disable-next-line @typescript-eslint/no-shadow
            ({ label, value: optVal }): PreparedLabelProps => ({
              label,
              key: createGroupOptionString(groupVal, optVal),
            }),
          ),
      ),
    [preparedGroups],
  );

  return (
    <FormField
      className={clx(
        styles["form-field"],
        { "full-width": fullWidth },
        className,
      )}
      required={required}
      label={label}
      hint={hint}
      hasError={hasError}
    >
      <Dropdown
        placement="bottom-start"
        preventOverflow
        onVisibleChange={setIsOpen}
        trigger={["click"]}
        zIndex={zIndex}
        fontSize={fontSize}
        disabled={disabled}
        overlay={
          <MenuOverlay groups={preparedGroups} onChange={handleChange} />
        }
        samewidth
      >
        <InputRoot
          hasError={hasError}
          size={size}
          className={clx(styles.root, { root_auto: preparedLabel.length })}
          endIcon={
            <Chevron className={clx(styles.icon, { icon_isOpen: isOpen })} />
          }
          disabled={Boolean(disabled)}
        >
          <div
            className={clx(
              styles["base-input"],
              styles[type === "chip" ? "base-input-flex" : "base-input-text"],
            )}
          >
            {preparedLabel.length ? (
              type === "chip" ? (
                // eslint-disable-next-line @typescript-eslint/no-shadow
                preparedLabel.map(({ label, key }) => (
                  <Chip
                    key={key}
                    size="s"
                    iconEnd={<CrossFill />}
                    data-ignore-click
                    onClickIcon={() => handleChange(key)}
                  >
                    {label}
                  </Chip>
                ))
              ) : (
                getValue(preparedLabel)
              )
            ) : (
              <span className={clx(styles.placeholder)}>{placeholder}</span>
            )}
          </div>
          <input
            type="hidden"
            name={name}
            tabIndex={-1}
            value={value.join(",") || ""}
          />
        </InputRoot>
      </Dropdown>
    </FormField>
  );
};

export default MultiSelect;
