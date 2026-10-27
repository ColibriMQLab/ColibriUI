import type { TestIdProps } from "../helpers/testId";

export type ChipSize = "s" | "m" | "l";
export type ChipVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "pseudo"
  | "alert"
  | "success"
  | "clear";

export type ChipProps = TestIdProps & {
  size?: ChipSize;
  variant?: ChipVariant;
  isActive?: boolean;
  iconEnd?: React.ReactNode;
  onClick?: () => void;
  onClickIcon?: () => void;
};
