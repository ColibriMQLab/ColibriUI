import React, { forwardRef } from "react";
import styles from "./Progress.module.scss";
import type { HTMLAttributes, ReactNode } from "react";

export type ProgressSize = "s" | "m" | "l";
export type ProgressBarSize = "2" | "4" | "6" | "8";
export type ProgressView =
  | "default"
  | "secondary"
  | "accent"
  | "accentGradient"
  | "info"
  | "positive"
  | "warning"
  | "negative";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  hasValue?: boolean;
  view?: ProgressView | string;
  size?: ProgressSize | string;
  progressSize?: ProgressBarSize | string;
  label?: string;
  labelIcon?: ReactNode;
  labelTextPlacement?: "left" | "right" | "none";
  labelPlacement?: "top" | "left" | "none";
  valuePlacement?: "top" | "right" | "none";
  valueAlign?: "start" | "center" | "end";
  caption?: string;
}

const cx = (...classNames: Array<string | false | null | undefined>) =>
  classNames.filter(Boolean).join(" ");

const viewClassNames: Record<ProgressView, string> = {
  default: styles.default,
  secondary: styles.secondary,
  accent: styles.accent,
  accentGradient: styles["accent-gradient"],
  info: styles.info,
  positive: styles.positive,
  warning: styles.warning,
  negative: styles.negative,
};

type LabelProps = Pick<
  ProgressProps,
  "label" | "labelIcon" | "labelTextPlacement"
>;

const Label = ({
  label,
  labelIcon,
  labelTextPlacement = "right",
}: LabelProps) => (
  <span className={styles["label-wrapper"]}>
    {labelTextPlacement === "left" && label && (
      <span className={styles.label}>{label}</span>
    )}
    {labelIcon && <span className={styles["label-icon"]}>{labelIcon}</span>}
    {labelTextPlacement === "right" && label && (
      <span className={styles.label}>{label}</span>
    )}
  </span>
);

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function ProgressRoot(
    {
      value,
      hasValue = true,
      view = "default",
      size = "m",
      progressSize = "4",
      label,
      labelIcon,
      labelTextPlacement = "right",
      labelPlacement = "top",
      valuePlacement = "right",
      valueAlign = "start",
      caption,
      className,
      ...rest
    },
    ref,
  ) {
    const normalizedValue = Number.isFinite(value)
      ? Math.max(0, Math.min(value, 100))
      : 0;
    const hasLabel =
      labelPlacement !== "none" && (Boolean(label) || Boolean(labelIcon));
    const resolvedValuePlacement = hasLabel
      ? labelPlacement === "left"
        ? "right"
        : "top"
      : valuePlacement;
    const showValue = hasValue && valuePlacement !== "none";
    const labelOnTop = hasLabel && labelPlacement === "top";
    const labelOnLeft = hasLabel && labelPlacement === "left";
    const valueOnTop = showValue && resolvedValuePlacement === "top";
    const valueOnRight = showValue && resolvedValuePlacement === "right";
    const showTopRow = labelOnTop || valueOnTop;

    const labelNode = (
      <Label
        label={label}
        labelIcon={labelIcon}
        labelTextPlacement={labelTextPlacement}
      />
    );

    return (
      <div
        {...rest}
        ref={ref}
        className={cx(
          styles.root,
          view in viewClassNames
            ? viewClassNames[view as ProgressView]
            : styles[view],
          styles[size],
          styles[`bar${progressSize}`],
          labelOnLeft && styles["label-left"],
          valueOnTop && !labelOnTop && styles[`value-align-${valueAlign}`],
          className,
        )}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={normalizedValue}
        aria-valuetext={rest["aria-valuetext"] ?? `${normalizedValue}%`}
      >
        {showTopRow && (
          <div className={styles["top-row"]}>
            {labelOnTop && labelNode}
            {valueOnTop && (
              <span className={styles.value}>{normalizedValue}%</span>
            )}
          </div>
        )}

        <div className={styles["mid-row"]}>
          {labelOnLeft && labelNode}
          <div className={styles.track}>
            <div
              className={styles.filled}
              style={{ width: `${normalizedValue}%` }}
            />
          </div>
          {valueOnRight && (
            <span className={styles.value}>{normalizedValue}%</span>
          )}
        </div>

        {caption && <span className={styles.caption}>{caption}</span>}
      </div>
    );
  },
);
