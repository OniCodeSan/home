import type { SiteConfig } from '@/blocks/types';
import type { SiteStorage } from './index';
import { buildSiteConfig } from '@/assembler/build';
import { demoContents } from './demo';

// Storage in-memory. Persistenza tra richieste nello stesso processo dev/runtime.
// Verrà sostituito da Postgres. Nessuna dipendenza dai colori/varianti qui.
const store = new Map<string, SiteConfig>();

function seed() {
  if (store.size > 0) return;
  const demo = buildSiteConfig({
    slug: 'borgo-marina',
    schemeId: 'tramonto',
    contents: demoContents,
    status: 'published',
  });
  store.set(demo.slug, demo);
}

export const memoryStorage: SiteStorage = {
  async getSiteConfig(slug) {
    seed();
    return store.get(slug) ?? null;
  },
  async saveSiteConfig(config) {
    seed();
    store.set(config.slug, config);
  },
  async listSites() {
    seed();
    return Array.from(store.values());
  },
};
