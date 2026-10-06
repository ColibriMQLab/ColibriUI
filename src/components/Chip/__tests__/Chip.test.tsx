import React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Chip } from "..";

describe("<Chip />", () => {
  it("uses the primary variant by default", () => {
    render(<Chip>Chip</Chip>);

    expect(screen.getByTestId("chip").firstElementChild).toHaveClass(
      "inner_variant_primary",
    );
  });

  it("uses the selected variant class", () => {
    render(<Chip variant="alert">Chip</Chip>);

    expect(screen.getByTestId("chip").firstElementChild).toHaveClass(
      "inner_variant_alert",
    );
  });

  it("has no axe violations", async () => {
    const { container } = render(<Chip>Chip</Chip>);

    expect(await axe(container)).toHaveNoViolations();
  });
});
