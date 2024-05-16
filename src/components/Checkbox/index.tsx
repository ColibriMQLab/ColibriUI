import React from "react";
import { Control, FakeCheckbox, Label, Text } from "./styles";

type Props = {
  id?: string;
  name?: string;
  value?: string | number;
  text?: string | React.ReactNode;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
};

const Checkbox: React.FC<Props> = ({
  id,
  name,
  value,
  text,
  checked,
  onChange,
  onFocus,
  onBlur,
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
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      />
      <FakeCheckbox checked={checked} error={error} data-popunder="ignore" />
      <Text>{text}</Text>
    </>
  );

  return <Label>{control}</Label>;
};

export default Checkbox;
