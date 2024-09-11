import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  Children,
} from "react";
import { usePopper } from "react-popper";
import classNames from "classnames/bind";
import Portal from "../Portal";

import { on } from "../helpers/on";
import ClickOutside from "../ClickOutside";
import styles from "./Tooltip.module.scss";
import type { ITooltipProps } from "./index.props";
import type { MouseEventHandler } from "react";

const clx = classNames.bind(styles);

const Tooltip: React.FC<ITooltipProps> = ({
  children,
  zIndex,
  content,
  withTail = false,
  placement = "bottom",
  strategy = "absolute",
}) => {
  const [controlElement, setControlElement] = useState<HTMLElement | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [visible, setVisible] = useState(false);
  const { styles, attributes, update } = usePopper(
    controlElement,
    popperElement,
    {
      placement,
      strategy,
      modifiers: [
        {
          name: "flip",
          enabled: true,
        },
        {
          name: "preventOverflow",
          enabled: true,
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

    unsubscribes.push(on(controlElement, "mouseenter", onShow, false));
    unsubscribes.push(on(controlElement, "mouseleave", onHide, false));
    unsubscribes.push(on(popperElement, "mouseenter", onShow, false));
    unsubscribes.push(on(popperElement, "mouseleave", onHide, false));

    return () => unsubscribes.forEach((un) => un());
  }, [controlElement, popperElement, onToggle, onShow, onHide]);

  useEffect(() => {
    if (update) update();
  }, [update, visible]);

  return (
    <>
      <reference.type ref={setControlElement} {...reference.props} />
      {visible && (
        <Portal>
          <ClickOutside onClick={onClickOutside}>
            <div
              className={clx("root", { tail: !!withTail })}
              ref={setPopperElement}
              style={{
                ...styles.popper,
                zIndex,
              }}
              {...attributes.popper}
            >
              <div className={clx("overlay")} onClick={onClickOverlay}>
                {content}
              </div>
            </div>
          </ClickOutside>
        </Portal>
      )}
    </>
  );
};

export default Tooltip;
