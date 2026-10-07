import React, {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { useLatestRef } from "../hooks/useLatestRef";
import { useModalStack } from "../hooks/useModalStack";
import styles from "./Sheet.module.scss";
import type { PointerEvent as ReactPointerEvent } from "react";

import type { SheetProps, SheetSnapPoint } from "./index.props";

const defaultSnapPoints: readonly SheetSnapPoint[] = ["60dvh"];

const focusableSelector =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

const toCssSize = (point: SheetSnapPoint) =>
  typeof point === "number" ? `${point}px` : point;

const toPixels = (point: SheetSnapPoint, viewportHeight: number) => {
  if (typeof point === "number") return point;
  const value = Number.parseFloat(point);
  if (!Number.isFinite(value)) return 0;
  if (point.endsWith("%") || point.endsWith("vh") || point.endsWith("dvh"))
    return (viewportHeight * value) / 100;
  return value;
};

const findPoint = (
  points: readonly SheetSnapPoint[],
  preferred?: SheetSnapPoint,
) => {
  if (preferred !== undefined && points.includes(preferred)) return preferred;
  return points[0] ?? "60dvh";
};

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(
  function SheetComponent(
    {
      open,
      onOpenChange,
      onClosed,
      title,
      description,
      header,
      footer,
      snapPoints = defaultSnapPoints,
      snapPoint,
      defaultSnapPoint,
      onSnapPointChange,
      modal = true,
      blurOverlay = false,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      draggable = true,
      showHandle = true,
      lockBodyScroll = true,
      portalContainer,
      initialFocusRef,
      returnFocusRef,
      zIndex,
      className,
      style,
      children,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    forwardedRef,
  ) {
    const normalizedPoints = snapPoints.length ? snapPoints : defaultSnapPoints;
    const controlledSnap = snapPoint !== undefined;
    const [internalSnap, setInternalSnap] = useState<SheetSnapPoint>(() =>
      findPoint(normalizedPoints, defaultSnapPoint),
    );
    const activeSnap = findPoint(
      normalizedPoints,
      controlledSnap ? snapPoint : internalSnap,
    );
    const [rendered, setRendered] = useState(open);
    const [closing, setClosing] = useState(false);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const dragRef = useRef({
      pointerId: -1,
      startY: 0,
      startHeight: 0,
      currentHeight: 0,
    });
    const titleId = useId();
    const descriptionId = useId();
    const isTopmost = useModalStack(titleId, open && modal);

    const setPanelRef = (node: HTMLDivElement | null) => {
      panelRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    };

    const sortedPoints = useMemo(
      () =>
        [...normalizedPoints].sort((left, right) => {
          const height =
            typeof window === "undefined" ? 1000 : window.innerHeight;
          return toPixels(left, height) - toPixels(right, height);
        }),
      [normalizedPoints],
    );

    const changeSnap = (next: SheetSnapPoint) => {
      if (!controlledSnap) setInternalSnap(next);
      onSnapPointChange?.(next);
    };

    // Callbacks from props change on every parent render; effects read them
    // from refs, so focus, scroll lock and the closing timer do not restart.
    const onClosedRef = useLatestRef(onClosed);
    const onOpenChangeRef = useLatestRef(onOpenChange);

    useEffect(() => {
      if (open) {
        setRendered(true);
        setClosing(false);
        return;
      }
      if (!rendered) return;
      setClosing(true);
      const duration = panelRef.current
        ? Number.parseFloat(
            getComputedStyle(panelRef.current).animationDuration,
          ) * 1000
        : 220;
      const timer = window.setTimeout(
        () => {
          setRendered(false);
          setClosing(false);
          onClosedRef.current?.();
        },
        Number.isFinite(duration) ? duration : 220,
      );
      return () => window.clearTimeout(timer);
    }, [onClosedRef, open, rendered]);

    useEffect(() => {
      if (!open || typeof document === "undefined") return;
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      const returnFocusElement =
        returnFocusRef?.current ?? previousFocusRef.current;
      const previousOverflow = document.body.style.overflow;
      if (modal && lockBodyScroll) document.body.style.overflow = "hidden";
      const frame = window.requestAnimationFrame(() => {
        const first =
          panelRef.current?.querySelector<HTMLElement>(focusableSelector);
        (initialFocusRef?.current ?? first ?? panelRef.current)?.focus();
      });
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.defaultPrevented || !isTopmost()) return;
        if (event.key === "Escape" && closeOnEscape) {
          event.preventDefault();
          onOpenChangeRef.current(false, "escape");
          return;
        }
        if (!modal || event.key !== "Tab" || !panelRef.current) return;
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
      document.addEventListener("keydown", onKeyDown);
      return () => {
        window.cancelAnimationFrame(frame);
        document.removeEventListener("keydown", onKeyDown);
        if (modal && lockBodyScroll)
          document.body.style.overflow = previousOverflow;
        returnFocusElement?.focus();
      };
    }, [
      open,
      modal,
      lockBodyScroll,
      closeOnEscape,
      onOpenChangeRef,
      initialFocusRef,
      returnFocusRef,
      isTopmost,
    ]);

    const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!draggable || !panelRef.current) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      const height = panelRef.current.getBoundingClientRect().height;
      dragRef.current = {
        pointerId: event.pointerId,
        startY: event.clientY,
        startHeight: height,
        currentHeight: height,
      };
      panelRef.current.classList.add(styles.dragging);
    };

    const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
      if (dragRef.current.pointerId !== event.pointerId || !panelRef.current)
        return;
      const viewportHeight = window.innerHeight;
      const maximum = Math.max(
        ...sortedPoints.map((point) => toPixels(point, viewportHeight)),
      );
      const nextHeight = Math.max(
        0,
        Math.min(
          maximum,
          dragRef.current.startHeight -
            (event.clientY - dragRef.current.startY),
        ),
      );
      dragRef.current.currentHeight = nextHeight;
      panelRef.current.style.height = `${nextHeight}px`;
    };

    const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
      if (dragRef.current.pointerId !== event.pointerId || !panelRef.current)
        return;
      event.currentTarget.releasePointerCapture(event.pointerId);
      panelRef.current.classList.remove(styles.dragging);
      const { currentHeight, startHeight } = dragRef.current;
      dragRef.current.pointerId = -1;
      const pointHeights = sortedPoints.map((point) =>
        toPixels(point, window.innerHeight),
      );
      const minimum = pointHeights[0];
      if (currentHeight < Math.min(minimum * 0.65, startHeight * 0.65)) {
        panelRef.current.style.height = toCssSize(activeSnap);
        onOpenChange(false, "drag");
        return;
      }
      let nearest = 0;
      pointHeights.forEach((height, index) => {
        if (
          Math.abs(height - currentHeight) <
          Math.abs(pointHeights[nearest] - currentHeight)
        )
          nearest = index;
      });
      const next = sortedPoints[nearest];
      panelRef.current.style.height = toCssSize(next);
      changeSnap(next);
    };

    if (!rendered || typeof document === "undefined") return null;

    const panelStyle = { ...style, height: toCssSize(activeSnap) };
    const node = (
      <div
        className={clsx(
          styles.root,
          !modal && styles["non-modal"],
          closing && styles.closing,
        )}
        style={{ zIndex }}
      >
        {modal && (
          <div
            className={clsx(styles.overlay, blurOverlay && styles.blur)}
            aria-hidden="true"
            onClick={() =>
              closeOnOverlayClick && onOpenChange(false, "overlay")
            }
          />
        )}
        <div
          {...rest}
          ref={setPanelRef}
          role="dialog"
          aria-modal={modal || undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? (title ? titleId : undefined)}
          aria-describedby={
            ariaDescribedBy ?? (description ? descriptionId : undefined)
          }
          tabIndex={-1}
          className={clsx(styles.sheet, className)}
          style={panelStyle}
        >
          {(showHandle || draggable) && (
            <div
              className={styles["drag-area"]}
              onPointerDown={startDrag}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              {showHandle && (
                <span className={styles.handle} aria-hidden="true" />
              )}
            </div>
          )}
          {(title || description || header) && (
            <header className={styles.header}>
              <div className={styles.heading}>
                {title && <h2 id={titleId}>{title}</h2>}
                {description && <p id={descriptionId}>{description}</p>}
              </div>
              {header && (
                <div className={styles["header-actions"]}>{header}</div>
              )}
            </header>
          )}
          <div className={styles.body}>{children}</div>
          {footer && <footer className={styles.footer}>{footer}</footer>}
        </div>
      </div>
    );

    return createPortal(node, portalContainer ?? document.body);
  },
);
