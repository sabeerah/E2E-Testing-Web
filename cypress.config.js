const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    defaultCommandTimeout: 10000,
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://clientdemos.cattlexpert.com/Cattlexpert.UI/login.aspx?ReturnUrl=%2fCattlexpert.UI%2fCxHome.aspx#lnkCxHome'
  },
});


// npx cypress run --browser chrome --headed
// npm run cypress:run:chrome
// jacksonbeta-JKS3
// jheadstr-JKS4