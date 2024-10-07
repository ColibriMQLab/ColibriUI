import React, { memo } from "react";
import classNames from "classnames/bind";
import Radio from "./Radio";
import styles from "./RadioGroup.module.scss";
import type { FC } from "react";

const clx = classNames.bind(styles);

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

interface Props {
  val?: string | number;
  options: Option[];
  onChange: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  column?: boolean;
  wrapped?: boolean;
  className?: string;
  disabled?: boolean;
}

const RadioGroup: FC<Props> = memo(
  ({
    val,
    options,
    onChange,
    onBlur,
    column = false,
    wrapped = false,
    className,
    disabled = false,
  }: Props) => {
    return (
      <div
        className={clx(styles.group, { column, wrapped }, className)}
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
              className={clx(styles.radio, optionClassName)}
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
    );
  },
);

export default RadioGroup;
