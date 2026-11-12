import { storeElements } from '../page-elements/store.elements';

/** Reusable user actions for the DemoBlaze storefront. */
export const storeActions = {
  visit: () => cy.visit('/'),

  selectCategory: (categoryName: string) =>
    cy.contains(storeElements.categoryLinks, categoryName).click(),
};
