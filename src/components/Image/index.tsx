import React, { useCallback, useState } from "react";
import clsx from "clsx";
import styles from "./Image.module.scss";
import type { ImageProps } from "./index.props";

const emptyImage =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";

const Image = ({
  className,
  loading = "lazy",
  src,
  fallbackSrc,
  onClick,
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

  return (
    <picture ref={ref} className={styles.root}>
      {!!sources.length &&
        sources.map((source, index) => (
          <source key={`item-${index}`} {...source} />
        ))}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <img
        alt={alt}
        style={sizeAttrs}
        className={clsx(className)}
        loading={loading}
        aria-hidden={ariaLabel ? "false" : "true"}
        aria-label={ariaLabel}
        onClick={onClick}
        onError={handleError}
        src={isFailed && fallbackSrc ? fallbackSrc : imageSrc}
        srcSet={imageSrcSet}
        sizes={sizes}
        {...props}
      />
    </picture>
  );
};

export default Image;
