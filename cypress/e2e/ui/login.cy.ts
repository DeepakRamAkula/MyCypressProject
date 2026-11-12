import { loginActions } from '../../page-actions/login.actions';

describe('DemoBlaze login for accessing the Token', () => {
  // Test case for logging in and capturing the authentication token
  it('logs in, captures the auth token, and verifies the welcome message', () => {
    cy.visit('/');
    // Use environment variables for credentials to avoid hardcoding sensitive information
    cy.env(['DEMOBLAZE_USERNAME', 'DEMOBLAZE_PASSWORD']).then((credentials) => {
      const username = credentials.DEMOBLAZE_USERNAME;
      const password = credentials.DEMOBLAZE_PASSWORD;
      // Validate that the username and password are provided and are of type string  
      if (typeof username !== 'string' || !username || typeof password !== 'string' || !password) {
        // If the username or password is not provided, throw an error to indicate that they must be set in the .env file
        throw new Error('Set DEMOBLAZE_USERNAME and DEMOBLAZE_PASSWORD in the project .env file.');
      }

      // Call the login action to perform the login and capture the authentication token
      return loginActions.loginAndCaptureToken(username, password).then((token) => {
        expect(token).to.be.a('string').and.not.be.empty;
        // Store the captured token in a Cypress alias for later use in other test
        return cy.get('@authToken').should('equal', token);
      });
    });
  });
});
