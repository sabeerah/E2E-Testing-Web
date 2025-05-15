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


    it("Report > Commodity Scale Ticket Reports > By Vendor / By Contract", () => {
        cy.Login();
        cy.dbsetup();
        cy.wait(3000)
        // Hover over "Reports"
        cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

        cy.get('#Item_JHS267').trigger('mouseover')
        cy.get('#Item_JHS274').trigger('mouseover').click()
        cy.wait(6000)

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03 > .ui-datepicker-trigger').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get(':nth-child(4) > :nth-child(2) > .ui-state-default').click()


        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05 > .ui-datepicker-trigger').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get(':nth-child(4) > :nth-child(3) > .ui-state-default').click()
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl07_ddValue').select(1)
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl09_ddValue').select(1)
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl11_ddValue').select(1)
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl13_ddValue').select(3)
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()

        cy.wait(10000)

        cy.contains('KS21042025').should('be.visible')
        cy.contains('Corn').should('be.visible')
        cy.contains('Ernie Douglas').should('be.visible')


        cy.get('#Item_JHS10').trigger('mouseover').click();

        cy.get('#Item_JHS11').trigger('mouseover').click()
        cy.wait(6000)

        cy.get('#General > a > span').click()
        cy.wait(2000)
        cy.get('#JHS1 > [aria-describedby="contractGridView_ContractNo"]').click()

        cy.wait(5000)

        // Check Contract Number
        cy.get('#txtContractNum')
            .should('be.visible')
            .invoke('val')
            .then((contractNum) => {
                expect(contractNum.trim()).to.equal('KS21042025');
            });

        // Check Commodity Dropdown
        cy.get('#ddlCommodities')
            .should('be.visible')
            .find('option:selected')
            .then((Commodities) => {
                expect(Commodities.text().trim()).to.equal('Corn');
            });

        // Check Vendor Dropdown
        cy.get('#ddlVendor')
            .should('be.visible')
            .find('option:selected')
            .then((Vendor) => {
                expect(Vendor.text().trim()).to.equal('Ernie Douglas');
            });






    })
})
