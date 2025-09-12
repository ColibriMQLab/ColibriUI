import React from "react";
import Calendar from ".";
import type { Meta, StoryFn } from "@storybook/react";
import { fn } from "@storybook/test";
import { toISODate } from "../helpers/date";
import { getPresets } from "./utils/getPresets";
import { PRESETS } from "./components/Presets";
import { useArgs } from "@storybook/preview-api";

const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Calendar>;

export default meta;

// ✅ типизируем Template как StoryFn
const Template: StoryFn<typeof Calendar> = (args) => {
  const [, updateArgs] = useArgs();
  return (
    <Calendar
      {...args}
      today={toISODate(new Date())}
      onChange={(val) => {
        updateArgs({ selectedDate: val.date, selectedPeriod: val.period });
        args.onChange?.(val);
      }}
    />
  );
};

// Теперь TS будет знать про .args
export const Today = Template.bind({});
Today.args = {
  today: toISODate(new Date()),
  selectedDate: toISODate(new Date()),
};

// остальные сценарии оставляешь без изменений …
export const SingleDateSelection = Template.bind({});
SingleDateSelection.args = {
  selectedDate: '2025-12-17',
};

export const RangeSelection = Template.bind({});
RangeSelection.args = {
  canSelectRange: true,
  selectedDate: toISODate(new Date()),
};

export const WithPresetsAndRange = Template.bind({});
WithPresetsAndRange.args = {
  datePresets: getPresets([PRESETS.TODAY, PRESETS.TOMORROW]),
  canSelectRange: true,
};

export const PreselectedRange = Template.bind({});
PreselectedRange.args = {
  selectedDate: toISODate(new Date()),
  selectedPeriod: 3,
  withContinueButton: true,
};

export const LimitedByAvailableDates = Template.bind({});
LimitedByAvailableDates.args = {
  availableDates: [
    toISODate(new Date()),
    toISODate(new Date(Date.now() + 86400000)),
  ],
};

export const WithCustomMinWidth = Template.bind({});
WithCustomMinWidth.args = {
  minWidth: 500,
};

// Новые сценарии для демонстрации различных месяцев
export const ShowDecember = Template.bind({});
ShowDecember.args = {
  selectedDate: '2025-12-15',
  today: '2025-01-15', // сегодня январь, но показываем декабрь
};

export const ShowJune = Template.bind({});
ShowJune.args = {
  selectedDate: '2025-06-20',
  today: '2025-01-15', // сегодня январь, но показываем июнь
};

// Сценарии с активными датами
export const WithActiveDates = Template.bind({});
WithActiveDates.args = {
  activeDates: [
    '2025-01-15',
    '2025-01-16',
    '2025-01-17',
    '2025-02-10',
    '2025-02-11',
  ],
  selectedDate: '2025-01-15',
};

export const ShowMonthByActiveDates = Template.bind({});
ShowMonthByActiveDates.args = {
  activeDates: [
    '2025-08-15', // август
    '2025-08-16',
  ],
  today: '2025-01-15',
};

// Сценарии с пресетами
export const AllPresets = Template.bind({});
AllPresets.args = {
  datePresets: getPresets([
    PRESETS.TODAY,
    PRESETS.TOMORROW,
    PRESETS.CURWEEK,
    PRESETS.NEXTWEEK,
    PRESETS.WEEKENDS,
  ]),
  canSelectRange: true,
};

export const OnlyWeekPresets = Template.bind({});
OnlyWeekPresets.args = {
  datePresets: getPresets([
    PRESETS.CURWEEK,
    PRESETS.NEXTWEEK,
  ]),
  canSelectRange: true,
};

// Сценарии с кнопкой продолжения
export const WithContinueButton = Template.bind({});
WithContinueButton.args = {
  withContinueButton: true,
  selectedDate: toISODate(new Date()),
  selectedPeriod: 1,
  canSelectRange: true,
};

export const WithContinueButtonAndPresets = Template.bind({});
WithContinueButtonAndPresets.args = {
  withContinueButton: true,
  datePresets: getPresets([PRESETS.TODAY, PRESETS.TOMORROW, PRESETS.CURWEEK]),
  canSelectRange: true,
};

// Сценарии с разными размерами заголовков
export const SmallTitle = Template.bind({});
SmallTitle.args = {
  titleSize: "h4",
  selectedDate: toISODate(new Date()),
};

export const LargeTitle = Template.bind({});
LargeTitle.args = {
  titleSize: "h2",
  selectedDate: toISODate(new Date()),
};

export const EndOfYear = Template.bind({});
EndOfYear.args = {
  selectedDate: '2025-12-31',
  today: '2025-01-15',
};

// Интерактивные сценарии
export const InteractiveRangeSelection = Template.bind({});
InteractiveRangeSelection.args = {
  canSelectRange: true,
  datePresets: getPresets([PRESETS.CURWEEK, PRESETS.NEXTWEEK]),
  withContinueButton: true,
};

// Сценарий с кастомным классом
export const WithCustomStyling = Template.bind({});
WithCustomStyling.args = {
  className: "custom-calendar-style",
  selectedDate: toISODate(new Date()),
  minWidth: 400,
};