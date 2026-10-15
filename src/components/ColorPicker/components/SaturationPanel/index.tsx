import React from "react";
import { usePointerDrag } from "../../hooks/usePointerDrag";
import { clamp, hsv2css } from "../../utils/color";
import styles from "./SaturationPanel.module.scss";
import type { KeyboardEvent } from "react";
import type { HSV } from "../../utils/color";

interface SaturationPanelProps {
  value: HSV;
  onChange: (value: HSV) => void;
  "aria-label": string;
}

const STEP = 1;
const BIG_STEP = 10;

/**
 * Saturation (horizontal) and brightness (vertical) area. Arrow keys change
 * by 1, with Shift by 10.
 */
export const SaturationPanel = ({
  value,
  onChange,
  "aria-label": ariaLabel,
}: SaturationPanelProps) => {
  const { h, s, v } = value;

  const { ref, handlers } = usePointerDrag<HTMLDivElement>(({ x, y }) =>
    onChange({ h, s: x * 100, v: (1 - y) * 100 }),
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? BIG_STEP : STEP;
    const deltas: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    };
    const delta = deltas[event.key];

    if (!delta) return;

    event.preventDefault();
    onChange({
      h,
      s: clamp(s + delta[0], 0, 100),
      v: clamp(v + delta[1], 0, 100),
    });
  };

  return (
    <div
      ref={ref}
      {...handlers}
      role="slider"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(s)}
      aria-valuetext={`${Math.round(s)}%, ${Math.round(v)}%`}
      onKeyDown={handleKeyDown}
      className={styles.root}
      style={{ backgroundColor: hsv2css({ h, s: 100, v: 100 }) }}
    >
      <div
        className={styles.thumb}
        style={{
          left: `${s}%`,
          top: `${100 - v}%`,
          backgroundColor: hsv2css(value),
        }}
      />
    </div>
  );
};
