const { describe } = require("mocha");
import 'cypress-xpath';


Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe("Daily Jobs Module", ()=>{
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

    it("All Jobs module", () => {
      cy.Login();
      cy.dbsetup();
      
       cy.get('#fldset_Daily_Jobs > #lnkAllJobs').then(newTab => {
         const hrefTab = newTab.prop('href')
       cy.visit(hrefTab)})
       cy.get('#formcontainer > .curvetop > span[lang="en"]').should('be.visible')
       cy.get(':nth-child(1) > .ui-datepicker-trigger').click()
       cy.get(':nth-child(4) > :nth-child(3) > .ui-state-default').click()
       cy.get(':nth-child(2) > .ui-datepicker-trigger').click()
       cy.get('.ui-datepicker-today > .ui-state-default').click()
       cy.get('#btnDailyJobs').click()
       cy.get('#btnStart').click()
       cy.wait(100000)


  // **Wait for the alert message to confirm completion**
      cy.get('#popup_container').should('be.visible')
      cy.get('#popup_message') 
        .should('be.visible')
        .and('contain', 'Daily jobs have run successfully');

  // Click "OK" on alert popup
      cy.get('#popup_ok').click();
});


    it('Job Status', ()=>{
      const selectedDate = "02/20/2025";
      cy.Login()
      cy.dbsetup()
      cy.get('#fldset_Daily_Jobs > #lnkJobStatus').click()
      cy.wait(2000)
      cy.get('.ui-datepicker-trigger').click()
      cy.wait(2000)
      cy.get(':nth-child(4) > :nth-child(5) > .ui-state-default').click()
      cy.wait(2000)
      cy.get('#btnRetrieve').click()
      cy.wait(2000)
      cy.get('#JKS22401 > [aria-describedby="jobStatusGridView_RunDate"]')     
        .invoke('text')
      .then((actualText) => {
        const actualDate = actualText.trim().split(" ")[0]; // Get only the date part
        expect(actualDate).to.eq(selectedDate); // Compare extracted date
    })
});
});