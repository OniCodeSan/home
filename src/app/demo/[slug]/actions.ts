'use server';

import { redirect } from 'next/navigation';
import type { SchemeId, SiteConfig } from '@/blocks/types';
import { palettes } from '@/schemes/palettes';
import { storage } from '@/storage';
import { changePalette } from '@/assembler/build';
import { uploadImage } from '@/storage/images';

// Guardia: queste azioni sono PUBBLICHE, quindi consentiamo modifiche
// SOLO ai siti demo (quelli con un lead) e MAI a quelli pubblicati.
async function requireDemo(slug: string): Promise<SiteConfig | null> {
  const config = await storage.getSiteConfig(slug);
  if (!config) return null;
  if (!config.lead || config.status === 'published') return null;
  return config;
}

export async function saveDemoConfigAction(formData: FormData) {
  const slug = String(formData.get('slug'));
  const current = await requireDemo(slug);
  if (!current) redirect('/');
  let parsed: SiteConfig;
  try {
    parsed = JSON.parse(String(formData.get('config'))) as SiteConfig;
  } catch {
    redirect(`/demo/${slug}/modifica?error=1`);
  }
  // blindiamo i campi sensibili: slug, stato e lead non si cambiano da qui
  parsed.slug = current.slug;
  parsed.status = current.status;
  parsed.lead = current.lead;
  parsed.mood = palettes[parsed.schemeId]?.mood ?? current.mood;
  await storage.saveSiteConfig(parsed);
  redirect(`/demo/${slug}`);
}

export async function setDemoPaletteAction(formData: FormData) {
  const slug = String(formData.get('slug'));
  const schemeId = String(formData.get('schemeId')) as SchemeId;
  const current = await requireDemo(slug);
  if (!current || !palettes[schemeId]) redirect(`/demo/${slug}/modifica`);
  await storage.saveSiteConfig(changePalette(current!, schemeId));
  redirect(`/demo/${slug}/modifica`);
}

export async function uploadDemoImageAction(formData: FormData): Promise<{ url?: string; error?: string }> {
  const slug = String(formData.get('slug') || '');
  const current = await requireDemo(slug);
  if (!current) return { error: 'Sito non modificabile' };
  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) return { error: 'Nessun file' };
  if (!file.type.startsWith('image/')) return { error: 'Il file non è un’immagine' };
  if (file.size > 10 * 1024 * 1024) return { error: 'Immagine troppo grande (max 10MB)' };
  try {
    return { url: await uploadImage(slug, file, Date.now()) };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Upload fallito' };
  }
}

export async function requestPurchaseAction(formData: FormData) {
  const slug = String(formData.get('slug'));
  const current = await requireDemo(slug);
  if (!current) redirect('/');
  current!.lead = { ...(current!.lead || {}), purchaseRequested: true };
  await storage.saveSiteConfig(current!);
  redirect(`/demo/${slug}/acquista?ok=1`);
}
