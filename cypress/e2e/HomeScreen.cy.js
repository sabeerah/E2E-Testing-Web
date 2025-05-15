const { describe } = require("mocha");
import 'cypress-xpath';


Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe("Dashboard Module", ()=>{
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

   it("Home Screen", ()=>{
        cy.Login()
        cy.dbsetup();

        cy.get('#Item_COR1 > .level0parent').trigger('mouseover')
        cy.xpath('/html/body/form/section[1]/nav/ul/li[1]/ul/li[3]').click()
        cy.url().should("include", "CxHome.aspx")
        cy.wait(2000)
        cy.xpath('/html/body/form/section[1]/div[1]/div/ul/li[2]').click({ force: true });
        cy.get('#opener').click()
        cy.get('#lstHotstars > [value="JKS2"]').click()
        cy.get('#imgForward').click()
        cy.get('#btnSubmit').click()
        cy.get('#gallery > li')
          .should('be.visible')

        cy.get('#lblTitle')
          .should('contain', 'FEED TASK 1')
   });
});