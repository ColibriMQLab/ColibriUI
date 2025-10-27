import React, { useMemo } from "react";
import Select from "../Select";
import {
	checkIsBeforeSelectedDate,
	checkIsBeforeNow,
	generateSuggest,
} from "./helpers";
import OptionLabel from "./Label";

import type { SelectProps } from "../Select/index.props";
import type { FC } from "react";

type TimeRange = { start: string; end: string };

interface TimeSelectProps extends Omit<SelectProps<string>, "options"> {
	interval?: 5 | 10 | 15 | 30;
	currentDate?: Date | null;
	selectedDate?: Date | null;
	name?: string;
	disabled?: boolean;
	allowedTimeRange?: TimeRange;
}

const isTimeInRange = (timeString: string, range: TimeRange): boolean => {
	const [hours, minutes] = timeString.split(":").map(Number);
	const totalMinutes = hours * 60 + minutes;

	const [startHours, startMinutes] = range.start.split(":").map(Number);
	const startTotalMinutes = startHours * 60 + startMinutes;

	const [endHours, endMinutes] = range.end.split(":").map(Number);
	const endTotalMinutes = endHours * 60 + endMinutes;

	return totalMinutes >= startTotalMinutes && totalMinutes <= endTotalMinutes;
};

const TimeSelect: FC<TimeSelectProps> = ({
	value,
	name,
	currentDate,
	selectedDate,
	label,
	interval = 15,
	onChange,
	disabled,
	allowedTimeRange,
	...props
}: TimeSelectProps) => {
	const baseOptions = useMemo(
		() =>
			generateSuggest(interval).map((item) => ({
				value: item.time,
				label: <OptionLabel time={item.time} />,
			})),
		[interval],
	);

	const options = useMemo(
		() =>
			baseOptions.map((option) => {
				const timeRangeDisabled =
					!!allowedTimeRange && !isTimeInRange(option.value, allowedTimeRange);
				const beforeSelectedDisabled =
					!!selectedDate &&
					checkIsBeforeSelectedDate(option.value, interval, selectedDate);
				const beforeCurrentDisabled =
					!!currentDate && checkIsBeforeNow(option.value, currentDate);

				const isDisabled =
					timeRangeDisabled || beforeSelectedDisabled || beforeCurrentDisabled;
				return {
					...option,
					disabled: isDisabled,
				};
			}),
		[baseOptions, currentDate, selectedDate, interval, allowedTimeRange],
	);

	return (
		<Select
			{...props}
			name={name}
			value={value}
			label={label}
			options={options}
			onChange={onChange}
			disabled={disabled}
		/>
	);
};

export default TimeSelect;
