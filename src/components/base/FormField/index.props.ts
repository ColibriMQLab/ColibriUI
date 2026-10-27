import type { ReactNode } from "react";
import type { PropsWithChildren } from "react";
import type { TestIdProps } from "../../helpers/testId";

export type FormFieldProps = PropsWithChildren<
  TestIdProps & {
    className?: string;
    hasError?: boolean;
    hint?: ReactNode;
    /** Id of the hint, referenced by the control's `aria-describedby`. */
    hintId?: string;
    /** Id of the control the label belongs to. */
    htmlFor?: string;
    label?: ReactNode;
    /** Id of the label, referenced by the control's `aria-labelledby`. */
    labelId?: string;
    ref?: React.Ref<HTMLDivElement>;
    required?: boolean;
  }
>;
