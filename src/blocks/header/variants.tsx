import React from 'react';
import type { Variant } from '../variant';
import type { HeaderContent } from '../types';

// ── Header 01 · "caldo" — hero full-bleed con overlay, testo centrato ──────────
const Header01: React.FC<{ content: HeaderContent }> = ({ content }) => (
  <header
    style={{
      position: 'relative',
      minHeight: 'clamp(420px, 70vh, 720px)',
      display: 'flex',
      alignItems: 'flex-end',
      color: '#fff',
      overflow: 'hidden',
    }}
  >
    <img
      src={content.immagine.src}
      alt={content.immagine.alt}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.62))',
      }}
    />
    <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: 'clamp(24px,5vw,64px)', width: '100%' }}>
      {content.eyebrow ? (
        <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '.14em', fontSize: 13, color: 'var(--accent)' }}>
          {content.eyebrow}
        </p>
      ) : null}
      <h1 style={{ margin: '.2em 0', fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700, fontSize: 'clamp(34px,6vw,68px)', lineHeight: 1.05 }}>
        {content.struttura}
      </h1>
      <p style={{ margin: 0, maxWidth: 620, fontSize: 'clamp(16px,2.2vw,20px)', opacity: 0.92 }}>
        {content.sottotitolo}
      </p>
    </div>
  </header>
);

// ── Header 02 · "elegante" — split: testo a sinistra, immagine a destra ────────
const Header02: React.FC<{ content: HeaderContent }> = ({ content }) => (
  <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
    <div
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        gap: 'clamp(20px,4vw,56px)',
        padding: 'clamp(24px,4vw,56px)',
      }}
    >
      <div style={{ flex: '1 1 320px', minWidth: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {content.eyebrow ? (
          <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '.14em', fontSize: 13, color: 'var(--primary)' }}>
            {content.eyebrow}
          </p>
        ) : null}
        <h1 style={{ margin: '.25em 0', fontFamily: 'Fraunces, Georgia, serif', fontWeight: 600, fontSize: 'clamp(32px,5vw,60px)', lineHeight: 1.06, color: 'var(--ink)' }}>
          {content.struttura}
        </h1>
        <p style={{ margin: 0, fontSize: 'clamp(16px,2vw,19px)', color: 'var(--muted)', maxWidth: 520 }}>
          {content.sottotitolo}
        </p>
      </div>
      <div style={{ flex: '1 1 360px', minWidth: 300 }}>
        <img
          src={content.immagine.src}
          alt={content.immagine.alt}
          style={{ width: '100%', height: '100%', minHeight: 280, objectFit: 'cover', borderRadius: 14, border: '1px solid var(--line)' }}
        />
      </div>
    </div>
  </header>
);

// ── Header 03 · "any" — minimal: titolo grande, immagine a banda sotto ─────────
const Header03: React.FC<{ content: HeaderContent }> = ({ content }) => (
  <header style={{ background: 'var(--bg)' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(40px,7vw,96px) clamp(24px,5vw,48px) clamp(20px,3vw,32px)', textAlign: 'center' }}>
      {content.eyebrow ? (
        <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '.16em', fontSize: 13, color: 'var(--primary)' }}>
          {content.eyebrow}
        </p>
      ) : null}
      <h1 style={{ margin: '.25em 0', fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700, fontSize: 'clamp(36px,7vw,76px)', lineHeight: 1.02, color: 'var(--ink)' }}>
        {content.struttura}
      </h1>
      <p style={{ margin: '0 auto', maxWidth: 620, fontSize: 'clamp(16px,2.2vw,20px)', color: 'var(--muted)' }}>
        {content.sottotitolo}
      </p>
    </div>
    <img
      src={content.immagine.src}
      alt={content.immagine.alt}
      style={{ display: 'block', width: '100%', height: 'clamp(240px,40vh,460px)', objectFit: 'cover' }}
    />
  </header>
);

export const headerVariants: Variant<HeaderContent>[] = [
  { id: 'header-01', mood: 'caldo', Component: Header01 },
  { id: 'header-02', mood: 'elegante', Component: Header02 },
  { id: 'header-03', mood: 'any', Component: Header03 },
];
