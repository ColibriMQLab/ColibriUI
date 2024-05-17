import { Control, FakeCheckbox, Label, Text } from "./styles";
import type { FC } from "react";
import type { CheckboxProps } from "./index.props";

const Checkbox: FC<CheckboxProps> = ({
  id,
  name,
  value,
  text,
  checked,
  onChange,
  onFocus,
  onBlur,
  variant = "primary",
  className,
  disabled,
  error,
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
      <FakeCheckbox variant={variant} checked={checked} error={error} />
      <Text>{text}</Text>
    </>
  );

  return <Label>{control}</Label>;
};

export default Checkbox;
