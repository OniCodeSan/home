import React from 'react';
import type { Variant } from '../variant';
import type { HeaderContent } from '../types';

// Etichetta in MAIUSCOLO con letter-spacing — cifra stilistica Belle Époque.
const Eyebrow: React.FC<{ text?: string; color: string; align?: 'left' | 'center' }> = ({
  text,
  color,
  align = 'left',
}) =>
  text ? (
    <p
      style={{
        margin: 0,
        textTransform: 'uppercase',
        letterSpacing: '.14em',
        fontSize: 'clamp(11px, 1vw, 13px)',
        fontWeight: 500,
        color,
        textAlign: align,
      }}
    >
      {text}
    </p>
  ) : null;

// ── Header 01 · "caldo" — hero full-bleed, overlay sobrio, testo in basso ──────
const Header01: React.FC<{ content: HeaderContent }> = ({ content }) => (
  <header
    style={{
      position: 'relative',
      minHeight: 'clamp(480px, 82vh, 820px)',
      display: 'flex',
      alignItems: 'flex-end',
      color: '#fff',
      overflow: 'hidden',
      background: 'var(--ink)',
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
        background:
          'linear-gradient(180deg, rgba(0,0,0,.12) 0%, rgba(0,0,0,0) 32%, rgba(0,0,0,.58) 100%)',
      }}
    />
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1180,
        margin: '0 auto',
        padding: 'clamp(40px, 7vw, 96px) clamp(24px, 6vw, 80px)',
      }}
    >
      <Eyebrow text={content.eyebrow} color="#fff" />
      <h1
        style={{
          margin: '.36em 0 .28em',
          fontFamily: 'var(--font-head)',
          fontWeight: 500,
          fontSize: 'clamp(38px, 7.5vw, 88px)',
          lineHeight: 1.02,
          letterSpacing: '-0.01em',
          maxWidth: 16 + 'ch',
        }}
      >
        {content.struttura}
      </h1>
      <div
        style={{
          width: 'clamp(48px, 8vw, 96px)',
          height: 1,
          background: 'rgba(255,255,255,.55)',
          margin: '0 0 clamp(16px, 2vw, 26px)',
        }}
      />
      <p
        style={{
          margin: 0,
          maxWidth: 560,
          fontSize: 'clamp(16px, 2.1vw, 21px)',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,.9)',
        }}
      >
        {content.sottotitolo}
      </p>
    </div>
  </header>
);

// ── Header 02 · "elegante" — split editoriale, cornice sottile var(--line) ─────
const Header02: React.FC<{ content: HeaderContent }> = ({ content }) => (
  <header style={{ background: 'var(--bg)' }}>
    <div
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        gap: 'clamp(24px, 5vw, 80px)',
        padding: 'clamp(32px, 6vw, 96px) clamp(24px, 5vw, 72px)',
      }}
    >
      <div
        style={{
          flex: '1 1 380px',
          minWidth: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingRight: 'clamp(0px, 1vw, 16px)',
        }}
      >
        <Eyebrow text={content.eyebrow} color="var(--primary)" />
        <h1
          style={{
            margin: '.5em 0 .4em',
            fontFamily: 'var(--font-head)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 5.4vw, 72px)',
            lineHeight: 1.04,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
          }}
        >
          {content.struttura}
        </h1>
        <div
          style={{
            width: 'clamp(40px, 6vw, 72px)',
            height: 1,
            background: 'var(--line)',
            margin: '0 0 clamp(18px, 2.4vw, 30px)',
          }}
        />
        <p
          style={{
            margin: 0,
            maxWidth: 460,
            fontSize: 'clamp(16px, 1.9vw, 20px)',
            lineHeight: 1.65,
            color: 'var(--muted)',
          }}
        >
          {content.sottotitolo}
        </p>
      </div>
      <div style={{ flex: '1 1 440px', minWidth: 300, display: 'flex' }}>
        <div
          style={{
            position: 'relative',
            flex: 1,
            padding: 'clamp(8px, 1.2vw, 16px)',
            border: '1px solid var(--line)',
            background: 'var(--surface)',
          }}
        >
          <img
            src={content.immagine.src}
            alt={content.immagine.alt}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              minHeight: 'clamp(300px, 46vh, 540px)',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>
  </header>
);

// ── Header 03 · "any" — minimal centrato, grande titolo, banda immagine ───────
const Header03: React.FC<{ content: HeaderContent }> = ({ content }) => (
  <header style={{ background: 'var(--bg)' }}>
    <div
      style={{
        maxWidth: 960,
        margin: '0 auto',
        padding:
          'clamp(56px, 9vw, 128px) clamp(24px, 5vw, 56px) clamp(32px, 5vw, 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Eyebrow text={content.eyebrow} color="var(--primary)" align="center" />
      <h1
        style={{
          margin: '.44em 0 .34em',
          fontFamily: 'var(--font-head)',
          fontWeight: 500,
          fontSize: 'clamp(40px, 8vw, 96px)',
          lineHeight: 1.0,
          letterSpacing: '-0.015em',
          color: 'var(--ink)',
        }}
      >
        {content.struttura}
      </h1>
      <div
        style={{
          width: 'clamp(48px, 7vw, 88px)',
          height: 1,
          background: 'var(--line)',
          margin: '0 0 clamp(20px, 2.6vw, 32px)',
        }}
      />
      <p
        style={{
          margin: 0,
          maxWidth: 600,
          fontSize: 'clamp(16px, 2.2vw, 21px)',
          lineHeight: 1.65,
          color: 'var(--muted)',
        }}
      >
        {content.sottotitolo}
      </p>
    </div>
    <div
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: 'var(--surface)',
      }}
    >
      <img
        src={content.immagine.src}
        alt={content.immagine.alt}
        style={{
          display: 'block',
          width: '100%',
          height: 'clamp(280px, 52vh, 600px)',
          objectFit: 'cover',
        }}
      />
    </div>
  </header>
);

export const headerVariants: Variant<HeaderContent>[] = [
  { id: 'header-01', mood: 'caldo', Component: Header01 },
  { id: 'header-02', mood: 'elegante', Component: Header02 },
  { id: 'header-03', mood: 'any', Component: Header03 },
];
