export type CounterProps = {
  value: number;
  max: number;
  min: number;
  fullWidth?: boolean;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
};
