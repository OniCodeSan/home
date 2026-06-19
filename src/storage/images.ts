import { getClient, hasSupabase } from './supabase';

export const BUCKET = 'site-images';

export { hasSupabase };

// Normalizza un nome file: minuscolo, senza spazi/accenti/caratteri strani.
export function safeName(name: string): string {
  const dot = name.lastIndexOf('.');
  const ext = dot >= 0 ? name.slice(dot).toLowerCase() : '';
  const base = (dot >= 0 ? name.slice(0, dot) : name)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'img';
  return `${base}${ext}`;
}

// URL pubblico stabile di un file nel bucket.
export function publicUrl(path: string): string {
  return getClient().storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

// Carica un file e ritorna l'URL pubblico. Il path include lo slug del sito.
export async function uploadImage(slug: string, file: File, seed: number): Promise<string> {
  const path = `${slug}/${seed}-${safeName(file.name)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await getClient().storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type || 'application/octet-stream',
    upsert: true,
  });
  if (error) throw error;
  return publicUrl(path);
}

// Elenca le immagini di un sito (per il menù di scelta nell'editor).
export async function listImages(slug: string): Promise<string[]> {
  if (!hasSupabase()) return [];
  const { data, error } = await getClient().storage.from(BUCKET).list(slug, {
    limit: 200,
    sortBy: { column: 'created_at', order: 'desc' },
  });
  if (error) return [];
  return (data ?? [])
    .filter((f) => !f.name.startsWith('.'))
    .map((f) => publicUrl(`${slug}/${f.name}`));
}
