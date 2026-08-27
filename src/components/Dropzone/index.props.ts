import type {
  ChangeEventHandler,
  DragEventHandler,
  InputHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

export type DropzoneFileResult = {
  acceptedFiles: File[];
  rejectedFiles?: File[];
  error?: string;
};

export type DropzoneValidator = (files: File[]) => Promise<DropzoneFileResult>;
export type DropzoneFileHandler = (
  result: DropzoneFileResult,
) => Promise<void> | void;

export interface DropzoneProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | "title"
    | "size"
    | "width"
    | "height"
    | "onChange"
    | "onClick"
    | "onDrop"
    | "onDragEnter"
    | "onDragLeave"
    | "onDragOver"
  > {
  files?: File[];
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  iconPlacement?: "top" | "left";
  size?: "m" | string;
  view?: "default" | string;
  stretch?: boolean;
  width?: string | number;
  height?: string | number;
  validator?: DropzoneValidator;
  onDrop?: DropzoneFileHandler;
  onChoseFiles?: DropzoneFileHandler;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onDragEnter?: DragEventHandler<HTMLDivElement>;
  onDragLeave?: DragEventHandler<HTMLDivElement>;
  onDragOver?: DragEventHandler<HTMLDivElement>;
}
