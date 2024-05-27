import React, { forwardRef } from "react";
import { type ButtonProps } from "./index.props";
import { StyledButton, StyledIcon } from "./styles";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      fullWidth = false,
      variant = "primary",
      iconStart,
      iconEnd,
      icon,
      size,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledButton
        onClick={onClick}
        ref={ref}
        size={size}
        className={className}
        variant={variant}
        icon={icon}
        fullWidth={fullWidth}
        {...props}
      >
        {icon && <StyledIcon>{icon}</StyledIcon>}
        {iconStart && <StyledIcon>{iconStart}</StyledIcon>}
        {children && children}
        {iconEnd && <StyledIcon>{iconEnd}</StyledIcon>}
      </StyledButton>
    );
  },
);

export default Button;
