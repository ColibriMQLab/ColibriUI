import React, { useState } from "react";
import Modal from ".";
import Button from "../Button";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  argTypes: {
    title: {
      control: "text",
    },
    className: {
      table: { disable: true },
    },
    onClose: {
      action: "close",
    },
  },
  args: {
    onClose: fn(),
    title: "Title of modal",
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

const ModalTemplate: Story["render"] = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
    args.onClose?.();
  };

  return (
    <>
      {!isOpen && (
        <Button type="button" onClick={() => setIsOpen(true)}>
          Open modal
        </Button>
      )}
      {isOpen && (
        <Modal {...args} onClose={onClose}>
          content
        </Modal>
      )}
    </>
  );
};

export const Default: Story = {
  render: ModalTemplate,
};

export const WithoutTitle: Story = {
  render: ModalTemplate,
  args: {
    title: undefined,
  },
};
