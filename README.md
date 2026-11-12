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
```

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
