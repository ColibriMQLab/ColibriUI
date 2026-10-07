import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { readFileSync } from "fs";
import { join } from "path";
import { Typography } from "..";
import { BREAKPOINTS } from "../../Theme";

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

  it("sets one size class for a plain size", () => {
    render(<Typography size="m">Text</Typography>);

    expect(screen.getByText("Text")).toHaveClass("size_m");
  });

  it("sets a class per breakpoint for a responsive size", () => {
    render(
      <Typography size={{ base: "xs", sm: "m", lg: "h4" }}>Text</Typography>,
    );

    const text = screen.getByText("Text");
    expect(text).toHaveClass("size_xs", "size_sm_m", "size_lg_h4");
    expect(text).not.toHaveClass("size_m");
  });

  it("skips a breakpoint without a size", () => {
    render(<Typography size={{ base: "s", md: undefined }}>Text</Typography>);

    expect(screen.getByText("Text").className).toBe("size_s");
  });

  it("generates the breakpoint sizes for every breakpoint at its width", () => {
    const scss = readFileSync(
      join(__dirname, "../Typography.module.scss"),
      "utf8",
    );
    const generated = Object.fromEntries(
      Array.from(
        scss.matchAll(
          /@media \(width >= ([\d.]+rem)\) \{\s*\.size \{\s*@include sizes\("([\w]+)_"\);/g,
        ),
        ([, width, breakpoint]) => [breakpoint, width],
      ),
    );

    expect(generated).toEqual(BREAKPOINTS);
  });

  it("has no axe violations", async () => {
    const { container } = render(<Typography lines={2}>Long text</Typography>);

    expect(await axe(container)).toHaveNoViolations();
  });
});
