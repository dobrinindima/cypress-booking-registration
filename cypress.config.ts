import { defineConfig } from 'cypress';
import * as path from 'path';

export default defineConfig({
  e2e: {
    baseUrl: 'https://booking.com',
    setupNodeEvents(on, config) {
      const mochawesome = require('mochawesome');

      on('after:run', (results) => {
        const merge = require('mochawesome-merge');
        const reportGenerator = require('mochawesome-report-generator');
        const mergedJson = merge(['cypress/results/*.json']);

        reportGenerator.create(mergedJson).then((report) => {
          const fs = require('fs');
          const reportDir = path.join(__dirname, 'cypress/results');
          if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir);
          }

          fs.writeFileSync(path.join(reportDir, 'report.html'), report);
        });
      });
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/index.ts',
    video: true,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: true,
      html: true,
      json: true,
    },
  },
});
