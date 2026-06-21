import React from 'react';
import Link from 'next/link';
import { listArticles } from '@/storage/articles';
import { ui } from '../ui';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function MagazineAdmin() {
  const articles = await listArticles();
  return (
    <main style={ui.page}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/admin" style={{ color: '#C13C7B', textDecoration: 'none' }}>← Admin</Link>
          <h1 style={{ ...ui.h1, margin: 0 }}>Magazine</h1>
        </div>
        <Link href="/admin/magazine/new" style={{ ...ui.btnPrimary, textDecoration: 'none' }}>+ Nuovo articolo</Link>
      </div>
      <p style={{ color: '#6b7280', marginTop: 4 }}>Articoli del magazine di viaggio (Saluti dal web).</p>

      {articles.length === 0 ? (
        <p style={{ color: '#9aa0ab', marginTop: 24 }}>Nessun articolo. Crea il primo con “Nuovo articolo”.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 16, display: 'grid', gap: 10 }}>
          {articles.map((a) => (
            <li key={a.slug} style={{ ...ui.card, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              {a.copertina ? <img src={a.copertina} alt="" style={{ width: 84, height: 56, objectFit: 'cover', borderRadius: 8, border: '1px solid #e3e6ee' }} /> : <div style={{ width: 84, height: 56, borderRadius: 8, background: '#f0eef4' }} />}
              <div style={{ flex: 1, minWidth: 200 }}>
                <Link href={`/admin/magazine/${a.slug}`} style={{ fontWeight: 700, color: '#241436', textDecoration: 'none' }}>{a.titolo}</Link>
                <div style={{ fontSize: 13, color: '#9aa0ab' }}>/{a.slug}</div>
              </div>
              <span style={ui.badge(a.status === 'published' ? 'published' : 'draft')}>{a.status === 'published' ? 'pubblicato' : 'bozza'}</span>
              {a.status === 'published' ? <Link href={`/magazine/${a.slug}`} target="_blank" style={{ fontSize: 13, color: '#C13C7B' }}>apri ↗</Link> : null}
              <Link href={`/admin/magazine/${a.slug}`} style={{ ...ui.btn, textDecoration: 'none' }}>Modifica</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
