import * as React from "react";
import classNames from "classnames/bind";
import { leadingZeros } from "../../../libs/numbers/leadingZeros";
import Typography from "../../../Typography";
import {
	getShortWeekDayNameByIndex,
	getUpperMonthName,
} from "../../../helpers/date";
import { getMonthWeeks } from "../../utils/getMonthWeeks";
import styles from "./index.module.scss";
import type { CalendarTitleSize } from "../../index.props";
import type { FunctionComponent, PropsWithChildren } from "react";

const clx = classNames.bind(styles);
// eslint-disable-next-line @typescript-eslint/ban-types
export interface FCWithElements<T = {}> extends FunctionComponent<T> { }

type Props = {
	today: string;
	startDate: Date;
	activeDays?: string[];
	selectedDate?: string;
	selectedPeriod?: number;
	onDayClick: (date: string) => void;
	offsetLeft: number;
	availableDates?: string[];
	titleSize?: CalendarTitleSize;
};

type ComponentProps = {
	isStartOfSelection?: boolean;
	isEndOfSelection?: boolean;
	isSelected?: boolean;
	isInSelectedRange?: boolean;
};

const Item = React.memo(({
	isSelected,
	isInSelectedRange,
	isStartOfSelection,
	isEndOfSelection,
	children,
}: PropsWithChildren<ComponentProps>) => {
	const itemClass = clx('day', {
		["selected-day"]: isSelected,
		["selected-range-day"]: isInSelectedRange || isSelected,
		["no-selection"]: isStartOfSelection && isEndOfSelection,
		["start-of-selection"]: isStartOfSelection && !isEndOfSelection,
		["end-of-selection"]: isEndOfSelection && !isStartOfSelection,
		["first-child"]: isEndOfSelection,
		["last-child"]: isStartOfSelection,
	});

	if (isSelected) {
		return (
			<li className={itemClass}>
				{children}
			</li>
		);
	} else if (isInSelectedRange) {
		return <li className={clx("selected-range-day")}>{children}</li>;
	}

	return <li className={clx('day')}>{children}</li>;
});

export const Month: FCWithElements<Props> = (props) => {
	const year = props.startDate.getFullYear();
	const month = leadingZeros(props.startDate.getMonth() + 1, 2);

	return (
		<div
			data-testid="month"
			className={clx('root')}
			style={{ left: props.offsetLeft ? `${props.offsetLeft}px` : undefined }}
		>
			<div className={clx("month-name")}>
				<Typography tag="span" size={props.titleSize}>
					{getUpperMonthName(props.startDate)}
				</Typography>
			</div>
			<div className={clx('table')}>
				<ul className={clx('legend')}>
					{Array.from({ length: 7 }, (_, idx) => {
						const index = idx + 1;
						return (
							<li className={clx('day')} key={index}>
								<Typography
									style={{
										opacity: index > 5 ? 80 : 30,
										color:
											index > 5
												? "var(--typography-alert)"
												: "var(--palette-black)",
									}}
								>
									{getShortWeekDayNameByIndex(index)}
								</Typography>
							</li>
						);
					})}
				</ul>
				{getMonthWeeks(props).map((days, ...rest1) => (
					<ul key={`week-${rest1[0]}`} className={clx('week')}>
						{days.map((day, ...rest2) => {
							const key = `day-${rest2[0]}`;

							if (day.isDummy) {
								return <li className={clx('day')} key={key} />;
							}
							const attrs = {
								isStartOfSelection: day.isStartOfSelection,
								isEndOfSelection: day.isEndOfSelection,
								isSelected: day.isSelected,
								isInSelectedRange: day.isInSelectedRange,
							};

							const dayInnerActive = day.isActive
								? "day-inner-active"
								: "";

							return (
								<Item {...attrs} key={key}>
									<button
										className={clx("day-inner", dayInnerActive)}
										style={{
											background: day.isSelected
												? "var(--palette-bg-2)"
												: "transparent",
										}}
										role="button"
										type="button"
										onClick={
											day.isActive
												? () =>
													props.onDayClick(
														[year, month, leadingZeros(day.day, 2)].join("-"),
													)
												: undefined
										}
									>
										<Typography
											size="s"
											style={{
												opacity: day.isActive ? 80 : 30,
												color: day.isActive
													? "rgba(0, 0, 0, 0.8)"
													: "rgba(0, 0, 0, 0.3)",
											}}
										>
											{day.day}
										</Typography>
									</button>
								</Item>
							);
						})}
					</ul>
				))}
			</div>
		</div>
	);
};
