import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  Children,
} from "react";
import { usePopper } from "react-popper";

import Portal from "../Portal";

import { on } from "../helpers/on";
import ClickOutside from "../ClickOutside";
import { OverlayContainer, PopperContainer } from "./styles";
import type { DropdownProps } from "./index.props";
import type { MouseEventHandler } from "react";

const Dropdown: React.FC<DropdownProps> = ({
  children,
  zIndex,
  disabled,
  onVisibleChange,
  overlay,
  placement = "bottom-start",
  strategy = "absolute",
  trigger = ["hover"],
  visible: visibleProp = true,
  preventOverflow = false,
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
    (e) => {
      e.stopPropagation();
      onHide();
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
            <PopperContainer
              ref={setPopperElement}
              style={{
                ...styles.popper,
                zIndex,
                minWidth: controlElement?.offsetWidth,
                ...(samewidth && {
                  maxWidth: controlElement?.offsetWidth,
                }),
              }}
              tabIndex={0}
              {...attributes.popper}
            >
              <OverlayContainer onClick={onClickOverlay}>
                {overlay}
              </OverlayContainer>
            </PopperContainer>
          </ClickOutside>
        </Portal>
      )}
    </>
  );
};

export default Dropdown;
