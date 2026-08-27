import type { ChangeEvent, FocusEvent, ReactElement } from "react";

export interface Option {
  id?: string;
  val: string | number;
  text: string;
  note?: string;
  name?: string;
  tooltipContent?: () => ReactElement;
  onClick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
  onMouseEnter?: (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ) => void;
  className?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  val?: string | number;
  options: Option[];
  onChange: (value: string) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  column?: boolean;
  wrapped?: boolean;
  className?: string;
  disabled?: boolean;
}

export type RadioProps = {
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
