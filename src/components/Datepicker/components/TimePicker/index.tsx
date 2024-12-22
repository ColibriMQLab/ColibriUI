import React, { memo, useMemo, useState } from "react";
import classNames from "classnames/bind";
import Select from "../../../Select";
import styles from "./index.module.scss";
import { generateSuggest } from "./helpers";
import OptionLabel from "./Label";
import type { TimePickerProps } from "./index.props";

const clx = classNames.bind(styles);

const TimePicker = ({
  className,
  interval = 30,
  selectedTime = "",
  onChangeTime,
}: TimePickerProps) => {
  const [time, setTime] = useState<string>(selectedTime);

  const options = useMemo(
    () =>
      generateSuggest(interval).map((item) => ({
        value: item.time,
        label: <OptionLabel time={item.time} />,
        disabled: false,
      })),
    [interval],
  );

  const handleChange = (value: string) => {
    setTime(value);
    onChangeTime?.(value);
  };

  return (
    <Select
      className={clx(className, styles.select)}
      options={options}
      fontSize={14}
      customInputRoot={
        <div className={clx(styles["input-container"], styles["input-time"])}>
          <input
            className={clx(styles["input-field"])}
            tabIndex={0}
            aria-expanded="false"
            aria-haspopup="true"
            aria-invalid="false"
            autoComplete="off"
            maxLength={5}
            readOnly
            value={time}
          />
        </div>
      }
      value={time}
      onChange={handleChange}
    />
  );
};

export default memo(TimePicker);
