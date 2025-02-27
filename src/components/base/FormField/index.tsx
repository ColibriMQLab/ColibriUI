import React from "react";
import classNames from "classnames";
import Typography from "../../Typography";
import styles from "./FormField.module.scss";
import type { FormFieldProps } from "./index.props";

const FormField = ({
  label,
  hint,
  children,
  hasError,
  required,
  className,
  ref,
}: FormFieldProps) => (
  <div className={classNames(styles.container, className)} ref={ref}>
    {label && (
      <Typography
        className={classNames(styles.label, {
          [styles.label_required]: required,
        })}
        tag="label"
      >
        {label}
      </Typography>
    )}
    {children}
    {hint && (
      <Typography variant={hasError ? "alert" : "secondary"} tag="span">
        {hint}
      </Typography>
    )}
  </div>
);

export default FormField;
