import React, { useCallback, useState } from "react";
import clsx from "clsx";
import styles from "./Image.module.scss";
import type { KeyboardEvent } from "react";
import type { ImageProps } from "./index.props";

const emptyImage =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";

export const Image = ({
  className,
  loading = "lazy",
  src,
  fallbackSrc,
  onClick,
  onKeyDown,
  srcSet,
  sizes,
  ariaLabel,
  sources = [],
  alt = src,
  width,
  height,
  ref,
  ...props
}: ImageProps) => {
  const [isFailed, setFailed] = useState(false);
  const imageSrc = src || emptyImage;
  const imageSrcSet = srcSet;
  const sizeAttrs: Pick<ImageProps, "width" | "height"> = {};

  if (width !== undefined) {
    sizeAttrs.width = width;
  }

  if (height !== undefined) {
    sizeAttrs.height = height;
  }

  const handleError = useCallback(() => {
    setFailed(true);
  }, []);

  const interactiveProps = onClick
    ? {
        role: "button",
        tabIndex: 0,
        onClick,
        onKeyDown: (event: KeyboardEvent<HTMLImageElement>) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          event.currentTarget.click();
        },
      }
    : {
        onKeyDown,
        "aria-hidden": ariaLabel ? ("false" as const) : ("true" as const),
      };

  return (
    <picture className={styles.root}>
      {!!sources.length &&
        sources.map((source, index) => (
          <source key={`item-${index}`} {...source} />
        ))}
      <img
        ref={ref}
        alt={alt}
        style={sizeAttrs}
        className={clsx(className)}
        loading={loading}
        aria-label={ariaLabel}
        {...interactiveProps}
        onError={handleError}
        src={isFailed && fallbackSrc ? fallbackSrc : imageSrc}
        srcSet={imageSrcSet}
        sizes={sizes}
        {...props}
      />
    </picture>
  );
};
