import React, { memo } from "react";
import clsx from "clsx";
import { Typography } from "../Typography";
import styles from "./InputRadio.module.scss";
import type { FC } from "react";
import type { InputRadioProps } from "./index.props";

export const InputRadio: FC<InputRadioProps> = memo(
  ({
    checked,
    children,
    className,
    containerClassName,
    disabled,
    error,
    id,
    name,
    note,
    onBlur,
    onFocus,
    onChange,
    onClick,
    onMouseEnter,
    style,
    text,
    value,
    testid,
    ...rest
  }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <label
      className={clsx(styles.label, className)}
      htmlFor={id}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      data-testid={testid}
    >
      <div
        className={clsx(
          styles.container,
          {
            [styles["container_disabled"]]: Boolean(disabled),
            [styles["container_error"]]: Boolean(error),
          },
          containerClassName,
        )}
      >
        <input
          type="radio"
          id={id}
          value={value}
          name={name}
          className={clsx(styles.input, {
            [styles["input_error"]]: Boolean(error),
            [styles["input_checked"]]: Boolean(checked),
            [styles["input_disabled"]]: Boolean(disabled),
          })}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        />
        <span className={styles.icon} />
        <span className={styles.text}>
          {!children && text}
          {!text && children}
        </span>
      </div>
      {!!note && (
        <Typography tag="p" size="s" className={styles.note}>
          {note}
        </Typography>
      )}
    </label>
  ),
);
