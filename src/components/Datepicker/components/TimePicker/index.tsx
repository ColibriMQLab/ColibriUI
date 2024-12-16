import React, { memo, useMemo, useState } from "react";
import classNames from "classnames/bind";
import Select from "../../../Select";
import styles from "./index.module.scss";
import { generateSuggest } from "./helpers";
import OptionLabel from "./Label";

const clx = classNames.bind(styles);

interface TimePickerProps {
  className?: string;
  interval?: 5 | 10 | 15 | 30;
  value?: string;
  selectedTime?: string;
}

const TimePicker = ({
  className,
  interval = 30,
  selectedTime = "",
}: TimePickerProps) => {
  const [time, setTime] = useState<string>(selectedTime);

  const baseOptions = useMemo(() => {
    return generateSuggest(interval).map((item) => ({
      value: item.time,
      label: <OptionLabel time={item.time} />,
    }));
  }, [interval]);

  const options = useMemo(() => {
    return baseOptions.map((option) => ({
      ...option,
      disabled: false,
    }));
  }, [baseOptions, interval]);

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
      onChange={(time) => setTime(time)}
    />
  );
};

export default memo(TimePicker);
