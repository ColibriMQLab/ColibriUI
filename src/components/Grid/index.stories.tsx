import React from "react";
import { GridItem } from "./Item";
import { Grid } from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Grid> = {
  title: "UI/Grid",
  component: Grid,
  argTypes: {
    gridRowGap: {
      control: "select",
      options: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "8",
        "10",
        "12",
        "16",
        "20",
        "24",
        "32",
      ],
    },
    gridColumnGap: {
      control: "select",
      options: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "8",
        "10",
        "12",
        "16",
        "20",
        "24",
        "32",
      ],
    },
    gridItemMinWidth: {
      control: "text",
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    gridRowGap: "6",
    gridColumnGap: "4",
    gridItemMinWidth: "var(--component-grid-item-min-width)",
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof Grid>;

const style = `
	.grid-item {
		background: var(--color-bg-surface-subtle);
		border-radius: var(--radius-md);
		color: var(--color-text-primary);
		padding: var(--space-3);
	}
	#storybook-root {
		flex: 1;
		display: block;
	}
`;

const items = [
  { content: "Item 1" },
  { content: "Item 2" },
  { content: "Item 3" },
  { content: "Item 4" },
  { content: "Item 5" },
  { content: "Item 6" },
  { content: "Banner", fullWidth: true },
  { content: "Item 7" },
  { content: "Item 8" },
  { content: "Item 9" },
  { content: "Item 10" },
  { content: "Item 11" },
  { content: "Item 12" },
];

export const Default: Story = {
  render: (args) => (
    <>
      <style>{style}</style>
      <Grid {...args}>
        {items.map(({ content, fullWidth }, index) => (
          <GridItem
            key={`item-${index}`}
            fullWidth={fullWidth}
            className="grid-item"
          >
            {content}
          </GridItem>
        ))}
      </Grid>
    </>
  ),
};

export const GridItemProps: Story = {
  render: (args) => (
    <>
      <style>{style}</style>
      <Grid {...args}>
        <GridItem className="grid-item">Regular item</GridItem>
        <GridItem
          fullWidth
          className="grid-item"
          style={{
            background: "var(--component-tab-bg-active)",
            color: "var(--component-tab-text-active)",
          }}
        >
          Full-width item with custom style
        </GridItem>
        <GridItem className="grid-item">Regular item</GridItem>
      </Grid>
    </>
  ),
};
