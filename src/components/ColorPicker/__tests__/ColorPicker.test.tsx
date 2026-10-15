import React, { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Modal } from "../../Modal";
import { ColorPicker } from "..";
import type { ColorPickerProps } from "..";

const presets = [
  { value: "#D81B60", label: "Cherry blossom" },
  { value: "#0b8043", label: "Basil" },
  { value: "#fff", label: "White" },
];

const renderPicker = (props: Partial<ColorPickerProps> = {}) => {
  const onChange = jest.fn();
  render(<ColorPicker presets={presets} onChange={onChange} {...props} />);

  return {
    onChange,
    trigger: screen.getByRole("button", { name: "Choose color" }),
  };
};

const openCustom = (trigger: HTMLElement) => {
  fireEvent.click(trigger);
  fireEvent.click(screen.getByRole("menuitem", { name: "Add custom color" }));

  return screen.getByRole("dialog");
};

describe("<ColorPicker />", () => {
  it("opens the preset grid on trigger click and focuses the selected swatch", () => {
    const { trigger } = renderPicker({ value: "#0b8043" });

    fireEvent.click(trigger);

    const basil = screen.getByRole("menuitemradio", { name: "Basil" });
    expect(screen.getByRole("group", { name: "Colors" })).toBeInTheDocument();
    expect(basil).toHaveAttribute("aria-checked", "true");
    expect(basil).toHaveFocus();
    expect(
      screen.getByRole("menuitemradio", { name: "Cherry blossom" }),
    ).toHaveAttribute("aria-checked", "false");
  });

  it("matches the value against presets case-insensitively", () => {
    const { trigger } = renderPicker({ value: "#d81b60" });

    fireEvent.click(trigger);

    expect(
      screen.getByRole("menuitemradio", { name: "Cherry blossom" }),
    ).toHaveAttribute("aria-checked", "true");
  });

  it("calls onChange with a normalized color, closes and returns focus to the trigger", () => {
    const { onChange, trigger } = renderPicker();

    fireEvent.click(trigger);
    const swatch = screen.getByRole("menuitemradio", { name: "White" });
    swatch.focus();
    fireEvent.click(swatch);

    expect(onChange).toHaveBeenCalledWith("#ffffff");
    expect(
      screen.queryByRole("group", { name: "Colors" }),
    ).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("moves focus across the grid with arrow keys", () => {
    const { trigger } = renderPicker({ columns: 2 });

    fireEvent.click(trigger);
    const first = screen.getByRole("menuitemradio", { name: "Cherry blossom" });
    expect(first).toHaveFocus();

    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(screen.getByRole("menuitemradio", { name: "Basil" })).toHaveFocus();

    fireEvent.keyDown(document.activeElement as Element, { key: "ArrowDown" });
    expect(
      screen.getByRole("menuitem", { name: "Add custom color" }),
    ).toHaveFocus();

    fireEvent.keyDown(document.activeElement as Element, { key: "Home" });
    expect(first).toHaveFocus();

    fireEvent.keyDown(first, { key: "ArrowUp" });
    expect(first).toHaveFocus();
  });

  it("focuses the add button when there are no colors", () => {
    const { trigger } = renderPicker({
      presets: [{ value: "nope", label: "Invalid" }],
    });

    fireEvent.click(trigger);

    expect(
      screen.getByRole("menuitem", { name: "Add custom color" }),
    ).toHaveFocus();
  });

  const renderInModal = (after?: React.ReactNode) => {
    render(
      <Modal onClose={jest.fn()}>
        <Modal.Body>
          <ColorPicker presets={presets} onChange={jest.fn()} />
          {after}
        </Modal.Body>
      </Modal>,
    );
    const trigger = screen.getByRole("button", { name: "Choose color" });

    fireEvent.click(trigger);
    fireEvent.keyDown(
      screen.getByRole("menuitemradio", { name: "Cherry blossom" }),
      { key: "Tab" },
    );
    expect(
      screen.queryByRole("group", { name: "Colors" }),
    ).not.toBeInTheDocument();

    return trigger;
  };

  it("closes on Tab and continues from the trigger inside a parent modal", () => {
    // The browser then moves focus from the trigger to the next element.
    const trigger = renderInModal(<button type="button">After</button>);

    expect(trigger).toHaveFocus();
  });

  it("lets the parent modal wrap Tab when the trigger is its last item", () => {
    renderInModal();

    expect(screen.getByRole("button", { name: "Close modal" })).toHaveFocus();
  });

  it("shows a custom value as an extra selected swatch", () => {
    const { trigger } = renderPicker({ value: "#123456" });

    fireEvent.click(trigger);

    expect(
      screen.getByRole("menuitemradio", { name: "#123456" }),
    ).toHaveAttribute("aria-checked", "true");
  });

  it("opens the custom color dialog with the current color", () => {
    const { trigger } = renderPicker({ value: "#d81b60" });

    const dialog = openCustom(trigger);

    expect(dialog).toHaveAccessibleName("Choose custom color");
    expect(screen.getByLabelText("Hex")).toHaveValue("#d81b60");
    expect(
      screen.queryByRole("group", { name: "Colors" }),
    ).not.toBeInTheDocument();
  });

  it("saves a typed HEX color", () => {
    const { onChange, trigger } = renderPicker({ value: "#d81b60" });

    openCustom(trigger);
    const hex = screen.getByLabelText("Hex");
    fireEvent.focus(hex);
    fireEvent.change(hex, { target: { value: "#00FF00" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onChange).toHaveBeenCalledWith("#00ff00");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("applies a short HEX on blur and reverts invalid input", () => {
    const { trigger } = renderPicker({ value: "#d81b60" });

    openCustom(trigger);
    const hex = screen.getByLabelText("Hex");

    fireEvent.focus(hex);
    fireEvent.change(hex, { target: { value: "#abc" } });
    fireEvent.blur(hex);
    expect(hex).toHaveValue("#aabbcc");

    fireEvent.focus(hex);
    fireEvent.change(hex, { target: { value: "zzz" } });
    expect(hex).toHaveAttribute("aria-invalid", "true");
    fireEvent.blur(hex);
    expect(hex).toHaveValue("#aabbcc");
  });

  it("applies a short HEX on Enter and keeps focus in the field", () => {
    const { trigger } = renderPicker({ value: "#d81b60" });

    openCustom(trigger);
    const hex = screen.getByLabelText("Hex");
    hex.focus();
    fireEvent.change(hex, { target: { value: "#abc" } });
    fireEvent.keyDown(hex, { key: "Enter" });

    expect(hex).toHaveValue("#aabbcc");
    expect(hex).toHaveFocus();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("changes the color with the keyboard on the sliders", () => {
    const { onChange, trigger } = renderPicker({ value: "#ff0000" });

    openCustom(trigger);
    fireEvent.keyDown(screen.getByRole("slider", { name: "Hue" }), {
      key: "ArrowRight",
      shiftKey: true,
    });
    expect(screen.getByLabelText("Hex")).toHaveValue("#ff2a00");

    fireEvent.keyDown(
      screen.getByRole("slider", { name: "Saturation and brightness" }),
      { key: "ArrowDown", shiftKey: true },
    );
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onChange).toHaveBeenCalledWith("#e62600");
  });

  it("keeps the hue when brightness goes to zero", () => {
    const { trigger } = renderPicker({ value: "#0000ff" });

    openCustom(trigger);
    const hex = screen.getByLabelText("Hex");
    fireEvent.focus(hex);
    fireEvent.change(hex, { target: { value: "#000000" } });

    expect(screen.getByRole("slider", { name: "Hue" })).toHaveAttribute(
      "aria-valuenow",
      "240",
    );
  });

  it("discards the draft on Cancel", () => {
    const { onChange, trigger } = renderPicker({ value: "#d81b60" });

    openCustom(trigger);
    fireEvent.keyDown(screen.getByRole("slider", { name: "Hue" }), {
      key: "Home",
    });
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("picks a color with the eye dropper when supported", async () => {
    const open = jest.fn().mockResolvedValue({ sRGBHex: "rgb(1, 2, 3)" });
    Object.defineProperty(window, "EyeDropper", {
      configurable: true,
      value: jest.fn(() => ({ open })),
    });

    try {
      const { onChange, trigger } = renderPicker({ value: "#d81b60" });

      openCustom(trigger);
      await act(async () => {
        fireEvent.click(
          screen.getByRole("button", { name: "Pick a color from the screen" }),
        );
      });
      fireEvent.click(screen.getByRole("button", { name: "Save" }));

      expect(onChange).toHaveBeenCalledWith("#010203");
    } finally {
      delete (window as { EyeDropper?: unknown }).EyeDropper;
    }
  });

  it("hides the eye dropper when the browser does not support it", () => {
    const { trigger } = renderPicker();

    openCustom(trigger);

    expect(
      screen.queryByRole("button", { name: "Pick a color from the screen" }),
    ).not.toBeInTheDocument();
  });

  it("uses a custom trigger and labels", () => {
    const onChange = jest.fn();
    render(
      <ColorPicker
        presets={presets}
        onChange={onChange}
        labels={{ addCustom: "More colors", save: "Apply" }}
      >
        <button type="button">Options</button>
      </ColorPicker>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Options" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "More colors" }));
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));

    expect(onChange).toHaveBeenCalledWith("#d81b60");
  });

  it("does not open when disabled", () => {
    const { trigger } = renderPicker({ disabled: true });

    fireEvent.click(trigger);

    expect(
      screen.queryByRole("group", { name: "Colors" }),
    ).not.toBeInTheDocument();
  });

  it("works as a controlled component", () => {
    const Controlled = () => {
      const [color, setColor] = useState("#d81b60");

      return (
        <>
          <ColorPicker presets={presets} value={color} onChange={setColor} />
          <output>{color}</output>
        </>
      );
    };
    render(<Controlled />);

    fireEvent.click(screen.getByRole("button", { name: "Choose color" }));
    fireEvent.click(screen.getByRole("menuitemradio", { name: "Basil" }));

    expect(screen.getByRole("status")).toHaveTextContent("#0b8043");
  });

  it("has no axe violations in the dropdown and the dialog", async () => {
    const { trigger } = renderPicker({ value: "#d81b60" });

    fireEvent.click(trigger);
    expect(
      await axe(document.body, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations();

    fireEvent.click(screen.getByRole("menuitem", { name: "Add custom color" }));
    expect(
      await axe(document.body, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations();
  });
});
