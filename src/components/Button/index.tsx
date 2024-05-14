import { forwardRef } from "react";
import { VARIANT, type IButtonProps } from "./index.props";
import { StyledButton, StyledIcon } from "./styles";

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      className,
      fullWidth = false,
      variant = VARIANT.DEFAULT,
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
