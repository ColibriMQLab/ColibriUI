import type { ReactNode } from "react";

type Size = "s" | "m" | "l";

export type Props = {
  size?: Size;
  testID?: string;
  isActive?: boolean;
  iconOnRight?: React.ReactNode;
  onClick?: () => void;
  onIconOnRightClick?: () => void;
  children?: ReactNode;
};
