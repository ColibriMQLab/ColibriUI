import React from "react";

import classNames from "classnames/bind";
import Radio from "./Radio";

import styles from "./RadioGroup.module.scss";

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
  hasError?: boolean;
}

const RadioGroup: React.FC<Props> = ({
  val,
  options,
  onChange,
  onBlur,
  column,
  wrapped,
  className,
  disabled,
  hasError,
}: Props) => {
  return (
    <div
      className={clx(styles.group, { column, wrapped, hasError }, className)}
    >
      {options.map((option) => (
        <Radio
          className={clx(styles.radio, option.className)}
          id={option.id}
          testId={option.id}
          value={option.val}
          text={option.text}
          note={option.note}
          name={option.name}
          checked={val === option.val}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onClick={option.onClick}
          onMouseEnter={option.onMouseEnter}
          key={option.val}
          disabled={disabled || option.disabled}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
