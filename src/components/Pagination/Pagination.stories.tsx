import React, { useEffect, useState } from "react";
import { Pagination } from ".";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import type { PaginationProps } from "./index.props";

const meta: Meta<typeof Pagination> = {
  title: "UI/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    totalPages: { control: { type: "number", min: 1 } },
    page: { control: { type: "number", min: 1 } },
    defaultPage: { table: { disable: true } },
    siblingCount: { control: { type: "number", min: 0 } },
    boundaryCount: { control: { type: "number", min: 0 } },
    disabledPages: { control: { type: "object" } },
    disabled: { control: { type: "boolean" } },
    mode: {
      control: { type: "inline-radio" },
      options: ["default", "compact"],
    },
    size: {
      control: { type: "inline-radio" },
      options: ["s", "m", "l"],
    },
    pageSize: { control: { type: "number" } },
    defaultPageSize: { table: { disable: true } },
    pageSizeOptions: { control: { type: "object" } },
    showPageSize: { control: { type: "boolean" } },
    showQuickJump: { control: { type: "boolean" } },
    helperText: { control: { type: "text" } },
    previousLabel: { control: { type: "text" } },
    nextLabel: { control: { type: "text" } },
    quickJumpLabel: { control: { type: "text" } },
    pageSizeLabel: { control: { type: "text" } },
    pageLabel: { table: { disable: true } },
    className: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    totalPages: 24,
    page: 7,
    siblingCount: 1,
    boundaryCount: 1,
    disabled: false,
    mode: "default",
    size: "m",
    showPageSize: false,
    showQuickJump: false,
    onPageChange: fn(),
    onPageSizeChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof Pagination>;

const ControlledTemplate = ({
  page: initialPage = 1,
  pageSize: initialPageSize = 20,
  onPageChange,
  onPageSizeChange,
  ...args
}: PaginationProps) => {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => setPage(initialPage), [initialPage]);
  useEffect(() => setPageSize(initialPageSize), [initialPageSize]);

  return (
    <Pagination
      {...args}
      page={page}
      pageSize={pageSize}
      onPageChange={(nextPage) => {
        setPage(nextPage);
        onPageChange?.(nextPage);
      }}
      onPageSizeChange={(nextPageSize) => {
        setPageSize(nextPageSize);
        setPage(1);
        onPageSizeChange?.(nextPageSize);
      }}
    />
  );
};

export const Default: Story = {
  render: ControlledTemplate,
};

export const WithActions: Story = {
  render: ControlledTemplate,
  args: {
    totalPages: 48,
    page: 1,
    pageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
    showQuickJump: true,
    showPageSize: true,
    helperText: "960 items",
  },
};

export const Compact: Story = {
  render: ControlledTemplate,
  args: {
    mode: "compact",
    totalPages: 12,
    page: 4,
  },
};

export const DisabledPages: Story = {
  render: ControlledTemplate,
  args: {
    totalPages: 12,
    page: 4,
    disabledPages: [2, 5, 6, 9],
    helperText: "Some pages are unavailable",
  },
};

export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    disabled: true,
    showQuickJump: true,
    showPageSize: true,
  },
};

export const NoBoundaries: Story = {
  render: ControlledTemplate,
  args: {
    totalPages: 50,
    page: 25,
    boundaryCount: 0,
    siblingCount: 2,
  },
};

export const Uncontrolled: Story = {
  args: {
    page: undefined,
    defaultPage: 3,
    totalPages: 10,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 20 }}>
      {(["s", "m", "l"] as const).map((size) => (
        <Pagination
          {...args}
          key={size}
          size={size}
          page={undefined}
          defaultPage={4}
          totalPages={8}
          showQuickJump
        />
      ))}
    </div>
  ),
};
