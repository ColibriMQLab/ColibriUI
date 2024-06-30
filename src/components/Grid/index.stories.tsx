import React from "react";
import GridItem from "./Item";
import Grid from ".";
import type { Meta } from "@storybook/react";

const meta: Meta<typeof Grid> = {
  title: "UI/Grid",
  component: Grid,
} satisfies Meta<typeof Grid>;

export default meta;

export const Default = () => {
  const style = `
      .my-adaptive-grid-item {
          background: #f7f8f9;
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

  return (
    <>
      <style>{style}</style>
      <Grid className="my-adaptive-grid">
        {items.map((item, index) => (
          <GridItem
            key={index}
            fullWidth={item.fullWidth}
            className="my-adaptive-grid-item"
          >
            {item.content}
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
