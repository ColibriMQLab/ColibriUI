import React, { useMemo } from "react";
import Select from "../Select";
import {
  checkIsBeforeSelectedDate,
  checkIsBeforeNow,
  generateSuggest,
  isTimeInRange,
} from "./helpers";
import OptionLabel from "./Label";

import type { SelectProps } from "../Select/index.props";
import type { TimeRange } from "./helpers";
import type { FC } from "react";

interface TimeSelectProps extends Omit<SelectProps<string>, "options"> {
  interval?: 5 | 10 | 15 | 30;
  currentDate?: Date | null;
  selectedDate?: Date | null;
  allowedTimeRange?: TimeRange;
}

const TimeSelect: FC<TimeSelectProps> = ({
  value,
  name,
  className,
  currentDate,
  selectedDate,
  label,
  interval = 15,
  onChange,
  disabled,
  allowedTimeRange,
  placeholder,
  fullWidth,
  customInputRoot,
  fontSize,
  required,
  size,
  zIndex,
  hasError,
  hint,
}) => {
  const baseOptions = useMemo(
    () =>
      generateSuggest(interval).map((item) => ({
        value: item.time,
        label: <OptionLabel time={item.time} />,
      })),
    [interval],
  );

  const options = useMemo(
    () =>
      baseOptions.map((option) => {
        const isDisabled =
          (!!allowedTimeRange &&
            !isTimeInRange(option.value, allowedTimeRange)) ||
          (!!selectedDate &&
            checkIsBeforeSelectedDate(option.value, interval, selectedDate)) ||
          (!!currentDate && checkIsBeforeNow(option.value, currentDate));

        return { ...option, disabled: isDisabled };
      }),
    [baseOptions, currentDate, selectedDate, allowedTimeRange, interval],
  );

  return (
    <Select
      className={className}
      customInputRoot={customInputRoot}
      fontSize={fontSize}
      fullWidth={fullWidth}
      name={name}
      value={value}
      required={required}
      size={size}
      placeholder={placeholder}
      label={label}
      options={options}
      onChange={onChange}
      disabled={disabled}
      zIndex={zIndex}
      hasError={hasError}
      hint={hint}
    />
  );
};

export default TimeSelect;
