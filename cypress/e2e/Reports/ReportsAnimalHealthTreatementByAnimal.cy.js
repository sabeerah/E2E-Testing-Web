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


    it("Report > Animal Health > Treatment > By Animal", () => {
        cy.Login();
        cy.dbsetup();
        cy.wait(2000)
        // Hover over "Reports"
        cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

        // Hover over "Animal Health"
        cy.get('#Item_JHS177').trigger('mouseover');

        // Select the second one
        cy.get('#Item_JHS308').click();

        cy.wait(10000)
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_ddValue').select(9)
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()
        cy.wait(5000)

        cy.contains('ABC-01').should('be.visible')
        cy.wait(2000)
        cy.contains('SAW01').should('be.visible')

        cy.get('#Item_JHS31').trigger('mouseover')
        cy.get('#Item_JHS33').click()
        cy.wait(5000)
        cy.get('#txtAnimal').type('ABC-01')
        cy.get('#txtAnimal').realPress('Tab');
        cy.get('#txtGHomePen')
            .invoke('val')
            .then((penValue) => {
                expect(penValue).to.equal('KS01');
            });




    })
})
