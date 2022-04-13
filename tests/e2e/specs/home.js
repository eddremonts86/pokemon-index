// https://docs.cypress.io/api/table-of-contents

describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.dataCyClick("close-aside-left-nav");
  });
  it("Visits the app root url", () => {
    cy.contains("h2", "Pokemon");
  });
  it("Has a filter container", () => {
    cy.contains("Filters");
    cy.dataCyClick("home-expansion-panels");
    cy.contains("Filter by name or ability");
    cy.contains("Pokemon per page");
    cy.contains("Sort by name");
    cy.contains("Sort by height");
    cy.contains("Sort by weight");
  });

  it("Has pokemon listed", () => {
    cy.contains("Know more!");
  });
  it("Visit a random pokemon", () => {
    cy.contains("Know more!").click();
    cy.contains("General Information");
  });
});
