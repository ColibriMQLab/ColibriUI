import React, { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { Sheet } from "..";
import { Modal } from "../../Modal";

const pressEscape = () =>
  fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

const pressTab = () => fireEvent.keyDown(document, { key: "Tab", code: "Tab" });

type SheetInModalProps = {
  sheetModal?: boolean;
  onModalClose: () => void;
};

const SheetInModal = ({
  sheetModal = true,
  onModalClose,
}: SheetInModalProps) => {
  const [modalOpen, setModalOpen] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  if (!modalOpen) return null;

  return (
    <Modal
      onClose={() => {
        onModalClose();
        setModalOpen(false);
      }}
    >
      <button onClick={() => setSheetOpen(true)}>Open sheet</button>
      <Sheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        modal={sheetModal}
        lockBodyScroll={false}
        title="Sheet"
      >
        <button>Sheet first</button>
        <button>Sheet last</button>
      </Sheet>
    </Modal>
  );
};

const ModalOverSheet = ({ onSheetChange }: { onSheetChange: () => void }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Sheet open onOpenChange={onSheetChange} title="Sheet">
      <button onClick={() => setModalOpen(true)}>Open modal</button>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>Modal content</Modal>
      )}
    </Sheet>
  );
};

describe("Sheet in the modal stack", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
  });

  it("closes only the Sheet on Escape when it is opened inside a Modal", () => {
    const onModalClose = jest.fn();
    render(<SheetInModal onModalClose={onModalClose} />);
    fireEvent.click(screen.getByText("Open sheet"));
    expect(screen.getByText("Sheet first")).toBeInTheDocument();

    pressEscape();
    act(() => jest.runAllTimers());

    expect(onModalClose).not.toHaveBeenCalled();
    expect(screen.queryByText("Sheet first")).not.toBeInTheDocument();
    expect(screen.getByText("Open sheet")).toBeInTheDocument();

    pressEscape();
    expect(onModalClose).toHaveBeenCalledTimes(1);
  });

  it("keeps Tab inside the Sheet opened over a Modal", () => {
    render(<SheetInModal onModalClose={jest.fn()} />);
    fireEvent.click(screen.getByText("Open sheet"));

    screen.getByText("Sheet last").focus();
    pressTab();

    expect(document.activeElement).toBe(screen.getByText("Sheet first"));
  });

  it("closes only the Modal on Escape when it is opened over a Sheet", () => {
    const onSheetChange = jest.fn();
    render(<ModalOverSheet onSheetChange={onSheetChange} />);
    fireEvent.click(screen.getByText("Open modal"));
    expect(screen.getByText("Modal content")).toBeInTheDocument();

    pressEscape();

    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
    expect(onSheetChange).not.toHaveBeenCalled();

    pressEscape();
    expect(onSheetChange).toHaveBeenCalledWith(false, "escape");
  });

  it("lets the Modal handle Escape under a non-modal Sheet", () => {
    const onModalClose = jest.fn();
    render(<SheetInModal sheetModal={false} onModalClose={onModalClose} />);
    fireEvent.click(screen.getByText("Open sheet"));

    pressEscape();

    expect(onModalClose).toHaveBeenCalledTimes(1);
  });
});
