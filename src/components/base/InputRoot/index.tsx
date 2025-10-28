import React from "react";
import clsx from "clsx";
import styles from "./InputRoot.module.scss";
import type { InputProps } from "./index.props";

const InputRoot = ({
	className,
	startIcon,
	endIcon,
	children,
	variant = "primary",
	disabled,
	hasError,
	style,
	size,
	ref,
}: InputProps) => (
	<div
		ref={ref}
		style={style}
		className={clsx(
			styles.root,
			styles[`variant_${variant}`],
			size && styles[`size_${size}`],
			{
				[styles[`variant_${variant}_disabled`]]: disabled,
				[styles[`variant_${variant}_error`]]: hasError,
			},
			className,
		)}
	>
		{startIcon && <div className={styles["base-icon"]}>{startIcon}</div>}
		{children}
		{endIcon && <div className={styles["base-icon"]}>{endIcon}</div>}
		{disabled && <div className={styles["base-disable-wrapper"]} />}
	</div>
);

export default InputRoot;
