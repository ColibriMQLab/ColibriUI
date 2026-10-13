import React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { MultiSelect } from "..";

const groups = [
  {
    value: "fruits",
    title: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "pear", label: "Pear" },
    ],
  },
];

describe("<MultiSelect />", () => {
  it("names the trigger by its label and value", () => {
    render(
      <MultiSelect
        label="Fruits"
        groups={groups}
        value={[{ group: "fruits", option: "apple" }]}
      />,
    );

    expect(screen.getByRole("button", { name: /Fruits/ })).toHaveAccessibleName(
      "Fruits Apple",
    );
  });

  it("describes the trigger with the error hint", () => {
    render(
      <MultiSelect
        label="Fruits"
        hint="Pick at least one"
        hasError
        groups={groups}
      />,
    );

    const trigger = screen.getByRole("button", { name: /Fruits/ });
    expect(trigger).toHaveAccessibleDescription("Pick at least one");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <MultiSelect label="Fruits" groups={groups} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
