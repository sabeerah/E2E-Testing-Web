const { describe } = require("mocha");
import 'cypress-xpath';


Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
        return false;
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


    it("Report > Cattle Inventory Valuation > By Lot", () => {
        cy.Login();
        cy.dbsetup();
        cy.wait(3000)
        // Hover over "Reports"
        cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

        cy.get('#Item_JHS254').trigger('mouseover')
        cy.get('#Item_JHS259').trigger('mouseover').click()
        cy.wait(6000)

        cy.get('.ui-datepicker-trigger').click()
        cy.get(':nth-child(3) > :nth-child(5) > .ui-state-default').click()
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()
        cy.wait(10000)


        cy.contains('HCF24-2').should('be.visible')
        cy.contains('570').should('be.visible')

        cy.get('#Item_JHS16').click()
        cy.get('#Item_JHS18').click()
        cy.wait(2000)

        cy.get('.ui-button').click().type('HCF24-2'); // Open the dropdown
        cy.get('.ui-menu-item').contains('HCF24-2').click(); // Select 'ANH1'


        cy.wait(2000)
        cy.get('#txtAvgPayWt')
            .should('be.visible')
            .should('not.have.value', '') // ensure it's populated
            .invoke('val')
            .then((AvgPayWeight) => {
                cy.log('Average Pay Weight Value:', AvgPayWeight);
                expect(AvgPayWeight).to.include('570');
            });
    })
})
