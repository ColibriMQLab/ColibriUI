import React from "react";

import classNames from "classnames/bind";
import styles from "./Tab.module.scss";
import type { FC } from "react";
import type { TabProps } from "./Tab.props";

const clx = classNames.bind(styles);

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
    className={clx(
      styles.tab,
      {
        tab_inactive: !active,
        tab_active: !!active,
        tab_disabled: !!disabled,
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
