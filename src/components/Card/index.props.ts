import type { CSSProperties, HTMLAttributes } from "react";

export type CardSize = "s" | "m" | "l";
export type CardOrientation = "horizontal" | "vertical";
export type CardBackgroundType = "none" | "solid";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
  view?: "default" | string;
  orientation?: CardOrientation;
  selected?: boolean;
  backgroundType?: CardBackgroundType;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  aspectRatio?: CSSProperties["aspectRatio"] | number;
  orientation?: CardOrientation;
}

export interface CardInnerContentProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: CardOrientation;
}
