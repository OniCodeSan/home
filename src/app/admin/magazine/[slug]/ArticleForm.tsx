'use client';

import React, { useRef, useState } from 'react';
import type { Article } from '@/storage/articles';
import { saveArticleAction, deleteArticleAction } from '../actions';
import { uploadImageAction } from '../../actions';

const label: React.CSSProperties = { display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 4, fontWeight: 600 };
const input: React.CSSProperties = { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, font: 'inherit', fontSize: 14, marginBottom: 12 };

export function ArticleForm({ article, isNew }: { article: Article; isNew: boolean }) {
  const [copertina, setCopertina] = useState(article.copertina || '');
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.set('slug', 'magazine');
      fd.set('file', file);
      const res = await uploadImageAction(fd);
      if (res.url) setCopertina(res.url);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <form action={saveArticleAction} style={{ maxWidth: 820, margin: '0 auto' }}>
      {!isNew ? <input type="hidden" name="slug" value={article.slug} /> : null}

      <label style={label}>Titolo *</label>
      <input style={input} name="titolo" defaultValue={article.titolo} placeholder="Tre giorni a Sorrento" required />

      <label style={label}>Sommario</label>
      <input style={input} name="sommario" defaultValue={article.sommario || ''} placeholder="Cosa vedere, dove mangiare, consigli pratici." />

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={label}>Tag (separati da virgola)</label>
          <input style={input} name="tags" defaultValue={(article.tags || []).join(', ')} placeholder="Costiera, Itinerari" />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={label}>Autore</label>
          <input style={input} name="autore" defaultValue={article.autore || ''} placeholder="Redazione" />
        </div>
      </div>

      <label style={label}>Copertina</label>
      <input style={input} name="copertina" value={copertina} onChange={(e) => setCopertina(e.target.value)} placeholder="URL immagine" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <button type="button" onClick={() => fileRef.current?.click()} disabled={busy} style={{ padding: '8px 14px', border: '1px solid #d1d5db', borderRadius: 8, background: '#fff', cursor: 'pointer', font: 'inherit', fontSize: 13 }}>
          {busy ? 'Carico…' : '⬆ Carica copertina'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPick} />
        {copertina ? <img src={copertina} alt="" style={{ height: 54, width: 84, objectFit: 'cover', borderRadius: 6, border: '1px solid #e3e6ee' }} /> : null}
      </div>

      <label style={label}>Contenuto (Markdown: ## titoli, **grassetto**, - elenchi)</label>
      <textarea name="contenuto" defaultValue={article.contenuto} spellCheck={false}
        style={{ ...input, minHeight: 360, fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13, lineHeight: 1.6 }} />

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <select name="status" defaultValue={article.status} style={{ ...input, width: 'auto', marginBottom: 0 }}>
          <option value="draft">Bozza</option>
          <option value="published">Pubblicato</option>
        </select>
        <button type="submit" style={{ padding: '12px 22px', border: 'none', borderRadius: 10, background: '#C13C7B', color: '#fff', fontWeight: 700, cursor: 'pointer', font: 'inherit', fontSize: 15 }}>
          💾 Salva
        </button>
      </div>
      {/* nota: la generazione AI (Claude testo / OpenAI immagine) arriverà qui quando saranno configurate le API key */}
    </form>
  );
}

export function DeleteArticle({ slug }: { slug: string }) {
  return (
    <form action={deleteArticleAction}>
      <input type="hidden" name="slug" value={slug} />
      <button type="submit" style={{ padding: '8px 14px', border: '1px solid #e3b3b3', borderRadius: 8, background: '#fff', color: '#b34141', cursor: 'pointer', font: 'inherit', fontSize: 13 }}>Elimina</button>
    </form>
  );
}
