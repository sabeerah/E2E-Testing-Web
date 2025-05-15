const { describe } = require("mocha");
import 'cypress-xpath';
import 'cypress-real-events/support';


Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
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


  it("Report > Health > Animal by Lot", () => {
    cy.Login();
    cy.dbsetup();

    // Hover over "Reports"
    cy.get('#Item_JHS44 > .level0parent').trigger('mouseover').click();

    // Hover over "Animal Health"
    cy.get('#Item_JHS177').trigger('mouseover');

    // Use visible text to differentiate the correct menu item
    cy.get('#Item_JHS195').contains('Treatment by Animal').click();

    cy.wait(6000)

    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl03_ddValue').select(6)
    cy.get('#ctl00_ctl00_ContentPlaceHolder_RightSectionPlaceHolder_ReportViewer1_ctl04_ctl00').click()
    cy.wait(10000)

    //checking if it contains GR30837BA20-5
    cy.contains('GR30837BA20-5').should('be.visible')
    cy.contains('12/23/2020').should('be.visible')


    cy.get('#Item_JHS31').click()
    cy.get('#Item_JHS33').click()
    cy.wait(2000)

    cy.get('#txtAnimal').type('GR30837BA20-5')
    cy.get('#txtAnimal').realPress('Tab');


    cy.get('#txtCreatedOn')
      .should('be.visible')
      .should('not.have.value', '') // ensure it's populated
      .invoke('val')
      .then((DateValue) => {
        cy.log('DateValue', DateValue);
        expect(DateValue).to.include('12/23/2020');
      });



  })
})

