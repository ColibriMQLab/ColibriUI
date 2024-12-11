import React from "react";
import classNames from "classnames/bind";
import Input from "../Input";
import styles from "./Datepicker.module.scss";

const clx = classNames.bind(styles);

type Props = {
  className?: string;
};

const Datepicker = ({ className }: Props) => {
  return (
    <div className={clx(styles.root, className)}>
      <div className={clx(styles.time)}>
        <div className={clx(styles["time-picker"])}>
          <span className={clx(styles["time-input-wrapper"])}>
            <span className={clx(styles.select)}>
              <span className={clx(styles["text-input"])}>
                <input
                  aria-expanded="false"
                  aria-haspopup="true"
                  aria-invalid="false"
                  autoComplete="off"
                  className={clx(styles["text-input-control"])}
                  maxLength={5}
                  defaultValue="10:00"
                />
                <span className={clx(styles["text-input-box"])} />
              </span>
            </span>
          </span>
        </div>
      </div>
      <div className={clx(styles.date)}>
        <div className={clx(styles["date-picker"])}>
          <input
            className={clx(styles["date-picker-input-control"])}
            defaultValue="12.12.2024"
          />
        </div>
      </div>
    </div>
  );
};

export default Datepicker;
