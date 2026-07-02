import React from "react";
import GridItem from "./Item";
import Grid from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Grid> = {
  title: "UI/Grid",
  component: Grid,
  argTypes: {
    gridRowGap: {
      control: "number",
    },
    gridColumnGap: {
      control: "number",
    },
    gridItemMinWidth: {
      control: "number",
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    gridRowGap: 24,
    gridColumnGap: 16,
    gridItemMinWidth: 100,
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof Grid>;

const style = `
	.grid-item {
		background: #f7f8f9;
		border-radius: 6px;
		padding: 12px;
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
          style={{ background: "#e8f4ff" }}
        >
          Full-width item with custom style
        </GridItem>
        <GridItem className="grid-item">Regular item</GridItem>
      </Grid>
    </>
  ),
};
