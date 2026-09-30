/**
 * Breakpoints shared with the apps that use the kit.
 * The values match the Tailwind CSS defaults on purpose; Tailwind is not a dependency.
 */
export const BREAKPOINTS = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS;

export type Media = {
  /** `(width >= <name>)` */
  up: (name: BreakpointName) => string;
  /** `(width < <name>)` */
  down: (name: BreakpointName) => string;
  /** `(<from> <= width < <to>)` */
  between: (from: BreakpointName, to: BreakpointName) => string;
};

/** Bare media queries, usable in `window.matchMedia`. Prefix with `@media ` in CSS-in-JS. */
export const media: Media = {
  up: (name) => `(width >= ${BREAKPOINTS[name]})`,
  down: (name) => `(width < ${BREAKPOINTS[name]})`,
  between: (from, to) => `(${BREAKPOINTS[from]} <= width < ${BREAKPOINTS[to]})`,
};
