const { describe } = require("mocha");
import 'cypress-xpath';


Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe("Feed Module", ()=>{
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
  it("FEED CALL", ()=> {
    cy.Login()
    cy.dbsetup()
    cy.get('#fldset_Feed > #lnkFeedCall').click()
    cy.wait(200)
    cy.url().should("include", "FeedCall.aspx");
    cy.wait(200)
    cy.get('#ddlBunkScore').select(3)
    cy.wait(200)
    cy.get('#ddlPenAction').select(2)
    cy.wait(200)
    cy.get('#btnPInc').click()
    cy.wait(200)
    cy.get('#btnNextPen').click()
 
});

it("CREATE FEED LOADS", () => {

    //Using custom command to login into the system
      cy.Login()
    //Using custom command here to setup the db 
      cy.dbsetup()
      cy.wait(2000)
    //Select the create loads link to redirect to the create loads screen
    cy.get('#fldset_Feed > #lnkCreateLoads').click();
    //Verify the page url
    cy.url().should("include", "CreateLoads.aspx");
    cy.wait(2000)

    //select the create loads dropdown & select load 1 
    cy.get('#ddlCreateLoads').select(1);
    //Click the create loads button
    cy.get('#btnCreateLds').click();
    cy.wait(2000)
    cy.get('#popup_container').should("be.visible");
    cy.wait(2000)
    cy.get('#popup_ok').click()
    

    //select the create loads dropdown & select load 2
    cy.get('#ddlCreateLoads').select(2);
    //Click the create loads button
    cy.get('#btnCreateLds').click();
    cy.wait(2000)
    cy.get('#popup_container').should("be.visible");
    cy.wait(2000)
    cy.get('#popup_ok').click()
    

    //select the create loads dropdown & select load 3
    cy.get('#ddlCreateLoads').select(3);
    //Click the create loads button
    cy.get('#btnCreateLds').click();
    cy.wait(2000)
    cy.get('#popup_container').should("be.visible");
    cy.wait(2000)
    cy.get('#popup_ok').click()
    
   });

   it("FEED STATUS PROCESS", () => {

    //Using custom command to login into the system
      cy.Login()
    //Using custom command here to setup the db 
      cy.dbsetup()
      cy.wait(2000)
      cy.get('#fldset_Feed > #lnkFeedStatus').click()
      cy.url().should("include", "FeedStatus.aspx");
      cy.wait(200)
      //Selecting the row from the grid
      cy.get('#0  > [aria-describedby="PenStatusGridView_CurrentHeadCount"]').click()
      cy.get('#btnFixFeed').click()
      cy.wait(2000)
      cy.get('.ui-dialog-titlebar').should('be.visible')
      cy.wait(2000)
      cy.get('#FixFeedCall')
      // Get the value from the disabled field
      .invoke('attr', 'value') 
      // wait for the value and store it in callValue
      .then((callValue) => {
        // Type into the Fed field
          cy.get('#FixFeedFed').clear().type(callValue); 
        });
      cy.get('#btnSave').click()
      
});

it("MANUAL FEED EDIT", () => {

    //Using custom command to login into the system
      cy.Login()
    //Using custom command here to setup the db 
      cy.dbsetup()
      cy.wait(2000)
      cy.get('#fldset_Feed > #lnkManualFeed').click()
      cy.wait(500)
      cy.url().should("include", "ManualFeed.aspx");
      cy.wait(2000)
      cy.get('.ui-datepicker-trigger').click()
      cy.wait(2000)
      cy.get(':nth-child(3) > :nth-child(1) > .ui-state-default').click()
      cy.wait(2000)
      cy.get('#ddlRouteNum').select(4)
      cy.wait(2000)
      cy.get('#btnRetrieve').click()
      cy.wait(4000)
      cy.get('#rdbShowAll').click()
      cy.wait(2000)
      cy.xpath('/html/body/form/section[1]/section[2]/section/section/article/div[1]/div/div[3]/div[3]/div/table/tbody/tr[3]/td[3]/select').select(8);
      cy.get('#txtFirstFeed1').clear().type('1720')
      cy.wait(2000)
      cy.get('#btnSave').click()
      cy.wait(200)
      cy.get('#popup_container').should("be.visible")
      cy.get('#popup_ok').click()
  });
});
