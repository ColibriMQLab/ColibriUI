import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Typography } from "..";

describe("<Typography />", () => {
  it("clamps the text to the given number of lines", () => {
    render(<Typography lines={2}>Long text</Typography>);

    expect(
      screen
        .getByText("Long text")
        .style.getPropertyValue("--typography-lines"),
    ).toBe("2");
  });

  it("keeps the passed style next to the clamp", () => {
    render(
      <Typography lines={1} style={{ maxWidth: "10rem" }}>
        Long text
      </Typography>,
    );

    const text = screen.getByText("Long text");
    expect(text.style.getPropertyValue("--typography-lines")).toBe("1");
    expect(text).toHaveStyle({ maxWidth: "10rem" });
  });

  it("does not clamp without lines", () => {
    render(<Typography>Short text</Typography>);

    expect(
      screen
        .getByText("Short text")
        .style.getPropertyValue("--typography-lines"),
    ).toBe("");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Typography lines={2}>Long text</Typography>);

    expect(await axe(container)).toHaveNoViolations();
  });
});
