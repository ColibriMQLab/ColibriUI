import React from "react";
import classNames from "classnames/bind";
import Select from "../Select";
import {
  generateSuggest,
  MINUTES_INTERVAL_15,
  MINUTES_INTERVAL_30,
} from "./helpers";
import OptionLabel from "./Label";

import styles from "./index.module.scss";
import type { SelectProps } from "../Select/index.props";
import type { FC } from "react";

const clx = classNames.bind(styles);

interface TimeSelectProps extends SelectProps<string> {}

const SUGGEST = generateSuggest(MINUTES_INTERVAL_30);

const TimeSelect: FC<TimeSelectProps> = ({
  value,
  label = "Start time",
  onChange,
  ...props
}: TimeSelectProps) => {
  return (
    <Select
      {...props}
      value={value}
      label={label}
      options={SUGGEST.map((item) => ({
        value: item.time,
        label: <OptionLabel time={item.time} />,
      }))}
      onChange={onChange}
    />
  );
};

export default TimeSelect;
