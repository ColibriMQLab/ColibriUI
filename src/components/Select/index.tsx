import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Chevron from "../Icons/Chevron";
import InputRoot from "../base/InputRoot";
import FormField from "../base/FormField";
import Dropdown from "../Dropdown";
import styles from "./index.module.scss";
import MenuOverlay from "./components/MenuOverlay";
import type { JSX } from "react";
import type { SelectProps } from "./index.props";

const Select = <T extends string>({
  options = [],
  value,
  name,
  zIndex,
  fontSize,
  label,
  hint,
  hasError,
  required,
  placeholder,
  disabled,
  size = "m",
  fullWidth = false,
  customInputRoot,
  className,
  onChange,
}: SelectProps<T>): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const preparedOptions = useMemo(
    () =>
      options.map(({ value: lvalue, label: llabel, disabled: ldisabled }) => ({
        value: lvalue,
        label: llabel,
        selected: value === lvalue,
        disabled: ldisabled,
      })),
    [value, options],
  );

  const preparedLabel = useMemo(
    () => preparedOptions.find(({ selected }) => selected)?.label,
    [preparedOptions],
  );

  return (
    <FormField
      className={clsx(
        styles["form-field"],
        {
          [styles["full-width"]]: Boolean(fullWidth),
        },
        className,
      )}
      required={required}
      label={label}
      hint={hint}
      hasError={hasError}
    >
      <Dropdown
        placement="bottom-start"
        preventOverflow={true}
        onVisibleChange={setIsOpen}
        trigger={["click"]}
        zIndex={zIndex}
        fontSize={fontSize}
        disabled={Boolean(disabled)}
        overlay={<MenuOverlay options={preparedOptions} onChange={onChange} />}
        samewidth
      >
        {customInputRoot ? (
          customInputRoot
        ) : (
          <div
            tabIndex={0}
            role="button"
            style={{ width: fullWidth ? "100%" : "fit-content" }}
          >
            <InputRoot
              hasError={hasError}
              size={size}
              style={{ width: fullWidth ? "100%" : "" }}
              className={styles.root}
              endIcon={
                <Chevron
                  className={clsx(styles.icon, {
                    [styles["icon_isOpen"]]: isOpen && Boolean(!disabled),
                  })}
                />
              }
              disabled={Boolean(disabled)}
            >
              <div className={styles["base-input"]} data-testid="base-input">
                {preparedLabel ?? (
                  <span className={styles.placeholder}>{placeholder}</span>
                )}
              </div>
              <input
                type="hidden"
                name={name}
                tabIndex={-1}
                value={value || ""}
              />
            </InputRoot>
          </div>
        )}
      </Dropdown>
    </FormField>
  );
};

export default Select;
