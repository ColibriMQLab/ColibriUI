import { forwardRef } from "react";
import Typography from "../../Typography";
import { BaseContainer } from "./styles";
import { FormFieldProps } from "./index.props";

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, hint, children, error, className }, ref) => {
    return (
      <BaseContainer className={className} ref={ref}>
        {label && (
          <Typography tag="label">
            {label}
          </Typography>
        )}
        {children}
        {hint && (
          <Typography
            variant={error ? "alert" : "secondary"}
            tag="span"
          >
            {hint}
          </Typography>
        )}
      </BaseContainer>
    );
  }
);

export default FormField;
