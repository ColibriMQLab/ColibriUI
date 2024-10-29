import React from "react";
import Select from ".";

describe("<Select />", () => {
  const options = Array(5)
    .fill(null)
    .map((_, i) => ({
      label: `options ${i}`,
      value: i,
    }));

  it("renders", () => {
    const onChange = cy.stub();
    cy.mount(
      <Select value={2} label="hint" options={options} onChange={onChange} />,
    ).get("div");
  });

  it("onChange", () => {
    const onChange = cy.stub();
    const select = cy
      .mount(<Select value={2} options={options} onChange={onChange} />)
      .get("div");

    select.get("div").first().click();
    select
      .get("[data-popper-reference-hidden=false]")
      .find("li")
      .first()
      .click()
      .then(() => {
        expect(onChange).to.be.called;
      });
  });
});
