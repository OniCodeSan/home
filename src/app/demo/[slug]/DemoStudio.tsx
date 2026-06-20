'use client';

import React, { useMemo, useState } from 'react';
import type { BlockInstance, SchemeId, SiteConfig } from '@/blocks/types';
import { paletteList, palettes } from '@/schemes/palettes';
import { registry } from '@/blocks/registry';
import { ContentFields } from '@/app/admin/[slug]/ContentEditor';
import { LivePreview } from './LivePreview';

type SaveAction = (formData: FormData) => void | Promise<void>;
type UploadAction = (formData: FormData) => Promise<{ url?: string; error?: string }>;

// Studio split-screen: composer a sinistra, anteprima LIVE a destra (testi + colori real-time).
// Usato sia dal cliente (/demo/[slug]/modifica) sia dall'admin (modalità admin).
export function DemoStudio({ config, uploads, saveAction, uploadAction, admin = false }: {
  config: SiteConfig; uploads: string[]; saveAction: SaveAction; uploadAction: UploadAction; admin?: boolean;
}) {
  const [blocks, setBlocks] = useState<BlockInstance[]>(config.blocks);
  const [schemeId, setSchemeId] = useState<SchemeId>(config.schemeId);
  const [status, setStatus] = useState<SiteConfig['status']>(config.status);

  const fullConfig = useMemo(
    () => ({ ...config, blocks, schemeId, status, mood: palettes[schemeId].mood }),
    [config, blocks, schemeId, status],
  );

  // reroll lato client: pesca una variante compatibile col mood della palette
  function rerollAll() {
    const mood = palettes[schemeId].mood;
    setBlocks((bs) => bs.map((b) => {
      const vs = registry[b.type] as { id: string; mood: string }[];
      const pool = vs.filter((v) => v.mood === mood || v.mood === 'any');
      const list = pool.length ? pool : vs;
      const pick = list[Math.floor(Math.random() * list.length)];
      return { ...b, variantId: pick.id } as BlockInstance;
    }));
  }

  const swatch = (id: SchemeId) => {
    const active = id === schemeId;
    const p = palettes[id];
    return (
      <button key={id} type="button" title={p.nome} onClick={() => setSchemeId(id)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 11px', border: active ? '2px solid #1c5b6b' : '1px solid #d1d5db', borderRadius: 999, background: '#fff', cursor: 'pointer', font: 'inherit', fontSize: 13 }}>
        <span style={{ display: 'inline-flex' }}>
          {(['--primary', '--cta', '--accent'] as const).map((t) => (
            <span key={t} style={{ width: 15, height: 15, borderRadius: '50%', background: p.tokens[t], border: '1px solid rgba(0,0,0,.1)', marginLeft: t === '--primary' ? 0 : -5 }} />
          ))}
        </span>
        {p.nome}{active ? ' ✓' : ''}
      </button>
    );
  };

  const btn: React.CSSProperties = { padding: '7px 12px', border: '1px solid #d1d5db', borderRadius: 8, background: '#fff', cursor: 'pointer', font: 'inherit', fontSize: 13 };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      {/* COMPOSER (sinistra) */}
      <div style={{ flex: '1 1 460px', minWidth: 340, maxWidth: 580, overflowY: 'auto', borderRight: '1px solid #e3e6ee', background: '#f6f7f9', padding: 16 }}>
        {admin ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
            <a href="/admin" style={{ color: '#1c5b6b', textDecoration: 'none', fontSize: 14 }}>← Siti</a>
            <strong style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18 }}>{config.slug}</strong>
            <select value={status} onChange={(e) => setStatus(e.target.value as SiteConfig['status'])} style={{ ...btn, padding: '6px 10px' }}>
              <option value="draft">Bozza</option>
              <option value="review">Review</option>
              <option value="published">Pubblicato</option>
            </select>
            {status === 'published' ? <a href={`/${config.slug}`} target="_blank" rel="noreferrer" style={{ color: '#1c5b6b', fontSize: 13 }}>apri ↗</a> : null}
          </div>
        ) : (
          <>
            <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, margin: '0 0 2px' }}>Personalizza</h1>
            <p style={{ color: '#6b7280', fontSize: 13, margin: '0 0 14px' }}>Le modifiche si vedono subito a destra. Salva quando sei soddisfatto.</p>
          </>
        )}

        <section style={{ background: '#fff', border: '1px solid #e3e6ee', borderRadius: 12, padding: 14, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 15, margin: 0 }}>Colori</h2>
            {admin ? <button type="button" onClick={rerollAll} style={btn}>🎲 Ri-tira layout</button> : null}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {paletteList.map((p) => swatch(p.id))}
          </div>
        </section>

        <ContentFields blocks={blocks} onChange={setBlocks} uploads={uploads} uploadAction={uploadAction} slug={config.slug} />

        <form action={saveAction} style={{ position: 'sticky', bottom: 0, background: 'linear-gradient(to top, #f6f7f9 70%, rgba(246,247,249,0))', padding: '14px 0 6px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <input type="hidden" name="slug" value={config.slug} />
          <input type="hidden" name="config" value={JSON.stringify(fullConfig)} />
          <button type="submit" style={{ padding: '12px 20px', border: '1px solid #1c5b6b', borderRadius: 10, background: '#1c5b6b', color: '#fff', cursor: 'pointer', font: 'inherit', fontSize: 15, fontWeight: 700 }}>
            💾 {admin ? 'Salva' : 'Salva e pubblica le modifiche'}
          </button>
          {admin ? null : <a href={`/demo/${config.slug}/acquista`} style={{ padding: '12px 18px', background: '#C25E3C', color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>Acquista →</a>}
        </form>
      </div>

      {/* ANTEPRIMA LIVE (destra) */}
      <div style={{ flex: '1 1 0', minWidth: 0, overflowY: 'auto', background: '#fff' }}>
        <LivePreview blocks={blocks} schemeId={schemeId} />
      </div>
    </div>
  );
}

export default DemoStudio;
