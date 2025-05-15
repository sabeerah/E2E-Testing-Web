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


    it("Report > Lot > Shipped VS Pen Weight", () => {
        cy.Login();
        cy.dbsetup();
        cy.wait(5000)
        // Hover over "Reports"
        cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

        cy.get('#Item_JHS201').trigger('mouseover')
        cy.get('#Item_JHS244').trigger('mouseover').click()
        cy.wait(10000)

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl04 > .ui-datepicker-trigger').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get(':nth-child(1) > :nth-child(1) > .ui-state-default').click()

        cy.wait(2000)
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl06 > .ui-datepicker-trigger').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get('.ui-datepicker-prev > .ui-icon').click()
        cy.get(':nth-child(3) > :nth-child(4) > .ui-state-default').click()
        cy.wait(2000)
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()

        cy.wait(10000)
        cy.contains('DH24-1').should('be.visible')
        cy.contains('Steer').should('be.visible')


        cy.get('#Item_JHS16').click()
        cy.get('#Item_JHS18').click()
        cy.wait(2000)

        cy.get('.ui-button').click().type('DH24-1'); // Open the dropdown
        cy.get('#htmlCode > .w100.mb0 > .w100').click()
        cy.wait(2000)
        // Check Lot Number
        cy.get('#txtEditLotNumber')
            .should('be.visible')
            .invoke('val')
            .then((lotNumber) => {
                expect(lotNumber.trim()).to.equal('DH24-1');
            });

        // Check Gender Dropdown
        cy.get('#ddlGender')
            .should('be.visible')
            .find('option:selected') // for dropdowns
            .then((genderOption) => {
                expect(genderOption.text().trim().toLowerCase()).to.equal('steer');
            });




    })
})


