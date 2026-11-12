import { defineConfig } from 'cypress';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Load the project's .env without adding a runtime dependency.
const envFile = resolve(__dirname, '.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separator = trimmed.indexOf('=');
    if (separator < 1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^(['"])(.*)\1$/, '$2');
    process.env[key] ??= value;
  }
}

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL ?? process.env.base_url ?? 'https://www.demoblaze.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 15000,
    env: { API_URL: process.env.API_URL ?? 'https://dummyjson.com' },
  },
});
