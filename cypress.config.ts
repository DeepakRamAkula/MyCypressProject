import { defineConfig } from 'cypress';
import { createClient } from '@supabase/supabase-js';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Load the project's .env without adding a runtime dependency.
const envFile = resolve(__dirname, '.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separator = trimmed.indexOf('=');
    if (separator < 1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^(['"])(.*)\1$/, '$2');
    process.env[key] ??= value;
  }
}

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL ?? process.env.base_url ?? 'https://www.demoblaze.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 15000,
    env: { API_URL: process.env.API_URL ?? 'https://dummyjson.com' },
    setupNodeEvents(on) {
      on('task', {
        async 'supabase:crudCheck'() {
          const supabaseUrl = process.env.SUPABASE_URL;
          const supabaseKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

          if (!supabaseUrl || !supabaseKey) {
            throw new Error(
              'Set SUPABASE_URL and SUPABASE_SECRET_KEY in .env (or SUPABASE_SERVICE_ROLE_KEY for a legacy key).',
            );
          }

          const supabase = createClient(supabaseUrl, supabaseKey, {
            auth: { autoRefreshToken: false, persistSession: false },
          });
          const table = 'automation_test_records';
          const testName = `cypress-db-${Date.now()}-${Math.random().toString(36).slice(2)}`;

          const { data: inserted, error: insertError } = await supabase
            .from(table)
            .insert({ name: testName })
            .select('id, name')
            .single();
          if (insertError) throw new Error(`Supabase insert failed: ${insertError.message}`);

          try {
            const { data: selected, error: selectError } = await supabase
              .from(table)
              .select('id, name')
              .eq('id', inserted.id)
              .single();
            if (selectError) throw new Error(`Supabase select failed: ${selectError.message}`);

            const updatedName = `${testName}-updated`;
            const { data: updated, error: updateError } = await supabase
              .from(table)
              .update({ name: updatedName })
              .eq('id', inserted.id)
              .select('id, name')
              .single();
            if (updateError) throw new Error(`Supabase update failed: ${updateError.message}`);

            const { data: deleted, error: deleteError } = await supabase
              .from(table)
              .delete()
              .eq('id', inserted.id)
              .select('id')
              .single();
            if (deleteError) throw new Error(`Supabase delete failed: ${deleteError.message}`);

            return {
              inserted: inserted.name === testName,
              selected: selected.name === testName,
              updated: updated.name === updatedName,
              deleted: deleted.id === inserted.id,
            };
          } finally {
            // Clean up if a read or update assertion fails before the delete step.
            await supabase.from(table).delete().eq('id', inserted.id);
          }
        },
      });
    },
  },
});
