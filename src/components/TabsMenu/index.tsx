import React, { useCallback, createRef, useMemo } from "react";

import classNames from "classnames/bind";
import { isKey, Keys } from "../lib/keyboard";
import Tab from "./Tab/Tab";
import styles from "./TabsMenu.module.scss";
import type { TabsMenuProps } from "./index.props";

import type { KeyboardEvent, FC } from "react";

const clx = classNames.bind(styles);

const TabsMenu: FC<TabsMenuProps> = ({
	activeTab,
	onChange,
	className,
	innerRef,
	tabs,
	size = "m",
	...props
}) => {
	const tabsRefs = useMemo(
		() => tabs.map(() => createRef<HTMLLIElement>()),
		[tabs],
	);

	const onKeyDown = useCallback(
		(event: KeyboardEvent<HTMLUListElement>) => {
			if (isKey(event.key, [Keys.LEFT, Keys.DOWN, Keys.RIGHT, Keys.UP])) {
				event.preventDefault();

				let nextTabMenuIndex = 0;
				const direction = isKey(event.key, [Keys.LEFT, Keys.UP]) ? -1 : 1;

				for (let i = 0; i < tabs.length; i++) {
					if (tabs[i].id === activeTab) {
						nextTabMenuIndex = i;
						break;
					}
				}

				for (let i = nextTabMenuIndex; i < tabs.length; i += direction) {
					nextTabMenuIndex += direction;
					const isEdge =
						nextTabMenuIndex >= tabs.length || nextTabMenuIndex < 0;
					const isTabNonDisabled =
						tabs[nextTabMenuIndex] && !tabs[nextTabMenuIndex].disabled;
					if (isEdge || isTabNonDisabled) {
						break;
					}
				}

				const nextTabMenu = tabs[nextTabMenuIndex];
				const nextTabMenuRef = tabsRefs[nextTabMenuIndex];

				if (
					nextTabMenu !== undefined &&
					nextTabMenuRef !== undefined &&
					nextTabMenuRef.current !== null &&
					(nextTabMenu.onClick !== undefined || onChange !== undefined)
				) {
					nextTabMenuRef.current.focus();
					if (nextTabMenu.onClick !== undefined) {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						nextTabMenu.onClick(event as any);
					}
					if (onChange !== undefined) {
						onChange(nextTabMenuIndex.toString());
					}
				}
			}
		},
		[activeTab, tabsRefs, tabs, onChange],
	);

	return (
		<ul
			{...props}
			className={clx(styles.root, className)}
			ref={innerRef}
			role="tablist"
		>
			{tabs.map(({ id, disabled, ...tabProps }, index) => (
				<Tab
					{...tabProps}
					innerRef={tabsRefs[index]}
					disabled={disabled}
					size={size}
					onClick={
						disabled || (!onChange && !tabProps.onClick)
							? undefined
							: (event) => {
								if (tabProps.onClick !== undefined) {
									tabProps.onClick(event);
								}
								if (onChange !== undefined) {
									onChange(id as string);
								}
							}
					}
					active={id === activeTab}
					key={id}
					onKeyDown={onKeyDown}
				/>
			))}
		</ul>
	);
};

export default TabsMenu;
