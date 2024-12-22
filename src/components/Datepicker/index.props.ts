export type Props = {
  className?: string;
  selectedTime?: string;
  selectedDate?: string;
  onChangeTime?: (time: string) => void;
  onChangeDate?: (date: string) => void;
};
