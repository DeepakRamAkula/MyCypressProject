import { storeElements } from '../page-elements/store.elements';

export const loginActions = {
  loginAndCaptureToken(username: string, password: string): Cypress.Chainable<string> {
    cy.intercept('POST', 'https://api.demoblaze.com/login').as('demoblazeLogin');

    cy.xpath(storeElements.login).click();
    cy.xpath(storeElements.loginModal).should('be.visible');
    cy.xpath(storeElements.userName).type(username);
    cy.xpath(storeElements.password).type(password, { log: false });
    cy.xpath(storeElements.loginButton).click();

    return cy.wait('@demoblazeLogin').then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
      const responseText = typeof response?.body === 'string'
        ? response.body
        : JSON.stringify(response?.body ?? '');
      const token = responseText.match(/Auth_token:\s*([^"\s]+)/)?.[1];
      expect(token, 'authentication token in login response').to.be.a('string').and.not.be.empty;

      return cy.wrap(token!, { log: false })
        .as('authToken')
        .then(() => cy.xpath(storeElements.nameOfUser)
          .should('be.visible')
          .and('contain.text', username))
        .then(() => token!);
    });
  },
};
