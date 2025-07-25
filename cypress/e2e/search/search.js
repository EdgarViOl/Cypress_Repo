// cypress/e2e/search/search.js

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que estoy en la página de inicio de Google", () => {
  cy.visit("https://www.google.com");
  // Opcional: Aceptar las cookies si aparecen, para evitar bloqueos
  cy.get('button#L2AGLb').click(); // Selector para el botón "Aceptar todo" de cookies en Google
});

When("busco {string}", (palabra) => {
  // Selector para la barra de búsqueda de Google (puede ser 'textarea[name="q"]' o 'input[name="q"]')
  cy.get('textarea[name="q"]').type(palabra + '{enter}'); // Escribe la palabra y presiona Enter
});

Then("la barra de búsqueda debería mostrar {string}", (palabra) => {
  // Verifica que el valor en la barra de búsqueda sea la palabra buscada
  cy.get('textarea[name="q"]').should('have.value', palabra);
});

Then("los resultados de la búsqueda para {string} deberían aparecer", (palabra) => {
  // Verifica que la URL contenga la palabra buscada
  cy.url().should('include', `/search?q=${encodeURIComponent(palabra)}`);
  // Opcional: Verificar que el título de la página contenga la palabra
  cy.title().should('include', palabra);
  // Opcional: Verificar que haya resultados visibles (ej. un elemento con ID 'search')
  cy.get('#search').should('be.visible');
});