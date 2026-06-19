import type { SiteConfig } from '@/blocks/types';

// Interfaccia di storage — un'unica astrazione, due implementazioni.
export interface SiteStorage {
  getSiteConfig(slug: string): Promise<SiteConfig | null>;
  saveSiteConfig(config: SiteConfig): Promise<void>;
  listSites(): Promise<SiteConfig[]>;
}

import { memoryStorage } from './memory';
import { supabaseStorage, hasSupabase } from './supabase';

// Usa Supabase se configurato (Hetzner/produzione), altrimenti in-memory (dev/Docker locale).
export const storage: SiteStorage = hasSupabase() ? supabaseStorage : memoryStorage;

export const storageBackend = hasSupabase() ? 'supabase' : 'memory';
