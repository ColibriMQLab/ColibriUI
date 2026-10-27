import type { ReactNode } from "react";
import type { TestIdProps } from "../helpers/testId";

export type StatusTag = "span" | "div";

export enum STATUS_TYPE {
  SUCCESS = "success",
  FAILURE = "failure",
  INFO = "info",
  WARNING = "warning",
}

export type StatusProps = TestIdProps & {
  className?: string;
  indicator?: ReactNode;
  showIndicator?: boolean;
  tag?: StatusTag;
  type?: STATUS_TYPE;
};
