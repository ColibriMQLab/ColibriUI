import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.scss";

const clx = classNames.bind(styles);

type Props = {
  className?: string;
};

const DatePicker = ({ className }: Props) => {
  return (
    <div className={clx(styles.root, className)}>
      <div className={clx(styles["date-picker"])}>
        <input
          className={clx(styles["date-picker-input-control"])}
          defaultValue="12.12.2024"
        />
      </div>
    </div>
  );
};

export default DatePicker;
