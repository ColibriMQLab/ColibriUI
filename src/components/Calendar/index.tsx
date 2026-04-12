import React, {
	useReducer,
	useEffect,
	useRef,
	useCallback,
	useMemo,
} from "react";
import clsx from "clsx";
import { requestIdleCallback } from "../libs/requestIdleCallback";
import { getDaysDiff } from "../helpers/date";
import { ArrowNext } from "../Icons";
import Month from "./components/Month/Month";
import { getStartMonth } from "./utils/getStartMonth";
import { Presets } from "./components/Presets";
import { getNumberOfMonthsBetweenDates } from "./utils/getNumberOfMonthsBetweenDates";
import { ContinueButton } from "./components/ContinueButton";
import styles from "./index.module.scss";
import type { MouseEvent } from "react";
import type { CalendarProps } from "./index.props";
import type { Preset } from "./components/Presets";

const idleCallbackOptions = {
	timeout: 1000,
};

type CalendarState = {
	selectedDate: string | undefined;
	selectedPeriod: number | undefined;
	currentMonthOffset: number;
	contentWidth: number;
	isRangeCompleted: boolean;
	focusedDate: string | undefined;
}; type CalendarAction =
	| { type: "SET_SELECTED_DATE"; payload: string | undefined }
	| { type: "SET_SELECTED_PERIOD"; payload: number | undefined }
	| { type: "SET_CURRENT_MONTH_OFFSET"; payload: number }
	| { type: "SET_CONTENT_WIDTH"; payload: number }
	| { type: "SET_IS_RANGE_COMPLETED"; payload: boolean }
	| { type: "SET_FOCUSED_DATE"; payload: string | undefined }
	| {
		type: "NAVIGATE_KEYBOARD";
		payload: { focusedDate: string; monthOffset: number };
	}
	| {
		type: "SELECT_DATE";
		payload: {
			date: string;
			period: number;
			rangeCompleted: boolean;
			startMonth: string;
		};
	}
	| { type: "INCREMENT_MONTH_OFFSET" }
	| { type: "DECREMENT_MONTH_OFFSET" }
	| {
		type: "SYNC_INITIAL_STATE";
		payload: {
			selectedDate?: string;
			selectedPeriod?: number;
			startMonth: string;
		};
	};

const updates: Partial<CalendarState> = {};

const calendarReducer = (
	state: CalendarState,
	action: CalendarAction,
): CalendarState => {
	switch (action.type) {
		case "SET_SELECTED_DATE":
			return { ...state, selectedDate: action.payload };

		case "SET_SELECTED_PERIOD":
			return { ...state, selectedPeriod: action.payload };

		case "SET_CURRENT_MONTH_OFFSET":
			return { ...state, currentMonthOffset: action.payload };

		case "SET_CONTENT_WIDTH":
			return { ...state, contentWidth: action.payload };

		case "SET_IS_RANGE_COMPLETED":
			return { ...state, isRangeCompleted: action.payload };

		case "SET_FOCUSED_DATE":
			return { ...state, focusedDate: action.payload };

		case "NAVIGATE_KEYBOARD":
			return {
				...state,
				focusedDate: action.payload.focusedDate,
				currentMonthOffset: Math.max(0, action.payload.monthOffset),
			};

		case "SELECT_DATE":
			return {
				...state,
				selectedDate: action.payload.date,
				selectedPeriod: action.payload.period,
				isRangeCompleted: action.payload.rangeCompleted,
				focusedDate: action.payload.date,
				currentMonthOffset: getNumberOfMonthsBetweenDates(
					action.payload.startMonth,
					action.payload.date,
				),
			};

		case "INCREMENT_MONTH_OFFSET":
			return { ...state, currentMonthOffset: state.currentMonthOffset + 1 };

		case "DECREMENT_MONTH_OFFSET":
			return { ...state, currentMonthOffset: state.currentMonthOffset - 1 };

		case "SYNC_INITIAL_STATE":
			if (
				action.payload.selectedDate !== undefined &&
				action.payload.selectedDate !== state.selectedDate
			) {
				updates.selectedDate = action.payload.selectedDate;
				if (action.payload.selectedDate) {
					updates.currentMonthOffset = getNumberOfMonthsBetweenDates(
						action.payload.startMonth,
						action.payload.selectedDate,
					);
				}
			}

			if (
				action.payload.selectedPeriod !== undefined &&
				action.payload.selectedPeriod !== state.selectedPeriod
			) {
				updates.selectedPeriod = action.payload.selectedPeriod;
			}

			return Object.keys(updates).length > 0 ? { ...state, ...updates } : state;

		default:
			return state;
	}
};

