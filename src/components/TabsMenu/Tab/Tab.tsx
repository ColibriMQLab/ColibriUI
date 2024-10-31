import React, { FC } from 'react';

import styles from './Tab.module.scss';
import classNames from 'classnames/bind';
import { TabProps } from './Tab.props';

const clx = classNames.bind(styles);

const Tab: FC<TabProps> = ({
	innerRef,
	active,
	className,
	content,
	disabled,
	first,
	...props
}) => (
	<li
		{...props}
		aria-selected={active}
		ref={innerRef}
		className={clx(
			styles.tab,
			{
				'tab_active': !!active,
				'tab_disabled': !!disabled,
				'tab_first': !!first,
			},
			className
		)}
		role="tab"
		tabIndex={disabled ? undefined : active ? 0 : -1}
	>
		{content}
	</li>
);

export default Tab;