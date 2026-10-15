/** h: 0–360, s: 0–100, v: 0–100 */
export interface HSV {
  h: number;
  s: number;
  v: number;
}

/** Channels: 0–255 */
interface RGB {
  r: number;
  g: number;
  b: number;
}

export const clamp = (value: number, min = 0, max = 1): number =>
  Math.min(max, Math.max(min, value));

const round1 = (value: number): number => Math.round(value * 10) / 10;

const hsv2rgb = ({ h, s, v }: HSV): RGB => {
  const sat = s / 100;
  const val = v / 100;
  const channel = (n: number) => {
    const k = (n + h / 60) % 6;

    return Math.round(
      (val - val * sat * Math.max(0, Math.min(k, 4 - k, 1))) * 255,
    );
  };

  return { r: channel(5), g: channel(3), b: channel(1) };
};

// Not rounded, so repeated conversions do not accumulate errors.
const rgb2hsv = ({ r, g, b }: RGB): HSV => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;

  if (delta !== 0) {
    if (max === rn) {
      h = ((gn - bn) / delta) % 6;
    } else if (max === gn) {
      h = (bn - rn) / delta + 2;
    } else {
      h = (rn - gn) / delta + 4;
    }

    h *= 60;

    if (h < 0) h += 360;
  }

  return { h, s: max === 0 ? 0 : (delta / max) * 100, v: max * 100 };
};

/** HSV → `hsl(...)` for inline styles. */
export const hsv2css = ({ h, s, v }: HSV): string => {
  const sat = s / 100;
  const val = v / 100;
  const l = val * (1 - sat / 2);
  const sl = l === 0 || l === 1 ? 0 : (val - l) / Math.min(l, 1 - l);

  return `hsl(${round1(h)}, ${round1(sl * 100)}%, ${round1(l * 100)}%)`;
};

const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/** `#ABC`, `abc`, `#aabbcc` → `#aabbcc`. Invalid input → `null`. */
export const normalizeHex = (input: string): string | null => {
  const match = HEX_RE.exec(input.trim());

  if (!match) return null;

  const digits =
    match[1].length === 3 ? match[1].replace(/./g, (c) => c + c) : match[1];

  return `#${digits.toLowerCase()}`;
};

const hex2rgb = (hex: string): RGB | null => {
  const normalized = normalizeHex(hex);

  if (!normalized) return null;

  const int = parseInt(normalized.slice(1), 16);

  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
};

const rgb2hex = ({ r, g, b }: RGB): string =>
  `#${[r, g, b]
    .map((c) =>
      Math.round(clamp(c, 0, 255))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;

export const hsv2hex = (hsv: HSV): string => rgb2hex(hsv2rgb(hsv));

export const hex2hsv = (hex: string): HSV | null => {
  const rgb = hex2rgb(hex);

  return rgb ? rgb2hsv(rgb) : null;
};

const RGB_RE = /^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/i;

/** HEX or `rgb()`/`rgba()` → `#rrggbb`. Invalid input → `null`. */
export const toHex = (input: string): string | null => {
  const rgbMatch = RGB_RE.exec(input.trim());

  if (rgbMatch) {
    const [r, g, b] = rgbMatch.slice(1).map(Number);

    return rgb2hex({ r, g, b });
  }

  return normalizeHex(input);
};

/**
 * HEX → HSV that keeps hue and saturation from `prev` where the color has
 * none: grey has no hue, black has neither. Without this, typing `#000000`
 * would jump the hue slider to 0 (red).
 */
export const toHsvPreservingHue = (hex: string, prev: HSV): HSV | null => {
  const next = hex2hsv(hex);

  if (!next) return null;
  if (next.v === 0) return { h: prev.h, s: prev.s, v: 0 };
  if (next.s === 0) return { h: prev.h, s: 0, v: next.v };

  return next;
};

/** WCAG 2.x relative luminance, 0–1. */
const relativeLuminance = ({ r, g, b }: RGB): number => {
  const [lr, lg, lb] = [r, g, b].map((c) => {
    const x = c / 255;

    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
};

const WHITE_LUMINANCE = 1;
const BLACK_LUMINANCE = 0;

const contrast = (a: number, b: number): number =>
  (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/** Whether light text reads better than dark text on `background` (HEX). */
export const prefersLightText = (background: string): boolean => {
  const rgb = hex2rgb(background);

  if (!rgb) return false;

  const luminance = relativeLuminance(rgb);

  return (
    contrast(luminance, WHITE_LUMINANCE) >= contrast(luminance, BLACK_LUMINANCE)
  );
};

/** A light color that merges with a light surface and needs an outline. */
export const isLightColor = (hex: string, threshold = 0.85): boolean => {
  const rgb = hex2rgb(hex);

  return rgb ? relativeLuminance(rgb) >= threshold : false;
};
