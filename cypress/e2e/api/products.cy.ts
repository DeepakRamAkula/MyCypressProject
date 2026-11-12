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
  const getApiUrl = (): Cypress.Chainable<string> =>
    cy.env(['API_URL']).then((values) => {
      const apiUrl = values.API_URL;
      if (typeof apiUrl !== 'string' || !apiUrl) {
        throw new Error('API_URL is missing. Check the API_URL entry in the project .env file.');
      }
      return apiUrl;
    });

  it('returns a paginated list of products', () => {
    getApiUrl().then((apiUrl) => {
      cy.request<ProductList>(`${apiUrl}/products?limit=5`).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.products).to.have.length(5);
        expect(body.total).to.be.greaterThan(0);
        expect(body.products[0]).to.include.keys('id', 'title', 'price', 'category');
      });
    });
  });

  it('returns a product by id', () => {
    getApiUrl().then((apiUrl) => {
      cy.request<Product>(`${apiUrl}/products/1`).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.id).to.eq(1);
        expect(body.title).to.be.a('string').and.not.be.empty;
        expect(body.price).to.be.a('number');
      });
    });
  });

  it('searches products by query', () => {
    getApiUrl().then((apiUrl) => {
      cy.request<ProductList>(`${apiUrl}/products/search?q=phone`).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.products.length).to.be.greaterThan(0);
        expect(body.products.some((product) => product.title.toLowerCase().includes('phone'))).to.eq(true);
      });
    });
  });
});
