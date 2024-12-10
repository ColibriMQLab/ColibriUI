import React, { useMemo } from "react";
import Select from "../Select";
import { checkIsBeforeDate, checkIsBeforeNow, generateSuggest } from "./helpers";
import OptionLabel from "./Label";

import type { SelectProps } from "../Select/index.props";
import type { FC } from "react";

interface TimeSelectProps extends Omit<SelectProps<string>, 'options'> {
  interval?: 5 | 10 | 15 | 30;
  currentDate?: Date | null;
  upToDate?: Date | null;
  name?: string;
}

const TimeSelect: FC<TimeSelectProps> = ({
  value,
  name,
  currentDate,
  upToDate,
  label,
  interval = 15,
  onChange,
  ...props
}: TimeSelectProps) => {
  const baseOptions = useMemo(() => {
    return generateSuggest(interval).map((item) => ({
      value: item.time,
      label: <OptionLabel time={item.time} />,
    }));
  }, [interval]);

  const options = useMemo(() => {
    return baseOptions.map((option) => ({
      ...option,
      disabled: !!upToDate && checkIsBeforeDate(option.value, upToDate) || !!currentDate && checkIsBeforeNow(option.value, currentDate),
    }));
  }, [baseOptions, currentDate, upToDate]);

  return (
    <Select
      {...props}
      name={name}
      value={value}
      label={label}
      options={options}
      onChange={onChange}
    />
  );
};

export default TimeSelect;
