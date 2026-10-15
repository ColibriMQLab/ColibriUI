import React from "react";
import clsx from "clsx";
import { hsv2hex, prefersLightText } from "../../utils/color";
import styles from "./ColorPreview.module.scss";
import type { ReactNode } from "react";
import type { HSV } from "../../utils/color";

interface ColorPreviewProps {
  color: HSV;
  children: ReactNode;
}

/** Circle with the color and a sample text in the automatically adjusted color. */
export const ColorPreview = ({ color, children }: ColorPreviewProps) => {
  const hex = hsv2hex(color);

  return (
    <span
      aria-hidden="true"
      className={clsx(
        styles.root,
        prefersLightText(hex) ? styles.text_light : styles.text_dark,
      )}
      style={{ backgroundColor: hex }}
    >
      {children}
    </span>
  );
};
