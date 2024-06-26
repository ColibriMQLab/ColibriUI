import type { ReactNode } from "react";

export type ModalProps = {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  title?: string;
};
