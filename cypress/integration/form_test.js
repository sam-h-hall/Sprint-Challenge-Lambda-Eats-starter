describe("Testing form inputs", function() {
  beforeEach(() => {
    cy.visit("http://localhost:3000/pizza");
  })
  it("ability to add text to inputs", function() {
    cy.get("[data-cy=name]")
      .type("Sam Hall")
      .should("have.value", "Sam Hall");
    
    cy.get("[type=checkbox]").check()
    // cy.get("#size")
    //   .select("medium")
    //   .should("have.value", "medium")

    // cy.get("[data-cy=instructions]")
    //   .type("more cheese")
    //   .should("have.value", "more cheese");
  })
})