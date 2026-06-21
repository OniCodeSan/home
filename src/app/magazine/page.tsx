import React from 'react';
import Link from 'next/link';
import { listArticles } from '@/storage/articles';
import { BRAND, SCRIPT, SUNSET, BC } from '@/lib/brand';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const metadata = { title: 'Magazine di viaggio · Saluti dal web' };

const body = "'Hanken Grotesk', system-ui, sans-serif";

export default async function MagazineHome() {
  const articles = await listArticles({ publishedOnly: true });
  const [hero, ...rest] = articles;

  return (
    <main style={{ fontFamily: body, color: BC.ink, background: BC.cream, minHeight: '100vh' }}>
      {/* header */}
      <header style={{ background: SUNSET, color: '#fff', padding: 'clamp(40px,7vw,84px) clamp(20px,5vw,48px)', textAlign: 'center' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '.2em', fontSize: 13, fontWeight: 700, margin: 0, opacity: 0.9 }}>Magazine di viaggio</p>
        <h1 style={{ fontFamily: SCRIPT, fontWeight: 400, fontSize: 'clamp(48px,9vw,92px)', margin: '8px 0 0', lineHeight: 1 }}>Saluti dal web</h1>
        <p style={{ maxWidth: 560, margin: '14px auto 0', fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,.92)' }}>
          Itinerari, consigli e storie per scoprire i luoghi più belli — e ispirare il tuo prossimo soggiorno.
        </p>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px,6vw,72px) clamp(20px,5vw,40px)' }}>
        {articles.length === 0 ? (
          <p style={{ textAlign: 'center', color: BC.muted }}>Presto i primi articoli. Torna a trovarci!</p>
        ) : (
          <>
            {/* articolo in evidenza */}
            {hero ? (
              <Link href={`/magazine/${hero.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', marginBottom: 'clamp(28px,5vw,52px)' }}>
                <article style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 'clamp(20px,3vw,36px)', alignItems: 'center', background: '#fff', borderRadius: 18, overflow: 'hidden', border: '1px solid #efe2d8' }}>
                  <div style={{ minHeight: 240, background: '#f0eef4' }}>
                    {hero.copertina ? <img src={hero.copertina} alt={hero.titolo} style={{ width: '100%', height: '100%', minHeight: 240, objectFit: 'cover', display: 'block' }} /> : null}
                  </div>
                  <div style={{ padding: 'clamp(20px,3vw,36px)' }}>
                    {hero.tags?.[0] ? <span style={tagStyle}>{hero.tags[0]}</span> : null}
                    <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(26px,3.6vw,40px)', lineHeight: 1.12, margin: '10px 0 8px' }}>{hero.titolo}</h2>
                    {hero.sommario ? <p style={{ color: BC.muted, fontSize: 16, lineHeight: 1.6, margin: 0 }}>{hero.sommario}</p> : null}
                    <span style={{ display: 'inline-block', marginTop: 14, color: BC.magenta, fontWeight: 700 }}>Leggi →</span>
                  </div>
                </article>
              </Link>
            ) : null}

            {/* griglia */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 'clamp(20px,3vw,32px)' }}>
              {rest.map((a) => (
                <Link key={a.slug} href={`/magazine/${a.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid #efe2d8', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: 180, background: '#f0eef4' }}>
                      {a.copertina ? <img src={a.copertina} alt={a.titolo} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} /> : null}
                    </div>
                    <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                      {a.tags?.[0] ? <span style={tagStyle}>{a.tags[0]}</span> : null}
                      <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 21, lineHeight: 1.18, margin: 0 }}>{a.titolo}</h3>
                      {a.sommario ? <p style={{ color: BC.muted, fontSize: 14, lineHeight: 1.55, margin: 0 }}>{a.sommario}</p> : null}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}

        <p style={{ textAlign: 'center', marginTop: 'clamp(32px,6vw,64px)' }}>
          <Link href="/" style={{ color: BC.magenta, fontWeight: 700 }}>← {BRAND}</Link>
        </p>
      </div>
    </main>
  );
}

const tagStyle: React.CSSProperties = {
  alignSelf: 'flex-start', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 11, fontWeight: 700,
  color: BC.magenta, background: '#fbe9f1', borderRadius: 999, padding: '4px 10px',
};
