import React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { TimeSelect } from "..";

describe("<TimeSelect />", () => {
  it("names the trigger by its label and value", () => {
    render(<TimeSelect label="End" value="10:00" onChange={jest.fn()} />);

    expect(screen.getByRole("button", { name: /End/ })).toHaveAccessibleName(
      "End 10:00",
    );
  });

  it("describes the trigger with the error hint", () => {
    render(
      <TimeSelect
        label="End"
        hint="End time is required"
        hasError
        onChange={jest.fn()}
      />,
    );

    const trigger = screen.getByRole("button", { name: /End/ });
    expect(trigger).toHaveAccessibleDescription("End time is required");
  });

  it("has no axe violations when empty", async () => {
    const { container } = render(
      <TimeSelect label="End" onChange={jest.fn()} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
