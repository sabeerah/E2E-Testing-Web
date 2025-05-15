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

    it("Report > Cattle Recieved In Home Lots", () => {
        cy.Login();
        cy.dbsetup();

        // Hover over "Reports"
        cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

        // Hover over "Animal Health"
        cy.get('#Item_JHS254').trigger('mouseover');

        cy.get('#Item_JHS264').click();
        cy.wait(2000)

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03 > .ui-datepicker-trigger').click()
        cy.get(':nth-child(2) > :nth-child(4) > .ui-state-default').click()

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05 > .ui-datepicker-trigger').click()
        cy.get(':nth-child(4) > :nth-child(4) > .ui-state-default').click()

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()

        cy.wait(10000)

        cy.contains('WAS01').should('be.visible')
        cy.contains('J101725').should('be.visible')

        cy.get('#Item_JHS16').click()
        cy.get('#Item_JHS18').click()
        cy.wait(5000)
        cy.get('.ui-button').click().type('WAS01'); // Open the dropdown
        cy.get('.ui-menu-item').contains('WAS01').click(); // Select 'ANH1'


        cy.wait(2000)
        cy.get('#ddlBuyNumber > option')
            .should('be.visible')
            .should('not.have.value', '') // ensure it's populated
            .invoke('val')
            .then((BuyNumberValue) => {
                cy.log('Buy Number Value:', BuyNumberValue);
                expect(BuyNumberValue).to.include('J101725');
            });



    });
})

