type Presets = {
  date: string;
  period: number;
};

export type Props = {
  size: "s" | "l";
  startDate?: string;
  monthsLimit?: number;
  selectedDate?: string;
  selectedPeriod?: number;
  onChange: (selected: Presets) => void;
};
