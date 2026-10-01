import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";

import { Button } from "../Button";
import { Input } from "../Input";
import { Sheet } from ".";
import type { SheetProps, SheetSnapPoint } from ".";

const SheetExample = (args: SheetProps) => {
  const [open, setOpen] = useState(args.open);
  useEffect(() => setOpen(args.open), [args.open]);
  const handleOpenChange: SheetProps["onOpenChange"] = (next, reason) => {
    setOpen(next);
    args.onOpenChange(next, reason);
  };
  return (
    <>
      <Button onClick={() => handleOpenChange(true)}>Open sheet</Button>
      <Sheet
        {...args}
        open={open}
        onOpenChange={handleOpenChange}
        footer={
          args.footer ?? (
            <Button onClick={() => handleOpenChange(false)}>Done</Button>
          )
        }
      />
    </>
  );
};

const meta = {
  title: "UI/Sheet",
  component: Sheet,
  parameters: { layout: "centered" },
  render: (args) => <SheetExample {...args} />,
  args: {
    open: false,
    onOpenChange: fn(),
    onSnapPointChange: fn(),
    title: "Settings",
    description: "Drag the handle to resize the sheet.",
    children: <Input label="Display name" placeholder="Enter your name" />,
  },
  argTypes: {
    open: { control: "boolean" },
    onOpenChange: { control: false },
    onSnapPointChange: { control: false },
    title: { control: "text" },
    description: { control: "text" },
    children: { control: false },
    header: { control: false },
    footer: { control: false },
    snapPoints: { control: "object" },
    snapPoint: { control: "text" },
    defaultSnapPoint: { control: "text" },
    modal: { control: "boolean" },
    blurOverlay: { control: "boolean" },
    closeOnOverlayClick: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
    draggable: { control: "boolean" },
    showHandle: { control: "boolean" },
    lockBodyScroll: { control: "boolean" },
    portalContainer: { control: false },
    initialFocusRef: { control: false },
    returnFocusRef: { control: false },
    zIndex: { control: "number" },
    className: { control: "text" },
    style: { control: "object" },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SnapPoints: Story = {
  args: { snapPoints: ["30dvh", "60dvh", "90dvh"], defaultSnapPoint: "60dvh" },
};

const ControlledExample = (args: SheetProps) => {
  const [point, setPoint] = useState<SheetSnapPoint>("60dvh");
  return (
    <SheetExample
      {...args}
      snapPoint={point}
      onSnapPointChange={(next) => {
        setPoint(next);
        args.onSnapPointChange?.(next);
      }}
      header={
        <Button
          variant="clear"
          onClick={() => setPoint(point === "90dvh" ? "30dvh" : "90dvh")}
        >
          Resize
        </Button>
      }
    >
      <p>Current snap point: {point}</p>
      <p>Drag the handle or use Resize to change the controlled height.</p>
    </SheetExample>
  );
};

export const ControlledSnapPoint: Story = {
  args: { snapPoints: ["30dvh", "60dvh", "90dvh"] },
  render: (args) => <ControlledExample {...args} />,
};
export const NonModal: Story = {
  args: { modal: false, title: "Non-modal sheet", snapPoints: ["30dvh"] },
};
export const BlurredOverlay: Story = { args: { blurOverlay: true } };
export const LongContent: Story = {
  args: {
    children: Array.from({ length: 30 }, (_, index) => (
      <p key={index}>Settings item {index + 1}</p>
    )),
  },
};
export const HeaderActions: Story = {
  args: {
    header: (
      <Button variant="clear" onClick={fn()}>
        Help
      </Button>
    ),
  },
};
export const WithoutHandle: Story = {
  args: {
    showHandle: false,
    draggable: false,
    description: "Use Done, Escape or the overlay to close.",
  },
};
export const ExplicitCloseOnly: Story = {
  args: {
    closeOnEscape: false,
    closeOnOverlayClick: false,
    draggable: false,
    description: "Use Done to close the sheet.",
  },
};
export const WithoutHeading: Story = {
  args: {
    title: undefined,
    description: undefined,
    "aria-label": "Settings sheet",
  },
};
