import { forwardRef } from "react";
import FormField from "../base/FormField";
import InputRoot from "../base/InputRoot";
import { BaseInput } from "../base/InputRoot/styles";
import type { ChangeEvent } from "react";
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
      onChange,
      variant = "primary",
      size,
      ...props
    },
    ref,
  ) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e, e.target.value);
    };
    return (
      <FormField className={className} label={label} hint={hint} error={error}>
        <InputRoot
          ref={ref}
          startIcon={startIcon}
          endIcon={endIcon}
          variant={variant}
          size={size}
          disabled={!!props.disabled}
          error={error}
        >
          <BaseInput
            as="input"
            onChange={onChangeHandler}
            {...{ type: "text", ...props }}
          />
        </InputRoot>
      </FormField>
    );
  },
);

export default Input;
