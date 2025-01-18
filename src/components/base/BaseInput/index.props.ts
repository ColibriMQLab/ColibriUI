import type { ChangeEvent, InputHTMLAttributes } from "react";

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
  ref?: React.Ref<HTMLInputElement>;
}
