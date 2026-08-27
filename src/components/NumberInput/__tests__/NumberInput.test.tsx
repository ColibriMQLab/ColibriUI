import React from "react";
import "@testing-library/jest-dom";
import { readFileSync } from "fs";
import { resolve } from "path";
import { render, screen } from "@testing-library/react";
import { NumberInput } from "../NumberInput";

describe("<NumberInput />", () => {
  it("uses a fluid field width inside narrow containers", () => {
    const { container } = render(
      <div style={{ width: "120px" }}>
        <NumberInput label="Amount" value="1000" onValueChange={jest.fn()} />
      </div>,
    );

    const input = screen.getByRole("textbox");
    const field = container.querySelector(".field");

    expect(input).toBeInTheDocument();
    expect(field).toBeInTheDocument();
  });

  it("does not lock the field to the old fixed width", () => {
    const styles = readFileSync(
      resolve(__dirname, "../NumberInput.module.scss"),
      "utf8",
    );

    expect(styles).toContain("width: 100%");
    expect(styles).toContain("max-width: 100%");
    expect(styles).toContain("min-width: 0");
    expect(styles).not.toContain("width: 20rem");
  });
});
