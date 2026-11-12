create table if not exists public.automation_test_records (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.automation_test_records enable row level security;

grant all on table public.automation_test_records to service_role;
