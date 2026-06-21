'use server';

import { redirect } from 'next/navigation';
import { saveSettings } from '@/storage/settings';

export async function saveSettingsAction(formData: FormData) {
  const anthropic = String(formData.get('anthropicKey') || '').trim();
  const openai = String(formData.get('openaiKey') || '').trim();

  const patch: { anthropicKey?: string; openaiKey?: string } = {};
  // campo vuoto = lascia invariata la chiave esistente
  if (anthropic) patch.anthropicKey = anthropic;
  if (openai) patch.openaiKey = openai;

  if (Object.keys(patch).length) await saveSettings(patch);
  redirect('/admin/impostazioni?ok=1');
}
