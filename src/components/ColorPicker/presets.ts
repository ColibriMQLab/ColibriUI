import type { ColorPickerLabels, ColorPickerPreset } from "./index.props";

export const COLOR_PICKER_PRESETS: ColorPickerPreset[] = [
  { value: "#ad1457", label: "Radicchio" },
  { value: "#f4511e", label: "Tangerine" },
  { value: "#e4c441", label: "Citron" },
  { value: "#0b8043", label: "Basil" },
  { value: "#3f51b5", label: "Blueberry" },
  { value: "#8e24aa", label: "Grape" },
  { value: "#d81b60", label: "Cherry blossom" },
  { value: "#ef6c00", label: "Pumpkin" },
  { value: "#c0ca33", label: "Avocado" },
  { value: "#009688", label: "Eucalyptus" },
  { value: "#7986cb", label: "Lavender" },
  { value: "#795548", label: "Cocoa" },
  { value: "#d50000", label: "Tomato" },
  { value: "#f09300", label: "Mango" },
  { value: "#7cb342", label: "Pistachio" },
  { value: "#039be5", label: "Peacock" },
  { value: "#b39ddb", label: "Wisteria" },
  { value: "#616161", label: "Graphite" },
  { value: "#e67c73", label: "Flamingo" },
  { value: "#f6bf26", label: "Banana" },
  { value: "#33b679", label: "Sage" },
  { value: "#4285f4", label: "Cobalt" },
  { value: "#9e69af", label: "Amethyst" },
  { value: "#a79b8e", label: "Birch" },
];

export const DEFAULT_LABELS: ColorPickerLabels = {
  trigger: "Choose color",
  palette: "Colors",
  addCustom: "Add custom color",
  customTitle: "Choose custom color",
  customDescription:
    "Choose a background color. The text color will be adjusted automatically.",
  preview: "A",
  hex: "Hex",
  eyeDropper: "Pick a color from the screen",
  saturation: "Saturation and brightness",
  hue: "Hue",
  cancel: "Cancel",
  save: "Save",
};
