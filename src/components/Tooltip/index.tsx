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
import type {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
} from "react";

const clx = classNames.bind(styles);

const Tooltip: FC<PropsWithChildren<ITooltipProps>> = ({
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
  const {
    styles: popperStyles,
    attributes,
    update,
  } = usePopper(controlElement, popperElement, {
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
  });

  const reference = useMemo(() => {
    if (!children) return null;
    if (typeof children === "string") {
      return <button>{children}</button>;
    }
    return Children.only(children) as ReactElement;
  }, [children]);

  const onToggle = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation();
    setVisible((state) => !state);
  };

  const onShow = () => {
    setVisible(true);
  };

  const onHide = () => {
    setVisible(false);
  };

  const onClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (controlElement?.contains(event.target as Node)) return;

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
      {reference && React.cloneElement(reference, { ref: setControlElement })}
      {visible && (
        <Portal>
          <ClickOutside onClick={onClickOutside}>
            <div
              className={clx("root", { tail: !!withTail })}
              ref={setPopperElement}
              style={{
                ...popperStyles.popper,
                zIndex,
              }}
              {...attributes.popper}
            >
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div
                role="button"
                tabIndex={0}
                className={clx("overlay")}
                onClick={onClickOverlay}
              >
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
