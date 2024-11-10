import React from "react";
import { forwardRef, ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ITextAreaProps } from "./index.props";
import FormField from "../base/FormField";
import InputRoot from "../base/InputRoot";
import classNames from "classnames/bind";
import styles from './TextArea.module.scss';

const clx = classNames.bind(styles);

const TextArea = forwardRef<HTMLDivElement, ITextAreaProps>(
  ({ className, value = "", minRows = 3, maxRows = 6, onChange, label, required, error, hint, disabled, ...props }, ref) => {
    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) onChange(event.target.value, event);
    };

    return (
      <FormField ref={ref} className={clx(null, className)} required={required} label={label} hint={hint} error={error}>
        <InputRoot disabled={!!disabled} error={error}>
          <TextareaAutosize
            data-testid="textarea"
            minRows={minRows}
            maxRows={maxRows}
            value={value}
            className={clx(styles.textarea, className)}
            onChange={onChangeHandler}
            {...props}
          />
        </InputRoot>
      </FormField>
    );
  }
);

export default TextArea;
