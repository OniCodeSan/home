import { getClient, hasSupabase } from './supabase';

// Impostazioni applicative (es. API key) salvate come JSON in un bucket privato.
// Solo il backend (service-role) le legge: non sono mai esposte al client.
const BUCKET = 'magazine';
const PATH = 'app-settings.json';

export type AppSettings = {
  anthropicKey?: string;
  openaiKey?: string;
};

export async function getSettings(): Promise<AppSettings> {
  if (!hasSupabase()) return {};
  try {
    const { data, error } = await getClient().storage.from(BUCKET).download(PATH);
    if (error || !data) return {};
    return JSON.parse(await data.text());
  } catch {
    return {};
  }
}

export async function saveSettings(patch: AppSettings): Promise<void> {
  const next = { ...(await getSettings()), ...patch };
  const buf = Buffer.from(JSON.stringify(next));
  const { error } = await getClient().storage.from(BUCKET).upload(PATH, buf, {
    contentType: 'application/json',
    upsert: true,
  });
  if (error) throw error;
}

// Per l'AI: preferisci la key salvata in admin, altrimenti l'eventuale variabile d'ambiente.
export async function getAnthropicKey(): Promise<string | undefined> {
  return (await getSettings()).anthropicKey || process.env.ANTHROPIC_API_KEY || undefined;
}
export async function getOpenAIKey(): Promise<string | undefined> {
  return (await getSettings()).openaiKey || process.env.OPENAI_API_KEY || undefined;
}

// Stato mascherato per la UI (non rivela la chiave intera).
export function maskKey(k?: string): string {
  if (!k) return '';
  if (k.length <= 8) return '••••';
  return `••••${k.slice(-4)}`;
}
