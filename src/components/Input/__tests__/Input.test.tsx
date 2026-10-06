import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import userEvent from "@testing-library/user-event";
import { Input } from "..";

describe("<Input />", () => {
  it("disables the native input, not only its look", () => {
    render(<Input disabled label="Email" value="owner@test.dev" readOnly />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("cannot be reached or edited from the keyboard when disabled", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<Input disabled label="Email" onChange={onChange} />);
    await user.tab();
    await user.keyboard("text");

    expect(screen.getByRole("textbox")).not.toHaveFocus();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("stays editable when not disabled", () => {
    render(<Input label="Email" />);

    expect(screen.getByRole("textbox")).toBeEnabled();
  });

  it("has no axe violations", async () => {
    const { container } = render(<Input label="Email" />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it("exposes required, error and hint to assistive technology", () => {
    render(<Input label="Email" required hasError hint="Invalid email" />);

    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toBeRequired();
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription("Invalid email");
  });
});
