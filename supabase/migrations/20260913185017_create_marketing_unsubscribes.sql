create table if not exists public.marketing_unsubscribes (
  email text primary key,
  source text not null default 'self_service',
  unsubscribed_at timestamptz not null default now(),
  constraint marketing_unsubscribes_email_length check (char_length(email) between 3 and 254),
  constraint marketing_unsubscribes_email_lowercase check (email = lower(email)),
  constraint marketing_unsubscribes_source check (source = 'self_service'),
  constraint marketing_unsubscribes_email_shape check (email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$')
);

alter table public.marketing_unsubscribes enable row level security;

revoke all on table public.marketing_unsubscribes from anon, authenticated;
grant insert (email, source) on table public.marketing_unsubscribes to anon, authenticated;

drop policy if exists "public_can_request_marketing_unsubscribe" on public.marketing_unsubscribes;
create policy "public_can_request_marketing_unsubscribe"
on public.marketing_unsubscribes
for insert
to anon, authenticated
with check (
  email = lower(email)
  and char_length(email) between 3 and 254
  and email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
  and source = 'self_service'
);
