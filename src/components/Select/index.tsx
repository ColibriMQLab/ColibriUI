import { useState, useMemo, useCallback } from "react";
import { BaseInput, BasePlaceholder } from "../base/InputRoot/styles";

import Dropdown from "../Dropdown";
import Menu from "../Menu";

import {
  MenuWrapper,
  SelectIcon,
  StyledBaseInputRoot,
  StyledFormField,
} from "./styles";
import type { IOption, SelectProps } from "./index.props";

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
    <StyledFormField
      fullWidth={fullWidth}
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
          <MenuWrapper listHeight={listHeight}>
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
          </MenuWrapper>
        }
        samewidth
      >
        <StyledBaseInputRoot
          error={error}
          endIcon={<SelectIcon isOpen={isOpen} />}
          disabled={!!disabled}
        >
          <BaseInput>
            {prepraredLabel ?? <BasePlaceholder>{placeholder}</BasePlaceholder>}
          </BaseInput>
          <input type="hidden" tabIndex={-1} value={value} />
        </StyledBaseInputRoot>
      </Dropdown>
    </StyledFormField>
  );
};

export default Select;
