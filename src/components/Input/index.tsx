import React, { forwardRef } from "react";
import classNames from "classnames";
import FormField from "../base/FormField";
import InputRoot from "../base/InputRoot";
import BaseInput from "../base/BaseInput";
import type { InputProps } from "./index.props";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      startIcon,
      endIcon,
      label,
      hint,
      error,
      required,
      onChange,
      inputRef,
      variant = "primary",
      size = "m",
      ...props
    },
    ref,
  ) => {
    return (
      <FormField
        className={classNames(className)}
        label={label}
        required={required}
        hint={hint}
        error={error}
      >
        <InputRoot
          ref={ref}
          startIcon={startIcon}
          endIcon={endIcon}
          variant={variant}
          size={size}
          disabled={!!props.disabled}
          error={error}
        >
          <BaseInput ref={inputRef} onChange={onChange} {...{ type: "text", ...props }} />
        </InputRoot>
      </FormField>
    );
  },
);

export default Input;
