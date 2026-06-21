-- Magazine di viaggio "Saluti dal web" — articoli del blog.
-- Eseguila nel SQL Editor di Supabase.

create table if not exists public.articles (
  slug        text primary key,
  titolo      text not null,
  sommario    text,
  copertina   text,
  contenuto   text not null default '',
  tags        jsonb not null default '[]',
  status      text not null default 'draft' check (status in ('draft','published')),
  autore      text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists articles_status_idx on public.articles (status);
create index if not exists articles_created_idx on public.articles (created_at desc);

create or replace function public.set_articles_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_articles_updated_at();

alter table public.articles enable row level security;
