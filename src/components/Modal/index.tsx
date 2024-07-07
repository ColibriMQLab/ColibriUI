import React, { useEffect, useMemo, useRef } from "react";
import classNames from "classnames/bind";
import useScrollLock from "../hooks/useScrollLock";
import useTrapFocus from "../hooks/useTrapFocus";
import Portal from "../Portal";
import useMediaSizes from "../hooks/useMediaSizes";
import Content from "./components/Content";
import Close from "./components/Close";
import Title from "./components/Title";
import styles from "./Modal.module.scss";
import type { FC } from "react";
import type { ModalProps } from "./index.props";

const clx = classNames.bind(styles);

const Modal: FC<ModalProps> = ({ children, className, onClose, title }) => {
  const modalRef = useRef(null);
  const isDesktop = useMediaSizes((bp) => bp.up("lg"));
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
      <div className={clx(styles.root)}>
        <div className={clx(styles.modalOverlay)} onClick={onCloseHandler} />
        <div
          className={clx(
            styles.modalWrapper,
            {
              modalWrapper_desktop: isDesktop ? 1 : 0,
              modalWrapper_mobile: !isDesktop ? 1 : 0,
            },
            className,
          )}
          ref={modalRef}
        >
          {title ? (
            <div className={clx(styles.titleWrapper)}>
              <Title>{title}</Title>
              <Close onClick={onCloseHandler} />
            </div>
          ) : (
            <div className={clx(styles.closeWrapper)}>
              <Close onClick={onCloseHandler} />
            </div>
          )}
          <Content>{children}</Content>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
