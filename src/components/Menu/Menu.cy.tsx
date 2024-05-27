import React from "react";
import Menu from "./index";

describe("<Menu />", () => {
  it("renders", () => {
    cy.mount(
      <Menu>
        <Menu.Item key="1">Test 1</Menu.Item>
        <Menu.Item key="2">Test 2</Menu.Item>
        <Menu.Item key="3">Test 3</Menu.Item>
      </Menu>
    );
  });

  it("has the correct items value", () => {
    const menu = cy
      .mount(
        <Menu>
          <Menu.Item key="1">Test 1</Menu.Item>
          <Menu.Item key="2">Test 2</Menu.Item>
          <Menu.Item key="3">Test 3</Menu.Item>
        </Menu>
      )
      .get("ul");
    menu.get("ul>li").eq(0).should("contain.text", "Test 1");
    menu.get("ul>li").eq(1).should("contain.text", "Test 2");
  });

  it("has the correct sected item background", () => {
    const menu = cy
      .mount(
        <Menu selected={["2"]}>
          <Menu.Item key="1">Test 1</Menu.Item>
          <Menu.Item key="2">Test 2</Menu.Item>
          <Menu.Item key="3">Test 3</Menu.Item>
        </Menu>
      )
      .get("ul");
    menu
      .get("ul>li")
      .eq(1)
      .should("have.css", "background-color", "rgb(184, 210, 255)");
  });
});
