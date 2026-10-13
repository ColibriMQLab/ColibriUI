import React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import userEvent from "@testing-library/user-event";
import { Select } from "..";

describe("<Select />", () => {
  const options = Array(5)
    .fill(null)
    .map((_, i) => ({
      label: `options ${i}`,
      value: i,
    }));

  it("renders", () => {
    const onChange = jest.fn();
    render(
      <Select value={2} label="hint" options={options} onChange={onChange} />,
    );

    const selectLabel = screen.getByText(/hint/i);
    expect(selectLabel).toBeInTheDocument();
  });

  it("calls onChange when an option is selected", async () => {
    const onChange = jest.fn();
    render(<Select value={2} options={options} onChange={onChange} />);

    const selectButton = screen.getByTestId("base-input");
    await userEvent.click(selectButton);

    const firstOption = screen.getByText(/options 0/i);
    await userEvent.click(firstOption);

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("has no axe violations when open", async () => {
    const { baseElement } = render(
      <Select value={2} label="hint" options={options} onChange={jest.fn()} />,
    );

    await userEvent.click(screen.getByTestId("base-input"));

    expect(
      await axe(baseElement, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations();
  });

  describe("accessibility", () => {
    const timeOptions = [
      { label: "09:00", value: "09:00" },
      { label: "10:00", value: "10:00" },
    ];

    it("names the trigger by its label and value", () => {
      render(
        <Select
          label="Start"
          value="10:00"
          options={timeOptions}
          onChange={jest.fn()}
        />,
      );

      const trigger = screen.getByRole("button", { name: /Start/ });
      expect(trigger).toHaveAccessibleName("Start 10:00");
      expect(screen.getByLabelText(/Start/)).toBe(trigger);
    });

    it("uses aria-label when there is no visible label", () => {
      render(
        <Select
          aria-label="Start time"
          value="10:00"
          options={timeOptions}
          onChange={jest.fn()}
        />,
      );

      expect(screen.getByRole("button")).toHaveAccessibleName("Start time");
    });

    it("has no axe violations when closed and empty", async () => {
      const { container } = render(
        <Select
          label="Start"
          hint="Pick a time"
          options={timeOptions}
          onChange={jest.fn()}
        />,
      );

      expect(await axe(container)).toHaveNoViolations();
    });

    it("describes the trigger with the error hint", () => {
      render(
        <Select
          label="Start"
          hint="Time is required"
          hasError
          options={timeOptions}
          onChange={jest.fn()}
        />,
      );

      const trigger = screen.getByRole("button", { name: /Start/ });
      expect(trigger).toHaveAccessibleDescription("Time is required");
    });

    it("is not focusable and does not open when disabled", async () => {
      render(
        <Select
          label="Start"
          disabled
          value="10:00"
          options={timeOptions}
          onChange={jest.fn()}
        />,
      );

      const trigger = screen.getByRole("button", { name: /Start/ });
      expect(trigger).toHaveAttribute("aria-disabled", "true");
      expect(trigger).toHaveAttribute("tabindex", "-1");

      await userEvent.click(trigger);
      expect(screen.queryByText("09:00")).not.toBeInTheDocument();
    });

    it("opens with Enter and selects an option", async () => {
      const onChange = jest.fn();
      render(
        <Select
          label="Start"
          value="10:00"
          options={timeOptions}
          onChange={onChange}
        />,
      );

      screen.getByRole("button", { name: /Start/ }).focus();
      await userEvent.keyboard("{Enter}");
      await userEvent.click(screen.getByText("09:00"));

      expect(onChange).toHaveBeenCalledWith("09:00");
    });
  });
});
