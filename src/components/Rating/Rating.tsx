import React, { forwardRef } from "react";
import styles from "./Rating.module.scss";
import type { CSSProperties } from "react";
import type { RatingProps, RatingSize } from "./index.props";

type StarKind = "fill" | "half" | "outline";
type RatingStyle = CSSProperties & {
  "--rating-icon-color"?: string;
  "--rating-outline-color"?: string;
};

const cx = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(" ");

const sizeClassNames: Record<RatingSize, string> = {
  xxs: styles.xxs,
  xs: styles.xs,
  s: styles.s,
  m: styles.m,
  l: styles.l,
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  h4: styles.h4,
  h5: styles.h5,
  h6: styles.h6,
  displayS: styles.display_s,
  displayM: styles.display_m,
  displayL: styles.display_l,
};

const StarIcon = ({ kind }: { kind: StarKind }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {kind !== "fill" && (
      <path
        className={styles.outline_path}
        fillRule="evenodd"
        d="M12 2.1c.4 0 .8.25.97.65l2.38 5.13 5.51.66a1.06 1.06 0 0 1 .6 1.82l-4.08 3.85 1.08 5.5a1.06 1.06 0 0 1-1.55 1.12L12 18.08l-4.91 2.75a1.06 1.06 0 0 1-1.55-1.12l1.08-5.5-4.08-3.85a1.06 1.06 0 0 1 .6-1.82l5.51-.66 2.38-5.13c.17-.4.56-.65.97-.65Zm0 3.62-1.68 3.62a1.06 1.06 0 0 1-.84.6l-3.9.47 2.9 2.73c.26.25.38.62.31.98l-.76 3.88 3.45-1.93c.32-.18.72-.18 1.04 0l3.45 1.93-.76-3.88c-.07-.36.05-.73.31-.98l2.9-2.73-3.9-.47a1.06 1.06 0 0 1-.84-.6L12 5.72Z"
        clipRule="evenodd"
      />
    )}
    {kind !== "outline" && (
      <path d="m12 3.15 2.65 5.7 6.1.73-4.52 4.27 1.19 6.06L12 16.88 6.58 19.9l1.19-6.06-4.52-4.27 6.1-.73L12 3.15Z" />
    )}
  </svg>
);

const normalizeValue = (
  value: number | null | undefined,
  precision: number,
  iconQuantity: number,
) => {
  const maxValue = iconQuantity === 1 ? Number.POSITIVE_INFINITY : iconQuantity;
  const safeValue =
    typeof value === "number" && Number.isFinite(value)
      ? Math.max(0, Math.min(value, maxValue))
      : 0;
  return safeValue.toFixed(Math.max(0, precision));
};

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  function RatingBase(
    {
      value,
      hasValue = true,
      precision = 1,
      decimalSeparator = ".",
      valuePlacement = "before",
      iconSlot,
      iconSlotOutline,
      iconSlotHalf,
      hasIcons = true,
      iconQuantity = 5,
      helperText,
      helperTextStretching = "filled",
      size = "l",
      view = "default",
      fillColor,
      outlineColor,
      style,
      className,
      ...rest
    },
    ref,
  ) {
    if (!hasValue && !hasIcons) return null;

    const normalizedValue = normalizeValue(value, precision, iconQuantity);
    const numericValue = Number(normalizedValue);
    const displayValue =
      decimalSeparator === "."
        ? normalizedValue
        : normalizedValue.replace(".", decimalSeparator);
    const helperInsideIcons = Boolean(
      helperText &&
        hasIcons &&
        size.startsWith("display") &&
        iconQuantity !== 1,
    );

    const icons = Array.from({ length: iconQuantity }, (_, index) => {
      const kind: StarKind =
        index + 1 <= Math.floor(numericValue)
          ? "fill"
          : index < numericValue
            ? "half"
            : "outline";
      const customIcon =
        kind === "fill"
          ? iconSlot
          : kind === "half"
            ? iconSlotHalf
            : iconSlotOutline;

      return (
        <span
          key={index}
          className={cx(
            styles.star,
            kind === "outline" && styles.outline,
            kind === "half" && styles.half,
          )}
        >
          {customIcon ?? <StarIcon kind={kind} />}
        </span>
      );
    });
    const rootStyle: RatingStyle | undefined = fillColor
      ? ({
          ...style,
          "--rating-icon-color": fillColor,
          "--rating-outline-color": outlineColor ?? fillColor,
        } as RatingStyle)
      : outlineColor
        ? ({
            ...style,
            "--rating-outline-color": outlineColor,
          } as RatingStyle)
        : style;

    return (
      <div
        {...rest}
        ref={ref}
        style={rootStyle}
        className={cx(
          styles.root,
          sizeClassNames[size],
          styles[view],
          className,
        )}
        role="img"
        aria-label={
          rest["aria-label"] ?? `Rating: ${displayValue} out of ${iconQuantity}`
        }
      >
        <div
          className={cx(
            styles.content,
            valuePlacement === "after" && styles.value_after,
            iconQuantity === 1 && styles.single,
          )}
        >
          {hasValue && <span className={styles.score}>{displayValue}</span>}

          {hasIcons && (
            <span className={styles.icons_and_helper}>
              <span className={styles.icons}>{icons}</span>
              {helperInsideIcons && (
                <span
                  className={cx(
                    styles.helper,
                    helperTextStretching === "fixed" && styles.helper_fixed,
                  )}
                >
                  {helperText}
                </span>
              )}
            </span>
          )}
        </div>

        {helperText && !helperInsideIcons && (
          <span
            className={cx(
              styles.helper,
              helperTextStretching === "fixed" && styles.helper_fixed,
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  },
);
