import React from 'react';
import Link from 'next/link';
import { storage } from '@/storage';
import { paletteList } from '@/schemes/palettes';
import { ui } from './ui';
import { createSiteAction, logoutAction } from './actions';
import { authEnabled } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const STATI = ['draft', 'review', 'published'] as const;

export default async function AdminHome() {
  const sites = await storage.listSites();
  const byStatus = (s: string) => sites.filter((x) => x.status === s);

  return (
    <main style={ui.page}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <h1 style={ui.h1}>contentmug · admin</h1>
        {authEnabled() ? (
          <form action={logoutAction}>
            <button type="submit" style={ui.btn}>Esci</button>
          </form>
        ) : null}
      </div>
      <p style={{ color: '#6b7280', marginTop: 0 }}>Siti per stato. Apri un sito per modificarlo e pubblicarlo.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16 }}>
        {STATI.map((stato) => (
          <section key={stato} style={{ ...ui.card, flex: '1 1 300px', minWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={ui.badge(stato)}>{stato}</span>
              <span style={{ color: '#9aa0ab', fontSize: 13 }}>{byStatus(stato).length}</span>
            </div>
            {byStatus(stato).length === 0 ? (
              <p style={{ color: '#9aa0ab', fontSize: 14 }}>Nessun sito.</p>
            ) : (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8 }}>
                {byStatus(stato).map((s) => (
                  <li key={s.slug}>
                    <Link href={`/admin/${s.slug}`} style={{ textDecoration: 'none', color: '#1c5b6b', fontWeight: 600 }}>
                      {s.slug}
                    </Link>
                    <span style={{ color: '#9aa0ab', fontSize: 13 }}> · {s.schemeId} ({s.mood})</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <section style={{ ...ui.card, marginTop: 16, maxWidth: 520 }}>
        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18, marginTop: 0 }}>Nuovo sito</h2>
        <form action={createSiteAction} style={{ display: 'grid', gap: 10 }}>
          <div>
            <label style={ui.label}>Slug</label>
            <input name="slug" placeholder="es. borgo-marina" style={ui.input} required />
          </div>
          <div>
            <label style={ui.label}>Palette</label>
            <select name="schemeId" defaultValue="tramonto" style={ui.input}>
              {paletteList.map((p) => (
                <option key={p.id} value={p.id}>{p.nome} · {p.mood}</option>
              ))}
            </select>
          </div>
          <button type="submit" style={ui.btnPrimary}>Crea sito</button>
          <p style={{ fontSize: 12, color: '#9aa0ab', margin: 0 }}>
            Il random gira ora, una sola volta: la composizione viene salvata nel config.
          </p>
        </form>
      </section>
    </main>
  );
}
