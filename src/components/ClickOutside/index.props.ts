import type { PropsWithChildren } from "react";

export type ClickOutsideProps = PropsWithChildren<{
  onClick: (event: MouseEvent | TouchEvent) => void;
}>;
