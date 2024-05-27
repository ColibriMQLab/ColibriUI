describe('Button spec', () => {
  before(() => {
    // this will launch the page in cypress browser
    cy.visit("http://localhost:6006/?path=/story/ui-button--default");
  });

  it('Can click', () => {
    cy.get('[data-cy="button"]').click()
  })
})