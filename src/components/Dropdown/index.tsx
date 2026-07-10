import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Children,
  type FC,
  type PropsWithChildren,
  type ReactElement,
} from "react";
import clsx from "clsx";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useClick,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  type Placement,
} from "@floating-ui/react";

import ClickOutside from "../ClickOutside";
import styles from "./Dropdown.module.scss";
import type { MouseEventHandler, HTMLProps } from "react";
import type { DropdownProps } from "./index.props";

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({
  children,
  zIndex,
  fontSize,
  disabled,
  defaultVisible = false,
  onVisibleChange,
  overlay,
  placement = "bottom-center" as Placement,
  strategy = "absolute",
  trigger = ["hover"],
  visible: visibleProp,
  preventOverflow = false,
  preventAutoClose = false,
  flip: flipEnabled = true,
  samewidth = false,
}) => {
  const [internalVisible, setInternalVisible] = useState(defaultVisible);

  const isControlled = visibleProp !== undefined;
  const visible = isControlled ? visibleProp : internalVisible;
  const isVisible = visible && !disabled;

  const setOpen = useCallback(
    (nextVisible: boolean) => {
      if (disabled && nextVisible) return;

      if (!isControlled) {
        setInternalVisible(nextVisible);
      }

      onVisibleChange?.(nextVisible);
    },
    [disabled, isControlled, onVisibleChange],
  );

  const {
    refs,
    floatingStyles,
    context,
    update,
    placement: finalPlacement,
  } = useFloating({
    open: isVisible,
    onOpenChange: setOpen,
    placement,
    strategy,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      ...(flipEnabled ? [flip()] : []),
      ...(preventOverflow ? [shift()] : []),
    ],
  });

  const hover = useHover(context, {
    enabled: !disabled && trigger.includes("hover"),
  });
  const click = useClick(context, {
    enabled: !disabled && trigger.includes("click"),
  });
  const focus = useFocus(context, {
    enabled: !disabled && trigger.includes("focus"),
  });
  const dismiss = useDismiss(context, { outsidePress: false });
  const role = useRole(context, { role: "menu" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    focus,
    dismiss,
    role,
  ]);

  const isNotComponent = typeof children === "string";

  const reference: ReactElement | null = useMemo(() => {
    if (!children) return null;
    return Children.only(
      isNotComponent ? <button>{children}</button> : children,
    ) as ReactElement;
  }, [children, isNotComponent]);

  const onClickOverlay: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      if (!preventAutoClose) {
        setOpen(false);
      }
    },
    [preventAutoClose, setOpen],
  );

  useEffect(() => {
    if (update) update();
  }, [update, visible]);

  return (
    <>
      {reference &&
        React.cloneElement(reference, {
          ref: refs.setReference as React.Ref<HTMLElement>,
          tabIndex: 0,
          ...getReferenceProps(reference.props as HTMLProps<Element>),
        } as Partial<HTMLProps<HTMLElement>>)}

      {isVisible && (
        <FloatingPortal>
          <ClickOutside onClick={() => setOpen(false)}>
            <div
              ref={refs.setFloating}
              data-testid="popper-container"
              className={clsx(
                styles["popper-container"],
                styles[`placement-${finalPlacement}`],
              )}
              style={{
                ...floatingStyles,
                zIndex,
                minWidth: samewidth
                  ? `${(refs.reference.current as HTMLElement)?.offsetWidth}px`
                  : undefined,
                fontSize: `${fontSize}px`,
              }}
              tabIndex={0}
              {...getFloatingProps()}
            >
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div
                data-testid="overlay-container"
                className={styles["overlay-container"]}
                onClick={onClickOverlay}
              >
                {overlay}
              </div>
            </div>
          </ClickOutside>
        </FloatingPortal>
      )}
    </>
  );
};

export default Dropdown;
