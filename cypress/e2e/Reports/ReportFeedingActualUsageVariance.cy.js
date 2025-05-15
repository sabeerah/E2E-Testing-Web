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


    it("Report > Feeding > Actual Usage Variance", () => {
        cy.Login();
        cy.dbsetup();
        cy.wait(3000)
        // Hover over "Reports"
        cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

        cy.get('#Item_JHS324').trigger('mouseover')
        cy.get('#Item_JHS325').trigger('mouseover').click()
        cy.wait(6000)



        cy.get('.ui-datepicker-trigger').click({ force: true })
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get(':nth-child(3) > :nth-child(4) > .ui-state-default').click()
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()
        cy.wait(10000)


        cy.contains('Actual Ingredient Usage Report').should('be.visible')
        cy.contains('Corn').should('be.visible')

        cy.wait(5000)

        //feed status screen
        cy.get('#Item_JHS23').trigger('mouseover')
        cy.get('#Item_JHS26').click()

        cy.get('.ui-datepicker-trigger').click()
        cy.get('.ui-datepicker-prev').click()
        cy.get('.ui-datepicker-prev').click()
        cy.get(':nth-child(3) > :nth-child(4) > .ui-state-default').click()
        cy.get('#txtFeed').clear()
        cy.get('#btnRefresh').click()
        cy.wait(10000)

        cy.get('#btnLoadCommodities').click()
        cy.wait(3000)
        cy.get('#ddlLoadCommSearchCol').select(6)
        cy.get('#txtLoadCommSearch').type('Corn')
        cy.get('#btnLoadCommSearch').click()
        cy.wait(3000)

        cy.get('#\\31  > [aria-describedby="LoadCommoditiesGrid_CommodityDesc"]')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.equal('Corn');
            });










    })
})
