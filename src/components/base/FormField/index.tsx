import { forwardRef } from "react";
import React from "react";
import classNames from "classnames/bind";
import Typography from "../../Typography";
import styles from "./FormField.module.scss";
import type { FormFieldProps } from "./index.props";

const clx = classNames.bind(styles);

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, hint, children, error, required, className }, ref) => {
    return (
      <div className={clx(styles.container, className)} ref={ref}>
        {label && (
          <Typography
            className={clx(styles.label, { label_required: !!required })}
            tag="label"
          >
            {label}
          </Typography>
        )}
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
