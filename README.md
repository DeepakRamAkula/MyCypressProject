# Cypress + TypeScript retail test starter

This project has browser UI tests for the public [DemoBlaze retail demo](https://www.demoblaze.com/) and REST API tests for the [DummyJSON products API](https://dummyjson.com/docs/products). They are independent targets: the UI suite exercises the storefront, while the API suite demonstrates product listing, lookup, and search. The OpenCart demo returned HTTP 403 to Cypress, so the UI suite uses DemoBlaze instead.

## Run from VS Code

Open the `MyCypressProject` folder in VS Code and choose **Terminal → New Terminal**. If the terminal is PowerShell and blocks `npm.ps1`, use `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run cy:open
```

In Cypress, select **E2E Testing** and a browser. To run the tests headlessly:

```powershell
npm.cmd run cy:run
npm.cmd run cy:run:ui
npm.cmd run cy:run:api
npm.cmd run cy:run:db
npm.cmd run cy:run:login
```

## Supabase database test

The database spec performs insert, select, update, and delete against the dedicated `public.automation_test_records` table. The Supabase key is used only in Cypress's Node task and is never passed into browser code.

1. Create a Supabase project or start a local Supabase instance.
2. Apply the SQL in `supabase/migrations/20261112000000_create_automation_test_records.sql` to that database (for a hosted project, paste it into the Supabase SQL Editor).
3. Copy the project URL and a server-only Secret key into `.env` as `SUPABASE_URL` and `SUPABASE_SECRET_KEY`. A legacy `service_role` key can be supplied as `SUPABASE_SERVICE_ROLE_KEY` instead. Never commit `.env` or put this key in browser-side test code.
4. Run `npm.cmd run cy:run:db`.

The database suite changes data only in its dedicated test table and removes the generated row after each CRUD check.

## DemoBlaze login test

Set `DEMOBLAZE_USERNAME` and `DEMOBLAZE_PASSWORD` in `.env` to an existing DemoBlaze account, then run `npm.cmd run cy:run:login`. The script opens the login dialog, submits the credentials, captures the `Auth_token` from the login response into a per-test Cypress alias named `authToken`, and verifies the welcome message. It does not create a DemoBlaze account.

## Layout

```text
cypress/e2e/ui/store.cy.ts       # DemoBlaze storefront checks
cypress/e2e/api/products.cy.ts   # DummyJSON REST API checks
cypress/page-elements/           # Page locators/selectors
cypress/page-actions/            # Reusable UI actions
cypress/support/                 # Shared Cypress setup and custom commands
cypress.config.ts
tsconfig.json
```

Public demo sites can be unavailable or change their markup; update the UI selectors if the DemoBlaze demo changes.
