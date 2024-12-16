import type { ReactNode } from "react";

export type GroupOptions = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type Coordinates = {
  top: number;
  height: number;
};

export type Group = {
  title?: string;
  options: GroupOptions[];
};

export type MultiSelectProps = {
  groups: Group[];
  className?: string;
  value?: string[];
  zIndex?: number;
  fontSize?: number;
  onChange: (value: string) => void;
  disabled?: boolean;
};
