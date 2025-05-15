const { describe } = require("mocha");
import 'cypress-xpath';

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe("Commodity Module", ()=>{
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

  // it("Contract / Scale Ticket", ()=> {
  //   cy.Login()
  //   cy.dbsetup()
    
  //   cy.get('#fldset_Commodity > #lnkCommodityContract').click()
  //   cy.url().should('include', 'CommodityContract.aspx')
  //   cy.wait(2000)
  //   cy.get('#General > a').click()
  //   cy.wait(200)
  //  // Generate a unique contract number
  //  const contractNumber = `Testtt${Math.floor(Math.random() * 150)}`; 
  //  cy.get('#txtContractNum').type(contractNumber);
  //  cy.wrap(contractNumber).as('savedContractNumber'); // Store contractNumber as alias
  //  cy.get('#ddlContractStatus').select(1)
  //   cy.get('#ddlCommodities').select(13)
  //   cy.get('#txtQuantity').type('200000')
  //   cy.get('#ddlUom').select(11)
  //   cy.get('#txtPrice').type(0.553)
  //   cy.get('#ddlVendor').select(1)
  //   cy.get('#ddlCountry').select(5)
  //   cy.get('#ddlPayee').select(1)
  //   cy.get('#ddlDiscountscale').select(4)
  //   cy.get('#txtDownPymt').type(50000)
  //   cy.get('#btnContractUpdate').click()
  //   cy.get('#popup_container')
  //   cy.get('#popup_ok').click()
   
  //   cy.get('#tab_Weight').click()
  //   cy.wait(2000)
  //  // Retrieve stored contractNumber and select it in the dropdown
  //  cy.get('@savedContractNumber').then((contractNum) => {
  //   cy.get('#ddlSContractNumber').select(contractNum); // Select from dropdown
  // });
  //   const scaleTicket = Math.floor(Math.random() * 150).toString();
  //   cy.get('#txtScaleTicktNum').type(scaleTicket);
  //   cy.get('#ddlTempCommodities').select(1)
  //   cy.get('#txtGrossWt').type(10000)
  //   cy.get('#txtTareWt').type(0.00)
  //   cy.get('#txtPayWt').type(10000)
  //   cy.get('#btnRecalculate').click()
  //   cy.get('#btnScaleTicketSave').click()
  //   cy.get('#popup_ok').click()
    


  // });

   it("Scale Ticket Payment SubModule", () => {

     cy.Login()
     cy.dbsetup()
    cy.get('#fldset_Commodity > #lnkCommodityScaleTicketPayment').click()
     cy.url().should('include', 'CommodityScaleTicketPayment.aspx')
     cy.wait(2000)

    // Click the contract number and store its text
    cy.get('#JKS35 > [aria-describedby="CommodityContractGridView_ContractNo"]').click()
    cy.wait(2000)

 // Click the corresponding scale ticket and store its text (NEED TO CHANGE THIS AFTER EVERY RUN)
 cy.get('[aria-describedby="scaleticketGridView_TicketNumber"]')
.invoke('text')
.then((selectedScaleTicket) => {
  const scaleTicketNum = selectedScaleTicket.trim(); // Trim spaces

  // Click the scale ticket
  cy.get('[aria-describedby="scaleticketGridView_TicketNumber"]').click()
  cy.wait(500); // Small wait for UI update

   // Ensure the Scale Ticket Number field gets updated before asserting
   cy.get('#txtTicketNumber')
     .should('exist') // Ensure the input field exists
     .and('be.visible') // Ensure it's visible
     .and('not.have.value', '') // Ensure it has some value before checking specific value
     .and('have.value', scaleTicketNum);

  // // Continue with next steps
  // cy.get('#txtVendorDocumentNumber').type(12344);
  // cy.get('#btnUpdate').click();
  });

});
  });


