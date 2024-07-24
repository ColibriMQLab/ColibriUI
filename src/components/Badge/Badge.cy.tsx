import React from "react";
import Cart from "../Icons/Cart";
import Badge from "./";

describe("<Badge />", () => {
  it("renders", () => {
    cy.mount(
      <Badge content={3}>
        <Cart />
      </Badge>,
    );
  });

  it("has the correct number", () => {
    const badge = cy
      .mount(
        <Badge content={3}>
          <Cart />
        </Badge>,
      )
      .get("[data-cy=badge]");
    badge.should("contains.text", "3");
  });
});
