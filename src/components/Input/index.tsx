import React from "react";
import clsx from "clsx";
import FormField from "../base/FormField";
import InputRoot from "../base/InputRoot";
import BaseInput from "../base/BaseInput";
import type { InputProps } from "./index.props";

const Input = ({
  className,
  startIcon,
  endIcon,
  label,
  hint,
  hasError,
  required,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  inputRef,
  disabled,
  variant = "primary",
  size = "m",
  ref,
  ...props
}: InputProps) => (
  <FormField
    className={clsx(className)}
    label={label}
    required={required}
    hint={hint}
    hasError={hasError}
  >
    <InputRoot
      ref={ref}
      startIcon={startIcon}
      endIcon={endIcon}
      variant={variant}
      size={size}
      disabled={!!disabled}
      hasError={hasError}
    >
      <BaseInput
        ref={inputRef}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        {...{ type: "text", ...props }}
      />
    </InputRoot>
  </FormField>
);

export default Input;
