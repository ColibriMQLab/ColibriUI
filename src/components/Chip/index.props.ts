type Size = "s" | "m" | "l";

export type ChipProps = {
  size?: Size;
  testID?: string;
  isActive?: boolean;
  iconEnd?: React.ReactNode;
  onClick?: () => void;
  onClickIcon?: () => void;
};
