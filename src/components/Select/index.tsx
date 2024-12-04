import React, { useState, useMemo } from "react";
import classNames from "classnames/bind";
import Chevron from "../Icons/Chevron";
import InputRoot from "../base/InputRoot";
import FormField from "../base/FormField";
import Dropdown from "../Dropdown";
import styles from "./index.module.scss";
import MenuOverlay from "./components/MenuOverlay";
import type { SelectProps } from "./index.props";

const clx = classNames.bind(styles);

const Select = <T extends string>({
  options = [],
  value,
  zIndex,
  label,
  hint,
  error,
  required,
  placeholder,
  disabled,
  fullWidth = false,
  onChange,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const preparedOptions = useMemo(
    () =>
      options.map(({ value: lvalue, label: llabel, disabled }) => ({
        value: lvalue,
        label: llabel,
        selected: value === lvalue,
        disabled,
      })),
    [value, options],
  );

  const prepraredLabel = useMemo(
    () => preparedOptions.find(({ selected }) => selected)?.label,
    [preparedOptions],
  );

  return (
    <FormField
      className={clx(styles["form-field"], {
        "form-field_fullWidth": fullWidth ? 1 : 0,
      })}
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
        disabled={!!disabled}
        overlay={<MenuOverlay options={preparedOptions} onChange={onChange} />}
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
          <div className={clx(styles["base-input"])} data-testid="base-input">
            {prepraredLabel ?? (
              <span className={clx(styles.placeholder)}>{placeholder}</span>
            )}
          </div>
          <input type="hidden" tabIndex={-1} value={value || ""} />
        </InputRoot>
      </Dropdown>
    </FormField>
  );
};

export default Select;
