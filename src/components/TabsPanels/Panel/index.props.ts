import type { ReactNode } from "react";

export type PanelProps = {
  content: ReactNode;
  disabled?: boolean;
  className?: string;
  id: string;
};
