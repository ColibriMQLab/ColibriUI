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
  const isDesktop = useMediaSizes((bp) => bp.up("md"));
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
      <div className={clx("root")}>
        <div className={clx("modal-overlay")} onClick={onCloseHandler} />
        <div
          className={clx(
            "modal-wrapper",
            {
              "modal-wrapper_desktop": isDesktop ? 1 : 0,
              "modal-wrapper_mobile": !isDesktop ? 1 : 0,
            },
            className,
          )}
          ref={modalRef}
        >
          {title ? (
            <div className={clx("title-wrapper")}>
              <Title>{title}</Title>
              <Close onClick={onCloseHandler} />
            </div>
          ) : (
            <div className={clx("close-wrapper")}>
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
