import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { SiteConfig } from '@/blocks/types';
import type { SiteStorage } from './index';

// Credenziali server-side. La service-role key NON va mai esposta al client:
// questo modulo è usato solo in Server Components / Server Actions.
const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function hasSupabase(): boolean {
  return Boolean(url && serviceKey);
}

let client: SupabaseClient | null = null;

// Client server-side condiviso (DB + Storage). Riusato dagli helper immagini.
// Nota: la freschezza delle letture è gestita per-pagina:
// - pubblico [slug] => ISR + revalidatePath al publish (cache desiderata)
// - admin/home/preview => fetchCache 'force-no-store' (sempre stato reale)
export function getClient(): SupabaseClient {
  if (!client) {
    if (!hasSupabase()) throw new Error('Supabase non configurato (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)');
    client = createClient(url!, serviceKey!, { auth: { persistSession: false } });
  }
  return client;
}

const db = getClient;

// Tabella: sites(slug pk, status, scheme_id, mood, config jsonb, updated_at)
// Il config jsonb contiene l'intero SiteConfig (composizione + contenuti).
type Row = { config: SiteConfig };

export const supabaseStorage: SiteStorage = {
  async getSiteConfig(slug) {
    const { data, error } = await db()
      .from('sites')
      .select('config')
      .eq('slug', slug)
      .maybeSingle<Row>();
    if (error) throw error;
    return data ? data.config : null;
  },

  async saveSiteConfig(config) {
    const { error } = await db()
      .from('sites')
      .upsert(
        {
          slug: config.slug,
          status: config.status,
          scheme_id: config.schemeId,
          mood: config.mood,
          config,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slug' },
      );
    if (error) throw error;
  },

  async listSites() {
    const { data, error } = await db()
      .from('sites')
      .select('config')
      .order('updated_at', { ascending: false })
      .returns<Row[]>();
    if (error) throw error;
    return (data ?? []).map((r) => r.config);
  },
};
