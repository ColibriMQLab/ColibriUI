import * as React from "react";

import classNames from "classnames/bind";
import { requestIdleCallback } from "../libs/requestIdleCallback";

import { getDaysDiff } from "../helpers/date";
import { Month } from "./components/Month/Month";
import { getStartMonth } from "./utils/getStartMonth";
import { Presets } from "./components/Presets";
import { getNumberOfMonthsBetweenDates } from "./utils/getNumberOfMonthsBetweenDates";

import { ContinueButton } from "./components/ContinueButton";
import styles from "./index.module.scss";
import type { Preset } from "./components/Presets";

const clx = classNames.bind(styles);

type ChangePayload = {
  date: string;
  period: number;
};

type Props = {
  today: string;
  selectedDate?: string;
  selectedPeriod?: number;
  canSelectRange?: boolean;
  // List of active dates in format YYYY-MM-DD
  activeDates?: string[];
  datePresets?: Preset[];
  availableDates?: string[];
};

type Methods = {
  onChange?: (payload: ChangePayload) => void;
  onCancel?: () => void;
};

type State = {
  selectedDate?: string;
  selectedPeriod?: number;
  // Starting date of calendar (date of first day in month)
  startMonth: string;
  // Date of first day in current visible month
  currentMonthOffset: number;
  contentWidth: number;
  isRangeCompleted: boolean;
};

const idleCallbackOptions = {
  timeout: 1000,
};

class Calendar extends React.PureComponent<Props & Methods, State> {
  $root = React.createRef<HTMLDivElement>();

  constructor(props: Props & Methods) {
    super(props);
    const { today, selectedDate, selectedPeriod, activeDates } = props;
    const startMonth = getStartMonth({ today, activeDates });

    this.state = {
      selectedDate,
      selectedPeriod,
      startMonth,
      currentMonthOffset: (() => {
        if (selectedDate) {
          return getNumberOfMonthsBetweenDates(startMonth, selectedDate);
        } else if (activeDates && activeDates.length) {
          return getNumberOfMonthsBetweenDates(
            startMonth,
            activeDates.sort()[0],
          );
        }

        return 0;
      })(),
      contentWidth: 0,
      isRangeCompleted: true,
    };
  }

  render() {
    const { currentMonthOffset, contentWidth, selectedDate, selectedPeriod } =
      this.state;
    const { today, datePresets, activeDates, availableDates } = this.props;
    const commonAttrs = {
      selectedDate,
      selectedPeriod,
      activeDates,
      availableDates,
      isRangeCompleted: this.state.isRangeCompleted,
      onDayClick: this.handleDayClick,
    };

    return (
      <div
        className={clx(styles.root)}
        data-component="Calendar"
        ref={this.$root}
      >
        {contentWidth ? (
          <div
            className={clx(styles.months)}
            style={{
              transform: `translate3D(${-1 * currentMonthOffset * contentWidth}px, 0, 0)`,
            }}
          >
            {[
              currentMonthOffset - 1,
              currentMonthOffset,
              currentMonthOffset + 1,
            ]
              .filter((index) => index >= 0)
              .map((index) => {
                const attrs = {
                  ...commonAttrs,
                  today,
                  startDate: this.getMonthStartDate(index),
                  offsetLeft: index * contentWidth,
                };

                return <Month {...attrs} key={`month-${index}`} />;
              })}
          </div>
        ) : (
          <Month
            today={today}
            startDate={this.getMonthStartDate(currentMonthOffset)}
            offsetLeft={0}
            {...commonAttrs}
          />
        )}
        <button
          className={clx(styles.monthControl, styles["monthControl-prev"])}
          onClick={this.showPrevMonth}
          disabled={currentMonthOffset <= 0}
        />
        <button
          className={clx(styles.monthControl, styles["monthControl-next"])}
          onClick={this.showNextMonth}
          disabled={currentMonthOffset >= 11}
        />
        {datePresets && (
          <Presets
            presets={datePresets}
            selectedDate={selectedDate}
            selectedPeriod={selectedPeriod}
            onPresetSelect={this.handlePresetSelect}
          />
        )}
        <ContinueButton
          isChanged={
            selectedDate !== this.props.selectedDate ||
            selectedPeriod !== this.props.selectedPeriod
          }
          selectedDate={selectedDate}
          selectedPeriod={selectedPeriod}
          onContinue={this.commitSelectedDates}
          onCancel={this.cancelCalendar}
        />
      </div>
    );
  }

  componentDidMount() {
    this.setContentWidth();
  }

  setContentWidth() {
    if (this.$root.current) {
      this.setState({
        contentWidth: this.$root.current.offsetWidth,
      });
    }
  }

  showPrevMonth = () => {
    this.setState({
      currentMonthOffset: this.state.currentMonthOffset - 1,
    });
  };

  showNextMonth = () => {
    this.setState({
      currentMonthOffset: this.state.currentMonthOffset + 1,
    });
  };

  selectDate(date: string, period: number, isRangeCompleted: boolean) {
    this.setState({
      isRangeCompleted,
      selectedDate: date,
      selectedPeriod: period,
      currentMonthOffset: getNumberOfMonthsBetweenDates(
        this.state.startMonth,
        date,
      ),
    });
  }

  handleDayClick = (date: string) => {
    const { canSelectRange } = this.props;
    const { isRangeCompleted } = this.state;

    if (canSelectRange && this.state.selectedDate && !isRangeCompleted) {
      // Selecting range
      const [startDate, endDate] = [date, this.state.selectedDate].sort();
      const period = getDaysDiff(new Date(startDate), new Date(endDate)) + 1;

      requestIdleCallback(
        () => this.selectDate(startDate, period, true),
        idleCallbackOptions,
      );

      return;
    }

    // Selecting one day

    requestIdleCallback(
      () => this.selectDate(date, 1, !canSelectRange),
      idleCallbackOptions,
    );
  };

  handlePresetSelect = (preset: Preset) => {
    requestIdleCallback(
      () => this.selectDate(preset.date, preset.period, true),
      idleCallbackOptions,
    );
  };

  commitSelectedDates = () => {
    const { selectedDate, selectedPeriod } = this.state;
    const { onChange, onCancel } = this.props;

    if (selectedDate && selectedPeriod) {
      if (onCancel) {
        onCancel();
      }
      if (onChange) {
        onChange({
          date: selectedDate,
          period: selectedPeriod,
        });
      }
    }
  };

  cancelCalendar = () => {
    const { onCancel } = this.props;

    if (onCancel) {
      onCancel();
    }
  };

  getMonthStartDate(shiftIndex: number) {
    const startDate = new Date(this.state.startMonth);

    startDate.setMonth(startDate.getMonth() + shiftIndex);

    return startDate;
  }
}

export default Calendar;
