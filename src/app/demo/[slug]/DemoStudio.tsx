'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { BlockInstance, SchemeId, SiteConfig } from '@/blocks/types';
import { paletteList, palettes } from '@/schemes/palettes';
import { fonts, fontList, DEFAULT_FONT, type FontId } from '@/schemes/fonts';
import { registry } from '@/blocks/registry';
import { ContentFields } from '@/app/admin/[slug]/ContentEditor';
import { LivePreview } from './LivePreview';

type SaveAction = (formData: FormData) => void | Promise<void>;
type UploadAction = (formData: FormData) => Promise<{ url?: string; error?: string }>;

// Studio: desktop = split-screen (composer + anteprima live). Mobile = schede (Modifica/Anteprima).
export function DemoStudio({ config, uploads, saveAction, uploadAction, admin = false }: {
  config: SiteConfig; uploads: string[]; saveAction: SaveAction; uploadAction: UploadAction; admin?: boolean;
}) {
  const [blocks, setBlocks] = useState<BlockInstance[]>(config.blocks);
  const [schemeId, setSchemeId] = useState<SchemeId>(config.schemeId);
  const [fontId, setFontId] = useState<FontId>((config.fontId as FontId) ?? DEFAULT_FONT);
  const [status, setStatus] = useState<SiteConfig['status']>(config.status);
  const [mobile, setMobile] = useState(false);
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)');
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const fullConfig = useMemo(
    () => ({ ...config, blocks, schemeId, fontId, status, mood: palettes[schemeId].mood }),
    [config, blocks, schemeId, fontId, status],
  );

  function rerollAll() {
    setBlocks((bs) => bs.map((b) => {
      const vs = registry[b.type] as { id: string }[];
      const altre = vs.filter((v) => v.id !== b.variantId);
      const pool = altre.length ? altre : vs;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      return { ...b, variantId: pick.id } as BlockInstance;
    }));
  }

  const swatch = (id: SchemeId) => {
    const active = id === schemeId;
    const p = palettes[id];
    return (
      <button key={id} type="button" title={p.nome} onClick={() => setSchemeId(id)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 11px', border: active ? '2px solid #C13C7B' : '1px solid #d1d5db', borderRadius: 999, background: '#fff', cursor: 'pointer', font: 'inherit', fontSize: 13 }}>
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

  // ── contenuto del composer (riusato in desktop e mobile) ────────────────────
  const composer = (
    <>
      {admin ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
          <a href="/admin" style={{ color: '#C13C7B', textDecoration: 'none', fontSize: 14 }}>← Siti</a>
          <strong style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18 }}>{config.slug}</strong>
          <select value={status} onChange={(e) => setStatus(e.target.value as SiteConfig['status'])} style={{ ...btn, padding: '6px 10px' }}>
            <option value="draft">Bozza</option>
            <option value="review">Review</option>
            <option value="published">Pubblicato</option>
          </select>
          {status === 'published' ? <a href={`/${config.slug}`} target="_blank" rel="noreferrer" style={{ color: '#C13C7B', fontSize: 13 }}>apri ↗</a> : null}
        </div>
      ) : (
        <>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, margin: '0 0 2px' }}>Personalizza</h1>
          <p style={{ color: '#6b7280', fontSize: 13, margin: '0 0 14px' }}>Modifica testi, foto, colori e font. Salva quando sei soddisfatto.</p>
        </>
      )}

      <section style={{ background: '#fff', border: '1px solid #e3e6ee', borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 15, margin: 0 }}>Colori</h2>
          {admin ? <button type="button" onClick={rerollAll} style={btn}>Ri-tira layout</button> : null}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {paletteList.map((p) => swatch(p.id))}
        </div>
      </section>

      <section style={{ background: '#fff', border: '1px solid #e3e6ee', borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 15, margin: '0 0 10px' }}>Font</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {fontList.map((f) => {
            const active = f.id === fontId;
            return (
              <button key={f.id} type="button" onClick={() => setFontId(f.id)}
                style={{ padding: '8px 12px', border: active ? '2px solid #C13C7B' : '1px solid #d1d5db', borderRadius: 10, background: '#fff', cursor: 'pointer', fontFamily: f.head, fontSize: 16 }}>
                {f.nome}{active ? ' ✓' : ''}
              </button>
            );
          })}
        </div>
      </section>

      <ContentFields blocks={blocks} onChange={setBlocks} uploads={uploads} uploadAction={uploadAction} slug={config.slug} />

      <form action={saveAction} style={{ position: 'sticky', bottom: 0, background: 'linear-gradient(to top, #f6f7f9 70%, rgba(246,247,249,0))', padding: '14px 0 6px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <input type="hidden" name="slug" value={config.slug} />
        <input type="hidden" name="config" value={JSON.stringify(fullConfig)} />
        <button type="submit" style={{ padding: '12px 20px', border: '1px solid #C13C7B', borderRadius: 10, background: '#C13C7B', color: '#fff', cursor: 'pointer', font: 'inherit', fontSize: 15, fontWeight: 700 }}>
          💾 {admin ? 'Salva' : 'Salva e pubblica le modifiche'}
        </button>
        {admin ? null : <a href={`/demo/${config.slug}/acquista`} style={{ padding: '12px 18px', background: '#241436', color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>Acquista →</a>}
      </form>
    </>
  );

  const preview = <LivePreview blocks={blocks} schemeId={schemeId} fontId={fontId} />;

  // ── MOBILE: schede Modifica / Anteprima ─────────────────────────────────────
  if (mobile) {
    const tabStyle = (on: boolean): React.CSSProperties => ({
      flex: 1, padding: '14px 8px', border: 'none', background: '#fff', cursor: 'pointer',
      font: 'inherit', fontSize: 15, fontWeight: on ? 700 : 500, color: on ? '#C13C7B' : '#6b7280',
      borderBottom: on ? '2px solid #C13C7B' : '2px solid transparent',
    });
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 30, display: 'flex', background: '#fff', borderBottom: '1px solid #e3e6ee' }}>
          <button type="button" onClick={() => setTab('edit')} style={tabStyle(tab === 'edit')}>Modifica</button>
          <button type="button" onClick={() => setTab('preview')} style={tabStyle(tab === 'preview')}>Anteprima</button>
        </div>
        {tab === 'edit'
          ? <div style={{ padding: 16, background: '#f6f7f9' }}>{composer}</div>
          : <div style={{ background: '#fff' }}>{preview}</div>}
      </div>
    );
  }

  // ── DESKTOP: split-screen (invariato) ───────────────────────────────────────
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      <div style={{ flex: '1 1 460px', minWidth: 340, maxWidth: 580, overflowY: 'auto', borderRight: '1px solid #e3e6ee', background: '#f6f7f9', padding: 16 }}>
        {composer}
      </div>
      <div style={{ flex: '1 1 0', minWidth: 0, overflowY: 'auto', background: '#fff' }}>
        {preview}
      </div>
    </div>
  );
}

export default DemoStudio;
