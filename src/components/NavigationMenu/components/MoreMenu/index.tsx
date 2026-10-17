import React, { useRef, useState } from "react";
import clsx from "clsx";
import { Dropdown } from "../../../Dropdown";
import { Chevron } from "../../../Icons";
import { getItemKey, useIsomorphicLayoutEffect } from "../../helpers";
import { getLinkClassName, NavigationLink } from "../NavigationLink";
import styles from "./MoreMenu.module.scss";
import type {
  FocusEvent,
  KeyboardEvent,
  ReactNode,
  RefObject,
  SyntheticEvent,
} from "react";
import type {
  NavigationMenuItem,
  NavigationMenuRenderLink,
} from "../../index.props";

interface MoreMenuProps {
  items: NavigationMenuItem[];
  label: ReactNode;
  /** Nothing to show: the trigger stays in the DOM only to be measured. */
  hidden: boolean;
  onItemClick?: (item: NavigationMenuItem) => void;
  renderLink?: NavigationMenuRenderLink;
  /** The menu became hidden while this item had focus inside the dropdown. */
  onFocusLost: (item: NavigationMenuItem) => void;
}

interface OptionsProps
  extends Omit<MoreMenuProps, "label" | "hidden" | "onFocusLost"> {
  onItemFocus: (item: NavigationMenuItem) => void;
  rootRef: RefObject<HTMLDivElement | null>;
  /** Tab or Shift+Tab leaves the dropdown. */
  onTabOut: () => void;
}

const getLinkPosition = (event: SyntheticEvent<HTMLDivElement>) => {
  const links = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]'),
  );

  return { links, index: links.indexOf(event.target as HTMLElement) };
};

const MoreOptions = ({
  items,
  onItemClick,
  renderLink,
  rootRef,
  onItemFocus,
  onTabOut,
}: OptionsProps) => {
  // The dropdown is portaled to the end of the document: move focus into it,
  // to the current section or to the first link.
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;

    (
      root?.querySelector<HTMLElement>('[aria-current="page"]') ??
      root?.querySelector<HTMLElement>('[role="menuitem"]')
    )?.focus();
  }, [rootRef]);

  // Focus events bubble from the links, whatever `renderLink` renders.
  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    const { index } = getLinkPosition(event);

    if (index !== -1) onItemFocus(items[index]);
  };

  // Arrow keys move focus through the links, Home/End go to the first and the
  // last one. Tab leaves through the trigger, so focus continues from it.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      onTabOut();
      return;
    }

    const { links, index } = getLinkPosition(event);
    const last = links.length - 1;
    const targets: Record<string, number> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };

    if (index === -1 || !(event.key in targets)) return;

    event.preventDefault();
    links[targets[event.key]]?.focus();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- events come from the focused links
    <div
      ref={rootRef}
      className={styles.options}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
    >
      {items.map((item, index) => (
        <NavigationLink
          key={getItemKey(item, index)}
          item={item}
          view="option"
          role="menuitem"
          onClick={onItemClick}
          renderLink={renderLink}
        />
      ))}
    </div>
  );
};

/** "More" trigger with a dropdown of the items that do not fit. */
export const MoreMenu = ({
  items,
  label,
  hidden,
  onItemClick,
  renderLink,
  onFocusLost,
}: MoreMenuProps) => {
  const [isOpen, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const focusedItemRef = useRef<NavigationMenuItem | null>(null);

  // A resize hides "More" and removes the dropdown with the focused link.
  // Layout effect: focus moves before the browser paints the new row.
  useIsomorphicLayoutEffect(() => {
    if (!hidden) return;

    const item = focusedItemRef.current;
    const isFocusLost =
      !document.activeElement || document.activeElement === document.body;

    focusedItemRef.current = null;
    setOpen(false);

    if (item && isFocusLost) onFocusLost(item);
  }, [hidden]);

  // Selection, Escape and Tab remove the focused link together with the
  // dropdown: return focus to the trigger.
  const close = () => {
    const trigger = rootRef.current?.firstElementChild;

    if (
      overlayRef.current?.contains(document.activeElement) &&
      trigger instanceof HTMLElement
    ) {
      trigger.focus();
    }

    focusedItemRef.current = null;
    setOpen(false);
  };

  return (
    <span ref={rootRef} className={styles.root}>
      <Dropdown
        trigger={["click"]}
        placement="bottom-end"
        visible={isOpen}
        disabled={hidden}
        onVisibleChange={(visible) => (visible ? setOpen(true) : close())}
        overlay={
          <MoreOptions
            items={items}
            onItemClick={onItemClick}
            renderLink={renderLink}
            rootRef={overlayRef}
            onItemFocus={(item) => {
              focusedItemRef.current = item;
            }}
            onTabOut={close}
          />
        }
      >
        <button
          type="button"
          className={getLinkClassName()}
          tabIndex={hidden ? -1 : undefined}
        >
          {label}
          <Chevron
            width={16}
            height={16}
            aria-hidden="true"
            className={clsx(styles.chevron, { [styles.chevron_open]: isOpen })}
          />
        </button>
      </Dropdown>
    </span>
  );
};
