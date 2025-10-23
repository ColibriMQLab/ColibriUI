import React from "react";
import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import type { PropsWithChildren } from "react";
import type { MenuItemProps } from "./index.props";

const clx = classNames.bind(styles);

const MenuItem = ({
	className,
	isSelected,
	variant = "primary",
	disabled,
	onClick,
	children,
	onMouseEnter,
	ref,
	...props
}: PropsWithChildren<MenuItemProps>) => {
	const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
		if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
			event.preventDefault();
			onClick?.(event);
		}
	};

	return (
		<li
			ref={ref}
			role="menuitem"
			tabIndex={disabled ? -1 : 0}
			data-testid="menuitem"
			aria-disabled={disabled || undefined}
			className={clx(
				"item",
				{
					'item_disabled': disabled,
					'item_selected': isSelected,
					[`item_variant_${variant}`]: true,
				},
				className,
			)}
			onClick={!disabled ? onClick : undefined}
			onKeyDown={handleKeyDown}
			onMouseEnter={onMouseEnter}
			{...props}
		>
			{children}
		</li>
	);
};

export default MenuItem;