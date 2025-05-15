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


  it("Report > Invoice > Invoice Statement", () => {
    cy.Login();
    cy.dbsetup();

    // Hover over "Reports"
    cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

    // Hover over "Animal Health"
    cy.get('#Item_JHS221').trigger('mouseover');

    // Ensure submenu is visible before clicking "Animals by Lot"
    cy.get('#Item_JHS316').filter(':visible').should('be.visible').click();

    cy.wait(6000)

    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03 > .ui-datepicker-trigger').click()
    cy.wait(2000)

    cy.get('.ui-datepicker-prev > .ui-icon').click()
    cy.wait(2000)

    cy.get(':nth-child(1) > [data-handler="selectDay"] > .ui-state-default').click()
    cy.wait(2000)

    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl05 > .ui-datepicker-trigger').click()
    cy.wait(2000)

    cy.get('.ui-datepicker-prev > .ui-icon').click()
    cy.wait(2000)

    cy.get(':nth-child(3) > :nth-child(7) > .ui-state-default').click()
    cy.wait(2000)

    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()

    cy.wait(5000)

    cy.contains('BL24-2').should('be.visible')
    cy.contains('365.0').should('be.visible')

    cy.get('#Item_JHS16').click()
    cy.get('#Item_JHS18').click()
    cy.wait(5000)
    cy.get('.ui-button').click().type('BL24-2'); // Open the dropdown
    cy.get('.ui-menu-item').contains('BL24-2').click(); // Select 'ANH1'


    cy.wait(2000)
    cy.get('#txtProratedHead')
      .should('be.visible')
      .should('not.have.value', '') // ensure it's populated
      .invoke('val')
      .then((proratedHeadValue) => {
        cy.log('Gender Value:', proratedHeadValue);
        expect(proratedHeadValue).to.include('365');
      });
  })
})


