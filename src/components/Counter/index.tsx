import React, { useRef } from "react";
import Button from "../Button";
import MinusIcon from "../Icons/Minus";
import PlusIcon from "../Icons/Plus";
import { Control, Root, Value } from "./styles";
import type { CounterProps } from "./index.props";

const Counter: React.FC<CounterProps> = ({
  value = 1,
  max,
  min = 0,
  fullWidth,
  onChange,
  disabled,
  className,
}) => {
  const lastNumValue = useRef<number>(value);
  const minusDisabled = disabled || value <= min;
  const plusDisabled = disabled || value >= max;

  return (
    <Root className={className} fullWidth={fullWidth}>
      <Control fullWidth={fullWidth}>
        <Button
          icon={<MinusIcon width={16} height={16} />}
          disabled={minusDisabled}
          onClick={() => {
            onChange(value - 1);
            lastNumValue.current = value - 1;
          }}
          aria-label="decrease"
        />
        <Value>{value}</Value>
        <Button
          icon={<PlusIcon width={16} height={16} />}
          disabled={plusDisabled}
          onClick={() => {
            onChange(value + 1);
            lastNumValue.current = value + 1;
          }}
          aria-label="increase"
        />
      </Control>
    </Root>
  );
};

export default Counter;
