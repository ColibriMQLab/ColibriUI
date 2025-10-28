import React from "react";
import clsx from "clsx";
import styles from "./Tab.module.scss";
import type { FC } from "react";
import type { TabProps } from "./Tab.props";

const Tab: FC<TabProps> = ({
  innerRef,
  active,
  className,
  content,
  disabled,
  size,
  ...props
}) => (
  <li
    {...props}
    aria-selected={active}
    ref={innerRef}
    className={clsx(
      styles.tab,
      {
        [styles["tab_inactive"]]: Boolean(!active),
        [styles["tab_active"]]: Boolean(active),
        [styles["tab_disabled"]]: Boolean(disabled),
      },
      className,
    )}
    data-size={size}
    role="tab"
    tabIndex={disabled ? undefined : active ? 0 : -1}
  >
    {content}
  </li>
);

export default Tab;
