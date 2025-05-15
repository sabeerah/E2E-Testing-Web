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
    cy.get('#Item_JHS294').trigger('mouseover').click();
    cy.wait(2000)

    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_ddValue').select(1)
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()

    cy.wait(10000)

    cy.contains('HCF24-1').should('be.visible')
    cy.contains('Harris Feeding Company').should('be.visible')

    cy.get("#Item_JHS16").trigger('mouseover')
    
    cy.get('#Item_JHS18').trigger('mouseover').click()



    
    
  });
  
})  