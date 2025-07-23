# Indice
-
-
-
# Startup
Manual de Configuración: Cypress + Cucumber + JavaScript + GitHub en macOS
Este manual te guiará a través de la configuración de un proyecto de automatización de pruebas con Cypress y Cucumber (para usar Gherkin en tus tests), y su integración con GitHub.

Requisitos Previos (Instalación de Herramientas Esenciales)
Antes de empezar, asegúrate de tener estas herramientas instaladas en tu MacBook:

Homebrew (Recomendado): Un gestor de paquetes para macOS que simplifica la instalación de software.

Abre tu aplicación Terminal (puedes buscarla en Spotlight con Cmd + Espacio y escribiendo "Terminal").

Pega y ejecuta el siguiente comando:

Bash

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
Sigue las instrucciones en la terminal (puede que te pida tu contraseña de usuario).

Node.js y npm (Con Homebrew): Son esenciales para ejecutar Cypress y gestionar sus dependencias.

En tu Terminal, ejecuta:

Bash

brew install node
Verifica la instalación:

Bash

node -v
npm -v
Deberías ver los números de versión de Node y npm.

Git (Con Homebrew): El sistema de control de versiones necesario para interactuar con GitHub.

En tu Terminal, ejecuta:

Bash

brew install git
Verifica la instalación:

Bash

git --version
Deberías ver el número de versión de Git.

Visual Studio Code (VS Code): Tu editor de código principal.

Descárgalo directamente desde el sitio oficial: https://code.visualstudio.com/download

Instálalo arrastrando la aplicación a tu carpeta de "Aplicaciones".

Configura el comando code en tu Terminal (muy útil):

Abre VS Code.

Presiona Cmd + Shift + P para abrir la Paleta de Comandos.

Escribe "Shell Command: Install 'code' command in PATH" y presiona Enter.

Paso 1: Crear y Configurar tu Proyecto Cypress Localmente
Vamos a crear una carpeta para tu proyecto y configuraremos Cypress junto con el preprocesador de Cucumber.

Crea la Carpeta del Proyecto:

Abre tu Terminal.

Navega a la ubicación donde quieres guardar tu proyecto (ej. Documents o Desktop).

Bash

cd ~/Documents/
Crea una nueva carpeta para tu proyecto y entra en ella:

Bash

mkdir cypress-bdd-project
cd cypress-bdd-project
Posibles Desafíos:

mkdir: cannot create directory ‘cypress-bdd-project’: File exists: La carpeta ya existe. Prueba con otro nombre o asegúrate de que no haya una carpeta con ese nombre.

cd: no such file or directory: cypress-bdd-project: No pudiste entrar porque la carpeta no se creó o el nombre es incorrecto. Verifica el paso mkdir.

Inicializa un Proyecto Node.js:

Esto creará un archivo package.json que gestionará las dependencias de tu proyecto.

Bash

npm init -y
Resultado esperado: Se creará el archivo package.json en tu carpeta cypress-bdd-project.

Posibles Desafíos:

npm: command not found: Node.js o npm no están instalados correctamente. Revisa el paso 2 de "Requisitos Previos".

Instala Cypress:

Instala Cypress como una dependencia de desarrollo.

Bash

npm install cypress --save-dev
Resultado esperado: Cypress se instalará y se añadirá a devDependencies en package.json. Se creará la carpeta node_modules.

Posibles Desafíos:

Errores de red: Verifica tu conexión a Internet.

Permisos: Si ves errores de permisos, puede que necesites sudo npm install cypress --save-dev, pero es raro y no recomendado a menos que sea estrictamente necesario.

Abre Cypress por Primera Vez:

Esto generará la estructura básica de carpetas de Cypress.

Bash

npx cypress open
Resultado esperado: Se abrirá la interfaz de usuario de Cypress. Sigue las instrucciones para configurar las pruebas E2E (End-to-End). Cypress creará automáticamente las carpetas cypress/ y el archivo cypress.config.js. Cuando se haya creado, puedes cerrar la UI de Cypress.

