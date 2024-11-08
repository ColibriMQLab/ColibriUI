export type StatusTag = "span" | "div";

export enum STATUS_TYPE {
  SUCCESS = "success",
  FAILURE = "failure",
  INFO = "info",
  WARNING = "warning",
}

export type StatusProps = {
  className?: string;
  tag?: StatusTag;
  children?: string;
  type?: STATUS_TYPE;
};
