import React from "react";
import clsx from "clsx";
import { FormField } from "../base/FormField";
import { InputRoot } from "../base/InputRoot";
import { BaseInput } from "../base/BaseInput";
import type { InputProps } from "./index.props";

export const Input = ({
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
  controlAfter,
  controlClassName,
  controlRef,
  disabled,
  variant = "primary",
  size = "m",
  ref,
  ...props
}: InputProps) => {
  const control = (
    <InputRoot
      ref={controlRef ?? ref}
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
  );

  return (
    <FormField
      className={clsx(className)}
      label={label}
      required={required}
      hint={hint}
      hasError={hasError}
    >
      {controlAfter || controlClassName || controlRef ? (
        <div className={controlClassName}>
          {control}
          {controlAfter}
        </div>
      ) : (
        control
      )}
    </FormField>
  );
};
