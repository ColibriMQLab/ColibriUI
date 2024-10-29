import React from "react";
import Menu from "../Menu";
import MenuItem from "../Menu/components/MenuItem";
import Dropdown from ".";

describe("<Dropdown />", () => {
  it("renders", () => {
    const overlay = () => (
      <Menu>
        <MenuItem>Test 1</MenuItem>
        <MenuItem>Test 2</MenuItem>
        <MenuItem>Test 3</MenuItem>
      </Menu>
    );
    cy.mount(<Dropdown overlay={overlay()}>Открыть</Dropdown>);
  });

  it("has the correct title", () => {
    const overlay = () => (
      <Menu>
        <MenuItem>Test 1</MenuItem>
        <MenuItem>Test 2</MenuItem>
        <MenuItem>Test 3</MenuItem>
      </Menu>
    );
    const dropdown = cy
      .mount(<Dropdown overlay={overlay()}>Открыть</Dropdown>)
      .get("button");
    dropdown.should("contains.text", "Открыть");
  });

  it("body is visible (trigger = click)", () => {
    const overlay = () => (
      <Menu>
        <MenuItem>Test 1</MenuItem>
        <MenuItem>Test 2</MenuItem>
        <MenuItem>Test 3</MenuItem>
      </Menu>
    );

    const dropdown = cy
      .mount(
        <Dropdown trigger={["click"]} overlay={overlay()}>
          Открыть
        </Dropdown>,
      )
      .get("button");
    dropdown.click();
    dropdown.get("[data-popper-reference-hidden=false]").should("be.visible");
  });

  it("body is visible (trigger = hover)", () => {
    const overlay = () => (
      <Menu>
        <MenuItem>Test 1</MenuItem>
        <MenuItem>Test 2</MenuItem>
        <MenuItem>Test 3</MenuItem>
      </Menu>
    );
    const dropdown = cy
      .mount(
        <Dropdown trigger={["hover"]} overlay={overlay()}>
          Открыть
        </Dropdown>,
      )
      .get("button");
    dropdown.trigger("mouseenter");
    dropdown.get("[data-popper-reference-hidden=false]").should("be.visible");
  });

  it("should has correct child", () => {
    const overlay = () => (
      <Menu>
        <MenuItem>Test 1</MenuItem>
        <MenuItem>Test 2</MenuItem>
        <MenuItem>Test 3</MenuItem>
      </Menu>
    );
    const dropdown = cy
      .mount(
        <Dropdown trigger={["hover"]} overlay={overlay()}>
          Открыть
        </Dropdown>,
      )
      .get("button");
    dropdown.trigger("mouseenter");
    dropdown
      .get("[data-popper-reference-hidden=false]")
      .find("li")
      .first()
      .then((node) => {
        expect(node.text()).to.equal("Test 1");
      });
  });
});
