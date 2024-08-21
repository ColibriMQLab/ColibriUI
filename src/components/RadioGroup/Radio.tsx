import React from "react";

import InputRadio from "../InputRadio";
import type { ChangeEvent, FC, FocusEvent } from "react";

type Props = {
  value: string | number;
  text: string;
  id?: string;
  note?: string;
  name?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
  onMouseEnter?: (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ) => void;
  className: string;
  disabled?: boolean;
  testId?: string;
};

const Radio: FC<Props> = ({
  id,
  value,
  text,
  note,
  name,
  checked = false,
  onChange,
  onBlur,
  onClick,
  onMouseEnter,
  className,
  disabled = false,
  testId,
}: Props) => {
  return (
    <InputRadio
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      text={text}
      note={note}
      name={name}
      className={className}
      disabled={disabled}
      testid={testId}
    />
  );
};

export default Radio;
