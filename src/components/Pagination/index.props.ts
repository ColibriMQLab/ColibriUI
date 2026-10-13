import type { HTMLAttributes, ReactNode, Ref } from "react";

export type PaginationSize = "s" | "m" | "l";
export type PaginationMode = "default" | "compact";
export type PaginationItem = number | "start-ellipsis" | "end-ellipsis";

export interface PaginationProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange" | "defaultValue"> {
  totalPages: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  /** Pages shown on each side of the current page. */
  siblingCount?: number;
  /** Pages always shown at the start and at the end. */
  boundaryCount?: number;
  disabledPages?: readonly number[];
  disabled?: boolean;
  mode?: PaginationMode;
  size?: PaginationSize;
  pageSize?: number;
  defaultPageSize?: number;
  pageSizeOptions?: readonly number[];
  onPageSizeChange?: (pageSize: number) => void;
  showPageSize?: boolean;
  showQuickJump?: boolean;
  helperText?: ReactNode;
  previousLabel?: string;
  nextLabel?: string;
  pageLabel?: (page: number) => string;
  quickJumpLabel?: ReactNode;
  pageSizeLabel?: ReactNode;
  ref?: Ref<HTMLElement>;
}
