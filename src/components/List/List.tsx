import React, { createContext, forwardRef, useContext, useMemo } from "react";
import clsx from "clsx";

import styles from "./List.module.scss";
import type {
  ListContextValue,
  ListItemBaseProps,
  ListItemLinkProps,
  ListItemProps,
  ListItemButtonProps,
  ListItemStaticProps,
  ListProps,
  ListSectionProps,
} from "./index.props";

const ListContext = createContext<ListContextValue>({
  disabled: false,
  dividers: false,
  surface: "none",
});

const ItemContent = ({
  children,
  description,
  contentLeft,
  contentRight,
}: Pick<
  ListItemBaseProps,
  "children" | "description" | "contentLeft" | "contentRight"
>) => (
  <>
    {contentLeft != null && <span className={styles.left}>{contentLeft}</span>}
    <span className={styles.content}>
      <span className={styles.title}>{children}</span>
      {description != null && (
        <span className={styles.description}>{description}</span>
      )}
    </span>
    {contentRight != null && (
      <span className={styles.right}>{contentRight}</span>
    )}
  </>
);

export const List = forwardRef<HTMLUListElement, ListProps>(
  (
    {
      size = "m",
      density = "normal",
      surface = "none",
      dividers = false,
      disabled = false,
      ariaLabel,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const context = useMemo(
      () => ({ disabled, dividers, surface }),
      [disabled, dividers, surface],
    );

    return (
      <ListContext.Provider value={context}>
        <ul
          {...rest}
          ref={ref}
          aria-label={ariaLabel}
          aria-disabled={disabled || undefined}
          className={clsx(
            styles.list,
            styles[`size_${size}`],
            styles[`density_${density}`],
            styles[`surface_${surface}`],
            {
              [styles.dividers]: dividers,
              [styles["list_disabled"]]: disabled,
            },
            className,
          )}
        >
          {children}
        </ul>
      </ListContext.Provider>
    );
  },
);

List.displayName = "List";

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (props, ref) => {
    const {
      disabled: listDisabled,
      dividers,
      surface,
    } = useContext(ListContext);
    const {
      children,
      description,
      contentLeft,
      contentRight,
      disabled = false,
      selected = false,
      className,
      ...interactiveProps
    } = props;
    const isDisabled = listDisabled || disabled;
    const itemClassName = clsx(
      styles.item,
      {
        [styles["item_surface"]]: surface === "items",
        [styles["item_divider"]]: dividers,
        [styles.selected]: selected,
        [styles["item_disabled"]]: isDisabled,
      },
      className,
    );
    const content = (
      <ItemContent
        contentLeft={contentLeft}
        contentRight={contentRight}
        description={description}
      >
        {children}
      </ItemContent>
    );

    if ("href" in interactiveProps && interactiveProps.href) {
      const { href, onAction, onClick, ...anchorProps } =
        interactiveProps as ListItemLinkProps;

      return (
        <li
          ref={ref}
          className={itemClassName}
          aria-disabled={isDisabled || undefined}
        >
          <a
            {...anchorProps}
            href={isDisabled ? undefined : href}
            tabIndex={isDisabled ? -1 : anchorProps.tabIndex}
            aria-current={selected ? "page" : undefined}
            className={styles.action}
            onClick={(event) => {
              if (isDisabled) {
                event.preventDefault();
                return;
              }

              onClick?.(event);
              if (!event.defaultPrevented) onAction?.();
            }}
          >
            {content}
          </a>
        </li>
      );
    }

    if ("onAction" in interactiveProps && interactiveProps.onAction) {
      const { onAction, ...buttonProps } =
        interactiveProps as ListItemButtonProps;

      return (
        <li ref={ref} className={itemClassName}>
          <button
            {...buttonProps}
            type={buttonProps.type ?? "button"}
            disabled={isDisabled}
            aria-pressed={selected || undefined}
            className={styles.action}
            onClick={onAction}
          >
            {content}
          </button>
        </li>
      );
    }

    return (
      <li
        {...(interactiveProps as ListItemStaticProps)}
        ref={ref}
        className={itemClassName}
        aria-disabled={isDisabled || undefined}
        aria-current={selected || undefined}
      >
        <div className={styles["static-content"]}>{content}</div>
      </li>
    );
  },
);

ListItem.displayName = "ListItem";

export const ListSection = forwardRef<HTMLLIElement, ListSectionProps>(
  ({ title, children, className, ...rest }, ref) => (
    <li {...rest} ref={ref} className={clsx(styles.section, className)}>
      {title != null && <div className={styles["section-title"]}>{title}</div>}
      <ul className={styles["nested-list"]}>{children}</ul>
    </li>
  ),
);

ListSection.displayName = "ListSection";
