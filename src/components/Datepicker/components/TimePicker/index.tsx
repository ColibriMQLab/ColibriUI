import React, { useMemo, useState } from "react";
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
}

const TimePicker = ({ className, interval = 30 }: TimePickerProps) => {
  const [value, setValue] = useState<string>("");

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
    <div className={clx(styles.root, className)}>
      <div className={clx(styles["time-picker"])}>
        <span className={clx(styles["time-input-wrapper"])}>
          <span className={clx(styles.select)}>
            <span className={clx(styles["text-input"])}>
              <Select
                value={value}
                options={options}
                fontSize={14}
                customInputRoot={
                  <input
                    aria-expanded="false"
                    aria-haspopup="true"
                    aria-invalid="false"
                    autoComplete="off"
                    className={clx(styles["text-input-control"])}
                    maxLength={5}
                    defaultValue={value}
                  />
                }
                onChange={(v) => setValue(v)}
              />
              <span className={clx(styles["text-input-box"])} />
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default TimePicker;
