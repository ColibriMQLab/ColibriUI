import type { CSSProperties, ReactNode } from "react";
import type { InputProps } from "../Input/index.props";

export interface AutocompleteOption {
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  description?: string;
  disabled?: boolean;
  label: string;
  value: string;
}

export type AutocompleteSize = "s" | "m" | "l";

export interface AutocompleteOptionState {
  active: boolean;
  selected: boolean;
}

export interface AutocompleteProps<
  T extends AutocompleteOption = AutocompleteOption,
> extends Omit<
    InputProps,
    | "controlAfter"
    | "controlClassName"
    | "controlRef"
    | "defaultValue"
    | "endIcon"
    | "inputRef"
    | "onChange"
    | "size"
    | "value"
  > {
  clearLabel?: string;
  clearable?: boolean;
  containerClassName?: string;
  defaultOpen?: boolean;
  defaultValue?: string;
  emptyText?: ReactNode;
  filterOption?: (option: T, query: string) => boolean;
  getOptionKey?: (option: T) => string;
  listMaxHeight?: CSSProperties["maxHeight"];
  loading?: boolean;
  loadingText?: ReactNode;
  minQueryLength?: number;
  onOpenChange?: (open: boolean) => void;
  onOptionSelect?: (option: T) => void;
  onValueChange?: (value: string) => void;
  open?: boolean;
  openOnFocus?: boolean;
  options: T[];
  renderOption?: (option: T, state: AutocompleteOptionState) => ReactNode;
  size?: AutocompleteSize;
  success?: boolean;
  value?: string;
}
