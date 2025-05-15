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
        // Clear cookies, localStorage, and sessionStorage
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.window().then((win) => {
            win.sessionStorage.clear();
        });
        // Reload the page to reset state
        cy.reload();
    });


    it("Report > Realizer", () => {
        cy.Login();
        cy.dbsetup();
        cy.wait(3000)
        // Hover over "Reports"
        cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();
        cy.get('#Item_JHS290').click()

        cy.wait(6000)

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03 > .ui-datepicker-trigger').click()
        cy.get(':nth-child(3) > :nth-child(3) > .ui-state-default').click()

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05 > .ui-datepicker-trigger').click()
        cy.get(':nth-child(3) > :nth-child(6) > .ui-state-default').click()
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl11_ddDropDownButton').click()
        cy.wait(2000)
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl11_divDropDown_ctl00').click()
        cy.wait(2000)

        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl13_ddValue').select(1)
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()
        cy.wait(5000)
        cy.contains('LT12-03').should('be.visible')
        cy.contains('500').should('be.visible')

        cy.get('#Item_JHS31').click()
        cy.get('#Item_JHS33').click()
        cy.wait(2000)

        cy.get('#txtAnimal').type('LT12-03')
        cy.get('#txtAnimal').realPress('Tab');


        cy.get('#txtGIndividualSetupWt')
            .should('be.visible')
            .should('not.have.value', '') // ensure it's populated
            .invoke('val')
            .then((Weight) => {
                cy.log('Weight', Weight);
                expect(Weight).to.include('500');
            });






    })
})
