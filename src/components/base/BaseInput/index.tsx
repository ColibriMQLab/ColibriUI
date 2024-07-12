import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./BaseInput.module.scss";
import type { ChangeEvent } from "react";
import type { Props } from "./index.props";

const BaseInput = forwardRef<HTMLInputElement, Props>(
  ({ className, onChange, ...props }, ref) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e, e.target.value);
    };
    return (
      <input
        className={classNames(styles.baseInput, className)}
        onChange={onChangeHandler}
        ref={ref}
        {...props}
      />
    );
  },
);

export default BaseInput;
