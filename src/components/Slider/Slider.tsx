import React, { forwardRef, useRef } from "react";

import styles from "./Slider.module.scss";
import type { PointerEvent as ReactPointerEvent } from "react";
import type {
  SliderProps,
  SliderRangeProps,
  SliderSingleProps,
} from "./index.props";

const cx = (...classNames: Array<string | false | null | undefined>) =>
  classNames.filter(Boolean).join(" ");
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const decimals = (value: number) => (String(value).split(".")[1] ?? "").length;

const normalize = (value: number, min: number, max: number, step: number) => {
  const snapped =
    min + Math.round((clamp(value, min, max) - min) / step) * step;
  return Number(
    clamp(snapped, min, max).toFixed(Math.max(decimals(step), decimals(min))),
  );
};

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  function SliderComponent(props, ref) {
    const {
      mode = "single",
      value,
      onChange,
      onChangeCommitted,
      min = 0,
      max = 100,
      step = 1,
      label,
      labelContent,
      labelPlacement = "top",
      orientation = "horizontal",
      reversed = false,
      disabled = false,
      size = "m",
      view = "default",
      pointerSize = "small",
      pointerVisibility = "always",
      showValue = false,
      valueFormatter = (current) => current,
      ticks = [],
      tickType = "bullet",
      ariaLabel,
      name,
      className,
      ...rest
    } = props;
    const trackRef = useRef<HTMLDivElement>(null);
    const activeThumb = useRef<0 | 1>(0);
    const range = max - min || 1;
    const values: [number, number] =
      mode === "range"
        ? [
            normalize((value as [number, number])[0], min, max, step),
            normalize((value as [number, number])[1], min, max, step),
          ]
        : [min, normalize(value as number, min, max, step)];
    const low = Math.min(values[0], values[1]);
    const high = Math.max(values[0], values[1]);
    const toPercent = (current: number) => ((current - min) / range) * 100;
    const toVisualPercent = (current: number) =>
      reversed ? 100 - toPercent(current) : toPercent(current);
    const thumbPercents = [
      toVisualPercent(values[0]),
      toVisualPercent(values[1]),
    ];
    const lowPercent = mode === "range" ? Math.min(...thumbPercents) : 0;
    const highPercent =
      mode === "range" ? Math.max(...thumbPercents) : thumbPercents[1];
    const minDistance =
      mode === "range"
        ? Math.max(0, (props as SliderRangeProps).minDistance ?? 0)
        : 0;

    const emitValue = (index: 0 | 1, nextValue: number, committed = false) => {
      const next = normalize(nextValue, min, max, step);
      if (mode === "single") {
        if (committed)
          (onChangeCommitted as SliderSingleProps["onChangeCommitted"])?.(next);
        else (onChange as SliderSingleProps["onChange"])(next);
        return;
      }

      const current = values;
      const nextRange: [number, number] =
        index === 0
          ? [Math.min(next, current[1] - minDistance), current[1]]
          : [current[0], Math.max(next, current[0] + minDistance)];
      if (committed)
        (onChangeCommitted as SliderRangeProps["onChangeCommitted"])?.(
          nextRange,
        );
      else (onChange as SliderRangeProps["onChange"])(nextRange);
    };

    const valueFromPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return min;
      const rawRatio =
        orientation === "horizontal"
          ? (event.clientX - rect.left) / rect.width
          : (rect.bottom - event.clientY) / rect.height;
      const ratio = reversed ? 1 - rawRatio : rawRatio;
      return min + clamp(ratio, 0, 1) * range;
    };

    const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
      if (disabled || event.target instanceof HTMLInputElement) return;
      const nextValue = valueFromPointer(event);
      activeThumb.current =
        mode === "range" &&
        Math.abs(nextValue - values[0]) <= Math.abs(nextValue - values[1])
          ? 0
          : 1;
      event.currentTarget.setPointerCapture(event.pointerId);
      emitValue(activeThumb.current, nextValue);
    };

    const normalizedTicks = ticks.map((tick) =>
      typeof tick === "number" ? { value: tick, label: tick } : tick,
    );
    const horizontal = orientation === "horizontal";
    const labelNode = labelPlacement !== "none" && (label || labelContent) && (
      <div className={styles.label_wrapper}>
        {labelContent && (
          <span className={styles.label_content}>{labelContent}</span>
        )}
        {label && <span className={styles.label}>{label}</span>}
      </div>
    );

    return (
      <div
        {...rest}
        ref={ref}
        className={cx(
          styles.root,
          styles[size],
          styles[view],
          styles[orientation],
          styles[`pointer_${pointerSize}`],
          pointerVisibility === "hover" && styles.pointer_on_hover,
          labelPlacement === "left" && styles.label_left,
          reversed && styles.reversed,
          disabled && styles.disabled,
          className,
        )}
      >
        {labelPlacement === "top" && labelNode}
        <div className={styles.main}>
          {labelPlacement === "left" && labelNode}
          <div
            className={cx(styles.slider_area, mode === "range" && styles.range)}
            style={
              {
                "--slider-low": `${thumbPercents[0]}%`,
                "--slider-high": `${thumbPercents[1]}%`,
              } as React.CSSProperties
            }
          >
            <div
              ref={trackRef}
              className={cx(
                styles.track,
                tickType === "separator" && styles.segmented,
              )}
              onPointerDown={handlePointerDown}
              onPointerMove={(event) => {
                if (
                  disabled ||
                  !event.currentTarget.hasPointerCapture(event.pointerId)
                )
                  return;
                emitValue(activeThumb.current, valueFromPointer(event));
              }}
              onPointerUp={(event) => {
                if (!event.currentTarget.hasPointerCapture(event.pointerId))
                  return;
                event.currentTarget.releasePointerCapture(event.pointerId);
                emitValue(activeThumb.current, valueFromPointer(event), true);
              }}
            >
              <span
                className={styles.fill}
                style={
                  horizontal
                    ? {
                        left: `${lowPercent}%`,
                        width: `${highPercent - lowPercent}%`,
                      }
                    : {
                        bottom: `${lowPercent}%`,
                        height: `${highPercent - lowPercent}%`,
                      }
                }
              />
              {normalizedTicks.map((tick) => {
                const percent = toVisualPercent(clamp(tick.value, min, max));
                const filled = tick.value >= low && tick.value <= high;
                return (
                  <span
                    key={tick.value}
                    className={cx(styles.tick, filled && styles.tick_filled)}
                    style={
                      horizontal
                        ? { left: `${percent}%` }
                        : { bottom: `${percent}%` }
                    }
                  >
                    <i />
                    {tick.label != null && <b>{tick.label}</b>}
                  </span>
                );
              })}
            </div>

            {(mode === "range" ? ([0, 1] as const) : ([1] as const)).map(
              (index) => {
                const current = values[index];
                const inputName = Array.isArray(name) ? name[index] : name;
                const inputLabel = Array.isArray(ariaLabel)
                  ? ariaLabel[index]
                  : ariaLabel;
                return (
                  <React.Fragment key={index}>
                    <input
                      className={styles.input}
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={current}
                      name={inputName}
                      aria-label={inputLabel}
                      disabled={disabled}
                      onChange={(event) =>
                        emitValue(index, Number(event.currentTarget.value))
                      }
                      onPointerUp={(event) =>
                        emitValue(
                          index,
                          Number(event.currentTarget.value),
                          true,
                        )
                      }
                      onKeyUp={(event) =>
                        emitValue(
                          index,
                          Number(event.currentTarget.value),
                          true,
                        )
                      }
                    />
                    {showValue && (
                      <span
                        className={styles.current_value}
                        style={
                          horizontal
                            ? { left: `${toVisualPercent(current)}%` }
                            : { bottom: `${toVisualPercent(current)}%` }
                        }
                      >
                        {valueFormatter(current)}
                      </span>
                    )}
                  </React.Fragment>
                );
              },
            )}
          </div>
        </div>
      </div>
    );
  },
);
