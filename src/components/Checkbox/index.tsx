import Typography from "../Typography";
import { Control, FakeCheckbox, Label, Root, Text, Wrapper } from "./styles";
import type { FC } from "react";
import type { CheckboxProps } from "./index.props";

const Checkbox: FC<CheckboxProps> = ({
  id,
  name,
  value,
  label,
  hint,
  checked,
  onChange,
  onFocus,
  onBlur,
  variant = "primary",
  className,
  disabled,
  isError,
}) => {
  const control = (
    <Label>
      <Wrapper>
        <Control
          className={className}
          type="checkbox"
          id={id}
          variant={variant}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
        />
        <FakeCheckbox variant={variant} checked={checked} isError={isError} />
        <Text>{label}</Text>
      </Wrapper>
    </Label>
  );

  return (
    <Root>
      {control}
      {hint && (
        <Typography variant={isError ? "alert" : "secondary"} tag="span">
          {hint}
        </Typography>
      )}
    </Root>
  );
};

export default Checkbox;
