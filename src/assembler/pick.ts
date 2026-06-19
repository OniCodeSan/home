import type { BlockType, Mood, SchemeId } from '@/blocks/types';
import { SLOT_ORDER } from '@/blocks/types';
import { registry } from '@/blocks/registry';
import { palettes } from '@/schemes/palettes';
import { makeRng, hashString, mulberry32 } from './random';

export type SlotPick = { type: BlockType; variantId: string };

// Filtra le varianti di un blocco per compatibilità col mood (o 'any').
function compatibleVariants(type: BlockType, mood: Mood) {
  const all = registry[type];
  const compatible = all.filter((v) => v.mood === mood || v.mood === 'any');
  // fallback: se nessuna combacia, usa tutte (non lasciare mai uno slot vuoto)
  return compatible.length > 0 ? compatible : all;
}

export type PickInput = { slug: string; schemeId: SchemeId };

// Gira UNA sola volta, alla creazione del sito.
// Per ogni slot: filtro mood + random seeded sullo slug.
export function pickComposition(input: PickInput): { mood: Mood; picks: SlotPick[] } {
  const palette = palettes[input.schemeId];
  const mood = palette.mood;
  const rng = makeRng(input.slug);

  const picks: SlotPick[] = SLOT_ORDER.map((type) => {
    const variants = compatibleVariants(type, mood);
    const idx = Math.floor(rng() * variants.length);
    return { type, variantId: variants[idx].id };
  });

  return { mood, picks };
}

// Ri-pesca uno slot (o tutti). Seed variato per slot così il reroll cambia davvero.
export function rerollVariant(
  slug: string,
  schemeId: SchemeId,
  type: BlockType,
  attempt: number,
): string {
  const palette = palettes[schemeId];
  const variants = compatibleVariants(type, palette.mood);
  const rng = mulberry32(hashString(`${slug}:${type}:${attempt}`));
  const idx = Math.floor(rng() * variants.length);
  return variants[idx].id;
}
