'use client';

import React, { useMemo, useRef, useState } from 'react';
import type { BlockInstance, SiteConfig } from '@/blocks/types';

type SaveAction = (formData: FormData) => void | Promise<void>;
type UploadAction = (formData: FormData) => Promise<{ url?: string; error?: string }>;

// ── stili locali dell'editor (UI di servizio) ──────────────────────────────
const s = {
  block: { border: '1px solid #e3e6ee', borderRadius: 10, padding: 14, marginBottom: 12, background: '#fff' } as React.CSSProperties,
  blockTitle: { fontFamily: 'Fraunces, Georgia, serif', fontSize: 16, margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 8 } as React.CSSProperties,
  label: { display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 4 } as React.CSSProperties,
  input: { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 8, font: 'inherit', fontSize: 14 } as React.CSSProperties,
  row: { display: 'flex', gap: 10, flexWrap: 'wrap' as const, marginBottom: 10 },
  col: { flex: '1 1 200px', minWidth: 160 },
  item: { border: '1px dashed #d1d5db', borderRadius: 8, padding: 12, marginBottom: 10, background: '#fafbfc' } as React.CSSProperties,
  btn: { padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: 8, background: '#fff', cursor: 'pointer', font: 'inherit', fontSize: 13 } as React.CSSProperties,
  btnDanger: { padding: '4px 10px', border: '1px solid #e3b3b3', borderRadius: 8, background: '#fff', color: '#b34141', cursor: 'pointer', font: 'inherit', fontSize: 12 } as React.CSSProperties,
  btnPrimary: { padding: '10px 18px', border: '1px solid #1c5b6b', borderRadius: 8, background: '#1c5b6b', color: '#fff', cursor: 'pointer', font: 'inherit', fontSize: 14, fontWeight: 600 } as React.CSSProperties,
};

// ── campi riusabili ────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={s.col}>
      <span style={s.label}>{label}</span>
      {children}
    </label>
  );
}

