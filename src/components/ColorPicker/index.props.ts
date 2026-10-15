import type { ReactElement } from "react";
import type { Placement } from "@floating-ui/react";

export interface ColorPickerPreset {
  /** HEX color, for example `#d81b60`. */
  value: string;
  /** Accessible name and tooltip of the swatch. */
  label: string;
}

export interface ColorPickerLabels {
  /** Accessible name of the default trigger. */
  trigger: string;
  /** Accessible name of the preset grid. */
  palette: string;
  /** "+" button that opens the custom color dialog. */
  addCustom: string;
  customTitle: string;
  customDescription: string;
  /** Sample text in the preview circle. */
  preview: string;
  hex: string;
  eyeDropper: string;
  saturation: string;
  hue: string;
  cancel: string;
  save: string;
}

export interface ColorPickerProps {
  /** Current color in HEX. A color missing from `presets` is shown as an extra swatch. */
  value?: string;
  /** Called with the chosen color as lowercase `#rrggbb`. */
  onChange: (color: string) => void;
  /** Preset colors. Defaults to `COLOR_PICKER_PRESETS`. */
  presets?: ColorPickerPreset[];
  /** Number of grid columns. */
  columns?: number;
  disabled?: boolean;
  placement?: Placement;
  zIndex?: number;
  /** Texts and accessible names. Missing keys use English defaults. */
  labels?: Partial<ColorPickerLabels>;
  /** Custom trigger element. Defaults to a round button with the current color. */
  children?: ReactElement;
}
