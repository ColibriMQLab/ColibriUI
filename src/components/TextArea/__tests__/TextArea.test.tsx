import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { TextArea } from "..";

describe("<TextArea />", () => {
  it("disables the native textarea, not only its look", () => {
    render(<TextArea disabled label="Bio" />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("has no axe violations", async () => {
    const { container } = render(<TextArea label="Bio" />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it("exposes required, error and hint to assistive technology", () => {
    render(<TextArea label="Bio" required hasError hint="Too short" />);

    const textarea = screen.getByRole("textbox", { name: "Bio" });
    expect(textarea).toBeRequired();
    expect(textarea).toBeInvalid();
    expect(textarea).toHaveAccessibleDescription("Too short");
  });
});
