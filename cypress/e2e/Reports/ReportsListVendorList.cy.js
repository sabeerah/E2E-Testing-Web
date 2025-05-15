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


    it("Report > List > Vendor List", () => {
        cy.Login();
        cy.dbsetup();
        cy.wait(3000)
        // Hover over "Reports"
        cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

        cy.get('#Item_JHS166').trigger('mouseover')
        cy.get('#Item_JHS176').trigger('mouseover').click()
        cy.wait(6000)

        cy.contains('Jackson Trucking LLC').should('be.visible')
        cy.contains('123').should('be.visible')

        cy.wait(2000)

        cy.get('#Item_JHS48').trigger('mouseover').click()
        cy.get('#Item_JHS125').trigger('mouseover')
        cy.get('#Item_JHS132').trigger('mouseover').click()
        cy.wait(6000)

        cy.get('#JHS268 > [aria-describedby="productGridView_PRFL_COMP_NAME"]').click()
        cy.wait(2000)

        cy.get('#txtPrcompanyName')
            .should('be.visible')
            .invoke('val')
            .then((companyName) => {
                expect(companyName.trim()).to.equal('Jackson Trucking LLC');
            });

        cy.get('#txtVendorNumber')
            .should('be.visible')
            .invoke('val')
            .then((vendorNumber) => {
                expect(vendorNumber.trim()).to.equal('123');
            });







    })
})
