import React, { forwardRef } from "react";
import styles from "./Card.module.scss";
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

const cx = (...classNames: Array<string | false | null | undefined>) =>
  classNames.filter(Boolean).join(" ");

/** Root card container. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function CardRoot(
  {
    size = "m",
    view = "default",
    orientation = "horizontal",
    selected = false,
    backgroundType = "none",
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <div
      {...rest}
      ref={ref}
      className={cx(
        styles.card,
        styles[size],
        styles[view],
        styles[orientation],
        selected && styles.selected,
        backgroundType === "solid" && styles.solid,
        className,
      )}
    >
      {children}
    </div>
  );
});

/** Clipped card area that normally contains media and CardInnerContent. */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContentRoot(
    {
      aspectRatio,
      orientation = "horizontal",
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        {...rest}
        ref={ref}
        className={cx(styles.content, styles[orientation], className)}
        style={{ ...style, aspectRatio }}
      >
        {children}
      </div>
    );
  },
);

/** Content layer rendered over an image or another CardContent background. */
export const CardInnerContent = forwardRef<
  HTMLDivElement,
  CardInnerContentProps
>(function CardInnerContentRoot(
  { orientation = "horizontal", className, children, ...rest },
  ref,
) {
  return (
    <div
      {...rest}
      ref={ref}
      className={cx(styles["inner-content"], styles[orientation], className)}
    >
      {children}
    </div>
  );
});
