import { forwardRef } from "react";
import { BaseDisableWrapper, BaseIcon, BaseInputRoot } from "./styles";
import type { InputProps } from "./index.props";

const InputRoot = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      className,
      startIcon,
      endIcon,
      children,
      variant = "primary",
      disabled,
      error,
      size,
    },
    ref,
  ) => {
    return (
      <BaseInputRoot
        ref={ref}
        className={className}
        variant={variant}
        isError={error ? 1 : 0}
        disabled={disabled}
        size={size}
      >
        {startIcon && <BaseIcon>{startIcon}</BaseIcon>}
        {children}
        {endIcon && <BaseIcon>{endIcon}</BaseIcon>}
        {disabled && <BaseDisableWrapper />}
      </BaseInputRoot>
    );
  },
);

export default InputRoot;
