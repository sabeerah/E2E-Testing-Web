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

    it("FeedYard", () => {
      cy.Login();
      cy.dbsetup();

      cy.get('#Item_COR1 > .level0parent').trigger('mouseover')
      cy.xpath('/html/body/form/section[1]/nav/ul/li[1]/ul/li[2]/a').click()
      cy.url().should("include","FeedYardMap.aspx");
      cy.get('#btn_owner').click()
      cy.wait(2000)
      cy.xpath("//*[@id='owner_options']").select('JKS1')
      cy.get('#selected_pens > .font18').should('have.text', 'Owner: Jackson Feedlot');

  });

    });
