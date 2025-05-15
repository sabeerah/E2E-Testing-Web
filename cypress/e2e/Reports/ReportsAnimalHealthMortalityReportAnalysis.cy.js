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

  it("Report > Animal Health > Mortality Reports > Analysis", () => {
    cy.Login();
    cy.dbsetup();
  
    // Hover over "Reports"
    cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

    // Hover over "Animal Health"
    cy.get('#Item_JHS177').trigger('mouseover');

    // Select the second one
    cy.get('#Item_JHS192').trigger('mouseover');

    cy.xpath('//*[@id="Item_JHS321"]').click()
    
    // // Click on Analysis1` 
    // cy.get('#Item_JHS321')
    //   .should('be.visible')
    //   .click();
  
    // Assert you're on the right report page
    cy.url().should('include', 'RptMortalityAnalysis');
  });
  
})  