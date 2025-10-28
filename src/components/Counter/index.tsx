import React from "react";
import clsx from "clsx";
import Button from "../Button";
import MinusIcon from "../Icons/Minus";
import PlusIcon from "../Icons/Plus";
import styles from "./Counter.module.scss";
import type { CounterProps } from "./index.props";

const Counter: React.FC<CounterProps> = ({
	value = 1,
	max,
	min = 0,
	fullWidth,
	onChange,
	disabled,
	className,
}) => {
	const minusDisabled = disabled || value <= min;
	const plusDisabled = disabled || value >= max;

	const handleChange = (delta: number) => {
		if (disabled) return;
		const newValue = value + delta;
		if (newValue < min || newValue > max) return;
		onChange(newValue);
	};

	return (
		<div
			className={clsx(
				styles.root,
				{
					[styles['root_fullWidth']]: Boolean(fullWidth),
				},
				className,
			)}
		>
			<div
				className={clsx(styles.control, {
					[styles['control_fullWidth']]: Boolean(fullWidth),
				})}
			>
				<Button
					icon={<MinusIcon width={16} height={16} />}
					disabled={minusDisabled}
					type="button"
					onClick={(event) => {
						event.stopPropagation();
						handleChange(-1);
					}}
					aria-label="decrease"
				/>
				<div className={styles.value}>{value}</div>
				<Button
					icon={<PlusIcon width={16} height={16} />}
					disabled={plusDisabled}
					type="button"
					onClick={(event) => {
						event.stopPropagation();
						handleChange(1);
					}}
					aria-label="increase"
				/>
			</div>
		</div>
	);
};

export default Counter;
