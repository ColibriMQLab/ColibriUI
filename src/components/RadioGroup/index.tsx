import React, { memo } from "react";
import clsx from "clsx";
import Radio from "./Radio";
import styles from "./RadioGroup.module.scss";
import type { FC } from "react";

export interface Option {
  id?: string;
  val: string | number;
  text: string;
  note?: string;
  name?: string;
  tooltipContent?: () => React.ReactElement;
  onClick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
  onMouseEnter?: (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ) => void;
  className?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  val?: string | number;
  options: Option[];
  onChange: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  column?: boolean;
  wrapped?: boolean;
  className?: string;
  disabled?: boolean;
}

const RadioGroup: FC<RadioGroupProps> = memo(
  ({
    val,
    options,
    onChange,
    onBlur,
    column = false,
    wrapped = false,
    className,
    disabled = false,
  }: RadioGroupProps) => (
    <div
      className={clsx(
        styles.group,
        {
          [styles["group_column"]]: Boolean(column),
          [styles["group_wrapped"]]: Boolean(wrapped),
        },
        className,
      )}
    >
      {options.map((option) => {
        const {
          id,
          val: optionVal,
          text,
          note,
          name,
          onClick,
          onMouseEnter,
          className: optionClassName,
          disabled: optionDisabled,
        } = option;

        return (
          <Radio
            key={optionVal}
            id={id}
            testId={id}
            value={optionVal}
            text={text}
            note={note}
            name={name}
            className={clsx(styles.radio, optionClassName)}
            checked={val === optionVal}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            disabled={disabled || optionDisabled}
          />
        );
      })}
    </div>
  ),
);

export default RadioGroup;
