Scenario: Búsqueda de Palabras en Google
  Como usuario de Google,
  Quiero buscar diferentes palabras clave,
  Para verificar que los resultados se muestren correctamente.

  Esquema del Escenario: Buscar "comida" en Google
    Given que estoy en la página de inicio de Google
    When busco "comida"
    Then la barra de búsqueda debería mostrar "comida"
    And los resultados de la búsqueda para "comida" deberían aparecer

  