import React from 'react';
import Link from 'next/link';
import { getSettings, maskKey } from '@/storage/settings';
import { ui } from '../ui';
import { saveSettingsAction } from './actions';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const label: React.CSSProperties = { display: 'block', fontSize: 13, color: '#6b7280', marginBottom: 6, fontWeight: 600 };

export default async function ImpostazioniPage({ searchParams }: { searchParams: { ok?: string } }) {
  const s = await getSettings();
  const saved = searchParams?.ok === '1';

  return (
    <main style={ui.page}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <Link href="/admin" style={{ color: '#C13C7B', textDecoration: 'none' }}>← Admin</Link>
        <h1 style={{ ...ui.h1, margin: 0 }}>Impostazioni</h1>
      </div>
      <p style={{ color: '#6b7280', marginTop: 0 }}>Chiavi API per la generazione automatica degli articoli del magazine. Restano salvate in modo sicuro e non vengono mostrate per intero.</p>

      {saved ? <p style={{ ...ui.card, background: '#e6f4ea', borderColor: '#bfe3cb', color: '#1f7a3d', maxWidth: 560 }}>Impostazioni salvate ✓</p> : null}

      <form action={saveSettingsAction} style={{ ...ui.card, maxWidth: 560, display: 'grid', gap: 16, marginTop: 12 }}>
        <div>
          <label style={label}>Claude · Anthropic API key <span style={{ color: '#9aa0ab', fontWeight: 400 }}>(testi articoli)</span></label>
          <input name="anthropicKey" type="password" autoComplete="off" placeholder={s.anthropicKey ? `Impostata: ${maskKey(s.anthropicKey)} — lascia vuoto per non cambiarla` : 'sk-ant-...'} style={ui.input} />
        </div>
        <div>
          <label style={label}>OpenAI API key <span style={{ color: '#9aa0ab', fontWeight: 400 }}>(immagini di copertina)</span></label>
          <input name="openaiKey" type="password" autoComplete="off" placeholder={s.openaiKey ? `Impostata: ${maskKey(s.openaiKey)} — lascia vuoto per non cambiarla` : 'sk-...'} style={ui.input} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button type="submit" style={ui.btnPrimary}>Salva chiavi</button>
          <span style={{ fontSize: 13, color: '#9aa0ab' }}>
            Stato: Claude {s.anthropicKey ? '✓' : '—'} · OpenAI {s.openaiKey ? '✓' : '—'}
          </span>
        </div>
      </form>

      <p style={{ fontSize: 13, color: '#9aa0ab', maxWidth: 560, marginTop: 14 }}>
        Le chiavi sono conservate in un'area privata del progetto e usate solo lato server per chiamare le API. Per revocarle, rigenerale dai rispettivi pannelli (Anthropic / OpenAI).
      </p>
    </main>
  );
}
