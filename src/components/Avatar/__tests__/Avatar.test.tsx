import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Avatar } from "..";

describe("<Avatar />", () => {
  it("is a named image when not clickable", () => {
    render(<Avatar src="/alice.jpg" alt="Alice Smith" />);

    expect(screen.getByRole("img", { name: "Alice Smith" })).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it.each(["{Enter}", " "])(
    "is activated from the keyboard with %s when clickable",
    async (key) => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Avatar initials="AS" ariaLabel="Open profile" onClick={onClick} />);

      await user.tab();
      expect(screen.getByRole("button", { name: "Open profile" })).toHaveFocus();

      await user.keyboard(key);
      expect(onClick).toHaveBeenCalledTimes(1);
    },
  );

  it("has no axe violations", async () => {
    const { container } = render(
      <Avatar src="/alice.jpg" alt="Alice Smith" onClick={jest.fn()} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
