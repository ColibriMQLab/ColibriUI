import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TextArea } from "..";

describe("<TextArea />", () => {
  it("disables the native textarea, not only its look", () => {
    render(<TextArea disabled label="Bio" />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
