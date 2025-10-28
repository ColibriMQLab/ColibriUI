import React, { memo } from "react";
import clsx from "clsx";
import Typography from "../Typography";
import styles from "./InputRadio.module.scss";
import type {
  FC,
  CSSProperties,
  PropsWithChildren,
  FocusEvent,
  ChangeEvent,
} from "react";

type InputRadioProps = {
  checked?: boolean;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
  name?: string;
  note?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
  onMouseEnter?: (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ) => void;
  style?: CSSProperties;
  text?: string;
  value: string | number;
  testid?: string;
};

const InputRadio: FC<PropsWithChildren<InputRadioProps>> = memo(
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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
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

export default InputRadio;
