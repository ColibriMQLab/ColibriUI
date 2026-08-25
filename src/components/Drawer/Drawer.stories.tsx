import React, { useRef, useState } from "react";

import Button from "../Button";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader } from "./Drawer";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

type DrawerStoryArgs = React.ComponentProps<typeof Drawer> & {
  headerActions?: React.ReactNode;
  headerClosePlacement?: React.ComponentProps<
    typeof DrawerHeader
  >["closePlacement"];
  headerHasClose?: boolean;
  headerTitle?: string;
  triggerLabel?: string;
};

const meta = {
  title: "UI/Drawer",
  component: Drawer,
  parameters: { layout: "centered" },
  argTypes: {
    opened: {
      table: { disable: true },
    },
    placement: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
    },
    width: {
      control: { type: "text" },
    },
    height: {
      control: { type: "text" },
    },
    offset: {
      control: { type: "object" },
    },
    zIndex: {
      control: { type: "number" },
    },
    asModal: {
      control: { type: "boolean" },
    },
    withBlur: {
      control: { type: "boolean" },
    },
    closeOnEsc: {
      control: { type: "boolean" },
    },
    closeOnOverlayClick: {
      control: { type: "boolean" },
    },
    borderRadius: {
      control: { type: "select" },
      options: ["none", "default"],
    },
    customBackgroundColor: {
      control: { type: "text" },
    },
    customContentBackgroundColor: {
      control: { type: "text" },
    },
    animationInfo: {
      control: { type: "object" },
    },
    initialFocusRef: {
      table: { disable: true },
    },
    focusAfterRef: {
      table: { disable: true },
    },
    portalContainer: {
      table: { disable: true },
    },
    onClose: {
      table: { disable: true },
    },
    onEscKeyDown: {
      table: { disable: true },
    },
    onOverlayClick: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
  },
  args: {
    opened: false,
    placement: "right",
    width: "min(calc(var(--space-32) * 4), 100vw)",
    height: "100dvh",
    offset: [0, 0],
    zIndex: 1000,
    asModal: true,
    withBlur: false,
    closeOnEsc: true,
    closeOnOverlayClick: true,
    borderRadius: "none",
  },
} satisfies Meta<DrawerStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoText = () => (
  <>
    {Array.from({ length: 16 }, (_, index) => (
      <p
        key={index}
        style={{
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-family-ui)",
          fontSize: "var(--font-size-text-sm)",
          lineHeight: "var(--line-height-text-sm)",
          marginBottom: "var(--space-3)",
        }}
      >
        Content row {index + 1}
      </p>
    ))}
  </>
);

const DrawerExample = ({
  headerActions,
  headerClosePlacement = "right",
  headerHasClose = true,
  headerTitle = "Settings",
  triggerLabel = "Open drawer",
  ...args
}: DrawerStoryArgs) => {
  const [opened, setOpened] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Button ref={triggerRef} type="button" onClick={() => setOpened(true)}>
        {triggerLabel}
      </Button>
      <Drawer
        {...args}
        opened={opened}
        aria-label={headerTitle}
        focusAfterRef={triggerRef}
        initialFocusRef={initialFocusRef}
        onClose={() => setOpened(false)}
      >
        <DrawerHeader
          actions={headerActions}
          closeAriaLabel="Close drawer"
          closePlacement={headerClosePlacement}
          hasClose={headerHasClose}
          onClose={() => setOpened(false)}
        >
          <h2
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-family-ui)",
              fontSize: "var(--font-size-heading-md)",
              fontWeight: "var(--font-weight-semibold)",
              lineHeight: "var(--line-height-heading-md)",
              margin: 0,
            }}
          >
            {headerTitle}
          </h2>
        </DrawerHeader>
        <DrawerContent>
          <DemoText />
        </DrawerContent>
        <DrawerFooter>
          <div
            style={{
              display: "flex",
              gap: "var(--space-2)",
              justifyContent: "flex-end",
              paddingTop: "var(--space-4)",
            }}
          >
            <Button
              ref={initialFocusRef}
              type="button"
              variant="outline"
              onClick={() => setOpened(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={() => setOpened(false)}>
              Done
            </Button>
          </div>
        </DrawerFooter>
      </Drawer>
    </>
  );
};

export const Default: Story = {
  render: (args) => <DrawerExample {...args} />,
};

export const Left: Story = {
  args: { placement: "left" },
  render: (args) => <DrawerExample {...args} />,
};

export const Top: Story = {
  args: {
    height: "calc(var(--space-32) * 2)",
    placement: "top",
    width: "100vw",
  },
  render: (args) => <DrawerExample {...args} />,
};

export const Bottom: Story = {
  args: {
    borderRadius: "default",
    height: "calc(var(--space-32) * 2)",
    placement: "bottom",
    width: "100vw",
  },
  render: (args) => <DrawerExample {...args} />,
};

export const WithBlur: Story = {
  args: { withBlur: true },
  render: (args) => <DrawerExample {...args} />,
};

export const NonModal: Story = {
  args: {
    asModal: false,
    closeOnEsc: false,
    closeOnOverlayClick: false,
    width: "calc(var(--space-32) * 3)",
  },
  render: (args) => (
    <DrawerExample {...args} triggerLabel="Open non-modal drawer" />
  ),
};

export const WithOffset: Story = {
  args: {
    borderRadius: "default",
    offset: ["calc(var(--space-4) * -1)", "var(--space-4)"],
    width: "calc(var(--space-32) * 3)",
  },
  render: (args) => <DrawerExample {...args} />,
};

export const CustomBackground: Story = {
  args: {
    borderRadius: "default",
    customBackgroundColor: "var(--color-bg-surface-subtle)",
    customContentBackgroundColor: "var(--color-bg-surface)",
  },
  render: (args) => <DrawerExample {...args} headerTitle="Custom background" />,
};

export const CustomAnimation: Story = {
  args: {
    animationInfo: {
      enter: "right-in 0.2s ease-out both",
      exit: "right-out 0.2s ease-in both",
    },
  },
  render: (args) => <DrawerExample {...args} headerTitle="Custom animation" />,
};

export const HeaderOptions: Story = {
  args: { borderRadius: "default" },
  render: (args) => (
    <DrawerExample
      {...args}
      headerActions={<Button variant="clear">Action</Button>}
      headerClosePlacement="left"
      headerTitle="Header options"
    />
  ),
};

export const WithoutHeaderClose: Story = {
  args: { borderRadius: "default" },
  render: (args) => (
    <DrawerExample
      {...args}
      headerHasClose={false}
      headerTitle="No header close"
      triggerLabel="Open drawer without header close"
    />
  ),
};
