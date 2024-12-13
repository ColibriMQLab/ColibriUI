import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  Children,
} from "react";
import classNames from "classnames/bind";
import { usePopper } from "react-popper";
import Portal from "../Portal";

import { on } from "../helpers/on";
import ClickOutside from "../ClickOutside";

import styles from "./Dropdown.module.scss";
import type { DropdownProps } from "./index.props";
import type { FC, MouseEventHandler, PropsWithChildren } from "react";

const clx = classNames.bind(styles);

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({
  children,
  zIndex,
  fontSize,
  disabled,
  onVisibleChange,
  overlay,
  placement = "bottom-start",
  strategy = "absolute",
  trigger = ["hover"],
  visible: visibleProp = true,
  preventOverflow = false,
  preventAutoClose = false,
  samewidth = false,
}) => {
  const [controlElement, setControlElement] = useState<HTMLElement | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );

  const [visible, setVisible] = useState(false);

  const isVisible = visibleProp && visible && !disabled;

  const { styles, attributes, update } = usePopper(
    controlElement,
    popperElement,
    {
      placement,
      strategy,
      modifiers: [
        {
          name: "flip",
          enabled: false,
        },
        {
          name: "preventOverflow",
          enabled: preventOverflow,
        },
      ],
    },
  );

  const isNotComponent = typeof children === "string";

  const reference: any = useMemo(
    () =>
      Children.only(isNotComponent ? <button>{children}</button> : children),
    [children, isNotComponent],
  );

  const onToggle = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.stopPropagation();
      setVisible((state) => !state);
    },
    [setVisible],
  );

  const onShow = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const onHide = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onClickOutside = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (controlElement?.contains(e.target as Node)) return;

      onHide();
    },
    [onHide, controlElement],
  );

  const onClickOverlay: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      if (!preventAutoClose) {
        onHide();
      }
    },
    [onHide],
  );

  useEffect(() => {
    const unsubscribes: ReturnType<typeof on>[] = [];

    if (trigger.includes("click")) {
      unsubscribes.push(on(controlElement, "click", onToggle, false));
    }

    if (trigger.includes("hover")) {
      unsubscribes.push(on(controlElement, "mouseenter", onShow, false));
      unsubscribes.push(on(controlElement, "mouseleave", onHide, false));
      unsubscribes.push(on(popperElement, "mouseenter", onShow, false));
      unsubscribes.push(on(popperElement, "mouseleave", onHide, false));
    }

    if (trigger.includes("focus")) {
      const onFocusOut = () => {
        requestAnimationFrame(() => {
          if (controlElement?.contains(document.activeElement)) return;
          if (popperElement?.contains(document.activeElement)) return;

          onHide();
        });
      };
      unsubscribes.push(on(controlElement, "focusin", onShow, false));
      unsubscribes.push(on(controlElement, "focusout", onFocusOut, false));
      unsubscribes.push(on(popperElement, "focusin", onShow, false));
      unsubscribes.push(on(popperElement, "focusout", onFocusOut, false));
    }

    return () => unsubscribes.forEach((un) => un());
  }, [controlElement, popperElement, onToggle, onShow, onHide]);

  useEffect(() => {
    if (onVisibleChange) onVisibleChange(visible);
  }, [onVisibleChange, visible]);

  useEffect(() => {
    if (update) update();
  }, [update, visible]);

  return (
    <>
      <reference.type
        ref={setControlElement}
        tabIndex={0}
        {...reference.props}
      />
      {isVisible && (
        <Portal>
          <ClickOutside onClick={onClickOutside}>
            <div
              ref={setPopperElement}
              data-testid="popper-container"
              className={clx("popper-container")}
              style={{
                ...styles.popper,
                zIndex,
                minWidth: controlElement?.offsetWidth,
                ...(samewidth && {
                  maxWidth: controlElement?.offsetWidth,
                }),
                fontSize: `${fontSize}px`,
              }}
              tabIndex={0}
              {...attributes.popper}
            >
              <div
                data-testid="overlay-container"
                className={clx("overlay-container")}
                onClick={onClickOverlay}
              >
                {overlay}
              </div>
            </div>
          </ClickOutside>
        </Portal>
      )}
    </>
  );
};

export default Dropdown;
