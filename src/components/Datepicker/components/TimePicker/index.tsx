import React, { memo, useMemo, useState } from "react";
import clsx from "clsx";
import Select from "../../../Select";
import styles from "./index.module.scss";
import { generateSuggest } from "./helpers";
import OptionLabel from "./Label";
import type { TimePickerProps } from "./index.props";

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
      className={clsx(className, styles.select)}
      options={options}
      fontSize={14}
      customInputRoot={
        <div className={clsx(styles["input-container"], styles["input-time"])}>
          <input
            className={styles["input-field"]}
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
