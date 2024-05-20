import { Control, FakeCheckbox, Label, Text } from "./styles";
import type { FC } from "react";
import type { CheckboxProps } from "./index.props";

const Checkbox: FC<CheckboxProps> = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
  onFocus,
  onBlur,
  variant = "primary",
  className,
  disabled,
  isError,
}) => {
  const control = (
    <>
      <Control
        className={className}
        type="checkbox"
        id={id}
        variant={variant}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      />
      <FakeCheckbox variant={variant} checked={checked} isError={isError} />
      <Text>{label}</Text>
    </>
  );

  return <Label>{control}</Label>;
};

export default Checkbox;