Posibles Desafíos:

Cypress no abre: Verifica que Cypress se instaló correctamente. Reinicia tu terminal o VS Code.

Instala el Preprocesador de Cucumber para Cypress:

Estos paquetes te permitirán escribir tus tests en formato Gherkin (.feature).

Bash

npm install @badeball/cypress-cucumber-preprocessor @bahmutov/cypress-esbuild-preprocessor --save-dev
Resultado esperado: Los paquetes se instalarán y se añadirán a devDependencies en package.json.

Configura Cypress para Usar Cucumber:

Abre tu proyecto en VS Code:

Bash

code .
Edita cypress.config.js:

Ubicación: cypress-bdd-project/cypress.config.js

Contenido: Reemplaza el contenido existente con esto. Este código le indica a Cypress que use el preprocesador de Cucumber y que busque tus archivos de prueba con la extensión .feature.

JavaScript

const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@bahmutov/cypress-esbuild-preprocessor").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature", // ¡IMPORTANTE! Indica a Cypress que busque archivos .feature
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
Edita package.json:

Ubicación: cypress-bdd-project/package.json

Contenido: Asegúrate de que tu package.json tenga la sección devDependencies con las dependencias instaladas y, opcionalmente, una sección cypress para configurar rutas si es necesario (aunque cypress.config.js ahora es el método preferido). Si usas la configuración del cypress.config.js anterior, esta sección cypress en el package.json puede no ser estrictamente necesaria, pero es buena idea revisarla.

JSON

{
  "name": "cypress-bdd-project",
  "version": "1.0.0",
  "description": "Proyecto de Cypress con Cucumber para BDD",
  "main": "index.js",
  "scripts": {
    "cypress:open": "cypress open"
  },
  "keywords": [
    "cypress",
    "cucumber",
    "bdd",
    "javascript",
    "testing"
  ],
  "author": "Tu Nombre",
  "license": "ISC",
  "devDependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^18.0.6",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.0",
    "cypress": "^13.6.3"
  }
}
Posibles Desafíos:

Errores de sintaxis en cypress.config.js o package.json: VS Code te los indicará. Revisa cuidadosamente los corchetes {} y las comas ,.

Cypress no encuentra los tests: Asegúrate de que specPattern: "**/*.feature" esté configurado correctamente en cypress.config.js.

Crea tus Archivos de Test (Gherkin y Step Definitions):

Crea la carpeta de tests: Dentro de tu carpeta cypress-bdd-project, si no existe, crea la carpeta cypress/e2e.

Crea el archivo .feature (Gherkin en español):

Ubicación: cypress-bdd-project/cypress/e2e/login.feature

Contenido:

Gherkin

# cypress/e2e/login.feature

Característica: Inicio de Sesión de Usuario
  Como un usuario, quiero iniciar sesión en la aplicación
  Para poder acceder a mi cuenta

  Escenario: Inicio de sesión exitoso con credenciales válidas
    Dado que estoy en la página de inicio de sesión
    Cuando ingreso el usuario "Admin" y la contraseña "admin123"
    Y hago clic en el botón de iniciar sesión
    Entonces debería haber iniciado sesión exitosamente
    Y debería ver "Dashboard" en el encabezado
Crea el archivo de Step Definitions (pasos en JavaScript):

Ubicación: cypress-bdd-project/cypress/e2e/login.js

Contenido: Usaremos el sitio de demostración de OrangeHRM para un ejemplo real.

JavaScript

// cypress/e2e/login.js

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que estoy en la página de inicio de sesión", () => {
  cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
});

When("ingreso el usuario {string} y la contraseña {string}", (username, password) => {
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
});

When("hago clic en el botón de iniciar sesión", () => {
  cy.get('button[type="submit"]').click();
});

Then("debería haber iniciado sesión exitosamente", () => {
  cy.url().should("include", "/web/index.php/dashboard/index");
});

Then("debería ver {string} en el encabezado", (headerText) => {
  cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', headerText);
});

