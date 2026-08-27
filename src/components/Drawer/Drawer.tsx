import React, { forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Drawer.module.scss";
import type {
  DrawerContentProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerProps,
} from "./index.props";
import type { CSSProperties } from "react";

const cx = (...classNames: Array<string | false | null | undefined>) =>
  classNames.filter(Boolean).join(" ");
const toSize = (value: string | number | undefined, fallback: string) =>
  value === undefined
    ? fallback
    : typeof value === "number"
      ? `${value}px`
      : value;
const toOffset = (value: string | number) =>
  typeof value === "number" ? `${value}px` : value;

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  function DrawerRoot(
    {
      opened,
      placement = "right",
      width,
      height,
      offset = [0, 0],
      zIndex = 1000,
      asModal = true,
      withBlur = false,
      closeOnEsc = true,
      closeOnOverlayClick = true,
      borderRadius = "none",
      customBackgroundColor,
      customContentBackgroundColor,
      animationInfo,
      initialFocusRef,
      focusAfterRef,
      portalContainer,
      onClose,
      onEscKeyDown,
      onOverlayClick,
      className,
      style,
      children,
      ...rest
    },
    forwardedRef,
  ) {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const previousFocus = useRef<HTMLElement | null>(null);
    const [rendered, setRendered] = useState(opened);
    const [closing, setClosing] = useState(false);

    const setPanelRef = (element: HTMLDivElement | null) => {
      panelRef.current = element;
      if (typeof forwardedRef === "function") forwardedRef(element);
      else if (forwardedRef) forwardedRef.current = element;
    };

    useEffect(() => {
      if (opened) {
        setRendered(true);
        setClosing(false);
        return;
      }
      if (!rendered) return;
      setClosing(true);
      const timeout = window.setTimeout(() => {
        setRendered(false);
        setClosing(false);
      }, 200);
      return () => window.clearTimeout(timeout);
    }, [opened, rendered]);

    useEffect(() => {
      if (!opened || typeof document === "undefined") return;

      previousFocus.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      const previousOverflow = document.body.style.overflow;
      const focusAfterElement = focusAfterRef?.current;
      if (asModal) document.body.style.overflow = "hidden";

      const focusFrame = window.requestAnimationFrame(() => {
        const firstFocusable =
          panelRef.current?.querySelector<HTMLElement>(focusableSelector);
        (
          initialFocusRef?.current ??
          firstFocusable ??
          panelRef.current
        )?.focus();
      });

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && closeOnEsc) {
          onEscKeyDown?.(event);
          if (!event.defaultPrevented) onClose?.();
          return;
        }

        if (!asModal || event.key !== "Tab" || !panelRef.current) return;
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
        );
        if (!focusable.length) {
          event.preventDefault();
          panelRef.current.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        window.cancelAnimationFrame(focusFrame);
        document.removeEventListener("keydown", handleKeyDown);
        if (asModal) document.body.style.overflow = previousOverflow;
        (focusAfterElement ?? previousFocus.current)?.focus();
      };
    }, [
      opened,
      asModal,
      closeOnEsc,
      focusAfterRef,
      initialFocusRef,
      onClose,
      onEscKeyDown,
    ]);

    if (!rendered || typeof document === "undefined") return null;

    const sidePlacement = placement === "left" || placement === "right";
    const panelStyle = {
      ...style,
      "--drawer-width": toSize(width, sidePlacement ? "100%" : "100vw"),
      "--drawer-height": toSize(height, sidePlacement ? "100dvh" : "100%"),
      "--drawer-offset-x": toOffset(offset[0]),
      "--drawer-offset-y": toOffset(offset[1]),
      "--drawer-panel-background": customBackgroundColor,
      "--drawer-content-background": customContentBackgroundColor,
      "--drawer-enter-animation": animationInfo?.enter,
      "--drawer-exit-animation": animationInfo?.exit,
    } as CSSProperties;

    const drawer = (
      <div
        {...rest}
        className={cx(
          styles.root,
          !asModal && styles["non-modal"],
          closing && styles.closing,
          className,
        )}
        style={{ zIndex }}
      >
        {asModal && (
          <div
            className={cx(styles.overlay, withBlur && styles["overlay-blur"])}
            aria-hidden="true"
            onClick={(event) => {
              onOverlayClick?.(event);
              if (closeOnOverlayClick && !event.defaultPrevented) onClose?.();
            }}
          />
        )}

        <div
          ref={setPanelRef}
          className={cx(
            styles.panel,
            styles[placement],
            styles[`radius-${borderRadius}`],
          )}
          style={panelStyle}
          role="dialog"
          aria-modal={asModal || undefined}
          aria-label={rest["aria-label"]}
          aria-labelledby={rest["aria-labelledby"]}
          aria-describedby={rest["aria-describedby"]}
          tabIndex={-1}
        >
          <div className={styles["panel-content"]}>{children}</div>
        </div>
      </div>
    );

    return createPortal(drawer, portalContainer ?? document.body);
  },
);

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  function DrawerHeaderRoot(
    {
      actions,
      hasClose = true,
      closePlacement = "right",
      closeAriaLabel = "Close",
      onClose,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const closeButton = hasClose && (
      <button
        className={styles["close-button"]}
        type="button"
        aria-label={closeAriaLabel}
        onClick={onClose}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6.7 5.3 5.3 5.3 5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3 1.4-1.4Z" />
        </svg>
      </button>
    );

    return (
      <div {...rest} ref={ref} className={cx(styles.header, className)}>
        {closePlacement === "left" && closeButton}
        {children && <div className={styles["header-main"]}>{children}</div>}
        {actions && <div className={styles.actions}>{actions}</div>}
        {closePlacement === "right" && closeButton}
      </div>
    );
  },
);

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContentRoot({ className, children, ...rest }, ref) {
    return (
      <div {...rest} ref={ref} className={cx(styles.content, className)}>
        {children}
      </div>
    );
  },
);

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  function DrawerFooterRoot({ className, children, ...rest }, ref) {
    return (
      <div {...rest} ref={ref} className={cx(styles.footer, className)}>
        {children}
      </div>
    );
  },
);
