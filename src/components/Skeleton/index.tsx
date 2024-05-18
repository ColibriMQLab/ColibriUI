import { StyledRect, StyledText } from "./styles";
import type { FC } from "react";
import type { RectProps, TextProps } from "./index.props";

export const SkeletonRect: FC<RectProps> = ({
  className,
  width,
  height,
  borderRadius,
}) => {
  return (
    <StyledRect className={className} style={{ width, height, borderRadius }} />
  );
};

export const SkeletonText: FC<TextProps> = ({ className, width, size }) => {
  return <StyledText className={className} style={{ width, height: size }} />;
};