// Puedes añadir más pasos para manejar errores o diferentes escenarios
// Ejemplo:
// Then("debería ver un mensaje de error {string}", (errorMessage) => {
//   cy.get('.oxd-alert-content-text').should('contain', errorMessage);
// });
Posibles Desafíos:

Errores de mapeo entre Gherkin y JavaScript: Asegúrate de que el texto de tus pasos en login.feature coincida exactamente con las expresiones regulares o strings en login.js. Por ejemplo, "ingreso el usuario {string} y la contraseña {string}" en JS debe coincidir con ingreso el usuario "Admin" y la contraseña "admin123" en Gherkin.

Selectores de elementos incorrectos: Si los selectores CSS (input[name="username"], button[type="submit"], etc.) no son exactos para la página que estás probando, Cypress no podrá encontrar los elementos. Usa las herramientas de desarrollador de tu navegador (Cmd + Option + I) para inspeccionar la página y obtener los selectores correctos.

Ejecuta tus Tests (Localmente):

En tu Terminal, dentro de la carpeta cypress-bdd-project:

Bash

npm run cypress:open
Resultado esperado: Se abrirá la interfaz de Cypress. Selecciona "E2E Testing" y luego haz clic en tu archivo login.feature. Cypress ejecutará las pruebas en el navegador.

Paso 2: Vincular tu Proyecto Local con GitHub
Ahora, vamos a subir tu proyecto a GitHub para control de versiones y colaboración.

Crea un Nuevo Repositorio en GitHub (¡Completamente Vacío!):

Abre tu navegador y ve a https://github.com/new.

Repository name: Dale un nombre descriptivo, por ejemplo, cypress-bdd-project.

Description: (Opcional) Una breve descripción de tu proyecto.

Public o Private: Elige según tu preferencia.

¡CRÍTICO! Asegúrate de que ninguna de estas casillas esté marcada:

Add a README file

Add .gitignore

Choose a license
Esto es fundamental para evitar el error de "historias no relacionadas" que vimos antes.

Haz clic en "Create repository".

