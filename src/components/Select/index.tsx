import React, { useState, useMemo, useCallback } from "react";
import Chevron from "../Icons/Chevron";
import InputRoot from "../base/InputRoot";
import FormField from "../base/FormField";
import Dropdown from "../Dropdown";
import Menu from "../Menu";
import styles from "./Select.module.scss";

const clx = classNames.bind(styles);
import type { IOption, SelectProps } from "./index.props";
import classNames from "classnames/bind";

const Select = <T extends string | number>({
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
    ({ value: lvalue }: IOption<T>) => {
      onChange(lvalue);
    },
    [onChange],
  );

  return (
    <FormField
      className={clx(styles.formField, {
        formField_fullWidth: fullWidth ? 1 : 0,
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
            className={clx(styles.menuWrapper)}
            style={{ maxHeight: `${listHeight}px` }}
          >
            <Menu>
              {preparedOptions.map((option, i) => (
                <Menu.Item
                  key={`${option.label}-${i}`}
                  onClick={() => handleSelect(option)}
                  isSelected={option.selected}
                >
                  {option.label}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        }
        samewidth
      >
        <InputRoot
          error={error}
          className={clx(styles.inputRoot)}
          endIcon={
            <Chevron
              className={clx(styles.icon, { icon_isOpen: isOpen ? 1 : 0 })}
            />
          }
          disabled={!!disabled}
        >
          <div className={clx(styles.baseInput)}>
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
