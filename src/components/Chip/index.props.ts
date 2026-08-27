export type ChipSize = "s" | "m" | "l";
export type ChipVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "pseudo"
  | "alert"
  | "success"
  | "clear";

export type ChipProps = {
  size?: ChipSize;
  variant?: ChipVariant;
  testID?: string;
  isActive?: boolean;
  iconEnd?: React.ReactNode;
  onClick?: () => void;
  onClickIcon?: () => void;
};
