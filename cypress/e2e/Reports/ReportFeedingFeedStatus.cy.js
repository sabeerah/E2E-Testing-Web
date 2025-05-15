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


    it("Report > Feeding > Feed Status", () => {
        cy.Login();
        cy.dbsetup();
        cy.wait(3000)
        // Hover over "Reports"
        cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

        cy.get('#Item_JHS324').trigger('mouseover')
        cy.get('#Item_JHS336').trigger('mouseover').click()
        cy.wait(6000)

        cy.get('.ui-datepicker-trigger').click()
        cy.get(':nth-child(3) > :nth-child(5) > .ui-state-default').click()
        cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()

        cy.wait(5000)

        cy.contains('0002').should('be.visible')
        cy.contains('1,580').should('be.visible')


        cy.get('#Item_JHS23').trigger('mouseover')
        cy.get('#Item_JHS26').click()

        cy.get('.ui-datepicker-trigger').click()
        cy.get(':nth-child(3) > :nth-child(5) > .ui-state-default').click()
        cy.get('#btnRefresh').click()
        cy.wait(5000)


        cy.get('#\\32 > [aria-describedby="PenStatusGridView_PenNumber"]')
            .invoke('text')
            .then((text) => {
                const extractedText = text.trim(); // remove extra spaces
                cy.log('Extracted Pen Number:', extractedText);
                expect(extractedText).to.eq('0002'); // replace with the expected value
            });


        cy.get('#\\32 > [aria-describedby="PenStatusGridView_TotalCall"]')
            .invoke('text')
            .then((text) => {
                const extractedTotalCall = text.trim(); // remove any spaces
                cy.log('Extracted Total Call:', extractedTotalCall);
                expect(extractedTotalCall).to.eq('1580'); // replace with your expected value
            });



    })
})
