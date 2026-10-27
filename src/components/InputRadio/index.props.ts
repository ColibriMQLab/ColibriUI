import type {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  PropsWithChildren,
} from "react";
import type { TestIdProps } from "../helpers/testId";

export type InputRadioProps = PropsWithChildren<
  TestIdProps & {
    checked?: boolean;
    className?: string;
    containerClassName?: string;
    disabled?: boolean;
    error?: string;
    id?: string;
    name?: string;
    note?: string;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
    onMouseEnter?: (
      event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    ) => void;
    style?: CSSProperties;
    text?: string;
    value: string | number;
  }
>;
