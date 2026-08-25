export type Space =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "8"
  | "10"
  | "12"
  | "16"
  | "20"
  | "24"
  | "32";

export type GridProps = {
  className?: string;
  gridRowGap?: Space;
  gridColumnGap?: Space;
  gridItemMinWidth?: number | string;
};
