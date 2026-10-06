import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Image } from "..";

describe("<Image />", () => {
  it.each(["{Enter}", " "])(
    "is activated from the keyboard with %s when clickable",
    async (key) => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Image src="/alice.jpg" alt="Open profile" onClick={onClick} />);

      await user.tab();
      await user.keyboard(key);

      expect(onClick).toHaveBeenCalledTimes(1);
    },
  );

  it("keeps keyboard activation with a consumer onKeyDown", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    const onKeyDown = jest.fn();
    render(
      <Image
        src="/alice.jpg"
        alt="Open profile"
        onClick={onClick}
        onKeyDown={onKeyDown}
      />,
    );

    await user.tab();
    await user.keyboard("{Enter}");

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("lets a consumer onKeyDown cancel activation", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Image
        src="/alice.jpg"
        alt="Open profile"
        onClick={onClick}
        onKeyDown={(event) => event.preventDefault()}
      />,
    );

    await user.tab();
    await user.keyboard("{Enter}");

    expect(onClick).not.toHaveBeenCalled();
  });

  it("is not focusable when not clickable", async () => {
    const user = userEvent.setup();
    render(<Image src="/alice.jpg" alt="Alice" />);

    await user.tab();

    expect(document.body).toHaveFocus();
  });

  it("has no axe violations when clickable", async () => {
    const { container } = render(
      <Image src="/alice.jpg" alt="Open profile" onClick={jest.fn()} />,
    );

    expect(await axe(container)).toHaveNoViolations();
    expect(
      screen.getByRole("button", { name: "Open profile" }),
    ).toBeInTheDocument();
  });
});
