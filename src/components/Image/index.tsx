import { forwardRef, useCallback, useState } from "react";
import generateUniqID from "../helpers/generateUniqID";
import { BasePicture } from "./styles";
import type { ImageProps } from "./index.props";

const emptyImage =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      loading = "lazy",
      src,
      fallbackSrc,
      onClick,
      srcSet,
      sizes,
      ariaLabel,
      sources = [],
      "data-testid": testId,
      alt = src,
      width,
      height,
      ...props
    },
    ref,
  ) => {
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
      <BasePicture data-testid={testId} ref={ref}>
        {!!sources.length &&
          sources.map((source, index) => (
            <source key={generateUniqID(index)} {...source} />
          ))}
        <img
          alt={alt}
          style={sizeAttrs}
          className={className}
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
      </BasePicture>
    );
  },
);

export default Image;
