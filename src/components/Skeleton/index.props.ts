import type { TestIdProps } from "../helpers/testId";

export type TextProps = TestIdProps & {
  className?: string;
  width?: number | string;
  size?: number | string;
};

export type RectProps = TestIdProps & {
  className?: string;
  width?: number | string;
  height?: number | string;
  radius?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";
};
