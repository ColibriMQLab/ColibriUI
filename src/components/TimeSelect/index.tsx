import React, { useMemo } from "react";
import Select from "../Select";
import { generateSuggest } from "./helpers";
import OptionLabel from "./Label";

import type { SelectProps } from "../Select/index.props";
import type { FC } from "react";

interface TimeSelectProps extends SelectProps<string> {
  interval?: 5 | 10 | 15 | 30;
}

const TimeSelect: FC<TimeSelectProps> = ({
  value,
  label = "Start time",
  interval = 15,
  onChange,
  ...props
}: TimeSelectProps) => {
  const options = useMemo(() => {
    return generateSuggest(interval).map((item) => ({
      value: item.time,
      label: <OptionLabel time={item.time} />,
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
