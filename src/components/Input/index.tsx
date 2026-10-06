import React, { useId } from "react";
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
  id,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
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
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        {...{ type: "text", ...props }}
        id={inputId}
        required={required}
        aria-invalid={props["aria-invalid"] ?? (hasError || undefined)}
        aria-describedby={clsx(props["aria-describedby"], hintId) || undefined}
      />
    </InputRoot>
  );

  return (
    <FormField
      className={clsx(className)}
      label={label}
      htmlFor={inputId}
      required={required}
      hint={hint}
      hintId={hintId}
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
