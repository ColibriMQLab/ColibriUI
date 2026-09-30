import React, { useState } from "react";
import { Modal } from ".";
import { Button } from "../Button";
import { fn } from "storybook/test";
import type { CSSProperties } from "react";
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
    withinParent: {
      table: { disable: true },
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

const useModalState = (onCloseArg?: () => void) => {
  const [isOpen, setIsOpen] = useState(true);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => {
      setIsOpen(false);
      onCloseArg?.();
    },
  };
};

export const Compound: Story = {
  render: (args) => {
    const { isOpen, open, close } = useModalState(args.onClose);

    return (
      <>
        {!isOpen && <Button onClick={open}>Open modal</Button>}
        {isOpen && (
          <Modal onClose={close}>
            <Modal.Header>
              <Modal.Title>Compound modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {Array.from({ length: 30 }, (_, index) => (
                <p key={index}>Scrollable line {index + 1}</p>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={close}>
                Cancel
              </Button>
              <Button onClick={close}>Save</Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  },
};

const mapStyle: CSSProperties = {
  flex: 1,
  minHeight: "40rem",
  minWidth: "min(60rem, 100%)",
  background:
    "repeating-linear-gradient(45deg, #e8efe4 0 2rem, #dfe8f1 2rem 4rem)",
};

const surfaceStyle: CSSProperties = {
  background: "var(--component-modal-bg)",
  borderRadius: "var(--component-modal-radius)",
  boxShadow: "var(--shadow-raised)",
  padding: "var(--space-3) var(--space-4)",
};

export const OverlayHeader: Story = {
  render: (args) => {
    const { isOpen, open, close } = useModalState(args.onClose);

    return (
      <>
        {!isOpen && <Button onClick={open}>Open modal</Button>}
        {isOpen && (
          <Modal onClose={close}>
            <Modal.Header overlay>
              <div style={{ ...surfaceStyle, flex: 1 }}>
                <Modal.Title>London, UK</Modal.Title>
                <div>3 Oct - 4 Oct</div>
              </div>
              <Button variant="secondary">Filters</Button>
            </Modal.Header>
            <Modal.Body bleed>
              <div style={mapStyle} />
            </Modal.Body>
          </Modal>
        )}
      </>
    );
  },
};

export const NestedModal: Story = {
  render: (args) => {
    const { isOpen, open, close } = useModalState(args.onClose);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const closeFilters = () => setIsFiltersOpen(false);

    return (
      <>
        {!isOpen && <Button onClick={open}>Open modal</Button>}
        {isOpen && (
          <Modal onClose={close}>
            <Modal.Header overlay>
              <div style={{ ...surfaceStyle, flex: 1 }}>
                <Modal.Title>London, UK</Modal.Title>
                <div>3 Oct - 4 Oct</div>
              </div>
              <Button variant="secondary" onClick={() => setIsFiltersOpen(true)}>
                Filters
              </Button>
            </Modal.Header>
            <Modal.Body bleed>
              <div style={mapStyle} />
            </Modal.Body>
          </Modal>
        )}
        {isFiltersOpen && (
          <Modal onClose={closeFilters}>
            <Modal.Header>
              <Modal.Title>Filters</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {Array.from({ length: 12 }, (_, index) => (
                <p key={index}>Filter option {index + 1}</p>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeFilters}>
                Reset
              </Button>
              <Button onClick={closeFilters}>Apply</Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  },
};

export const NestedWithinParent: Story = {
  render: (args) => {
    const { isOpen, open, close } = useModalState(args.onClose);
    const [isInnerOpen, setIsInnerOpen] = useState(false);
    const closeInner = () => setIsInnerOpen(false);

    return (
      <>
        {!isOpen && <Button onClick={open}>Open modal</Button>}
        {isOpen && (
          <Modal onClose={close}>
            <Modal.Header>
              <Modal.Title>Large parent modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ width: "62.5rem", maxWidth: "100%" }}>
                <p>
                  The inner modal overlay covers only this window, not the
                  whole page.
                </p>
                <Button onClick={() => setIsInnerOpen(true)}>
                  Open inner modal
                </Button>
                {Array.from({ length: 20 }, (_, index) => (
                  <p key={index}>Parent content line {index + 1}</p>
                ))}
              </div>
            </Modal.Body>
            {isInnerOpen && (
              <Modal withinParent onClose={closeInner}>
                <Modal.Header>
                  <Modal.Title>Inner modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ width: "18.75rem", maxWidth: "100%" }}>
                    Closing this modal keeps the parent open.
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={closeInner}>OK</Button>
                </Modal.Footer>
              </Modal>
            )}
          </Modal>
        )}
      </>
    );
  },
};
