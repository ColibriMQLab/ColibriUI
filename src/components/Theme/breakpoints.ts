export type Breakpoints = {
  hd: number;
  xl: number;
  lg: number;
  md: number;
  sm: number;
  xs: number;
};

export type BreakpointName = keyof Breakpoints;

export type BreakpointsTheme = {
  values: Breakpoints;
  up: (breakpoint: BreakpointName, isMedial?: boolean) => string;
  under: (breakpoint: BreakpointName, isMedial?: boolean) => string;
  between: (
    [from, to]: [BreakpointName, BreakpointName],
    isMedial?: boolean,
  ) => string;
};

export type BreakpointMap<T = number> = Map<BreakpointName, T>;

const Breakpoints: BreakpointsTheme = {
  values: {
    hd: 2560,
    xl: 1920,
    lg: 1450,
    md: 1075,
    sm: 680,
    xs: 320,
  },
  up(breakpoint, isMedia = true) {
    return `${isMedia ? "@media " : ""}(min-width: ${
      this.values[breakpoint]
    }px)`;
  },
  under(breakpoint, isMedia = true) {
    return `${isMedia ? "@media " : ""}(max-width: ${
      this.values[breakpoint] - 1
    }px)`;
  },
  between([min, max], isMedia = true) {
    const from = this.values[min];
    const to = this.values[max] - 1;
    return `${
      isMedia ? "@media " : ""
    }(min-width: ${from}px) and (max-width: ${to}px)`;
  },
};

export default Breakpoints;
