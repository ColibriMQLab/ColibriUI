import * as React from "react";
import { useMemo, useCallback } from "react";
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

const WEEK_DAYS = Array.from({ length: 7 }, (_, idx) => {
	const index = idx + 1;
	return {
		index,
		name: getShortWeekDayNameByIndex(index),
		isWeekend: index > 5,
	};
});

const SELECTED_BG_STYLE = { background: "var(--palette-bg-2)" };
const TRANSPARENT_BG_STYLE = { background: "transparent" };

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
		return <li className={itemClass}>{children}</li>;
	} else if (isInSelectedRange) {
		return <li className={clx("selected-range-day")}>{children}</li>;
	}

	return <li className={clx('day')}>{children}</li>;
});

Item.displayName = 'Item';

const DayButton = React.memo<{
	day: number;
	isActive: boolean;
	isSelected: boolean;
	dateString: string;
	onDayClick: (date: string) => void;
}>(({ day, isActive, isSelected, dateString, onDayClick }) => {
	const handleClick = useCallback(() => {
		if (isActive) {
			onDayClick(dateString);
		}
	}, [isActive, dateString, onDayClick]);

	const dayInnerActive = isActive ? "day-inner-active" : "";
	const bgStyle = isSelected ? SELECTED_BG_STYLE : TRANSPARENT_BG_STYLE;

	return (
		<button
			className={clx("day-inner", dayInnerActive)}
			style={bgStyle}
			role="button"
			type="button"
			onClick={isActive ? handleClick : undefined}
		>
			<Typography
				size="s"
				style={{
					opacity: isActive ? 80 : 30,
					color: isActive
						? "rgba(0, 0, 0, 0.8)"
						: "rgba(0, 0, 0, 0.3)",
				}}
			>
				{day}
			</Typography>
		</button>
	);
});

DayButton.displayName = 'DayButton';

const Month: FCWithElements<Props> = (props) => {
	const {
		startDate,
		offsetLeft,
		titleSize,
		onDayClick,
		today,
		selectedDate,
		selectedPeriod,
		activeDays,
		availableDates,
	} = props;

	const year = startDate.getFullYear();
	const month = useMemo(() => leadingZeros(startDate.getMonth() + 1, 2), [startDate]);
	const monthName = useMemo(() => getUpperMonthName(startDate), [startDate]);

	const weeks = useMemo(() => {
		return getMonthWeeks(props);
	}, [today, startDate, activeDays, selectedDate, selectedPeriod, availableDates]);

	const leftStyle = useMemo(
		() => (offsetLeft ? { left: `${offsetLeft}px` } : undefined),
		[offsetLeft]
	);

	return (
		<div
			data-testid="month"
			className={clx('root')}
			style={leftStyle}
		>
			<div className={clx("month-name")}>
				<Typography tag="span" size={titleSize}>
					{monthName}
				</Typography>
			</div>
			<div className={clx('table')}>
				<ul className={clx('legend')}>
					{WEEK_DAYS.map(({ index, name, isWeekend }) => (
						<li className={clx('day')} key={index}>
							<Typography
								style={{
									opacity: isWeekend ? 80 : 30,
									color: isWeekend
										? "var(--typography-alert)"
										: "var(--palette-black)",
								}}
							>
								{name}
							</Typography>
						</li>
					))}
				</ul>
				{weeks.map((days, weekIndex) => (
					<ul key={`week-${weekIndex}`} className={clx('week')}>
						{days.map((day, dayIndex) => {
							const key = `day-${dayIndex}`;

							if (day.isDummy) {
								return <li className={clx('day')} key={key} />;
							}

							const dateString = `${year}-${month}-${leadingZeros(day.day, 2)}`;

							return (
								<Item
									isStartOfSelection={day.isStartOfSelection}
									isEndOfSelection={day.isEndOfSelection}
									isSelected={day.isSelected}
									isInSelectedRange={day.isInSelectedRange}
									key={key}
								>
									<DayButton
										day={day.day}
										isActive={Boolean(day.isActive)}
										isSelected={Boolean(day.isSelected)}
										dateString={dateString}
										onDayClick={onDayClick}
									/>
								</Item>
							);
						})}
					</ul>
				))}
			</div>
		</div>
	);
};

export default React.memo(Month);

Month.displayName = 'Month';