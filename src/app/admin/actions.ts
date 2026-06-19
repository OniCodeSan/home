'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { SchemeId, SiteConfig, BlockType } from '@/blocks/types';
import { palettes } from '@/schemes/palettes';
import { storage } from '@/storage';
import { buildSiteConfig, changePalette, reroll } from '@/assembler/build';
import { demoContents } from '@/storage/demo';
import { uploadImage } from '@/storage/images';
import { cookies, headers } from 'next/headers';
import { authEnabled, checkPassword, sessionToken, COOKIE_NAME, COOKIE_MAX_AGE } from '@/lib/auth';

export async function loginAction(formData: FormData) {
  const password = String(formData.get('password') || '');
  const next = String(formData.get('next') || '/admin');
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/admin';

  if (!authEnabled()) redirect(safeNext);
  if (!checkPassword(password)) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(safeNext)}`);
  }
  // Secure solo su https reale (dietro Caddy/Cloudflare), così http://localhost funziona in test.
  const isHttps = headers().get('x-forwarded-proto') === 'https';
  cookies().set(COOKIE_NAME, await sessionToken(), {
    httpOnly: true,
    secure: isHttps,
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
  redirect(safeNext);
}

export async function logoutAction() {
  cookies().delete(COOKIE_NAME);
  redirect('/admin/login');
}

async function requireSite(slug: string): Promise<SiteConfig> {
  const config = await storage.getSiteConfig(slug);
  if (!config) throw new Error(`Sito non trovato: ${slug}`);
  return config;
}

export async function setPaletteAction(formData: FormData) {
  const slug = String(formData.get('slug'));
  const schemeId = String(formData.get('schemeId')) as SchemeId;
  if (!palettes[schemeId]) throw new Error('Palette non valida');
  const next = changePalette(await requireSite(slug), schemeId);
  await storage.saveSiteConfig(next);
  revalidatePath(`/preview/${slug}`);
  revalidatePath(`/${slug}`);
  revalidatePath(`/admin/${slug}`);
}

export async function rerollAction(formData: FormData) {
  const slug = String(formData.get('slug'));
  const slotRaw = String(formData.get('slot') || '');
  const slot = (slotRaw || undefined) as BlockType | undefined;
  const next = reroll(await requireSite(slug), slot);
  await storage.saveSiteConfig(next);
  revalidatePath(`/preview/${slug}`);
  revalidatePath(`/${slug}`);
  revalidatePath(`/admin/${slug}`);
}

export async function setStatusAction(formData: FormData) {
  const slug = String(formData.get('slug'));
  const status = String(formData.get('status')) as SiteConfig['status'];
  const config = await requireSite(slug);
  await storage.saveSiteConfig({ ...config, status });
  // pubblicare/spubblicare invalida la route pubblica
  revalidatePath(`/${slug}`);
  revalidatePath(`/admin/${slug}`);
}

export async function saveConfigAction(formData: FormData) {
  const slug = String(formData.get('slug'));
  const json = String(formData.get('config'));
  const current = await requireSite(slug);
  let parsed: SiteConfig;
  try {
    parsed = JSON.parse(json) as SiteConfig;
  } catch {
    throw new Error('JSON non valido');
  }
  // lo slug non si cambia da qui
  parsed.slug = current.slug;
  // mood deve restare coerente con la palette scelta
  parsed.mood = palettes[parsed.schemeId].mood;
  await storage.saveSiteConfig(parsed);
  revalidatePath(`/preview/${slug}`);
  revalidatePath(`/${slug}`);
  revalidatePath(`/admin/${slug}`);
}

// Carica un'immagine nel bucket e ritorna l'URL pubblico (chiamata diretta dal client).
export async function uploadImageAction(formData: FormData): Promise<{ url?: string; error?: string }> {
  const slug = String(formData.get('slug') || 'shared')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-') || 'shared';
  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) return { error: 'Nessun file' };
  if (!file.type.startsWith('image/')) return { error: 'Il file non è un’immagine' };
  if (file.size > 10 * 1024 * 1024) return { error: 'Immagine troppo grande (max 10MB)' };
  try {
    const url = await uploadImage(slug, file, Date.now());
    return { url };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Upload fallito' };
  }
}

export async function createSiteAction(formData: FormData) {
  const slug = String(formData.get('slug') || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const schemeId = String(formData.get('schemeId') || 'tramonto') as SchemeId;
  if (!slug) throw new Error('Slug mancante');
  if (!palettes[schemeId]) throw new Error('Palette non valida');
  if (await storage.getSiteConfig(slug)) throw new Error('Slug già esistente');

  const config = buildSiteConfig({ slug, schemeId, contents: demoContents, status: 'draft' });
  await storage.saveSiteConfig(config);
  redirect(`/admin/${slug}`);
}
