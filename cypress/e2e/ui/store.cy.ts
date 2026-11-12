import { storeActions } from '../../page-actions/store.actions';
import { storeElements } from '../../page-elements/store.elements';

describe('DemoBlaze retail demo UI Tests', () => {
  // Visit the DemoBlaze storefront before each test case
  beforeEach(() => storeActions.visit());

  it('Login to the storefront', () => {
    // login to the storefront using the provided credentials and verify the welcome message
    cy.xpath(storeElements.login,{timeout:2000}).click();
    // enter the username and password and click the login button
    cy.xpath(storeElements.userName,{timeout:3000}).type('DeepakAkula');
    cy.xpath(storeElements.password,{timeout:3000}).type('Twinkle@0406');
    cy.xpath(storeElements.loginButton,{timeout:3000}).click();
    // verify the welcome message after successful login
    cy.xpath(storeElements.nameOfUser,{timeout:3000}).should('be.visible').and('contain.text', 'Welcome DeepakAkula');
  });

  it('loads the storefront and shows product categories', () => {
    // verify that the storefront loads and displays the product categories
    cy.xpath(storeElements.brand).should('be.visible').and('contain.text', 'PRODUCT STORE');
    // verify that the product categories are displayed
    cy.contains(storeElements.categoryLinks, 'Phones').should('be.visible');
    cy.contains(storeElements.categoryLinks, 'Laptops').should('be.visible');
    cy.contains(storeElements.categoryLinks, 'Monitors').should('be.visible');
  });

  it('shows products after selecting the Phones category', () => {
    // select the Phones category and verify that products are displayed
    storeActions.selectCategory('Phones');
    // verify that the product cards are displayed after selecting the Phones category
    cy.xpath(storeElements.productCards).should('have.length.greaterThan', 0);
  });

  it('shows products after selecting the Laptops category', () => {
    // select the Laptops category and verify that products are displayed
    storeActions.selectCategory('Laptops');
    // verify that the product cards are displayed after selecting the Laptops category
    cy.xpath(storeElements.productCards).should('have.length.greaterThan', 0);
  });
  it('shows products after selecting the Monitors category', () => {
    // select the Monitors category and verify that products are displayed
    storeActions.selectCategory('Monitors');
    // verify that the product cards are displayed after selecting the Monitors category
    cy.xpath(storeElements.productCards).should('have.length.greaterThan', 0);
  });
});
