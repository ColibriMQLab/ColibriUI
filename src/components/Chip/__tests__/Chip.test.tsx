import React from "react";
import { render, screen } from "@testing-library/react";
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
});
