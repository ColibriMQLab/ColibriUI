import React, {
  Children,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { useScrollLock } from "../hooks/useScrollLock";
import { useTrapFocus } from "../hooks/useTrapFocus";
import { useModalStack } from "../hooks/useModalStack";
import { Portal } from "../Portal";
import { useMediaSizes } from "../hooks/useMediaSizes";
import { Body } from "./components/Body";
import { Close } from "./components/Close";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Title } from "./components/Title";
import { ModalContext } from "./context";
import styles from "./Modal.module.scss";
import type { FC, PropsWithChildren, ReactNode } from "react";
import type { ModalProps } from "./index.props";

const compoundParts: ReadonlyArray<unknown> = [Header, Body, Footer];

const isCompoundPart = (child: ReactNode) =>
  isValidElement(child) && compoundParts.includes(child.type);

const hasHeader = (children: ReactNode) =>
  Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === Header,
  );

const ModalRoot: FC<PropsWithChildren<ModalProps>> = ({
  children,
  className,
  onClose,
  title,
  withinParent = false,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const parentModal = useContext(ModalContext);
  const parentContainer = withinParent ? parentModal?.container : undefined;
  const isContained = Boolean(parentContainer);
  const isDesktop = useMediaSizes((bp) => bp.up("lg"));
  const titleId = useId();
  const [titleCount, setTitleCount] = useState(0);

  const isTopmost = useModalStack(titleId);

  useScrollLock();
  useTrapFocus(modalRef, isTopmost);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const registerTitle = useCallback(() => {
    setTitleCount((count) => count + 1);
    return () => setTitleCount((count) => count - 1);
  }, []);

  const setWrapperRef = useCallback((node: HTMLDivElement | null) => {
    modalRef.current = node;
    setContainer(node);
  }, []);

  const contextValue = useMemo(
    () => ({ onClose: handleClose, titleId, registerTitle, container }),
    [handleClose, titleId, registerTitle, container],
  );

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      // A layer that closed on this Escape already called preventDefault.
      if (event.key === "Escape" && !event.defaultPrevented && isTopmost()) {
        event.preventDefault();
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleClose, isTopmost]);

  const isCompound = Children.toArray(children).some(isCompoundPart);

  const standaloneClose = (
    <div className={styles["close-wrapper"]}>
      <Close onClick={handleClose} aria-label="Close modal" />
    </div>
  );

  let content: ReactNode;

  if (isCompound) {
    content = (
      <>
        {!hasHeader(children) && standaloneClose}
        {children}
      </>
    );
  } else {
    content = (
      <>
        {title ? (
          <Header>
            <Title>{title}</Title>
          </Header>
        ) : (
          standaloneClose
        )}
        <Content>{children}</Content>
      </>
    );
  }

  // Wait for the parent window node instead of flashing in document.body.
  if (withinParent && parentModal && !parentContainer) return null;

  return (
    <Portal node={parentContainer}>
      <ModalContext.Provider value={contextValue}>
        <div
          className={clsx(styles.root, {
            [styles.root_contained]: isContained,
          })}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleCount > 0 ? titleId : undefined}
        >
          <div
            className={styles["modal-overlay"]}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />
          <div
            className={clsx(
              styles["modal-wrapper"],
              {
                [styles["modal-wrapper_desktop"]]: isDesktop,
                [styles["modal-wrapper_mobile"]]: !isDesktop,
                [styles["modal-wrapper_contained"]]: isContained,
              },
              className,
            )}
            ref={setWrapperRef}
          >
            {content}
          </div>
        </div>
      </ModalContext.Provider>
    </Portal>
  );
};

export const Modal = Object.assign(ModalRoot, {
  Header,
  Title,
  Body,
  Footer,
});

export {
  Header as ModalHeader,
  Title as ModalTitle,
  Body as ModalBody,
  Footer as ModalFooter,
};
