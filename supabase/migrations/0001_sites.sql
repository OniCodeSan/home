-- contentmug · hotel — tabella dei siti generati
-- Eseguila nel SQL Editor di Supabase (o via supabase CLI).

create table if not exists public.sites (
  slug        text primary key,
  status      text not null default 'draft'
              check (status in ('draft', 'review', 'published')),
  scheme_id   text not null,
  mood        text not null,
  config      jsonb not null,          -- intero SiteConfig (composizione + contenuti)
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- indice per filtrare/elencare i siti pubblicati rapidamente
create index if not exists sites_status_idx on public.sites (status);
create index if not exists sites_updated_idx on public.sites (updated_at desc);

-- aggiorna updated_at ad ogni modifica
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists sites_set_updated_at on public.sites;
create trigger sites_set_updated_at
  before update on public.sites
  for each row execute function public.set_updated_at();

-- RLS: l'accesso passa SOLO dal backend con la service-role key (che bypassa RLS).
-- Abilitiamo RLS senza policy pubbliche => nessun accesso anonimo diretto alla tabella.
alter table public.sites enable row level security;
