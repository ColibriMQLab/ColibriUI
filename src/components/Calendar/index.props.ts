import type { Preset } from "./components/Presets";

export type CalendarPayload = {
  date: string;
  period: number;
};

export type CalendarTitleSize =
  | "xs"
  | "s"
  | "m"
  | "l"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export type CalendarProps = {
  today: string;
  selectedDate?: string;
  selectedPeriod?: number;
  canSelectRange?: boolean;
  activeDates?: string[];
  datePresets?: Preset[];
  availableDates?: string[];
  onChange?: (payload: CalendarPayload) => void;
  onCancel?: () => void;
  withContinueButton?: boolean;
  className?: string;
  minWidth?: number;
  titleSize?: CalendarTitleSize;
};
