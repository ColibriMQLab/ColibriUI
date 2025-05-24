import React from "react";
import classNames from "classnames/bind";
import Button from "../Button";
import MinusIcon from "../Icons/Minus";
import PlusIcon from "../Icons/Plus";
import styles from "./Counter.module.scss";
import type { CounterProps } from "./index.props";

const clx = classNames.bind(styles);

const Counter: React.FC<CounterProps> = ({
  value = 1,
  max,
  min = 0,
  fullWidth,
  onChange,
  disabled,
  className,
}) => {
  const minusDisabled = disabled || value <= min;
  const plusDisabled = disabled || value >= max;

  const handleChange = (delta: number) => {
    if (disabled) return;
    const newValue = value + delta;
    if (newValue < min || newValue > max) return;
    onChange(newValue);
  };

  return (
    <div
      className={clx(
        styles.root,
        {
          root_fullWidth: fullWidth ? 1 : 0,
        },
        className,
      )}
    >
      <div
        className={clx(styles.control, {
          control_fullWidth: fullWidth ? 1 : 0,
        })}
      >
        <Button
          icon={<MinusIcon width={16} height={16} />}
          disabled={minusDisabled}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleChange(-1);
          }}

          aria-label="decrease"
        />
        <div className={clx(styles.value)}>{value}</div>
        <Button
          icon={<PlusIcon width={16} height={16} />}
          disabled={plusDisabled}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleChange(1);
          }}
          aria-label="increase"
        />
      </div>
    </div>
  );
};

export default Counter;
