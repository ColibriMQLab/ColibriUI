import type { PropsWithChildren, ReactNode } from "react";

export type AccordionProps = PropsWithChildren<{
  title: ReactNode;
  className?: string;
  boldTitle?: boolean;
  tabIndex?: number;
}>;
