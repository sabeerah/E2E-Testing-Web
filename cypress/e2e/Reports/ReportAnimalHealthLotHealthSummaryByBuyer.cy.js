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


  it("Report > Animal Health > Lot Health Summary > By Buyer", () => {
    cy.Login();
    cy.dbsetup();

    // Hover over "Reports"
    cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

    // Hover over "Animal Health"
    cy.get('#Item_JHS177').trigger('mouseover');

    cy.get('#Item_JHS296').trigger('mouseover')

    cy.get('#Item_JHS300').invoke('show').should('be.visible');
    cy.get('#Item_JHS300').click();
    cy.wait(6000)
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_rbTrue').click()
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()

    cy.contains('H101475').should('be.visible')


    // Hover over "Reports"
    cy.get('#Item_JHS4').click();

    // Hover over "Animal Health"
    cy.get('#Item_JHS7').click();

    cy.get('#cattleBuyChkAll').click()
    cy.get('#ddlSearchCriteria').select(1)
    cy.wait(2000)
    cy.get('#txtSearch').type('H101475')
    cy.get('#btnSearch').click()
    cy.wait(2000)
    cy.get('[aria-describedby="productGridView_CATL_BUY_NBR"]').click()
    cy.wait(2000)
    cy.get('#txtBuyNo')
      .invoke('val') // Use 'val' for input fields, 'text' for regular elements
      .then((buyNoValue) => {
        cy.log('Buy Number:', buyNoValue);
        expect(buyNoValue).to.eq('H101475');
      });







  })
})

