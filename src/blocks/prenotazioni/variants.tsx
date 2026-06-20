import React from 'react';
import type { Variant } from '../variant';
import type { PrenotazioniContent } from '../types';

const sectionPadding = 'clamp(28px,4vw,56px) clamp(20px,5vw,48px)';
const titleFont = 'var(--font-head)';

// Bottone prenotazione: se c'è il numero WhatsApp apre la chat, altrimenti link generico.
const PrenotaButton: React.FC<{ whatsapp?: string }> = ({ whatsapp }) => {
  const digits = (whatsapp || '').replace(/[^0-9]/g, '');
  const href = digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent('Ciao! Vorrei verificare la disponibilità e prenotare.')}`
    : '#contatti';
  const label = digits ? 'Prenota subito su WhatsApp' : 'Prenota subito';
  return (
    <a
      href={href}
      target={digits ? '_blank' : undefined}
      rel={digits ? 'noreferrer' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: 'var(--cta)',
        color: '#fff',
        textDecoration: 'none',
        fontSize: 'clamp(0.95rem,1.4vw,1.05rem)',
        fontWeight: 600,
        padding: 'clamp(13px,1.5vw,17px) clamp(24px,3.2vw,36px)',
        borderRadius: 10,
        outlineOffset: 3,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M3 21l1.8-5.2A8.2 8.2 0 1 1 12 20.2a8.3 8.3 0 0 1-3.9-1L3 21z" />
        <path d="M8.6 8.4c.3-.7.6-.7.9-.7h.6c.2 0 .5 0 .7.6.3.7.8 2 .9 2.1.1.2.1.3 0 .5-.3.6-.6.8-.8 1-.2.2-.3.3-.1.6.6 1 1.3 1.6 2.3 2.1.3.2.5.1.6 0 .2-.2.7-.8.9-1 .2-.3.3-.2.6-.1.7.3 2 .9 2 .9.2.1.4.2.4.3.1.4.1.9-.1 1.4-.3.6-1.3 1.1-1.8 1.1-.9.1-1.7.1-3.6-.7-2.6-1.1-4.2-3.7-4.3-3.9-.1-.2-1-1.3-1-2.6 0-1.2.6-1.8.9-2.1z" />
      </svg>
      {label}
    </a>
  );
};

const Titolo: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <h2 style={{ fontFamily: titleFont, color: 'var(--ink)', fontWeight: 400, lineHeight: 1.1, margin: 0, ...style }}>{children}</h2>
);

// ── 01 · "caldo" — centrato e accogliente ─────────────────────────────────────
const Prenotazioni01: React.FC<{ content: PrenotazioniContent }> = ({ content }) => (
  <section id="prenota" style={{ background: 'var(--bg)', padding: sectionPadding }}>
    <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'clamp(14px,2.2vw,22px)' }}>
      {content.titolo && <Titolo style={{ fontSize: 'clamp(1.9rem,4.5vw,3rem)' }}>{content.titolo}</Titolo>}
      {content.testo && <p style={{ color: 'var(--muted)', fontSize: 'clamp(1rem,1.6vw,1.2rem)', lineHeight: 1.6, maxWidth: 620, margin: 0 }}>{content.testo}</p>}
      <PrenotaButton whatsapp={content.whatsapp} />
    </div>
  </section>
);

// ── 02 · "moderno" — banda su surface con bordo, testo + bottone ───────────────
const Prenotazioni02: React.FC<{ content: PrenotazioniContent }> = ({ content }) => (
  <section id="prenota" style={{ background: 'var(--surface)', padding: sectionPadding }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', border: '1px solid var(--line)', padding: 'clamp(24px,4vw,48px)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,3vw,40px)', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ flex: '1 1 360px', minWidth: 280 }}>
        {content.titolo && <Titolo style={{ fontSize: 'clamp(1.8rem,4vw,2.7rem)', borderLeft: '3px solid var(--primary)', paddingLeft: 'clamp(12px,1.5vw,18px)' }}>{content.titolo}</Titolo>}
        {content.testo && <p style={{ color: 'var(--muted)', fontSize: 'clamp(1rem,1.5vw,1.15rem)', lineHeight: 1.6, margin: 'clamp(12px,2vw,18px) 0 0' }}>{content.testo}</p>}
      </div>
      <PrenotaButton whatsapp={content.whatsapp} />
    </div>
  </section>
);

// ── 03 · "any" — banda piena primary, testo chiaro ────────────────────────────
const Prenotazioni03: React.FC<{ content: PrenotazioniContent }> = ({ content }) => (
  <section id="prenota" style={{ background: 'var(--primary)', color: '#fff', padding: sectionPadding }}>
    <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px,2.2vw,22px)' }}>
      {content.titolo && <Titolo style={{ color: '#fff', fontSize: 'clamp(1.9rem,4.5vw,3rem)' }}>{content.titolo}</Titolo>}
      {content.testo && <p style={{ color: 'rgba(255,255,255,.88)', fontSize: 'clamp(1rem,1.6vw,1.2rem)', lineHeight: 1.6, maxWidth: 620, margin: 0 }}>{content.testo}</p>}
      <PrenotaButton whatsapp={content.whatsapp} />
    </div>
  </section>
);

export const prenotazioniVariants: Variant<PrenotazioniContent>[] = [
  { id: 'prenotazioni-01', mood: 'caldo', Component: Prenotazioni01 },
  { id: 'prenotazioni-02', mood: 'moderno', Component: Prenotazioni02 },
  { id: 'prenotazioni-03', mood: 'any', Component: Prenotazioni03 },
];
