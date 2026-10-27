import type { PropsWithChildren, ReactNode } from "react";
import type { TestIdProps } from "../helpers/testId";

export type AccordionProps = PropsWithChildren<
  TestIdProps & {
    title: ReactNode;
    className?: string;
    boldTitle?: boolean;
    tabIndex?: number;
    /** Initial expanded state. Defaults to `false`. */
    defaultOpen?: boolean;
  }
>;
