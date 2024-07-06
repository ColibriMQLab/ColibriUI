import { useEffect, useMemo, useRef } from "react";
import useScrollLock from "../hooks/useScrollLock";
import useTrapFocus from "../hooks/useTrapFocus";
import Portal from "../Portal";
import Content from "./components/Content";
import Close from "./components/Close";
import Title from "./components/Title";

import {
  ModalOverlay,
  Root,
  ModalWrapper,
  CloseWrapper,
  TitleWrapper,
} from "./styles";
import type { FC } from "react";
import type { ModalProps } from "./index.props";

const Modal: FC<ModalProps> = ({ children, className, onClose, title }) => {
  const modalRef = useRef(null);

  const onCloseHandler = useMemo(() => onClose || (() => ({})), [onClose]);

  useScrollLock();
  useTrapFocus(modalRef);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (!modalRef.current || e.code !== "Escape") return;

      onCloseHandler();
    };

    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("keydown", onEsc);
    };
  }, [onCloseHandler]);

  return (
    <Portal>
      <Root>
        <ModalOverlay onClick={onCloseHandler} />
        <ModalWrapper className={className} ref={modalRef}>
          {title ? (
            <TitleWrapper>
              <Title>{title}</Title>
              <Close onClick={onCloseHandler} />
            </TitleWrapper>
          ) : (
            <CloseWrapper>
              <Close onClick={onCloseHandler} />
            </CloseWrapper>
          )}
          <Content>{children}</Content>
        </ModalWrapper>
      </Root>
    </Portal>
  );
};

export default Modal;
