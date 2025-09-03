import React from "react";
import classNames from "classnames";
import styles from "./BaseInput.module.scss";
import type { ChangeEvent } from "react";
import type { Props } from "./index.props";

const BaseInput = ({
  className,
  onFocus,
  onChange,
  onBlur,
  onKeyDown,
  ref,
  ...props
}: Props) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e, e.target.value);
  };
  return (
    <input
      className={classNames(styles["base-input"], className)}
      onChange={onChangeHandler}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      ref={ref}
      {...props}
    />
  );
};

export default BaseInput;
