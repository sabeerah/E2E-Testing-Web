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


    it("Report > Guaranteed Price Setup > Commodity Credit By Lot", () => {
        cy.Login();
        cy.dbsetup();
        cy.wait(3000)
        // Hover over "Reports"
        cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

        cy.get('#Item_JHS201').trigger('mouseover')
        cy.get('#Item_JHS239').trigger('mouseover').click()
        cy.wait(6000)

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04_ddValue').select(1)
        cy.wait(4000)

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06_ddValue').select(2)
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl10_ddValue').select(2)

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl12 > .ui-datepicker-trigger').click()

        cy.get(':nth-child(1) > :nth-child(5) > .ui-state-default').click()
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl14 > .ui-datepicker-trigger').click()

        cy.get(':nth-child(2) > :nth-child(2) > .ui-state-default').click()
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()
        cy.wait(10000)

        cy.contains('TW Cattle Co. LLC').should('be.visible')
        cy.contains('Laramie Plains').should('be.visible')


        cy.get('#Item_JHS4').click()
        cy.get('#Item_JHS7').click()
        cy.wait(2000)
        cy.get('#JHS1726 > [aria-describedby="productGridView_CATL_CONT"]').click()
        cy.wait(2000)
        cy.get('#divCattleCharacteristics > .pd_5').click()

        // Check Buyer Dropdown
        cy.get('#ddlBuyer')
            .should('be.visible')
            .find('option:selected')
            .then((buyer) => {
                expect(buyer.text().trim()).to.equal('Tom Witt');
            });

        // Check Origin Dropdown
        cy.get('#ddlOrigin')
            .should('be.visible')
            .find('option:selected')
            .then((origin) => {
                expect(origin.text().trim()).to.equal('Laramie Plains');
            });

    })
})


