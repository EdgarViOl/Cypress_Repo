import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the login page", () => {
  cy.visit("https://www.example.com/login"); // Cambia esto por tu URL de login real
});

When("I enter username {string} and password {string}", (username, password) => {
  cy.get("#username").type(username); // Asume un input con id="username"
  cy.get("#password").type(password); // Asume un input con id="password"
});

When("I click the login button", () => {
  cy.get("#loginButton").click(); // Asume un botón con id="loginButton"
});

Then("I should be logged in successfully", () => {
  cy.url().should("include", "/dashboard"); // Verifica que la URL cambia al dashboard
});

Then("I should see {string}", (welcomeMessage) => {
  cy.contains(welcomeMessage).should("be.visible"); // Verifica que el mensaje de bienvenida es visible
});