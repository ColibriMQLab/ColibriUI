import React from "react";
import clsx from "clsx";
import { Check } from "../../../Icons";
import { isLightColor, prefersLightText } from "../../utils/color";
import styles from "./Swatch.module.scss";
import type { ButtonHTMLAttributes } from "react";

interface SwatchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "type"> {
  /** `#rrggbb` */
  color: string;
  label: string;
  selected: boolean;
}

/**
 * Color circle button. The check mark adapts to the color, light colors get
 * an outline.
 */
export const Swatch = ({
  color,
  label,
  selected,
  className,
  ...props
}: SwatchProps) => (
  <button
    {...props}
    type="button"
    role="menuitemradio"
    aria-checked={selected}
    aria-label={label}
    title={label}
    className={clsx(
      styles.root,
      prefersLightText(color) ? styles.check_light : styles.check_dark,
      { [styles.outlined]: isLightColor(color) },
      className,
    )}
    style={{ backgroundColor: color }}
  >
    {selected && <Check className={styles.check} aria-hidden="true" />}
  </button>
);
