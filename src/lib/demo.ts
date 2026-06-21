import type { BlockInstance, SchemeId, SiteConfig } from '@/blocks/types';
import { palettes } from '@/schemes/palettes';
import { storage } from '@/storage';
import { buildSiteConfig } from '@/assembler/build';
import { hashString } from '@/assembler/random';
import { buildDemoContents, type DemoForm } from '@/lib/boilerplate';
import { geocode, nearbyPlaces, placePhotos } from '@/lib/osm';

const SCHEMES = Object.keys(palettes) as SchemeId[];

export function slugify(s: string): string {
  return s
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'struttura';
}

function pickScheme(slug: string): SchemeId {
  return SCHEMES[hashString(slug) % SCHEMES.length];
}

function setContent(config: SiteConfig, type: BlockInstance['type'], content: unknown): void {
  config.blocks = config.blocks.map((b) => (b.type === type ? ({ ...b, content } as BlockInstance) : b));
}

// Crea subito un sito demo (boilerplate, nessuna rete) e ritorna lo slug.
export async function createDemoSite(form: DemoForm): Promise<string> {
  const suffix = (hashString(`${form.struttura}|${form.email || ''}|${Date.now()}`) % 46656).toString(36);
  const slug = `${slugify(form.struttura)}-${suffix}`;

  const contents = buildDemoContents(form, null, []);
  const config = buildSiteConfig({ slug, schemeId: pickScheme(slug), contents, status: 'review' });
  config.lead = {
    nome: form.nome, email: form.email, whatsapp: form.whatsapp,
    citta: form.citta, dove: form.dove, enriched: false,
  };
  await storage.saveSiteConfig(config);
  return slug;
}

// Arricchisce un sito demo con i dati OSM. Idempotente.
export async function enrichDemo(slug: string): Promise<{ ready: boolean }> {
  const config = await storage.getSiteConfig(slug);
  if (!config) return { ready: false };
  if (config.lead?.enriched) return { ready: true };

  const header = config.blocks.find((b) => b.type === 'header')?.content as { struttura?: string } | undefined;
  const form: DemoForm = {
    nome: config.lead?.nome,
    struttura: header?.struttura || slug,
    citta: config.lead?.citta,
    whatsapp: config.lead?.whatsapp,
    email: config.lead?.email,
    dove: config.lead?.dove,
  };

  const geo =
    (await geocode([form.struttura, form.citta].filter(Boolean).join(' '))) ||
    (form.citta ? await geocode(form.citta) : null);
  const nearby = geo ? await nearbyPlaces(geo.lat, geo.lon) : [];
  // foto reali della zona (Wikimedia Commons) per hero e dintorni
  const photos = geo ? await placePhotos(geo.lat, geo.lon, 8) : [];

  const enriched = buildDemoContents(form, geo, nearby);
  if (photos[0]) enriched.header.immagine = { src: photos[0], alt: form.struttura };
  if (photos.length > 1) {
    enriched.vicinanze.luoghi = enriched.vicinanze.luoghi.map((l, i) => ({
      ...l,
      immagine: { src: photos[(i + 1) % photos.length], alt: l.nome },
    }));
  }
  setContent(config, 'header', enriched.header);
  setContent(config, 'vicinanze', enriched.vicinanze);
  setContent(config, 'contatti', enriched.contatti);
  setContent(config, 'footer', enriched.footer);

  config.lead = { ...(config.lead || {}), enriched: true };
  await storage.saveSiteConfig(config);
  return { ready: true };
}
