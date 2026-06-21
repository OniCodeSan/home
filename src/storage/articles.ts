import { getClient, hasSupabase } from './supabase';

export type Article = {
  slug: string;
  titolo: string;
  sommario?: string;
  copertina?: string;
  contenuto: string;        // markdown
  tags?: string[];
  status: 'draft' | 'published';
  autore?: string;
  createdAt?: string;
  updatedAt?: string;
};

function rowToArticle(r: any): Article {
  return {
    slug: r.slug,
    titolo: r.titolo,
    sommario: r.sommario || undefined,
    copertina: r.copertina || undefined,
    contenuto: r.contenuto || '',
    tags: Array.isArray(r.tags) ? r.tags : [],
    status: r.status,
    autore: r.autore || undefined,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export async function listArticles(opts?: { publishedOnly?: boolean }): Promise<Article[]> {
  if (!hasSupabase()) return [];
  let q = getClient().from('articles').select('*').order('created_at', { ascending: false });
  if (opts?.publishedOnly) q = q.eq('status', 'published');
  const { data, error } = await q;
  if (error) return [];
  return (data ?? []).map(rowToArticle);
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (!hasSupabase()) return null;
  const { data, error } = await getClient().from('articles').select('*').eq('slug', slug).maybeSingle();
  if (error || !data) return null;
  return rowToArticle(data);
}

export async function saveArticle(a: Article): Promise<void> {
  const { error } = await getClient().from('articles').upsert(
    {
      slug: a.slug,
      titolo: a.titolo,
      sommario: a.sommario ?? null,
      copertina: a.copertina ?? null,
      contenuto: a.contenuto ?? '',
      tags: a.tags ?? [],
      status: a.status,
      autore: a.autore ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'slug' },
  );
  if (error) throw error;
}

export async function deleteArticle(slug: string): Promise<void> {
  const { error } = await getClient().from('articles').delete().eq('slug', slug);
  if (error) throw error;
}
