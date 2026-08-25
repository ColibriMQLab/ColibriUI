import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Dropzone } from "./Dropzone";
import type { DropzoneFileResult } from "./Dropzone";

const meta = {
  title: "UI/Dropzone",
  component: Dropzone,
  parameters: { layout: "centered" },
  argTypes: {
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
    icon: {
      table: { disable: true },
    },
    iconPlacement: {
      control: { type: "select" },
      options: ["left", "top"],
    },
    size: {
      control: { type: "select" },
      options: ["s", "m", "l"],
    },
    view: {
      control: { type: "text" },
    },
    stretch: {
      control: { type: "boolean" },
    },
    width: {
      control: { type: "text" },
    },
    height: {
      control: { type: "text" },
    },
    accept: {
      control: { type: "text" },
    },
    multiple: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    files: {
      table: { disable: true },
    },
    validator: {
      table: { disable: true },
    },
    onDrop: {
      table: { disable: true },
    },
    onChoseFiles: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
    onClick: {
      table: { disable: true },
    },
    onDragEnter: {
      table: { disable: true },
    },
    onDragLeave: {
      table: { disable: true },
    },
    onDragOver: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    style: {
      table: { disable: true },
    },
  },
  args: {
    title: "Click to upload",
    description: "or drag files here",
    iconPlacement: "left",
    size: "m",
    view: "default",
    stretch: false,
    width: "calc(var(--space-20) * 6)",
    height: "calc(var(--space-24) + var(--space-32))",
    multiple: true,
    disabled: false,
  },
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveExample = (args: React.ComponentProps<typeof Dropzone>) => {
  const [files, setFiles] = useState<File[]>([]);
  const saveFiles = ({ acceptedFiles }: DropzoneFileResult) =>
    setFiles(acceptedFiles);

  return (
    <div
      style={{
        color: "var(--color-text-secondary)",
        fontFamily: "var(--font-family-ui)",
      }}
    >
      <Dropzone
        {...args}
        files={files}
        onDrop={saveFiles}
        onChoseFiles={saveFiles}
      />
      <div style={{ marginTop: "var(--space-3)" }}>
        {files.length
          ? files.map((file) => file.name).join(", ")
          : "No files selected yet"}
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <InteractiveExample {...args} />,
};

export const IconOnTop: Story = {
  args: { iconPlacement: "top" },
};

export const Sizes: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
      }}
    >
      {(["s", "m", "l"] as const).map((size) => (
        <Dropzone
          key={size}
          {...args}
          size={size}
          description={`${size.toUpperCase()} dropzone`}
          height="auto"
          width="calc(var(--space-32) * 4)"
        />
      ))}
    </div>
  ),
};

export const Stretch: Story = {
  args: { stretch: true },
  decorators: [
    (Story) => (
      <div
        style={{
          height: "calc(var(--space-32) * 2 + var(--space-8))",
          width: "calc(var(--space-32) * 4)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const CustomIcon: Story = {
  args: {
    icon: (
      <span
        aria-hidden="true"
        style={{
          color: "var(--color-icon-primary)",
          fontSize: "var(--space-10)",
          lineHeight: "var(--space-10)",
        }}
      >
        +
      </span>
    ),
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ImagesOnly: Story = {
  args: {
    accept: "image/*",
    description: "PNG, JPG, or WebP",
    multiple: false,
  },
};

export const WithValidator: Story = {
  args: {
    description: "Only files under 1 MB are accepted",
    validator: async (files) => ({
      acceptedFiles: files.filter((file) => file.size <= 1024 * 1024),
      rejectedFiles: files.filter((file) => file.size > 1024 * 1024),
      error: files.some((file) => file.size > 1024 * 1024)
        ? "Some files are too large"
        : undefined,
    }),
  },
  render: (args) => <InteractiveExample {...args} />,
};
