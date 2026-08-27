import type {
  ClipboardEventHandler,
  ElementType,
  FocusEventHandler,
  HTMLAttributes,
  ReactNode,
  SyntheticEvent,
} from "react";

export interface EditableProps
  extends Omit<
    HTMLAttributes<HTMLSpanElement>,
    "onChange" | "onBlur" | "onPaste"
  > {
  /** Current text. The component also works without this prop. */
  value?: string;
  /** Element used to render the editable text, for example `span`, `h1` or a typography component. */
  textComponent?: ElementType;
  /** Icon shown on the right. Pass `null` to hide it. */
  icon?: ReactNode;
  placeholder?: string;
  maxLength?: number;
  name?: string;
  disabled?: boolean;
  spellCheck?: boolean;
  onChange?: (event: SyntheticEvent<HTMLDivElement>, value: string) => void;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  onPaste?: ClipboardEventHandler<HTMLDivElement>;
}
