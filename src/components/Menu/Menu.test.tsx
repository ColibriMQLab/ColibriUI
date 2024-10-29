import React from "react";
import MenuItem from "./components/MenuItem";
import Menu from ".";

describe("<Menu />", () => {
  it("renders", () => {
    cy.mount(
      <Menu>
        <MenuItem key="1">Test 1</MenuItem>
        <MenuItem key="2">Test 2</MenuItem>
        <MenuItem key="3">Test 3</MenuItem>
      </Menu>,
    );
  });

  it("has the correct items value", () => {
    const menu = cy
      .mount(
        <Menu>
          <MenuItem key="1">Test 1</MenuItem>
          <MenuItem key="2">Test 2</MenuItem>
          <MenuItem key="3">Test 3</MenuItem>
        </Menu>,
      )
      .get("ul");
    menu.get("ul>li").eq(0).should("contain.text", "Test 1");
    menu.get("ul>li").eq(1).should("contain.text", "Test 2");
  });

  it("has the correct sected item background", () => {
    const menu = cy
      .mount(
        <Menu selected={["2"]}>
          <MenuItem key="1">Test 1</MenuItem>
          <MenuItem key="2">Test 2</MenuItem>
          <MenuItem key="3">Test 3</MenuItem>
        </Menu>,
      )
      .get("ul");
    menu
      .get("ul>li")
      .eq(1)
      .should("have.css", "background-color", "rgb(184, 210, 255)");
  });
});
