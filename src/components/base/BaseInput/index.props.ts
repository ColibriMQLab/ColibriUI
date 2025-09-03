import type {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  Ref,
  FormEvent,
  FocusEvent,
} from "react";

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onInput?: (event: FormEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
}
