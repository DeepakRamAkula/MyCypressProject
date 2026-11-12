interface SupabaseCrudCheck {
  inserted: boolean;
  selected: boolean;
  updated: boolean;
  deleted: boolean;
}

describe('Supabase Database Testing', () => {
  // Test to check the CRUD operations on the Supabase database using a Cypress task
  it('inserts, reads, updates, and deletes a test record', () => {
    // Invoke the Cypress task 'supabase:crudCheck' to perform CRUD operations and validate the results
    cy.task<SupabaseCrudCheck>('supabase:crudCheck').then((result) => {
      // Validate the results of the CRUD operations
      expect(result.inserted).to.eq(true);
      expect(result.selected).to.eq(true);
      expect(result.updated).to.eq(true);
      expect(result.deleted).to.eq(true);
    });
  });
});
