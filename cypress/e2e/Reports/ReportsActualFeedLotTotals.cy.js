const { describe } = require("mocha");
import 'cypress-xpath';
import 'cypress-real-events/support';


Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
        return false;
    }
});
Cypress.on('uncaught:exception', (err, runnable) => {
    // if the error is about _view being undefined, ignore it
    if (err.message.includes('_view is not defined')) {
      return false; // prevents Cypress from failing the test
    }
  });
  

describe("Reports Module", () => {
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


    it("Report > Actual Feed > Lot Total ", () => {
        cy.Login();
        cy.dbsetup();
        cy.wait(2000)
        // Hover over "Reports"
        cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

        // Hover over "Animal Health"
        cy.get('#Item_JHS214').trigger('mouseover');

        // Select the second one
        cy.get('#Item_JHS231').click();

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03 > .ui-datepicker-trigger').click()
        cy.get(':nth-child(2) > :nth-child(5) > .ui-state-default').click()

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05 > .ui-datepicker-trigger').click()
        cy.get(':nth-child(3) > :nth-child(5) > .ui-state-default').click()
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()
        cy.wait(10000)

        cy.contains('H101720').should('be.visible') 
        cy.contains('136').should('be.visible')

        cy.get('#Item_JHS16').click()
        cy.get('#Item_JHS18').click()
        cy.wait(5000)
        cy.get('.ui-button').click().type('H101720'); // Open the dropdown
        cy.get('.ui-menu-item').contains('H101720').click(); // Select 'ANH1'
    
    
        cy.wait(2000)
        cy.get('#txtHeadCount')
          .should('be.visible')
          .should('not.have.value', '') // ensure it's populated
          .invoke('val')
          .then((HeadCount) => {
            cy.log('HeadCount Value:', HeadCount);
            expect(HeadCount).to.include('136');
          });


    })
})

