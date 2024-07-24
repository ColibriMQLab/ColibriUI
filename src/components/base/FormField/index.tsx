import { forwardRef } from "react";
import React from "react";
import classNames from "classnames";
import Typography from "../../Typography";
import styles from "./FormField.module.scss";
import type { FormFieldProps } from "./index.props";

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, hint, children, error, className }, ref) => {
    return (
      <div className={classNames(styles.container, className)} ref={ref}>
        {label && <Typography tag="label">{label}</Typography>}
        {children}
        {hint && (
          <Typography variant={error ? "alert" : "secondary"} tag="span">
            {hint}
          </Typography>
        )}
      </div>
    );
  },
);

export default FormField;
