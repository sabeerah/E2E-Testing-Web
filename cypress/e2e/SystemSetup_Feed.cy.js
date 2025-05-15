const { describe } = require("mocha");
import 'cypress-xpath';
import 'cypress-real-events/support';


Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('$ is not defined') || err.message.includes('jquery_lang_js is not defined')) {
    return false;
  }
});

describe("System setup > Feed Module", ()=>{
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
//         //               BUNK READ CODES //
//   it("System Setup > Feed > Bunk Read Codes", ()=>{
//      cy.Login()
//      cy.dbsetup()
//      cy.get('[href="SystemSetupNavigator.aspx?menuName=System_Setup&PageName=Feed"]').click()
//     cy.wait(2000)
//      cy.get("#lnkBunkReadCodes").click({force:true})
//      cy.wait(1000)
//     cy.url().should("include", "BunkReadCodes.aspx");
//     cy.wait(1000)
//     cy.get('#lnkNewBunkReadCode > [lang="en"]').click()
//     cy.get('#txtCode').type(6)
//     cy.get('#txtDescription').type("Heavy Residual")
//     cy.get('#btnSave').click()

//     cy.xpath("//table/tbody/tr[2]").invoke('text').should('contain', '6');

//  })
//                            //COMODITY //
//  it("System Setup > Feed > Commodity", () =>{

//     cy.Login()
//     cy.dbsetup()
//     cy.get('[href="SystemSetupNavigator.aspx?menuName=System_Setup&PageName=Feed"]').click()
//     cy.wait(2000)
//     cy.get('section > #lnkCommodity').click({force:true});
//    cy.wait(1000)
//    cy.url().should("include", "Commodity.aspx");
//    cy.wait(1000)
//    cy.get('#lnkNewCommodity > [lang="en"]').click()
//    //generates the random number between 0 to 149 
//    const TestCommodity = `TestCommodity${Math.floor(Math.random() * 150)}`; 

// // Extract 6 characters
// // Generate a random start index between 0 and (length - 6) to extract 6 characters
// const randomStart = Math.max(0, TestCommodity.length - 6);
// const commodityName = TestCommodity.substring(randomStart);

// cy.get('#txtComodityDescription').type(TestCommodity);
// cy.get('#txtComodityName').type(commodityName);
// cy.get('#txtPoundsBushel').type(500);
// cy.get('#btnCommoditySave').click();

// // Wait for the dropdown to update (if necessary)
// cy.wait(1000);

// // Assert that the dropdown contains the newly added commodity
// cy.get('#ddlCommodity').should('contain', TestCommodity);
//  });



// // ----------------- COMMODITY COMPONENT -----------------
// it("System Setup > Feed > Commodity Component", () => {
//   cy.Login();
//   cy.dbsetup();
//   cy.get('[href="SystemSetupNavigator.aspx?menuName=System_Setup&PageName=Feed"]').click();
//   cy.wait(2000);
//   cy.get('section > #lnkCommodityComponentSetup').click({ force: true });
//   cy.wait(1000);
//   cy.url().should("include", "CommodityComponentSetup.aspx");
//   cy.wait(1000);
//   cy.get('#lnkNewCommodityComponent > [lang="en"]').click();

//   // Define TestCommodity and RandomShortName
//   const TestCommodity = `TestCOM${Math.floor(Math.random() * 150)}`;
//   const randomShortName = `tcom${Math.random().toString(36).substring(2, 8)}`;

//   cy.get("#txtCommodityComponentDesc").type(TestCommodity);
//   cy.get("#txtShortName").type(randomShortName);
//   cy.get("#ddlVariableDiscounted").select(1);
//   cy.get("#btnSave").click();

//   cy.get('#popup_container').should('be.visible');
//   cy.get('#popup_ok').click();

//   // Verify if the added commodity appears in the entire grid
//   cy.get('#gbox_productGridView').should('be.visible');
//   cy.wait(2000)

//   // Variable to track if TestCommodity was found
//   let foundCommodity = false;

//   // Iterate through the Description column
//   cy.get('td[aria-describedby="productGridView_Description"]').each(($cell) => {
//     cy.wrap($cell).invoke('text').then((text) => {
//       if (text.trim() === TestCommodity) {
//         foundCommodity = true;
//       }
//     });
//   }).then(() => {
//     // Validate if TestCommodity was found
//     expect(foundCommodity, `Commodity '${TestCommodity}' should be found in the table`).to.be.true;
//   });
// });


//                             //COMMODITY COST //
it("System Setup > Feed > Commodity Cost", () => {
  cy.Login();
  cy.dbsetup();
  cy.get('[href="SystemSetupNavigator.aspx?menuName=System_Setup&PageName=Feed"]').click();
  cy.wait(2000);
  cy.get("section > #lnkCommodityCost").click({ force: true });
  cy.wait(1000);
  cy.url().should("include", "CommodityCost.aspx");
  cy.wait(1000);
  cy.get('#lnkNewCommodityCost > [lang="en"]').click();
  cy.get("#ddlCommodity").select(3);
  cy.get("#txtCommodityCorporateCost").type(0.55);
  cy.get("#txtCommodityCost").type(0.66);
  cy.get("#btnSave").click();
  cy.wait(2000);
  cy.get("#gview_productCommodityCostGridView").should("be.visible");
  cy.wait(2000);

  const commodityName = "alfa1"; // Update with the actual name

  // Ensure the correct column header is present
  cy.get("#gbox_productCommodityCostGridView").first().should("contain.text", "Commodity");


  // Iterate through each row in the first column (Commodity) and check if 'alfa1' is present
  cy.get("#gbox_productCommodityCostGridView").each(($row) => {
    cy.wrap($row)
      .find("td")
      .first() // Target the first column (Commodity)
      .invoke("text")
      .then((text) => {
        if (text.trim() === commodityName) {
          cy.log(`Commodity '${commodityName}' found in the table`);

        }
      });
  }).then(() => {
    // Final assertion to ensure 'alfa1' is present in at least one row
    cy.get("#productCommodityCostGridView tbody tr td:first-child").should("contain.text", commodityName);
  });
});


//                    //COMODITY DISCOUNT  //
// //  it("System Setup > Feed >  Commodity Discount", () =>{



// //  });

//                 //COMMODITY DRY MATTER//
// it("System Setup > Feed > Commodity Dry Matter", () => {
//       cy.Login();
//       cy.dbsetup();
//       cy.get('[href="SystemSetupNavigator.aspx?menuName=System_Setup&PageName=Feed"]').click();
//       cy.wait(2000);
//       cy.get("section > #lnkCommodityDryMatter").click({ force: true });
//       cy.wait(1000);
//       cy.url().should("include", "CommodityDryMatter.aspx");
//       cy.wait(1000);
//       cy.get('#lnkNewCommodityDryMatter > [lang="en"]').click();
//       cy.get(".ui-button").click();
//       cy.contains(".ui-menu-item", "BlueLite Pellets").click();
//       cy.get("#txtPercentDM").type(85);
//       cy.get("#btnSave").click();
    
//       const DryMatterName = "BlueLite Pellets";
    
//       // Ensure the correct column header is present
//       cy.get("#gview_productCommodityDryMatterGridView")
//         .first()
//         .should("contain.text", "Commodity");

// // Final assertion to ensure "BlueLite Pellets" is present in at least one row
// cy.get("#productCommodityDryMatterGridView tbody tr td:first-child").should("contain.text",DryMatterName);
// });
      


// //   it("System Setup > Feed >  Default Ration Schedule", () => {
  


// //   });

// //   it("System Setup > Feed >  Discount Scale", () =>{



// //   });

// //   it("System Setup > Feed > Feed Call Weight Groups", ()=>{



// //   });


//    it("System Setup > Feed >  Feed Routes", ()=> {

//    cy.Login()
//    cy.dbsetup()
//    cy.get('[href="SystemSetupNavigator.aspx?menuName=System_Setup&PageName=Feed"]').click()
//    cy.wait(2000)
//    cy.get('section > #lnkFeedRoutes').click({force:true})  
//    cy.wait(1000)
//    cy.url().should("include", "FeedRoutes.aspx")
//    cy.wait(1000)
//    cy.get('#lnkNewFeedRoute > [lang="en"]').click()
//    //NEED TO CHANGE THE NAME AND DESCRIPTION AFTER EVERY RUN
//    cy.get('#txtDescription').type('Test4Routee')
//    cy.get('#txtShortName').type('Test4R')
//    cy.get('#ddlLocations').select('COR1');
//    cy.get('#jqg_productFeedRouteGridView_JKS1').click()
//    cy.get('#jqg_productFeedRouteGridView_JKS10').click()
//    cy.get('#jqg_productFeedRouteGridView_JKS101').click()
//    cy.get('#jqg_productFeedRouteGridView_JKS103').click()
//    cy.get('#jqg_productFeedRouteGridView_JKS105').click()
//    cy.get('#jqg_productFeedRouteGridView_JKS106').click()
//    cy.get('#jqg_productFeedRouteGridView_JKS107').click()
//    cy.wait(1000)
//    cy.get('#btnSelectActiveFeedRoute').click()
//    cy.get('#txtFeedTime1').type('10:00:00')
//    cy.get('#txtFeedTime2').type('16:00:00')
//    cy.get('#txtFeedTime3').type('22:00:00')
//    cy.get('#btnSave').click()

//   // Verify the new route is added to the grid
//   cy.wait(2000); // Wait for grid to refresh

//    cy.get('#gview_feedRouteGridView').should("be.visible");

//    cy.get("#feedRouteGridView .jqgrow").each(($row) => {
//     cy.wrap($row)
//       .find("td:first") // Select the first column, assuming it contains the Short Name
//       .invoke("text")
//       .then((text) => {
//         if (text.trim() === 'Test4R') {
//         }
//       });
//   });
//   // Wait for the grid to be available before asserting
//   cy.get("#feedRouteGridView").should("be.visible");

//   // Ensure at least one row contains 'Test4R'
//   cy.get("#feedRouteGridView td:first-child").should("contain.text", "Test4R");
//   });


// //   it("System Setup > Feed >  Feed Trucks ", () =>{



// //   });


  // it("System Setup > Feed >  FeedXpert ", () =>{

  // cy.Login()
  // cy.dbsetup()
  // cy.get('[href="SystemSetupNavigator.aspx?menuName=System_Setup&PageName=Feed"]').click()
  // cy.wait(2000)
  // cy.get('section > #lnkFeedXpertSetup').click({force:true})  
  // cy.wait(1000)
  // cy.url().should("include", "FeedXpertSetup.aspx")
  // cy.wait(1000)
  // cy.get('#rbSplitFeed').click()
  // cy.get('#rdByCommodity').click()
  // cy.get('#txtMaxNoFeedings').type(3)
  // cy.get('#txtFeed11').clear().type('100')
  // cy.get('#txtFeed12').clear().type('0')
  // cy.get('#txtFeed13').clear().type('0')
  // cy.get('#txtFeed21').clear().type('60')
  // cy.get('#txtFeed22').clear().type('40')
  // cy.get('#txtFeed23').clear().type('0')
  // cy.get('#txtFeed31').clear().type('30')
  // cy.get('#txtFeed32').clear().type('30')
  // cy.get('#txtFeed33').clear().type('40')
  // cy.wait(2000)
  // cy.get('#rbFDAVLBS').click()
  // cy.get('#txtFDAVPriorToFinal').clear().type('40')
  // cy.get('#txtFDAVFinal').clear().type('20')
  // cy.get('#txtFDAVMinAmount').clear().type('20')
  // cy.wait(2000)
  // cy.get('#btnFeedingSave').click()
  // cy.wait(2000)
  // cy.get('#popup_message > .SucessMsg').should('contain', 'Feeding Setup Details has been saved successfully.');
  // });


  // it("System Setup > Feed > Pen Ration Schedule", ()=>{
      
  // cy.Login()
  // cy.dbsetup()
  // cy.get('[href="SystemSetupNavigator.aspx?menuName=System_Setup&PageName=Feed"]').click()
  // cy.wait(2000)
  // cy.get('section > #lnkPenRationScheduleSetup').click({force:true})  
  // cy.wait(1000)
  // cy.url().should("include", "PenRationScheduleSetup.aspx")
  // cy.wait(1000)
  // cy.get('#lnkPenRationSchedule > [lang="en"]').click()
  // cy.get('#ddlPenNo').select(3)
  // cy.wait(2000)
  // cy.get('#rbPSStepRation').click()
  // cy.wait(2000)
  // cy.get('#btnAddRowPrimary').click()
  // cy.wait(2000)
  // cy.get('#txtNoOfFeedings').clear().type(2)
  // cy.get('.RationTypeId1').select(8)
  // cy.get('.RationTypeId2').select(8)
  // cy.wait(2000)
  // cy.get('#txtRationDays1').clear().type('7')
  // cy.wait(2000)
  // cy.get('#btnSave').click()

  // });

  // it("System Setup > Feed >  Ration Worksheet", () => {
  //   // Generate Randomized Description (Max 15 chars)
  //   const randomDescription = `sabeerahfin${Math.random().toString(36).substring(2, 8)}`;
  //   const randomShortName = randomDescription.substring(0, 6); // First 6 letters
  
  //   cy.Login();
  //   cy.dbsetup();
  //   cy.get('[href="SystemSetupNavigator.aspx?menuName=System_Setup&PageName=Feed"]').click();
  //   cy.wait(2000);
  //   cy.get('section > #lnkRationWorksheet').click({ force: true });
  //   cy.wait(1000);
  //   cy.url().should("include", "RationWorksheet.aspx");
  //   cy.wait(1000);
  //   cy.get('#lnkNewFeedTruck > [lang="en"]').click();
  
  //   // Fill form with randomized values
  //   cy.get('.custom-combobox').type(randomDescription);
  //   cy.get('#txtRationTypeShortName').type(randomShortName);
  //   cy.get('#ddlCategory').select(2);
  //   cy.get('#btnAddRations').click();
  //   cy.get("#\\31").select('JKS9-C')

  //   // Enter values for ration details
  //   cy.get('#txtSelectPercentage').clear().type('58.6');
  //   cy.get('#txtRationNeg').clear().type('33.6');
  //   cy.get('#txtRationNem').clear().type('55.6');
  // });

          
                 //TRUCK RATION CAPACITY //
//    it("System Setup > Feed >  Truck Ration Capacity", ()=>{

//   cy.Login()
//   cy.dbsetup()
//   cy.get('[href="SystemSetupNavigator.aspx?menuName=System_Setup&PageName=Feed"]').click()
//   cy.wait(2000)
//    cy.get('section > #lnkTruckRationCapacity').click({force:true});
//   cy.wait(1000)
//   cy.url().should("include", "TruckRationCapacity.aspx")
//   cy.wait(1000)
//   cy.get('#lnkNewTruckRationCapacity > [lang="en"]').click()

//   cy.get('#ddlTruckType').select(8).invoke('val').then((selectedTruck) => {
//     cy.get('#ddlRationType').select(4);
//     cy.get('#txtCapacity').clear().type(23000);
//     cy.get('#btnSave').click();

//   cy.get('#gview_productTruckRationCapacityGridView').should('be.visible')
  
//   // Iterate through each row's first column and check if any row has the selected truck type

//   cy.get('#productTruckRationCapacityGridView tbody tr').each(($row) => {
//     cy.wrap($row).find('td:first').invoke('text').then((text) => {
//       if (text.trim() === selectedTruck) {
//         cy.log(`Found the selected truck type: ${selectedTruck}`);
//         expect(text.trim()).to.equal(selectedTruck);
//       }
//     });
//   });
// });
//    });
 
                      //TRUCK TYPE//
//   it("System Setup > Feed >  Truck type", ()=>{
  
//  const randomDescription = `Truck${Math.random().toString(36).substring(2, 18)}`;
//   const randomShortName = `SN${Math.random().toString(36).substring(2, 8)}`;

//   cy.Login()
//   cy.dbsetup()
//   cy.get('[href="SystemSetupNavigator.aspx?menuName=System_Setup&PageName=Feed"]').click()
//   cy.wait(2000)
//   cy.get('section > #lnkTruckType').click({force:true}) 
//   cy.wait(1000)
//   cy.url().should("include", "TruckType.aspx")
//   cy.wait(1000)
//   cy.get('#lnkNewTruckTypeItem > [lang="en"]').click()
//   cy.wait(2000)
//   cy.get('#txtDescription').type(randomDescription)
//   cy.wait(1000)
//   cy.get('#txtShortName').type(randomShortName)
//   cy.wait(1000)
//   cy.get('#ddlBoxType').select(3)
//   cy.wait(1000)
//   cy.get('#txtFeedTruckMaxCapacity').type('12000')
//   cy.wait(1000)
//   cy.get('#btnTruckTypeSave').click()

//  cy.get('#popup_container').should('be.visible');
//   cy.get('#popup_ok').click()
// });
});
