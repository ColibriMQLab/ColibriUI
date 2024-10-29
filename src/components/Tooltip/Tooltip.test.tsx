import Button from "../Button";
import Tooltip from "./index";

describe("<Tooltip />", () => {
  it("renders", () => {
    const content = () => (
      <span>
        Я Tooltip и у меня много много текста. Я Tooltip и у меня много много
        текста. Я Tooltip и у меня много много текста.
      </span>
    );
    cy.mount(
      <Tooltip content={content()}>
        <Button variant="primary">Кнопка</Button>
      </Tooltip>,
    );
  });

  it("body is visible (trigger = click)", () => {
    const content = () => (
      <span>
        Я Tooltip и у меня много много текста. Я Tooltip и у меня много много
        текста. Я Tooltip и у меня много много текста.
      </span>
    );

    const tooltip = cy
      .mount(
        <Tooltip content={content()}>
          <Button variant="primary">Кнопка</Button>
        </Tooltip>,
      )
      .get("button");
    tooltip.click();
    tooltip.get("[data-popper-reference-hidden=false]").should("be.visible");
  });

  it("body is visible (trigger = hover)", () => {
    const content = () => (
      <span>
        Я Tooltip и у меня много много текста. Я Tooltip и у меня много много
        текста. Я Tooltip и у меня много много текста.
      </span>
    );
    const tooltip = cy
      .mount(
        <Tooltip content={content()}>
          <Button variant="primary">Кнопка</Button>
        </Tooltip>,
      )
      .get("button");
    tooltip.trigger("mouseenter");
    tooltip.get("[data-popper-reference-hidden=false]").should("be.visible");
  });

  it("should has correct child", () => {
    const content = () => <span>Я Tooltip</span>;
    const tooltip = cy
      .mount(
        <Tooltip content={content()}>
          <Button variant="primary">Кнопка</Button>
        </Tooltip>,
      )
      .get("button");
    tooltip.trigger("mouseenter");
    tooltip
      .get("[data-popper-reference-hidden=false]")
      .find("span")
      .then((node) => {
        expect(node.text()).to.equal("Я Tooltip");
      });
  });
});
