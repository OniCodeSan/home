import type { BlockInstance, BlockType, ContentMap, SchemeId, SiteConfig } from '@/blocks/types';
import { SLOT_ORDER } from '@/blocks/types';
import { palettes } from '@/schemes/palettes';
import { pickComposition, rerollVariant } from './pick';

// I contenuti per ogni slot, forniti dal cliente/admin.
export type SiteContents = { [K in BlockType]: ContentMap[K] };

function instanceFor<T extends BlockType>(
  type: T,
  variantId: string,
  content: ContentMap[T],
): BlockInstance {
  return { type, variantId, content } as BlockInstance;
}

// Crea un nuovo sito: il random gira UNA volta, poi la composizione è salvata.
export function buildSiteConfig(input: {
  slug: string;
  schemeId: SchemeId;
  contents: SiteContents;
  status?: SiteConfig['status'];
}): SiteConfig {
  const { mood, picks } = pickComposition({ slug: input.slug, schemeId: input.schemeId });
  const byType = new Map(picks.map((p) => [p.type, p.variantId]));

  const blocks: BlockInstance[] = SLOT_ORDER.map((type) =>
    instanceFor(type, byType.get(type)!, input.contents[type]),
  );

  return {
    slug: input.slug,
    status: input.status ?? 'draft',
    schemeId: input.schemeId,
    mood,
    blocks,
  };
}

// Ri-tira la variante di uno slot (o di tutti) mantenendo i contenuti.
export function reroll(config: SiteConfig, slot?: BlockType): SiteConfig {
  // attempt cresce per garantire un seed diverso ad ogni reroll dello stesso slot
  const attempt = Date.now() % 100000;
  const blocks = config.blocks.map((b) => {
    if (slot && b.type !== slot) return b;
    const variantId = rerollVariant(config.slug, config.schemeId, b.type, attempt);
    return { ...b, variantId } as BlockInstance;
  });
  return { ...config, blocks };
}

// Cambia palette: aggiorna schemeId + mood, mantiene contenuti e varianti.
// (Le varianti restano valide: qualsiasi variante funziona con qualsiasi palette.)
export function changePalette(config: SiteConfig, schemeId: SchemeId): SiteConfig {
  return { ...config, schemeId, mood: palettes[schemeId].mood };
}
