import React from "react";
import clsx from "clsx";
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
      className={clsx(styles["base-input"], className)}
      onChange={onChangeHandler}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoCorrect="off"
      autoCapitalize="off"
      ref={ref}
      {...props}
    />
  );
};

export default BaseInput;
