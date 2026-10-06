import React, { useId } from "react";
import TextareaAutosize from "react-textarea-autosize";
import clsx from "clsx";
import { FormField } from "../base/FormField";
import { InputRoot } from "../base/InputRoot";
import styles from "./TextArea.module.scss";
import type { ITextAreaProps } from "./index.props";
import type { ChangeEvent } from "react";

export const TextArea = ({
  className,
  value = "",
  minRows = 3,
  maxRows = 6,
  onChange,
  label,
  required,
  hasError,
  hint,
  disabled,
  inputRef,
  ref,
  id,
  ...props
}: ITextAreaProps) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const hintId = hint ? `${textareaId}-hint` : undefined;
  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(event.target.value, event);
  };

  return (
    <FormField
      ref={ref}
      className={clsx(className)}
      required={required}
      label={label}
      htmlFor={textareaId}
      hint={hint}
      hintId={hintId}
      hasError={hasError}
    >
      <InputRoot disabled={!!disabled} hasError={hasError}>
        <TextareaAutosize
          ref={inputRef}
          data-testid="textarea"
          disabled={disabled}
          minRows={minRows}
          maxRows={maxRows}
          value={value}
          className={clsx(styles.textarea, className)}
          onChange={onChangeHandler}
          {...props}
          id={textareaId}
          required={required}
          aria-invalid={props["aria-invalid"] ?? (hasError || undefined)}
          aria-describedby={
            clsx(props["aria-describedby"], hintId) || undefined
          }
        />
      </InputRoot>
    </FormField>
  );
};
