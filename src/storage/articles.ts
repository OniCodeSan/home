import { getClient, hasSupabase } from './supabase';

// Gli articoli sono salvati come JSON in un bucket privato Supabase (niente tabella DDL).
const BUCKET = 'magazine';
const PATH = 'articles.json';

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

async function readAll(): Promise<Article[]> {
  if (!hasSupabase()) return [];
  try {
    const { data, error } = await getClient().storage.from(BUCKET).download(PATH);
    if (error || !data) return [];
    const text = await data.text();
    const arr = JSON.parse(text);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

async function writeAll(list: Article[]): Promise<void> {
  const buf = Buffer.from(JSON.stringify(list, null, 2));
  const { error } = await getClient().storage.from(BUCKET).upload(PATH, buf, {
    contentType: 'application/json',
    upsert: true,
  });
  if (error) throw error;
}

export async function listArticles(opts?: { publishedOnly?: boolean }): Promise<Article[]> {
  let all = await readAll();
  if (opts?.publishedOnly) all = all.filter((a) => a.status === 'published');
  return all.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
}

export async function getArticle(slug: string): Promise<Article | null> {
  const all = await readAll();
  return all.find((a) => a.slug === slug) ?? null;
}

export async function saveArticle(a: Article): Promise<void> {
  const all = await readAll();
  const now = new Date().toISOString();
  const idx = all.findIndex((x) => x.slug === a.slug);
  const next: Article = { ...a, updatedAt: now, createdAt: idx >= 0 ? all[idx].createdAt || now : now };
  if (idx >= 0) all[idx] = next;
  else all.push(next);
  await writeAll(all);
}

export async function deleteArticle(slug: string): Promise<void> {
  const all = await readAll();
  await writeAll(all.filter((a) => a.slug !== slug));
}
