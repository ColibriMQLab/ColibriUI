import { createContext, useContext } from "react";

type ModalContextValue = {
  onClose: () => void;
  titleId: string;
  registerTitle: () => () => void;
  container: HTMLDivElement | null;
};

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Modal compound components must be used inside <Modal>");
  }

  return context;
};
