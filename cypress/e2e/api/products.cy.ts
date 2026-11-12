interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

interface ProductList {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
  
}

describe('DummyJSON products API', () => {
  // Helper function to get the API URL from Cypress environment variables
  const getApiUrl = (): Cypress.Chainable<string> =>
    // Retrieve the API_URL from Cypress environment variables and validate it
    cy.env(['API_URL']).then((values) => {
      const apiUrl = values.API_URL;
      // Check if the API_URL is a valid string and not empty, throw an error if it's missing
      if (typeof apiUrl !== 'string' || !apiUrl) {
        throw new Error('API_URL is missing. Check the API_URL entry in the project .env file.');
      }
      return apiUrl;
    });

  it('returns a paginated list of products', () => {
    // Make a GET request to the products endpoint with a limit of 5 and validate the response
    getApiUrl().then((apiUrl) => {
      cy.request<ProductList>(`${apiUrl}/products?limit=5`).then(({ status, body }) => {
        // Validate the response status and body structure
        expect(status).to.eq(200);
        expect(body.products).to.have.length(5);
        expect(body.total).to.be.greaterThan(0);
        expect(body.products[0]).to.include.keys('id', 'title', 'price', 'category');
      });
    });
  });

  it('returns a product by id', () => {
    // Make a GET request to retrieve a specific product by its ID and validate the response
    getApiUrl().then((apiUrl) => {
      cy.request<Product>(`${apiUrl}/products/1`).then(({ status, body }) => {
        // Validate the response status and body structure for the product
        expect(status).to.eq(200);
        expect(body.id).to.eq(1);
        expect(body.title).to.be.a('string').and.not.be.empty;
        expect(body.price).to.be.a('number');
      });
    });
  });

  it('searches products by query', () => {
    // Make a GET request to search for products containing the term "phone" and validate the response
    getApiUrl().then((apiUrl) => {
      cy.request<ProductList>(`${apiUrl}/products/search?q=phone`).then(({ status, body }) => {
        // Validate the response status and body structure for the search results
        expect(status).to.eq(200);
        expect(body.products.length).to.be.greaterThan(0);
        expect(body.products.some((product) => product.title.toLowerCase().includes('phone'))).to.eq(true);
      });
    });
  });
});
