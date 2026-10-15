import React from "react";
import { usePointerDrag } from "../../hooks/usePointerDrag";
import { clamp, hsv2css } from "../../utils/color";
import styles from "./HueSlider.module.scss";
import type { KeyboardEvent } from "react";
import type { HSV } from "../../utils/color";

interface HueSliderProps {
  value: HSV;
  onChange: (value: HSV) => void;
  "aria-label": string;
}

const STEP = 1;
const BIG_STEP = 10;

/** Hue bar. Arrow keys change by 1°, with Shift by 10°, Home/End go to the ends. */
export const HueSlider = ({
  value,
  onChange,
  "aria-label": ariaLabel,
}: HueSliderProps) => {
  const { h } = value;

  const { ref, handlers } = usePointerDrag<HTMLDivElement>(({ x }) =>
    onChange({ ...value, h: x * 360 }),
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? BIG_STEP : STEP;
    const next: Record<string, number> = {
      ArrowLeft: h - step,
      ArrowDown: h - step,
      ArrowRight: h + step,
      ArrowUp: h + step,
      Home: 0,
      End: 360,
    };

    if (!(event.key in next)) return;

    event.preventDefault();
    onChange({ ...value, h: clamp(next[event.key], 0, 360) });
  };

  return (
    <div
      ref={ref}
      {...handlers}
      role="slider"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={Math.round(h)}
      onKeyDown={handleKeyDown}
      className={styles.root}
    >
      <div
        className={styles.thumb}
        style={{
          left: `${(h / 360) * 100}%`,
          backgroundColor: hsv2css({ h, s: 100, v: 100 }),
        }}
      />
    </div>
  );
};
