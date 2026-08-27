import React from "react";

import { InputRadio } from "../InputRadio";
import type { FC } from "react";
import type { RadioProps } from "./index.props";

export const Radio: FC<RadioProps> = ({
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
}: RadioProps) => (
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
