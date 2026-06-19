'use client';

import React, { useMemo, useState } from 'react';
import type { BlockInstance, SchemeId, SiteConfig } from '@/blocks/types';
import { paletteList, palettes } from '@/schemes/palettes';
import { ContentFields } from '@/app/admin/[slug]/ContentEditor';
import { LivePreview } from './LivePreview';

type SaveAction = (formData: FormData) => void | Promise<void>;
type UploadAction = (formData: FormData) => Promise<{ url?: string; error?: string }>;

// Studio split-screen: a sinistra il composer, a destra l'anteprima LIVE (testi + colori).
export function DemoStudio({ config, uploads, saveAction, uploadAction }: {
  config: SiteConfig; uploads: string[]; saveAction: SaveAction; uploadAction: UploadAction;
}) {
  const [blocks, setBlocks] = useState<BlockInstance[]>(config.blocks);
  const [schemeId, setSchemeId] = useState<SchemeId>(config.schemeId);

  const fullConfig = useMemo(
    () => ({ ...config, blocks, schemeId, mood: palettes[schemeId].mood }),
    [config, blocks, schemeId],
  );

  const swatch = (id: SchemeId) => {
    const active = id === schemeId;
    const p = palettes[id];
    return (
      <button
        key={id}
        type="button"
        title={p.nome}
        onClick={() => setSchemeId(id)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 11px', border: active ? '2px solid #1c5b6b' : '1px solid #d1d5db', borderRadius: 999, background: '#fff', cursor: 'pointer', font: 'inherit', fontSize: 13 }}
      >
        <span style={{ display: 'inline-flex' }}>
          {(['--primary', '--cta', '--accent'] as const).map((t) => (
            <span key={t} style={{ width: 15, height: 15, borderRadius: '50%', background: p.tokens[t], border: '1px solid rgba(0,0,0,.1)', marginLeft: t === '--primary' ? 0 : -5 }} />
          ))}
        </span>
        {p.nome}{active ? ' ✓' : ''}
      </button>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      {/* COMPOSER (sinistra) */}
      <div style={{ flex: '1 1 460px', minWidth: 340, maxWidth: 560, overflowY: 'auto', borderRight: '1px solid #e3e6ee', background: '#f6f7f9', padding: 16 }}>
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, margin: '0 0 2px' }}>Personalizza</h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '0 0 14px' }}>Le modifiche si vedono subito a destra. Salva quando sei soddisfatto.</p>

        <section style={{ background: '#fff', border: '1px solid #e3e6ee', borderRadius: 12, padding: 14, marginBottom: 12 }}>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 15, margin: '0 0 10px' }}>Colori</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {paletteList.map((p) => swatch(p.id))}
          </div>
        </section>

        <ContentFields blocks={blocks} onChange={setBlocks} uploads={uploads} uploadAction={uploadAction} slug={config.slug} />

        <form action={saveAction} style={{ position: 'sticky', bottom: 0, background: 'linear-gradient(to top, #f6f7f9 70%, rgba(246,247,249,0))', padding: '14px 0 6px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <input type="hidden" name="slug" value={config.slug} />
          <input type="hidden" name="config" value={JSON.stringify(fullConfig)} />
          <button type="submit" style={{ padding: '12px 20px', border: '1px solid #1c5b6b', borderRadius: 10, background: '#1c5b6b', color: '#fff', cursor: 'pointer', font: 'inherit', fontSize: 15, fontWeight: 700 }}>
            💾 Salva e pubblica le modifiche
          </button>
          <a href={`/demo/${config.slug}/acquista`} style={{ padding: '12px 18px', background: '#C25E3C', color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>Acquista →</a>
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
