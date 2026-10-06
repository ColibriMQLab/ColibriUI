import React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "..";
import { Button } from "../../Button";

describe("<Tooltip />", () => {
  const content = (
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
  );

  it("renders", () => {
    render(
      <Tooltip content={content}>
        <Button variant="primary">Button</Button>
      </Tooltip>,
    );

    const button = screen.getByRole("button", { name: /button/i });
    expect(button).toBeInTheDocument();
  });

  it("body is visible (trigger = hover)", async () => {
    render(
      <Tooltip content={content}>
        <Button variant="primary">Button</Button>
      </Tooltip>,
    );

    const button = screen.getByRole("button", { name: /button/i });

    await userEvent.hover(button);

    const tooltip = await screen.findByText(
      /Lorem ipsum dolor sit amet, consectetur adipiscing elit/i,
    );
    expect(tooltip).toBeVisible();
  });

  it("should has correct child", async () => {
    render(
      <Tooltip content={<span>I am Tooltip</span>}>
        <Button variant="primary">Button</Button>
      </Tooltip>,
    );

    const button = screen.getByRole("button", { name: /button/i });

    await userEvent.hover(button);

    const tooltipText = await screen.findByText(/I am tooltip/i);
    expect(tooltipText).toBeVisible();
    expect(tooltipText).toHaveTextContent("I am Tooltip");
  });

  it("has no axe violations when visible", async () => {
    const { baseElement } = render(
      <Tooltip content={content}>
        <Button variant="primary">Button</Button>
      </Tooltip>,
    );

    await userEvent.hover(screen.getByRole("button", { name: /button/i }));
    await screen.findByText(/Lorem ipsum/i);

    expect(
      await axe(baseElement, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations();
  });
});