Resultado esperado: GitHub te mostrará una página con comandos de Git, porque el repositorio está vacío. Copia la URL HTTPS que te proporciona (ej. https://github.com/EdgarViOl/cypress-bdd-project.git).

Inicializa Git en tu Proyecto Local:

Abre tu Terminal en VS Code (o Terminal normal) y asegúrate de estar en la raíz de cypress-bdd-project.

Bash

  git init
Resultado esperado: Initialized empty Git repository in /Users/edgarvillegas/Documents/cypress-bdd-project/.git/. Esto crea la carpeta .git y convierte tu carpeta en un repositorio Git local.

Configura el .gitignore:

Es crucial decirle a Git qué archivos no debe subir a GitHub (como node_modules/ que es muy grande y se puede reconstruir, o videos/capturas de pantalla de Cypress).

Crea un nuevo archivo llamado .gitignore en la raíz de tu proyecto (cypress-bdd-project/.gitignore).

Contenido de cypress-bdd-project/.gitignore:

node_modules/
cypress/videos/
cypress/screenshots/
npm-debug.log*
.DS_Store # Archivo específico de macOS
Posibles Desafíos:

ls -a no muestra .gitignore: Asegúrate de que el nombre sea exactamente .gitignore (con el punto al principio).

Añade los Archivos para el Primer Commit:

Esto selecciona todos los archivos de tu proyecto (excepto los listados en .gitignore) para ser incluidos en el próximo "commit".

Bash

  git add .
Resultado esperado: La terminal no mostrará nada si fue exitoso, pero tus archivos estarán "stageados" (preparados).

Realiza tu Primer Commit:

Esto guarda una instantánea de tu proyecto en el historial de Git local.

Bash

  git commit -m "Initial project setup with Cypress, Cucumber, and basic login test"
Resultado esperado: Verás una lista de los archivos que se han "comiteado".

Posibles Desafíos:

fatal: No commits to commit.: Olvidaste git add . o no había cambios nuevos.

error: src refspec main does not match any: Este error ocurre si intentas git push sin haber hecho ningún commit primero. El git commit resuelve esto.

Renombra la Rama Principal a main:

La convención moderna es usar main en lugar de master para la rama principal.

Bash

  git branch -M main
Resultado esperado: No verás una confirmación explícita, pero la rama se habrá renombrado.

Conecta tu Repositorio Local con el Remoto de GitHub:

Aquí es donde le dices a Git la URL de tu repositorio en GitHub.

Bash

  git remote add origin https://github.com/EdgarViOl/cypress-bdd-project.git
¡IMPORTANTE! Reemplaza https://github.com/EdgarViOl/cypress-bdd-project.git con la URL exacta de TU nuevo repositorio que obtuviste en el Paso 2.1.

Resultado esperado: No verás ninguna confirmación si fue exitoso.

Posibles Desafíos:

fatal: remote origin already exists.: Ya habías configurado origin antes. Puedes ejecutar git remote -v para ver tus remotos. Si quieres reconfigurarlo, primero git remote rm origin y luego git remote add origin ....

Sube tu Proyecto Local a GitHub (¡El Primer Push!):

Este es el momento de enviar todos tus archivos y el historial de tu proyecto a GitHub.

Bash

  git push -u origin main
Resultado esperado: Se te pedirá tu nombre de usuario de GitHub y tu Personal Access Token (PAT) como contraseña.

Si no tienes un PAT:

Ve a github.com.

Haz clic en tu foto de perfil (arriba a la derecha) > Settings.

En la barra lateral izquierda, baja y haz clic en Developer settings > Personal access tokens > Tokens (classic).

Haz clic en Generate new token (classic).

Note: Dale un nombre (ej. VSCode_MyProject).

Expiration: Elige "No expiration" o una fecha razonable (ej. 90 días).

Select scopes: Marca al menos repo (control total de repositorios privados) y posiblemente workflow si planeas usar GitHub Actions.

Haz clic en Generate token.

¡Copia el token inmediatamente! No lo podrás ver de nuevo. Guárdalo en un lugar seguro (gestor de contraseñas).

Usa este token como contraseña cuando Git te lo pida en la terminal.

Resultado final esperado: Verás mensajes de progreso de subida y, finalmente, algo como:

To https://github.com/EdgarViOl/cypress-bdd-project.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
Posibles Desafíos (y Soluciones):

! [rejected] main -> main (non-fast-forward): Esto significa que el repositorio de GitHub tiene commits que tú no tienes. Solución: Primero necesitas traer esos cambios (git pull origin main --allow-unrelated-histories si no has hecho ningún cambio, o git pull origin main --rebase si tuvieras cambios locales). PERO, como creamos el repo de GitHub vacío, este error no debería ocurrir. Si ocurre, es que el repo de GitHub no estaba vacío. Tendrías que volver al Paso 2.1 y asegurarte de que lo creaste sin README.md, etc., y si es necesario, eliminarlo y crearlo de nuevo.

fatal: Authentication failed for ...: Tu nombre de usuario o PAT es incorrecto. Vuelve a generar/copiar el PAT cuidadosamente.

error: src refspec main does not match any: Te saltaste el git commit antes de hacer el push. Vuelve al Paso 2.5.

Verificación Final
Abre tu navegador y ve a la URL de tu nuevo repositorio en GitHub (ej. https://github.com/EdgarViOl/cypress-bdd-project).

Deberías ver todos los archivos de tu proyecto (tus archivos de Cypress, package.json, etc., pero no node_modules/ ni los videos/capturas de pantalla, gracias al .gitignore).

Flujo de Trabajo Diario con Git
Una vez que todo esté configurado, tu rutina será sencilla:

Haz cambios en tus archivos en VS Code.

Prepara los cambios: git add .

Guarda los cambios localmente: git commit -m "Mensaje descriptivo de lo que hiciste"

Sube tus cambios a GitHub: git push (ya no necesitas -u origin main porque ya lo configuraste).

Descarga los cambios de GitHub (si trabajas en equipo o desde otra máquina): git pull