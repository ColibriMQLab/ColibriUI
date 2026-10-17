import React, { forwardRef, useRef } from "react";
import clsx from "clsx";
import { MoreMenu } from "./components/MoreMenu";
import {
  getLinkClassName,
  LinkContent,
  NavigationLink,
} from "./components/NavigationLink";
import {
  assignRef,
  getItemKey,
  isSameItem,
  useIsomorphicLayoutEffect,
} from "./helpers";
import { useOverflowSplit } from "./useOverflowSplit";
import styles from "./NavigationMenu.module.scss";
import type { Ref } from "react";
import type { NavigationMenuItem, NavigationMenuProps } from "./index.props";

type LayoutProps = Omit<
  NavigationMenuProps,
  "layout" | "size" | "className"
> & {
  rootClassName: string;
  navRef: Ref<HTMLElement>;
};

const FOCUSABLE = "a[href], button, [tabindex]";

const getActiveIndex = (items: NavigationMenuItem[]) =>
  items.findIndex((item) => item.active);

const OverflowMenu = ({
  items,
  pinnedItems = [],
  moreItems = [],
  moreLabel,
  onItemClick,
  renderLink,
  navRef,
  rootClassName,
  ...props
}: LayoutProps) => {
  const { split, containerRef, listRef, measurerRef, moreRef } =
    useOverflowSplit({
      itemCount: items.length,
      pinnedCount: pinnedItems.length,
      activeIndex: getActiveIndex(items),
      forceMore: moreItems.length > 0,
      contentKey: [...items, ...pinnedItems]
        .map((item) => item.label)
        .join("\n"),
    });

  // After `items` change and before the layout effect remeasures, the old
  // split may point to missing indexes: drop them, new items go to "More".
  const visibleIndexes = split?.visible.filter((index) => index < items.length);
  const visibleItems = visibleIndexes
    ? visibleIndexes.map((index) => items[index])
    : items;
  const hiddenItems = visibleIndexes
    ? [
        ...items.filter((_, index) => !visibleIndexes.includes(index)),
        ...moreItems,
      ]
    : [];
  const isMoreHidden = hiddenItems.length === 0;

  // "More" disappeared with a focused link inside: focus the same item in the
  // row, or the first row link when it is not there.
  const restoreFocus = (item: NavigationMenuItem) => {
    const rows = Array.from(listRef.current?.children ?? []);
    const rowItems = [...visibleItems, ...pinnedItems];
    const row =
      rows[rowItems.findIndex((rowItem) => isSameItem(rowItem, item))];

    (
      row?.querySelector<HTMLElement>(FOCUSABLE) ??
      listRef.current?.querySelector<HTMLElement>(FOCUSABLE)
    )?.focus();
  };

  const renderItem = (item: NavigationMenuItem, index: number) => (
    <li key={getItemKey(item, index)} className={styles.list_item}>
      <NavigationLink
        item={item}
        onClick={onItemClick}
        renderLink={renderLink}
      />
    </li>
  );

  return (
    <nav
      {...props}
      ref={(node) => {
        containerRef.current = node;
        assignRef(navRef, node);
      }}
      className={clsx(rootClassName, styles.overflow, {
        [styles.overflow_measuring]: !split,
      })}
    >
      <ul ref={listRef} className={styles.list}>
        {visibleItems.map(renderItem)}
        {pinnedItems.map(renderItem)}
        {/* The trigger stays in the DOM: its width is needed even when hidden. */}
        <li
          ref={moreRef}
          className={clsx(styles.list_item, {
            [styles.more_hidden]: isMoreHidden,
          })}
          aria-hidden={isMoreHidden || undefined}
        >
          <MoreMenu
            items={hiddenItems}
            label={moreLabel}
            hidden={isMoreHidden}
            onItemClick={onItemClick}
            renderLink={renderLink}
            onFocusLost={restoreFocus}
          />
        </li>
      </ul>

      {/* Measurer: every item in one invisible row, widths come from here. */}
      <div ref={measurerRef} className={styles.measurer} aria-hidden="true">
        {[...items, ...pinnedItems].map((item, index) => (
          <span
            key={getItemKey(item, index)}
            className={getLinkClassName("item", item.active)}
          >
            <LinkContent item={item} />
          </span>
        ))}
      </div>
    </nav>
  );
};

const ScrollMenu = ({
  items,
  pinnedItems = [],
  moreItems = [],
  onItemClick,
  renderLink,
  navRef,
  rootClassName,
  ...props
}: Omit<LayoutProps, "moreLabel">) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);
  const allItems = [...items, ...pinnedItems, ...moreItems];
  const activeIndex = getActiveIndex(allItems);

  // Center the active item when it is not fully visible.
  useIsomorphicLayoutEffect(() => {
    const container = scrollRef.current;
    const active = activeRef.current;

    if (!container || !active) return;

    const { offsetLeft, offsetWidth } = active;
    const isVisible =
      offsetLeft >= container.scrollLeft &&
      offsetLeft + offsetWidth <= container.scrollLeft + container.clientWidth;

    if (!isVisible) {
      container.scrollLeft =
        offsetLeft + offsetWidth / 2 - container.clientWidth / 2;
    }
  }, [activeIndex]);

  return (
    <nav {...props} ref={navRef} className={clsx(rootClassName, styles.scroll)}>
      <div ref={scrollRef} className={styles.scroll_area}>
        <ul className={styles.list}>
          {allItems.map((item, index) => (
            <li
              key={getItemKey(item, index)}
              ref={index === activeIndex ? activeRef : undefined}
              className={styles.list_item}
            >
              <NavigationLink
                item={item}
                onClick={onItemClick}
                renderLink={renderLink}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export const NavigationMenu = forwardRef<HTMLElement, NavigationMenuProps>(
  (
    {
      layout = "overflow",
      size = "m",
      moreLabel = "More",
      className,
      ...props
    },
    ref,
  ) => {
    const rootClassName = clsx(styles.root, styles[`size_${size}`], className);

    return layout === "scroll" ? (
      <ScrollMenu {...props} navRef={ref} rootClassName={rootClassName} />
    ) : (
      <OverflowMenu
        {...props}
        moreLabel={moreLabel}
        navRef={ref}
        rootClassName={rootClassName}
      />
    );
  },
);

NavigationMenu.displayName = "NavigationMenu";
