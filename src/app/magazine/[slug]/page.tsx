import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticle } from '@/storage/articles';
import { renderMarkdown } from '@/lib/markdown';
import { BRAND, SUNSET, BC } from '@/lib/brand';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const a = await getArticle(params.slug);
  return { title: a ? `${a.titolo} · Magazine Saluti dal web` : 'Magazine' };
}

const body = "'Hanken Grotesk', system-ui, sans-serif";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const a = await getArticle(params.slug);
  if (!a || a.status !== 'published') notFound();

  const html = renderMarkdown(a.contenuto);

  return (
    <main style={{ fontFamily: body, color: BC.ink, background: '#fff', minHeight: '100vh' }}>
      {/* hero copertina */}
      <header style={{ position: 'relative', background: SUNSET, color: '#fff' }}>
        {a.copertina ? (
          <>
            <img src={a.copertina} alt={a.titolo} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(36,20,54,.35), rgba(36,20,54,.78))' }} />
          </>
        ) : null}
        <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(56px,12vw,140px) clamp(20px,5vw,32px) clamp(36px,6vw,64px)' }}>
          {a.tags?.[0] ? <span style={{ textTransform: 'uppercase', letterSpacing: '.16em', fontSize: 12, fontWeight: 700, color: '#fff', opacity: 0.9 }}>{a.tags.join(' · ')}</span> : null}
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 600, fontSize: 'clamp(32px,6vw,60px)', lineHeight: 1.06, margin: '10px 0 0' }}>{a.titolo}</h1>
          {a.autore ? <p style={{ marginTop: 14, fontSize: 14, opacity: 0.9 }}>di {a.autore}</p> : null}
        </div>
      </header>

      {/* corpo */}
      <article
        style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(32px,6vw,64px) clamp(20px,5vw,28px)', fontSize: 'clamp(16px,2vw,18px)', lineHeight: 1.8, color: '#2c2336' }}
      >
        {a.sommario ? <p style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.6, color: BC.purple, fontWeight: 500, marginTop: 0 }}>{a.sommario}</p> : null}
        <div className="cm-article" dangerouslySetInnerHTML={{ __html: html }} />
        <p style={{ marginTop: 48, borderTop: '1px solid #efe2d8', paddingTop: 24 }}>
          <Link href="/magazine" style={{ color: BC.magenta, fontWeight: 700 }}>← Torna al Magazine</Link>
        </p>
      </article>

      <style dangerouslySetInnerHTML={{ __html: `
        .cm-article h2{font-family:Fraunces,Georgia,serif;font-size:clamp(22px,3.4vw,30px);line-height:1.2;margin:1.6em 0 .4em;color:#241436}
        .cm-article h3{font-family:Fraunces,Georgia,serif;font-size:clamp(19px,2.6vw,24px);margin:1.4em 0 .3em;color:#241436}
        .cm-article p{margin:0 0 1.1em}
        .cm-article ul{margin:0 0 1.1em 1.1em;padding:0}
        .cm-article li{margin:.3em 0}
        .cm-article a{color:#C13C7B}
      ` }} />

      <footer style={{ background: BC.ink, color: 'rgba(255,255,255,.75)', textAlign: 'center', padding: '24px 20px', fontFamily: body }}>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>{BRAND}</Link>
        <span style={{ opacity: 0.5, margin: '0 8px' }}>·</span>
        <a href="/privacy" style={{ color: '#F2A65A' }}>Privacy</a>
        <span style={{ opacity: 0.5, margin: '0 8px' }}>·</span>
        <a href="/cookie-policy" style={{ color: '#F2A65A' }}>Cookie</a>
      </footer>
    </main>
  );
}