function Text({ value, onChange, placeholder, list }: {
  value: string; onChange: (v: string) => void; placeholder?: string; list?: string;
}) {
  return (
    <input
      style={s.input}
      value={value ?? ''}
      placeholder={placeholder}
      list={list}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function Area({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <textarea
      style={{ ...s.input, minHeight: 64, resize: 'vertical' }}
      value={value ?? ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function ImageFields({ value, onChange, uploads, slug, uploadAction, optional, label = 'Immagine' }: {
  value?: { src: string; alt: string };
  onChange: (v: { src: string; alt: string } | undefined) => void;
  uploads: string[];
  slug: string;
  uploadAction: UploadAction;
  optional?: boolean;
  label?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setErr(null);
    try {
      const fd = new FormData();
      fd.set('slug', slug);
      fd.set('file', file);
      const res = await uploadAction(fd);
      if (res.error) setErr(res.error);
      else if (res.url) onChange({ src: res.url, alt: (value?.alt || file.name.replace(/\.[^.]+$/, '')) });
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : 'Upload fallito');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  if (optional && !value) {
    return (
      <div>
        <button type="button" style={s.btn} onClick={() => onChange({ src: uploads[0] ?? '', alt: '' })}>
          + Aggiungi {label.toLowerCase()}
        </button>
        <button type="button" style={{ ...s.btn, marginLeft: 8 }} disabled={busy} onClick={() => fileRef.current?.click()}>
          {busy ? 'Carico…' : '⬆ Carica foto'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPick} />
        {err ? <span style={{ color: '#b34141', fontSize: 12, marginLeft: 8 }}>{err}</span> : null}
      </div>
    );
  }
  const v = value ?? { src: '', alt: '' };
  return (
    <div>
      <div style={{ ...s.row, marginBottom: 8, alignItems: 'end' }}>
        <Field label={`${label} · file`}>
          <Text value={v.src} list="uploads-list" placeholder="/uploads/… o URL" onChange={(src) => onChange({ ...v, src })} />
        </Field>
        <Field label={`${label} · testo alternativo`}>
          <Text value={v.alt} placeholder="descrizione foto" onChange={(alt) => onChange({ ...v, alt })} />
        </Field>
        <button type="button" style={{ ...s.btn, marginBottom: 2 }} disabled={busy} onClick={() => fileRef.current?.click()}>
          {busy ? 'Carico…' : '⬆ Carica'}
        </button>
        {optional ? (
          <button type="button" style={{ ...s.btnDanger, marginBottom: 2 }} onClick={() => onChange(undefined)}>
            rimuovi
          </button>
        ) : null}
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPick} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {v.src ? <img src={v.src} alt="" style={{ height: 48, width: 72, objectFit: 'cover', borderRadius: 6, border: '1px solid #e3e6ee' }} /> : null}
        {err ? <span style={{ color: '#b34141', fontSize: 12 }}>{err}</span> : null}
      </div>
    </div>
  );
}

const ICONE = ['wifi', 'ac', 'breakfast', 'parking', 'terrace', 'pets', 'pool', 'spa', 'bar', 'check'];

// ── Campi dell'editor (CONTROLLATO: stato gestito dal genitore) ─────────────
export function ContentFields({ blocks, onChange, uploads, uploadAction, slug }: {
  blocks: BlockInstance[];
  onChange: (blocks: BlockInstance[]) => void;
  uploads: string[];
  uploadAction: UploadAction;
  slug: string;
}) {
  function patch<T extends BlockInstance['type']>(type: T, updater: (content: any) => any) {
    onChange(blocks.map((b) => (b.type === type ? ({ ...b, content: updater(b.content) } as BlockInstance) : b)));
  }
  function content<T extends BlockInstance['type']>(type: T): any {
    return blocks.find((b) => b.type === type)!.content;
  }

  const h = content('header');
  const pr = content('prenotazioni');
  const st = content('stanze');
  const ct = content('cta');
  const vi = content('vicinanze');
  const co = content('confort');
  const co2 = content('contatti');
  const fo = content('footer');
  const config = { slug };

  return (
    <>
      <datalist id="uploads-list">
        {uploads.map((u) => <option key={u} value={u} />)}
      </datalist>

      {/* HEADER */}
      <section style={s.block}>
        <h3 style={s.blockTitle}>🏠 Intestazione</h3>
        <div style={s.row}>
          <Field label="Etichetta (es. B&B · Sorrento)"><Text value={h.eyebrow} onChange={(v) => patch('header', (c) => ({ ...c, eyebrow: v }))} /></Field>
          <Field label="Nome struttura"><Text value={h.struttura} onChange={(v) => patch('header', (c) => ({ ...c, struttura: v }))} /></Field>
        </div>
        <div style={{ marginBottom: 10 }}>
          <span style={s.label}>Sottotitolo</span>
          <Area value={h.sottotitolo} onChange={(v) => patch('header', (c) => ({ ...c, sottotitolo: v }))} />
        </div>
        <ImageFields value={h.immagine} uploads={uploads} slug={config.slug} uploadAction={uploadAction} onChange={(img) => patch('header', (c) => ({ ...c, immagine: img ?? { src: '', alt: '' } }))} />
      </section>

      {/* PRENOTAZIONI */}
      <section style={s.block}>
        <h3 style={s.blockTitle}>📅 Prenotazioni</h3>
        <div style={s.row}>
          <Field label="Titolo"><Text value={pr.titolo} onChange={(v) => patch('prenotazioni', (c) => ({ ...c, titolo: v }))} /></Field>
        </div>
        <div style={{ marginBottom: 10 }}>
          <span style={s.label}>Testo</span>
          <Area value={pr.testo} onChange={(v) => patch('prenotazioni', (c) => ({ ...c, testo: v }))} />
        </div>
        <div style={s.row}>
          <Field label="Numero WhatsApp per il bottone 'Prenota'"><Text value={pr.whatsapp} placeholder="+39 ..." onChange={(v) => patch('prenotazioni', (c) => ({ ...c, whatsapp: v }))} /></Field>
        </div>
      </section>

      {/* STANZE */}
      <section style={s.block}>
        <h3 style={s.blockTitle}>🛏️ Camere</h3>
        <div style={s.row}>
          <Field label="Titolo sezione"><Text value={st.titolo} onChange={(v) => patch('stanze', (c) => ({ ...c, titolo: v }))} /></Field>
          <Field label="Introduzione"><Text value={st.intro} onChange={(v) => patch('stanze', (c) => ({ ...c, intro: v }))} /></Field>
        </div>
        {(st.camere ?? []).map((cam: any, i: number) => (
          <div key={i} style={s.item}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <strong style={{ fontSize: 13 }}>Camera {i + 1}</strong>
              <button type="button" style={s.btnDanger} onClick={() => patch('stanze', (c) => ({ ...c, camere: c.camere.filter((_: any, j: number) => j !== i) }))}>rimuovi</button>
            </div>
            <div style={s.row}>
              <Field label="Nome"><Text value={cam.nome} onChange={(v) => patch('stanze', (c) => ({ ...c, camere: c.camere.map((x: any, j: number) => j === i ? { ...x, nome: v } : x) }))} /></Field>
              <Field label="Prezzo indicativo (es. da 89€)"><Text value={cam.prezzoIndicativo} onChange={(v) => patch('stanze', (c) => ({ ...c, camere: c.camere.map((x: any, j: number) => j === i ? { ...x, prezzoIndicativo: v } : x) }))} /></Field>
            </div>
            <div style={{ marginBottom: 10 }}>
              <span style={s.label}>Descrizione</span>
              <Area value={cam.descrizione} onChange={(v) => patch('stanze', (c) => ({ ...c, camere: c.camere.map((x: any, j: number) => j === i ? { ...x, descrizione: v } : x) }))} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <span style={s.label}>Caratteristiche (separate da virgola)</span>
              <Text value={(cam.caratteristiche ?? []).join(', ')} placeholder="Vista mare, Bagno privato" onChange={(v) => patch('stanze', (c) => ({ ...c, camere: c.camere.map((x: any, j: number) => j === i ? { ...x, caratteristiche: v.split(',').map((t) => t.trim()).filter(Boolean) } : x) }))} />
            </div>
            <ImageFields optional value={cam.immagine} uploads={uploads} slug={config.slug} uploadAction={uploadAction} onChange={(img) => patch('stanze', (c) => ({ ...c, camere: c.camere.map((x: any, j: number) => j === i ? { ...x, immagine: img } : x) }))} />
            <div style={{ marginTop: 10 }}>
              <span style={s.label}>Altre foto (galleria)</span>
              {(cam.immagini ?? []).map((im: any, k: number) => (
                <div key={k} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <ImageFields value={im} uploads={uploads} slug={config.slug} uploadAction={uploadAction} onChange={(img) => patch('stanze', (c) => ({ ...c, camere: c.camere.map((x: any, j: number) => j === i ? { ...x, immagini: (x.immagini ?? []).map((y: any, z: number) => z === k ? (img ?? { src: '', alt: '' }) : y) } : x) }))} />
                  </div>
                  <button type="button" style={s.btnDanger} onClick={() => patch('stanze', (c) => ({ ...c, camere: c.camere.map((x: any, j: number) => j === i ? { ...x, immagini: (x.immagini ?? []).filter((_: any, z: number) => z !== k) } : x) }))}>rimuovi</button>
                </div>
              ))}
              <button type="button" style={s.btn} onClick={() => patch('stanze', (c) => ({ ...c, camere: c.camere.map((x: any, j: number) => j === i ? { ...x, immagini: [...(x.immagini ?? []), { src: '', alt: '' }] } : x) }))}>+ Aggiungi foto</button>
            </div>
          </div>
        ))}
        <button type="button" style={s.btn} onClick={() => patch('stanze', (c) => ({ ...c, camere: [...(c.camere ?? []), { nome: 'Nuova camera', descrizione: '' }] }))}>+ Aggiungi camera</button>
      </section>

      {/* CTA */}
      <section style={s.block}>
        <h3 style={s.blockTitle}>📣 Invito all'azione</h3>
        <div style={s.row}>
          <Field label="Titolo"><Text value={ct.titolo} onChange={(v) => patch('cta', (c) => ({ ...c, titolo: v }))} /></Field>
          <Field label="Etichetta bottone (es. Prenota ora)"><Text value={ct.label} onChange={(v) => patch('cta', (c) => ({ ...c, label: v }))} /></Field>
        </div>
        <div style={{ marginBottom: 10 }}>
          <span style={s.label}>Testo</span>
          <Area value={ct.testo} onChange={(v) => patch('cta', (c) => ({ ...c, testo: v }))} />
        </div>
        <div style={s.row}>
          <Field label="Destinazione">
            <select style={s.input} value={ct.target} onChange={(e) => patch('cta', (c) => ({ ...c, target: e.target.value }))}>
              <option value="whatsapp">WhatsApp</option>
              <option value="form">Modulo</option>
              <option value="calendar">Calendario</option>
            </select>
          </Field>
          <Field label="Valore (numero WhatsApp o ancora)"><Text value={ct.valore} onChange={(v) => patch('cta', (c) => ({ ...c, valore: v }))} /></Field>
        </div>
      </section>

      {/* VICINANZE */}
      <section style={s.block}>
        <h3 style={s.blockTitle}>📍 Nei dintorni</h3>
        <div style={s.row}>
          <Field label="Titolo sezione"><Text value={vi.titolo} onChange={(v) => patch('vicinanze', (c) => ({ ...c, titolo: v }))} /></Field>
          <Field label="Introduzione"><Text value={vi.intro} onChange={(v) => patch('vicinanze', (c) => ({ ...c, intro: v }))} /></Field>
        </div>
        {(vi.luoghi ?? []).map((lu: any, i: number) => (
          <div key={i} style={s.item}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <strong style={{ fontSize: 13 }}>Luogo {i + 1}</strong>
              <button type="button" style={s.btnDanger} onClick={() => patch('vicinanze', (c) => ({ ...c, luoghi: c.luoghi.filter((_: any, j: number) => j !== i) }))}>rimuovi</button>
            </div>
            <div style={s.row}>
              <Field label="Nome"><Text value={lu.nome} onChange={(v) => patch('vicinanze', (c) => ({ ...c, luoghi: c.luoghi.map((x: any, j: number) => j === i ? { ...x, nome: v } : x) }))} /></Field>
              <Field label="Distanza (es. 5 min a piedi)"><Text value={lu.distanza} onChange={(v) => patch('vicinanze', (c) => ({ ...c, luoghi: c.luoghi.map((x: any, j: number) => j === i ? { ...x, distanza: v } : x) }))} /></Field>
            </div>
            <div style={{ marginBottom: 10 }}>
              <span style={s.label}>Descrizione</span>
              <Area value={lu.descrizione} onChange={(v) => patch('vicinanze', (c) => ({ ...c, luoghi: c.luoghi.map((x: any, j: number) => j === i ? { ...x, descrizione: v } : x) }))} />
            </div>
            <ImageFields optional value={lu.immagine} uploads={uploads} slug={config.slug} uploadAction={uploadAction} onChange={(img) => patch('vicinanze', (c) => ({ ...c, luoghi: c.luoghi.map((x: any, j: number) => j === i ? { ...x, immagine: img } : x) }))} />
          </div>
        ))}
        <button type="button" style={s.btn} onClick={() => patch('vicinanze', (c) => ({ ...c, luoghi: [...(c.luoghi ?? []), { nome: 'Nuovo luogo' }] }))}>+ Aggiungi luogo</button>
      </section>

      {/* CONFORT */}
      <section style={s.block}>
        <h3 style={s.blockTitle}>✨ Servizi e comfort</h3>
        <div style={s.row}>
          <Field label="Titolo sezione"><Text value={co.titolo} onChange={(v) => patch('confort', (c) => ({ ...c, titolo: v }))} /></Field>
        </div>
        {(co.servizi ?? []).map((srv: any, i: number) => (
          <div key={i} style={{ ...s.row, alignItems: 'end', marginBottom: 8 }}>
            <Field label="Icona">
              <select style={s.input} value={srv.icona} onChange={(e) => patch('confort', (c) => ({ ...c, servizi: c.servizi.map((x: any, j: number) => j === i ? { ...x, icona: e.target.value } : x) }))}>
                {ICONE.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </Field>
            <Field label="Etichetta"><Text value={srv.label} onChange={(v) => patch('confort', (c) => ({ ...c, servizi: c.servizi.map((x: any, j: number) => j === i ? { ...x, label: v } : x) }))} /></Field>
            <button type="button" style={{ ...s.btnDanger, marginBottom: 2 }} onClick={() => patch('confort', (c) => ({ ...c, servizi: c.servizi.filter((_: any, j: number) => j !== i) }))}>rimuovi</button>
          </div>
        ))}
        <button type="button" style={s.btn} onClick={() => patch('confort', (c) => ({ ...c, servizi: [...(c.servizi ?? []), { icona: 'check', label: 'Nuovo servizio' }] }))}>+ Aggiungi servizio</button>
      </section>

      {/* CONTATTI */}
      <section style={s.block}>
        <h3 style={s.blockTitle}>☎️ Contatti</h3>
        <div style={s.row}>
          <Field label="Telefono"><Text value={co2.telefono} onChange={(v) => patch('contatti', (c) => ({ ...c, telefono: v }))} /></Field>
          <Field label="WhatsApp"><Text value={co2.whatsapp} onChange={(v) => patch('contatti', (c) => ({ ...c, whatsapp: v }))} /></Field>
          <Field label="Email"><Text value={co2.email} onChange={(v) => patch('contatti', (c) => ({ ...c, email: v }))} /></Field>
        </div>
        <div style={{ marginBottom: 10 }}>
          <span style={s.label}>Indirizzo</span>
          <Text value={co2.indirizzo} onChange={(v) => patch('contatti', (c) => ({ ...c, indirizzo: v }))} />
        </div>
        <div style={{ marginBottom: 0 }}>
          <span style={s.label}>URL mappa da incorporare (Google Maps → Condividi → Incorpora)</span>
          <Text value={co2.mappaEmbed} placeholder="https://www.google.com/maps?q=...&output=embed" onChange={(v) => patch('contatti', (c) => ({ ...c, mappaEmbed: v }))} />
        </div>
      </section>

      {/* FOOTER */}
      <section style={s.block}>
        <h3 style={s.blockTitle}>📄 Piè di pagina</h3>
        <div style={s.row}>
          <Field label="Ragione sociale"><Text value={fo.ragioneSociale} onChange={(v) => patch('footer', (c) => ({ ...c, ragioneSociale: v }))} /></Field>
          <Field label="P.IVA"><Text value={fo.piva} onChange={(v) => patch('footer', (c) => ({ ...c, piva: v }))} /></Field>
        </div>
        <div style={s.row}>
          <Field label="Email"><Text value={fo.email} onChange={(v) => patch('footer', (c) => ({ ...c, email: v }))} /></Field>
          <Field label="Telefono"><Text value={fo.telefono} onChange={(v) => patch('footer', (c) => ({ ...c, telefono: v }))} /></Field>
        </div>
        <div style={{ marginBottom: 10 }}>
          <span style={s.label}>Indirizzo</span>
          <Text value={fo.indirizzo} onChange={(v) => patch('footer', (c) => ({ ...c, indirizzo: v }))} />
        </div>
        <div style={{ marginBottom: 0 }}>
          <span style={s.label}>Note (es. CIR, diritti riservati)</span>
          <Text value={fo.note} onChange={(v) => patch('footer', (c) => ({ ...c, note: v }))} />
        </div>
      </section>

    </>
  );
}

// ── editor con form (usato dall'admin: stato interno + salvataggio) ─────────
export function ContentEditor({ config, uploads, saveAction, uploadAction }: {
  config: SiteConfig; uploads: string[]; saveAction: SaveAction; uploadAction: UploadAction;
}) {
  const [blocks, setBlocks] = useState<BlockInstance[]>(config.blocks);
  const fullConfig = useMemo(() => ({ ...config, blocks }), [config, blocks]);

  return (
    <form action={saveAction}>
      <input type="hidden" name="slug" value={config.slug} />
      <input type="hidden" name="config" value={JSON.stringify(fullConfig)} />
      <ContentFields blocks={blocks} onChange={setBlocks} uploads={uploads} uploadAction={uploadAction} slug={config.slug} />
      <div style={{ position: 'sticky', bottom: 0, background: 'linear-gradient(to top, #f6f7f9, rgba(246,247,249,0))', padding: '12px 0' }}>
        <button type="submit" style={s.btnPrimary}>💾 Salva tutte le modifiche</button>
        <span style={{ marginLeft: 12, fontSize: 12, color: '#9aa0ab' }}>L'anteprima si aggiorna dopo il salvataggio.</span>
      </div>
    </form>
  );
}

export default ContentEditor;
