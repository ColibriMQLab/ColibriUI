import React, { useState } from "react";
import Modal from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

const TITLE = "Title of modal";

export const Default = ({ args }: Story) => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Modal {...args} onClose={onClose} title={TITLE}>
          content
        </Modal>
      )}
    </>
  );
};



export const WithoutTitle = ({ args }: Story) => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Modal {...args} onClose={onClose}>
          content
        </Modal>
      )}
    </>
  );
};