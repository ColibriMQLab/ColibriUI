import type { SelectProps } from "../Select/index.props";
import type { TimeRange } from "./helpers";

export interface TimeSelectProps extends Omit<SelectProps<string>, "options"> {
  interval?: 5 | 10 | 15 | 30;
  currentDate?: Date | null;
  selectedDate?: Date | null;
  allowedTimeRange?: TimeRange;
}
