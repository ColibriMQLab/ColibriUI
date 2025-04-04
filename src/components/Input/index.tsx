import React from "react";
import classNames from "classnames";
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
  inputRef,
  disabled,
  variant = "primary",
  size = "m",
  ref,
  ...props
}: InputProps) => (
  <FormField
    className={classNames(className)}
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
        {...{ type: "text", ...props }}
      />
    </InputRoot>
  </FormField>
);

export default Input;
