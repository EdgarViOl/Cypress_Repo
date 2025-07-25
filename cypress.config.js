const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

// YA NO NECESITAS IMPORTAR createEsbuildPlugin DIRECTAMENTE ASÍ:
// const createEsbuildPlugin = require("@bahmutov/cypress-esbuild-preprocessor").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          // ESTA ES LA LÍNEA CLAVE QUE CAMBIAMOS
          plugins: [require("@badeball/cypress-cucumber-preprocessor/esbuild").default()],
        })
      );

      return config;
    },
  },
});