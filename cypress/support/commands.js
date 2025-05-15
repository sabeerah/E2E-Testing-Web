// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add('Login', () => {
    cy.visit("https://clientdemos.cattlexpert.com/Cattlexpert.UI/Login.aspx");
    
    // Click on username field and type 'sabeerah'
    cy.get('#txtUserName').click().type("sabeerah");
    
    // Click on password field and type 'sabeerah'
    cy.get('#txtPassword').click().type("sabeerah");
    
    // Click the login button
    cy.get('#btnLogin').click();
  })

  Cypress.Commands.add('dbsetup', () => {
  // Select 'jackson_beta' from the dropdown
  cy.get('#ddlFeedyardList').select("jheadstr-JKS4");

  //Select connect button 
  cy.get('#btnConnect').click();
  })