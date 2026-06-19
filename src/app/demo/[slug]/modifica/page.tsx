import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { storage } from '@/storage';
import { paletteList } from '@/schemes/palettes';
import { listImages } from '@/storage/images';
import { ContentEditor } from '@/app/admin/[slug]/ContentEditor';
import { saveDemoConfigAction, setDemoPaletteAction, uploadDemoImageAction } from '../actions';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function ModificaDemo({ params }: { params: { slug: string } }) {
  const config = await storage.getSiteConfig(params.slug);
  if (!config || !config.lead) notFound(); // solo siti demo
  const uploads = await listImages(params.slug);

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '20px', fontFamily: "'Hanken Grotesk', system-ui, sans-serif", color: '#1f2430' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 26, margin: 0 }}>Personalizza il tuo sito</h1>
          <p style={{ color: '#6b7280', margin: '4px 0 0', fontSize: 14 }}>Cambia testi, foto e colori. Poi salva e guarda il risultato.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href={`/demo/${params.slug}`} style={{ padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: 10, textDecoration: 'none', color: '#1c5b6b' }}>← Torna al sito</Link>
          <Link href={`/demo/${params.slug}/acquista`} style={{ padding: '10px 16px', background: '#C25E3C', color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>Acquista →</Link>
        </div>
      </div>

      {/* COLORI — selettore palette visivo */}
      <section style={{ background: '#fff', border: '1px solid #e3e6ee', borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 16, marginTop: 0 }}>Colori</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {paletteList.map((p) => {
            const active = p.id === config.schemeId;
            return (
              <form key={p.id} action={setDemoPaletteAction}>
                <input type="hidden" name="slug" value={params.slug} />
                <input type="hidden" name="schemeId" value={p.id} />
                <button type="submit" title={p.nome} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: active ? '2px solid #1c5b6b' : '1px solid #d1d5db', borderRadius: 999, background: '#fff', cursor: 'pointer', font: 'inherit', fontSize: 13 }}>
                  <span style={{ display: 'inline-flex' }}>
                    {(['--primary', '--cta', '--accent'] as const).map((t) => (
                      <span key={t} style={{ width: 16, height: 16, borderRadius: '50%', background: p.tokens[t], border: '1px solid rgba(0,0,0,.1)', marginLeft: t === '--primary' ? 0 : -5 }} />
                    ))}
                  </span>
                  {p.nome}{active ? ' ✓' : ''}
                </button>
              </form>
            );
          })}
        </div>
      </section>

      {/* CONTENUTI */}
      <section style={{ background: '#fff', border: '1px solid #e3e6ee', borderRadius: 12, padding: 16 }}>
        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 16, marginTop: 0 }}>Contenuti</h2>
        <p style={{ fontSize: 12, color: '#9aa0ab', margin: '0 0 12px' }}>Modifica testi, foto, camere, servizi… poi salva.</p>
        <ContentEditor config={config} uploads={uploads} saveAction={saveDemoConfigAction} uploadAction={uploadDemoImageAction} />
      </section>
    </main>
  );
}
