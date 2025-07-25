# cypress/e2e/search/search.feature

Scenario: Búsqueda de Palabras en Google
  Como usuario de Google,
  Quiero buscar diferentes palabras clave,
  Para verificar que los resultados se muestren correctamente.

  Esquema del Escenario: Buscar "{palabra}" en Google
    Given que estoy en la página de inicio de Google
    When busco "{palabra}"
    Then la barra de búsqueda debería mostrar "{palabra}"
    And los resultados de la búsqueda para "{palabra}" deberían aparecer

    Examples:
      | palabra              |
      | Cypress              |
      | BDD con Cucumber     |
      | Automatización de pruebas |
      | Gemini AI            |