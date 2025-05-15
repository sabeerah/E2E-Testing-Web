const { describe } = require("mocha");
import 'cypress-xpath';


Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe("Reports Module", ()=>{
    beforeEach(() => {
      // Clear cookies, localStorage, and sessionStorage
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      // Reload the page to reset state
      cy.reload();
    });

    
    it("Report > Yardsheet > Standard Yardsheet", () => {
        cy.Login();
        cy.dbsetup();
      
        // Hover over "Reports"
        cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();
      
        // Hover over "Animal Health"
        cy.get('#Item_JHS210').trigger('mouseover');
      
        cy.get('#Item_JHS211').invoke('show').should('be.visible');
        cy.get('#Item_JHS211').click();
        cy.wait(6000)

        cy.get('.ui-datepicker-trigger').click()
        cy.get(':nth-child(2) > :nth-child(3) > .ui-state-default').click()

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()
        cy.wait(10000)
        
        cy.contains('BAL24-1').should('be.visible')
        cy.contains('197').should('be.visible')

        cy.get('#Item_JHS16').click()
        cy.get('#Item_JHS18').click()
        cy.wait(2000)

        cy.get('.ui-button').click().type('BAL24-1'); // Open the dropdown
        cy.get('.ui-menu-item').contains('BAL24-1').click(); // Select 'ANH1'


    cy.wait(2000)
    cy.get('#txtProratedHead')
      .should('be.visible')
      .should('not.have.value', '') // ensure it's populated
      .invoke('val')
      .then((proratedHeadValue) => {
        cy.log('Prorated Head Value:', proratedHeadValue);
        expect(proratedHeadValue).to.include('197');
      });
})
})

