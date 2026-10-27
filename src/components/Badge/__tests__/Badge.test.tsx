import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Cart } from "../../Icons/Cart";
import { Badge } from "..";

describe("<Badge />", () => {
  it("should render correctly", () => {
    const { container } = render(
      <Badge content={3}>
        <Cart />
      </Badge>,
    );
    expect(container).toMatchSnapshot();
  });

  it("has the correct number", () => {
    render(
      <Badge content={3}>
        <Cart />
      </Badge>,
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders zero when showZero is enabled", () => {
    render(
      <Badge content={0} showZero>
        <Cart />
      </Badge>,
    );

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Badge content={3}>
        <Cart />
      </Badge>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
