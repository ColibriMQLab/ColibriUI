import React, {
  useState,
  useMemo,
  cloneElement,
  type FC,
  type PropsWithChildren,
  type ReactElement,
  useRef,
} from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
} from "@floating-ui/react";
import clsx from "clsx";
import styles from "./Tooltip.module.scss";
import type { TooltipProps } from "./index.props";

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
  children,
  content,
  zIndex = 1000,
  withTail = false,
  placement = "bottom",
  strategy = "absolute",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, context, floatingStyles } = useFloating({
    placement,
    strategy,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const hover = useHover(context, {
    move: false,
    delay: { open: 100, close: 100 },
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
    role,
  ]);

  const reference = useMemo(() => {
    if (!children) return null;
    if (typeof children === "string") {
      return <span>{children}</span>;
    }
    return children as ReactElement;
  }, [children]);

  const trigger = reference
    ? cloneElement(reference, {
        ref: refs.setReference,
        ...getReferenceProps(),
      })
    : null;

  return (
    <>
      {trigger}
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            className={clsx(styles.tooltip, className)}
            style={{ ...floatingStyles, zIndex }}
          >
            <div className={styles.content}>{content}</div>

            {withTail && <FloatingArrow ref={arrowRef} context={context} />}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;
