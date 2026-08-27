import type { ReactNode } from "react";

export interface MenuOverlayOption<T extends string> {
  value: T;
  label: ReactNode;
  selected: boolean;
  disabled?: boolean;
}

export interface MenuOverlayProps<T extends string> {
  options: MenuOverlayOption<T>[];
  onChange: (value: T) => void;
}
