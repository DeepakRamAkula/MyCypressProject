interface SupabaseCrudCheck {
  inserted: boolean;
  selected: boolean;
  updated: boolean;
  deleted: boolean;
}

describe('Supabase database', () => {
  it('inserts, reads, updates, and deletes a test record', () => {
    cy.task<SupabaseCrudCheck>('supabase:crudCheck').then((result) => {
      expect(result.inserted).to.eq(true);
      expect(result.selected).to.eq(true);
      expect(result.updated).to.eq(true);
      expect(result.deleted).to.eq(true);
    });
  });
});
