import type React from "react";

export interface BaseImageContainerProps {
  fallbackSrc?: string;
  ariaLabel?: string;
  sources?: React.SourceHTMLAttributes<HTMLSourceElement>[];
  "data-testid"?: string;
}

export interface ImageProps
  extends BaseImageContainerProps,
    React.ImgHTMLAttributes<HTMLImageElement> {}
