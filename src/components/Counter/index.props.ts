import type { TestIdProps } from "../helpers/testId";

export type CounterProps = TestIdProps & {
  value: number;
  max: number;
  min: number;
  fullWidth?: boolean;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
};
