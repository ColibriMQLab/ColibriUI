import React, { useState, useMemo, useCallback } from "react";
import classNames from "classnames/bind";
import Chevron from "../Icons/Chevron";
import InputRoot from "../base/InputRoot";
import FormField from "../base/FormField";
import Dropdown from "../Dropdown";
import Menu from "../Menu";
import Check from "../Icons/Check";
import MenuItem from "../Menu/components/MenuItem";
import styles from "./Select.module.scss";
import type { IOption, SelectProps } from "./index.props";

const clx = classNames.bind(styles);

const Select = <T extends string>({
  options = [],
  value,
  zIndex,
  label,
  hint,
  error,
  placeholder,
  disabled,
  listHeight = 130,
  fullWidth = false,
  onChange,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>();

  const preparedOptions = useMemo(
    () =>
      options.map(({ value: lvalue, label: llabel }) => ({
        value: lvalue,
        label: llabel,
        selected: value === lvalue,
      })),
    [value, options],
  );

  const prepraredLabel = useMemo(
    () => preparedOptions.find(({ selected }) => selected)?.label,
    [preparedOptions],
  );

  const handleSelect = useCallback(
    (option: IOption<T>, key: string) => {
      onChange(option.value);
      setSelected(key.split(" "));
    },
    [onChange],
  );

  return (
    <FormField
      className={clx(styles["form-field"], {
        "form-field_fullWidth": fullWidth ? 1 : 0,
      })}
      label={label}
      hint={hint}
      error={error}
    >
      <Dropdown
        placement="bottom-start"
        onVisibleChange={setIsOpen}
        trigger={["click"]}
        zIndex={zIndex}
        disabled={!!disabled}
        overlay={
          <div
            className={clx(styles["menu-wrapper"])}
            style={{ maxHeight: `${listHeight}px` }}
          >
            <Menu selected={selected}>
              {preparedOptions.map((option, i) => (
                <MenuItem
                  key={`item-${i}`}
                  onClick={() => handleSelect(option, `item-${i}`)}
                  isSelected={option.selected}
                >
                  {option.label}
                  {option.selected && <Check width={16} height={16} />}
                </MenuItem>
              ))}
            </Menu>
          </div>
        }
        samewidth
      >
        <InputRoot
          error={error}
          className={clx(styles.root)}
          endIcon={
            <Chevron
              className={clx(styles.icon, { icon_isOpen: isOpen ? 1 : 0 })}
            />
          }
          disabled={!!disabled}
        >
          <div
            className={clx(styles["base-input"])}
            data-component="base-input"
          >
            {prepraredLabel ?? (
              <span className={clx(styles.placeholder)}>{placeholder}</span>
            )}
          </div>
          <input type="hidden" tabIndex={-1} value={value} />
        </InputRoot>
      </Dropdown>
    </FormField>
  );
};

export default Select;
