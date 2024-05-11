import type { Meta, StoryFn } from "@storybook/react";

import Flag, { countries } from ".";

export default {
  title: "UI/Icons/Flag",
  argTypes: {
    country: {
      control: { type: "select" },
      options: countries,
    },
  },
  args: {
    country: "ru",
  },
} as Meta;

export const Default: StoryFn = (args) => {
  return <img src={Flag[args.country]} alt={args.country} width="20" />;
};
