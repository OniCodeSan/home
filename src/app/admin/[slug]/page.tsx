import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { storage } from '@/storage';
import { paletteList } from '@/schemes/palettes';
import { SLOT_ORDER } from '@/blocks/types';
import { ui } from '../ui';
import { setPaletteAction, rerollAction, setStatusAction, saveConfigAction, uploadImageAction } from '../actions';
import { listImages } from '@/storage/images';
import { ContentEditor } from './ContentEditor';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

function localUploads(): string[] {
  try {
    return fs
      .readdirSync(path.join(process.cwd(), 'public', 'uploads'))
      .filter((f) => /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(f))
      .sort()
      .map((f) => `/uploads/${f}`);
  } catch {
    return [];
  }
}

export default async function EditSite({ params }: { params: { slug: string } }) {
  const config = await storage.getSiteConfig(params.slug);
  if (!config) notFound();
  // immagini disponibili: quelle già caricate su Supabase per questo sito + quelle locali
  const bucket = await listImages(params.slug);
  const uploads = [...bucket, ...localUploads()];

  return (
    <main style={ui.page}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/admin" style={{ color: '#1c5b6b', textDecoration: 'none' }}>← Siti</Link>
        <h1 style={{ ...ui.h1, margin: 0 }}>{config.slug}</h1>
        <span style={ui.badge(config.status)}>{config.status}</span>
        {config.status === 'published' ? (
          <Link href={`/${config.slug}`} target="_blank" style={{ color: '#1c5b6b', fontSize: 14 }}>
            apri sito pubblico ↗
          </Link>
        ) : null}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16, alignItems: 'flex-start' }}>
        {/* ── Colonna controlli ─────────────────────────────────────── */}
        <div style={{ flex: '1 1 380px', minWidth: 340, display: 'grid', gap: 16 }}>
          {/* Stato / pubblicazione */}
          <section style={ui.card}>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 16, marginTop: 0 }}>Pubblicazione</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(['draft', 'review', 'published'] as const).map((st) => (
                <form key={st} action={setStatusAction}>
                  <input type="hidden" name="slug" value={config.slug} />
                  <input type="hidden" name="status" value={st} />
                  <button type="submit" style={st === config.status ? ui.btnPrimary : ui.btn}>
                    {st === 'published' ? 'Pubblica' : st === 'draft' ? 'Bozza' : 'Review'}
                  </button>
                </form>
              ))}
            </div>
          </section>

          {/* Palette */}
          <section style={ui.card}>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 16, marginTop: 0 }}>Palette</h2>
            <form action={setPaletteAction} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input type="hidden" name="slug" value={config.slug} />
              <select name="schemeId" defaultValue={config.schemeId} style={{ ...ui.input, flex: '1 1 200px' }}>
                {paletteList.map((p) => (
                  <option key={p.id} value={p.id}>{p.nome} · {p.mood}</option>
                ))}
              </select>
              <button type="submit" style={ui.btnPrimary}>Applica</button>
            </form>
            <p style={{ fontSize: 12, color: '#9aa0ab', margin: '8px 0 0' }}>
              Mood attuale: <strong>{config.mood}</strong>. Le varianti restano valide con ogni palette.
            </p>
          </section>

          {/* Reroll varianti */}
          <section style={ui.card}>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 16, marginTop: 0 }}>Varianti</h2>
            <form action={rerollAction} style={{ marginBottom: 10 }}>
              <input type="hidden" name="slug" value={config.slug} />
              <button type="submit" style={ui.btnPrimary}>Ri-tira tutte</button>
            </form>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 6 }}>
              {SLOT_ORDER.map((slot) => {
                const b = config.blocks.find((x) => x.type === slot);
                return (
                  <li key={slot} style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14 }}>
                      <strong>{slot}</strong>{' '}
                      <span style={{ color: '#9aa0ab' }}>{b?.variantId}</span>
                    </span>
                    <form action={rerollAction}>
                      <input type="hidden" name="slug" value={config.slug} />
                      <input type="hidden" name="slot" value={slot} />
                      <button type="submit" style={ui.btn}>ri-tira</button>
                    </form>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Editor contenuti a campi */}
          <section style={ui.card}>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 16, marginTop: 0 }}>Contenuti</h2>
            <p style={{ fontSize: 12, color: '#9aa0ab', margin: '0 0 12px' }}>
              Modifica testi, immagini, camere, servizi… poi salva. Niente codice.
            </p>
            <ContentEditor config={config} uploads={uploads} saveAction={saveConfigAction} uploadAction={uploadImageAction} />
          </section>
        </div>

        {/* ── Colonna anteprima live ────────────────────────────────── */}
        <div style={{ flex: '2 1 520px', minWidth: 360, position: 'sticky', top: 16 }}>
          <section style={{ ...ui.card, padding: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px' }}>
              <span style={ui.label}>Anteprima live</span>
              <Link href={`/preview/${config.slug}`} target="_blank" style={{ fontSize: 13, color: '#1c5b6b' }}>
                a tutto schermo ↗
              </Link>
            </div>
            <iframe
              key={JSON.stringify(config)}
              src={`/preview/${config.slug}`}
              title="Anteprima"
              style={{ width: '100%', height: '78vh', border: '1px solid #e3e6ee', borderRadius: 8, background: '#fff' }}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