const Calendar: React.FC<CalendarProps> = ({
	today,
	selectedDate: initialSelectedDate,
	selectedPeriod: initialSelectedPeriod,
	activeDates,
	datePresets,
	availableDates,
	maxDate,
	canSelectRange,
	onChange,
	onCancel,
	minWidth = 320,
	withContinueButton = false,
	className,
	titleSize = "h3",
}) => {
	const $root = useRef<HTMLDivElement>(null);

	const startMonth = getStartMonth({ today, activeDates });

	const maxMonthOffset = useMemo(() => {
		const candidates: string[] = [];
		if (maxDate) candidates.push(maxDate);
		if (availableDates && availableDates.length > 0) {
			candidates.push([...availableDates].sort().at(-1)!);
		}
		if (candidates.length === 0) return Infinity;
		const lastDate = [...candidates].sort().at(-1)!;
		return getNumberOfMonthsBetweenDates(startMonth, lastDate);
	}, [maxDate, availableDates, startMonth]);

	const getInitialOffset = () => {
		if (initialSelectedDate) {
			return getNumberOfMonthsBetweenDates(startMonth, initialSelectedDate);
		} else if (activeDates && activeDates.length) {
			return getNumberOfMonthsBetweenDates(startMonth, activeDates.sort()[0]);
		}
		return 0;
	};

	const [state, dispatch] = useReducer(calendarReducer, {
		selectedDate: initialSelectedDate,
		selectedPeriod: initialSelectedPeriod,
		currentMonthOffset: getInitialOffset(),
		contentWidth: 0,
		isRangeCompleted: true,
		focusedDate: initialSelectedDate,
	});

	useEffect(() => {
		const el = $root.current;
		if (!el) return;

		dispatch({
			type: "SET_CONTENT_WIDTH",
			payload: el.offsetWidth,
		});

		const observer = new ResizeObserver(() => {
			const width = el.offsetWidth;
			if (width) {
				dispatch({ type: "SET_CONTENT_WIDTH", payload: width });
			}
		});

		observer.observe(el);
		return () => observer.disconnect();
	}, []); const showPrevMonth = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		dispatch({ type: "DECREMENT_MONTH_OFFSET" });
	};

	const showNextMonth = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		dispatch({ type: "INCREMENT_MONTH_OFFSET" });
	};

	const selectDate = useCallback(
		(date: string, period: number, rangeCompleted: boolean) => {
			dispatch({
				type: "SELECT_DATE",
				payload: { date, period, rangeCompleted, startMonth },
			});
		},
		[startMonth],
	);

	const handleDayClick = useCallback(
		(date: string) => {
			if (canSelectRange && state.selectedDate && !state.isRangeCompleted) {
				const [startDate, endDate] = [date, state.selectedDate].sort();
				const period = getDaysDiff(new Date(startDate), new Date(endDate)) + 1;

				if (onChange) {
					onChange({
						date,
						period,
					});
				}

				requestIdleCallback(
					() => selectDate(startDate, period, true),
					idleCallbackOptions,
				);
			} else {
				if (onChange) {
					onChange({
						date,
						period: 1,
					});
				}

				requestIdleCallback(
					() => selectDate(date, 1, false),
					idleCallbackOptions,
				);
			}
		},
		[
			canSelectRange,
			state.selectedDate,
			state.isRangeCompleted,
			selectDate,
			onChange,
		],
	);

	const handlePresetSelect = useCallback(
		(preset: Preset) => {
			if (onChange) {
				onChange({
					date: preset.date,
					period: preset.period,
				});
			}

			requestIdleCallback(
				() => selectDate(preset.date, preset.period, true),
				idleCallbackOptions,
			);
		},
		[selectDate, onChange],
	);

	const commitSelectedDates = useCallback(() => {
		if (state.selectedDate && state.selectedPeriod) {
			if (onCancel) {
				onCancel();
			}
			if (onChange) {
				onChange({
					date: state.selectedDate,
					period: state.selectedPeriod,
				});
			}
		}
	}, [state.selectedDate, state.selectedPeriod, onChange, onCancel]);

	const cancelCalendar = useCallback(() => {
		if (onCancel) {
			onCancel();
		}
	}, [onCancel]);

	const shiftDate = useCallback(
		(date: string, days: number): string => {
			const d = new Date(date);
			d.setDate(d.getDate() + days);
			const y = d.getFullYear();
			const m = String(d.getMonth() + 1).padStart(2, "0");
			const day = String(d.getDate()).padStart(2, "0");
			return `${y}-${m}-${day}`;
		},
		[],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const base = state.focusedDate ?? state.selectedDate ?? today;

			if (e.key === "ArrowRight" || e.key === "ArrowDown") {
				e.preventDefault();
				const next = shiftDate(base, e.key === "ArrowRight" ? 1 : 7);
				const nextOffset = getNumberOfMonthsBetweenDates(startMonth, next);
				if (nextOffset <= maxMonthOffset) {
					dispatch({
						type: "NAVIGATE_KEYBOARD",
						payload: { focusedDate: next, monthOffset: nextOffset },
					});
				}
			} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
				e.preventDefault();
				const prev = shiftDate(base, e.key === "ArrowLeft" ? -1 : -7);
				const prevOffset = getNumberOfMonthsBetweenDates(startMonth, prev);
				if (prevOffset >= 0) {
					dispatch({
						type: "NAVIGATE_KEYBOARD",
						payload: { focusedDate: prev, monthOffset: prevOffset },
					});
				}
			} else if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				if (base) {
					handleDayClick(base);
				}
			}
		},
		[
			state.focusedDate,
			state.selectedDate,
			today,
			startMonth,
			maxMonthOffset,
			shiftDate,
			handleDayClick,
		],
	);

	const getMonthStartDate = useCallback(
		(shiftIndex: number) => {
			const startDate = new Date(startMonth);
			startDate.setMonth(startDate.getMonth() + shiftIndex);
			return startDate;
		},
		[startMonth],
	);

	const commonAttrs = useMemo(
		() => ({
			selectedDate: state.selectedDate,
			selectedPeriod: state.selectedPeriod,
			activeDates,
			availableDates,
			isRangeCompleted: state.isRangeCompleted,
			onDayClick: handleDayClick,
			focusedDate: state.focusedDate,
		}),
		[
			state.selectedDate,
			state.selectedPeriod,
			activeDates,
			availableDates,
			state.isRangeCompleted,
			handleDayClick,
			state.focusedDate,
		],
	);

	useEffect(() => {
		dispatch({
			type: "SYNC_INITIAL_STATE",
			payload: {
				selectedDate: initialSelectedDate,
				selectedPeriod: initialSelectedPeriod,
				startMonth,
			},
		});
	}, [initialSelectedDate, initialSelectedPeriod, startMonth]);

	return (
		<div
			className={clsx(styles.root, className)}
			style={{ minWidth: `${minWidth}px` }}
			data-testid="calendar"
			ref={$root}
			tabIndex={0}
			onKeyDown={handleKeyDown}
		>
			<>
				{state.contentWidth ? (
					<div
						data-component="Months"
						className={styles.months}
						style={{
							transform: `translate3D(${-1 * state.currentMonthOffset * state.contentWidth}px, 0, 0)`,
						}}
					>
						{[
							state.currentMonthOffset - 1,
							state.currentMonthOffset,
							state.currentMonthOffset + 1,
						]
							.filter((index) => index >= 0)
							.map((index) => {
								const attrs = {
									...commonAttrs,
									today,
									startDate: getMonthStartDate(index),
									offsetLeft: index * state.contentWidth,
								};

								return (
									<Month
										{...attrs}
										titleSize={titleSize}
										key={`month-${index}`}
									/>
								);
							})}
					</div>
				) : (
					<Month
						titleSize={titleSize}
						today={today}
						startDate={getMonthStartDate(state.currentMonthOffset)}
						offsetLeft={0}
						{...commonAttrs}
					/>
				)}
				<button
					className={clsx(
						styles["month-control"],
						styles["month-control-prev"],
					)}
					onClick={showPrevMonth}
					disabled={state.currentMonthOffset <= 0}
					type="button"
					role="button"
					aria-label="Prev"
				>
					<ArrowNext className={styles["month-control-prev-arrow"]} />
				</button>
				<button
					className={clsx(
						styles["month-control"],
						styles["month-control-next"],
					)}
					onClick={showNextMonth}
					disabled={state.currentMonthOffset >= maxMonthOffset}
					type="button"
					role="button"
					aria-label="Next"
				>
					<ArrowNext className={styles["month-control-next-arrow"]} />
				</button>
			</>
			{datePresets && (
				<Presets presets={datePresets} onPresetSelect={handlePresetSelect} />
			)}
			{withContinueButton && (
				<ContinueButton
					isChanged={
						state.selectedDate !== initialSelectedDate ||
						state.selectedPeriod !== initialSelectedPeriod
					}
					selectedDate={state.selectedDate}
					selectedPeriod={state.selectedPeriod}
					onContinue={commitSelectedDates}
					onCancel={cancelCalendar}
				/>
			)}
		</div>
	);
};

export default Calendar;
