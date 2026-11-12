import { storeActions } from '../../page-actions/store.actions';
import { storeElements } from '../../page-elements/store.elements';

describe('DemoBlaze retail demo', () => {
  beforeEach(() => storeActions.visit());

  it('Login to the storefront', () => {
    cy.xpath(storeElements.login).click();
    cy.xpath(storeElements.userName,{timeout:2000}).type('DeepakAkula');
    cy.xpath(storeElements.password,{timeout:2000}).type('Twinkle@0406');
    cy.xpath(storeElements.loginButton,{timeout:2000}).click();
    cy.xpath(storeElements.nameOfUser,{timeout:3000}).should('be.visible').and('contain.text', 'Welcome DeepakAkula');
  });

  it('loads the storefront and shows product categories', () => {
    cy.xpath(storeElements.brand).should('be.visible').and('contain.text', 'PRODUCT STORE');
    cy.contains(storeElements.categoryLinks, 'Phones').should('be.visible');
    cy.contains(storeElements.categoryLinks, 'Laptops').should('be.visible');
    cy.contains(storeElements.categoryLinks, 'Monitors').should('be.visible');
  });

  it('shows products after selecting the Phones category', () => {
    storeActions.selectCategory('Phones');
    cy.xpath(storeElements.productCards).should('have.length.greaterThan', 0);
  });

  it('shows products after selecting the Laptops category', () => {
    storeActions.selectCategory('Laptops');
    cy.xpath(storeElements.productCards).should('have.length.greaterThan', 0);
  });
});
