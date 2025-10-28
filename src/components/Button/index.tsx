import React from "react";
import clsx from "clsx";
import { type ButtonProps } from "./index.props";
import styles from "./Button.module.scss";

const Button = ({
	className,
	fullWidth = false,
	variant = "primary",
	iconStart,
	iconEnd,
	icon,
	size,
	children,
	disabled,
	onClick,
	type,
	ref,
	...props
}: ButtonProps) => (
	<button
		onClick={onClick}
		ref={ref}
		className={clsx(
			styles.root,
			{
				[styles['root_icon']]: Boolean(icon),
				[styles['root_fullWidth']]: Boolean(fullWidth),
				[styles[`size_${size}`]]: Boolean(size),
				[styles[`variant_${variant}`]]: Boolean(variant),
				[styles[`variant_${variant}_disabled`]]: Boolean(disabled),
			},
			className,
		)}
		disabled={disabled}
		data-testid="button"
		type={type || "button"}
		role="button"
		{...props}
	>
		{icon && <span className={styles.icon}>{icon}</span>}
		{iconStart && <span className={styles.icon}>{iconStart}</span>}
		{children && <span className={styles.text}>{children}</span>}
		{iconEnd && <span className={styles.icon}>{iconEnd}</span>}
	</button>
);

export default Button;
