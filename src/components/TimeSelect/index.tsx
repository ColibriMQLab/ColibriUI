import React, { useMemo } from "react";
import Select from "../Select";
import { checkIsBeforeNow, generateSuggest } from "./helpers";
import OptionLabel from "./Label";

import type { SelectProps } from "../Select/index.props";
import type { FC } from "react";

interface TimeSelectProps extends Omit<SelectProps<string>, 'options'> {
  interval?: 5 | 10 | 15 | 30;
  currentDate?: Date | null;
}

const TimeSelect: FC<TimeSelectProps> = ({
  value,
  currentDate,
  label,
  interval = 15,
  onChange,
  ...props
}: TimeSelectProps) => {
  const options = useMemo(() => {
    return generateSuggest(interval).map((item) => ({
      value: item.time,
      label: <OptionLabel time={item.time} />,
      disabled: !!currentDate && checkIsBeforeNow(item.time, currentDate),
    }));
  }, [interval]);

  return (
    <Select
      {...props}
      value={value}
      label={label}
      options={options}
      onChange={onChange}
    />
  );
};

export default TimeSelect;
