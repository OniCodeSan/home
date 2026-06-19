// Autenticazione admin: token di sessione firmato (stateless).
// Usa Web Crypto, così funziona sia nel middleware (edge) sia nei Server Actions (node).

export const COOKIE_NAME = 'cm_admin';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 giorni

// Auth attiva solo se è impostata una password. Senza, l'admin resta aperto (dev locale).
export function authEnabled(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function secret(): string {
  // segreto di firma dedicato, con fallback sulla password se non impostato
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'dev-insecure-secret';
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Token deterministico firmato col segreto: il middleware lo ricalcola e confronta.
export async function sessionToken(): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode('cm-admin-v1'));
  return toHex(sig);
}

export function checkPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD || '';
  // confronto a tempo non sensibile: lunghezze diverse => false
  if (!pw || input.length !== pw.length) return false;
  let diff = 0;
  for (let i = 0; i < pw.length; i++) diff |= input.charCodeAt(i) ^ pw.charCodeAt(i);
  return diff === 0;
}
