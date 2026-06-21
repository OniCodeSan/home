import type { BlockType, Mood, SchemeId } from '@/blocks/types';
import { SLOT_ORDER } from '@/blocks/types';
import { registry } from '@/blocks/registry';
import { palettes } from '@/schemes/palettes';
import { hashString, mulberry32 } from './random';

export type SlotPick = { type: BlockType; variantId: string };

export type PickInput = { slug: string; schemeId: SchemeId };

// Gira UNA sola volta, alla creazione del sito.
// Per ogni slot pesca tra TUTTE le varianti (ognuna funziona con qualsiasi palette),
// con seed per-slot derivato dallo slug → composizioni diverse per siti diversi.
export function pickComposition(input: PickInput): { mood: Mood; picks: SlotPick[] } {
  const mood = palettes[input.schemeId].mood;

  const picks: SlotPick[] = SLOT_ORDER.map((type) => {
    const variants = registry[type];
    const rng = mulberry32(hashString(`${input.slug}:${type}`));
    const idx = Math.floor(rng() * variants.length);
    return { type, variantId: variants[idx].id };
  });

  return { mood, picks };
}

// Ri-pesca uno slot. Seed variato (attempt) così il reroll cambia davvero.
export function rerollVariant(slug: string, _schemeId: SchemeId, type: BlockType, attempt: number): string {
  const variants = registry[type];
  const rng = mulberry32(hashString(`${slug}:${type}:${attempt}`));
  const idx = Math.floor(rng() * variants.length);
  return variants[idx].id;
}
