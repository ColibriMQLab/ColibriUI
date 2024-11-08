export type StatusTag = "span" | "div";

export enum STATUS_TYPE {
  SUCCESS = "success",
}

export type StatusProps = {
  className?: string;
  tag?: StatusTag;
  children?: string;
  type?: STATUS_TYPE;
};
