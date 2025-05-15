const { describe } = require("mocha");
import 'cypress-xpath';
import 'cypress-real-events/support';

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe("Reports Module", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.reload();
  });

  it("Report > Animal Health > Diagnosis", () => {
    cy.Login();
    cy.dbsetup();
  
    // Hover over "Reports"
    cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

    // Hover over "Animal Health"
    cy.get('#Item_JHS177').trigger('mouseover');

    cy.get('#Item_JHS180').click();
    cy.wait(2000)

 
    cy.contains('Bloat').should('be.visible')
    cy.contains('BL').should('be.visible')


 
    // Navigate to Dead Reasons Report
  cy.get('#Item_JHS48').trigger('mouseover').click();
  cy.get('#Item_JHS92').trigger('mouseover');
  cy.get('#Item_JHS94').click();
  cy.wait(2000);

  // Extract and compare values
  cy.get('#JHS5 > [aria-describedby="deadReasonGridView_Description"]')
    .invoke('text')
    .then((description) => {
      expect(description.trim()).to.equal('Bloat');
    });

  cy.get('#JHS5 > [aria-describedby="deadReasonGridView_ShortName"]')
    .invoke('text')
    .then((shortName) => {
      expect(shortName.trim()).to.equal('BL');
    });
});
})

