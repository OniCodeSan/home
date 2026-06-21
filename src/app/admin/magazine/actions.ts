'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { saveArticle, deleteArticle, getArticle } from '@/storage/articles';
import { slugify } from '@/lib/demo';

export async function saveArticleAction(formData: FormData) {
  const titolo = String(formData.get('titolo') || '').trim();
  let slug = String(formData.get('slug') || '').trim();
  if (!titolo) redirect(`/admin/magazine/${slug || 'new'}?error=titolo`);

  if (!slug) {
    let base = slugify(titolo);
    // evita collisione con un articolo esistente
    if (await getArticle(base)) base = `${base}-${Date.now().toString(36).slice(-4)}`;
    slug = base;
  }

  const tags = String(formData.get('tags') || '')
    .split(',').map((t) => t.trim()).filter(Boolean);

  await saveArticle({
    slug,
    titolo,
    sommario: String(formData.get('sommario') || '').trim() || undefined,
    copertina: String(formData.get('copertina') || '').trim() || undefined,
    contenuto: String(formData.get('contenuto') || ''),
    tags,
    status: (String(formData.get('status') || 'draft') as 'draft' | 'published'),
    autore: String(formData.get('autore') || '').trim() || undefined,
  });

  revalidatePath('/magazine');
  revalidatePath(`/magazine/${slug}`);
  revalidatePath('/admin/magazine');
  redirect('/admin/magazine');
}

export async function deleteArticleAction(formData: FormData) {
  const slug = String(formData.get('slug') || '');
  if (slug) {
    await deleteArticle(slug);
    revalidatePath('/magazine');
    revalidatePath('/admin/magazine');
  }
  redirect('/admin/magazine');
}
