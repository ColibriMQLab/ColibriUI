import type {
  Dispatch,
  InputHTMLAttributes,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";

export type CodeFieldSize = "m" | "l" | "xl";
export type CodeFieldShape = "default" | "segmented";
export type ItemErrorBehavior = "remove-symbol" | "keep" | "forbid-enter";
export type CodeErrorBehavior = "remove-code" | "keep";

export interface CodeFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "onClick" | "size" | "width" | "value"
  > {
  value?: string;
  placeholder?: string;
  codeLength?: 4 | 5 | 6;
  caption?: ReactNode;
  captionAlign?: "left" | "center";
  width?: string | number;
  view?: string;
  shape?: CodeFieldShape;
  size?: CodeFieldSize;
  disabled?: boolean;
  isError?: boolean;
  setIsError?: Dispatch<SetStateAction<boolean>>;
  allowedSymbols?: string | RegExp;
  itemErrorBehavior?: ItemErrorBehavior;
  codeErrorBehavior?: CodeErrorBehavior;
  onChange?: (value: string) => void;
  onFullCodeEnter?: (code: string) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
