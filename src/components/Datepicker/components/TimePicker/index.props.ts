type TimePickerInterval = 5 | 10 | 15 | 30;

export type TimePickerProps = {
  className?: string;
  interval?: TimePickerInterval;
  selectedTime?: string;
  onChangeTime?: (time: string) => void;
};
