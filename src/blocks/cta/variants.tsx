import React from 'react';
import type { Variant } from '../variant';
import type { CtaContent } from '../types';
import { HEAD, SECTION_PAD, Eyebrow, Rule } from '../_ui';

// href in base al target.
function ctaHref(content: CtaContent): string {
  const { target, valore } = content;
  if (target === 'whatsapp') {
    const d = (valore || '').replace(/[^0-9]/g, '');
    return d ? `https://wa.me/${d}?text=${encodeURIComponent('Ciao! Vorrei prenotare.')}` : '#prenota';
  }
  if (target === 'form') return `#${valore || 'contatti'}`;
  return `#${valore || 'prenota'}`;
}

const WaIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M3 21l1.8-5.2A8.2 8.2 0 1 1 12 20.2a8.3 8.3 0 0 1-3.9-1L3 21z" />
    <path d="M8.6 8.4c.3-.7.6-.7.9-.7h.6c.2 0 .5 0 .7.6.3.7.8 2 .9 2.1.1.2.1.3 0 .5-.3.6-.6.8-.8 1-.2.2-.3.3-.1.6.6 1 1.3 1.6 2.3 2.1.3.2.5.1.6 0 .2-.2.7-.8.9-1 .2-.3.3-.2.6-.1.7.3 2 .9 2 .9.2.1.4.2.4.3.1.4.1.9-.1 1.4-.3.6-1.3 1.1-1.8 1.1-.9.1-1.7.1-3.6-.7-2.6-1.1-4.2-3.7-4.3-3.9-.1-.2-1-1.3-1-2.6 0-1.2.6-1.8.9-2.1z" />
  </svg>
);

const Button: React.FC<{ content: CtaContent; onDark?: boolean }> = ({ content, onDark }) => {
  const wa = content.target === 'whatsapp';
  return (
    <a
      href={ctaHref(content)}
      target={wa ? '_blank' : undefined}
      rel={wa ? 'noreferrer' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: 'var(--cta)',
        color: '#fff',
        textDecoration: 'none',
        fontSize: 'clamp(15px,1.5vw,17px)',
        fontWeight: 600,
        padding: 'clamp(14px,1.6vw,18px) clamp(28px,3.4vw,42px)',
        borderRadius: 10,
        outlineOffset: 3,
        boxShadow: onDark ? 'none' : '0 14px 30px -16px var(--cta)',
        whiteSpace: 'nowrap',
      }}
    >
      {wa && <WaIcon />}
      {content.label}
      <span aria-hidden="true">→</span>
    </a>
  );
};

const Testo: React.FC<{ children?: string; light?: boolean; center?: boolean }> = ({ children, light, center }) =>
  children ? (
    <p style={{ margin: 0, maxWidth: 560, fontSize: 'clamp(15px,1.7vw,18px)', lineHeight: 1.65, color: light ? 'rgba(255,255,255,.9)' : 'var(--muted)', textAlign: center ? 'center' : 'left' }}>{children}</p>
  ) : null;

// ── 01 · "caldo" — banda piena, presenza forte, centrata ──────────────────────
const Cta01: React.FC<{ content: CtaContent }> = ({ content }) => (
  <section style={{ background: 'var(--primary)', color: '#fff', padding: 'clamp(48px,7vw,96px) clamp(20px,5vw,56px)' }}>
    <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'clamp(16px,2.4vw,24px)' }}>
      <Eyebrow light center>Il tuo soggiorno</Eyebrow>
      <Rule center light />
      <h2 style={{ fontFamily: HEAD, fontWeight: 400, lineHeight: 1.08, fontSize: 'clamp(30px,5vw,54px)', margin: 0 }}>{content.titolo}</h2>
      <Testo light center>{content.testo}</Testo>
      <div style={{ marginTop: 8 }}><Button content={content} onDark /></div>
    </div>
  </section>
);

// ── 02 · "moderno" — card con cornice, titolo a sx / bottone a dx ─────────────
const Cta02: React.FC<{ content: CtaContent }> = ({ content }) => (
  <section style={{ background: 'var(--bg)', padding: SECTION_PAD }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', background: 'var(--surface)', border: '1px solid var(--line)', padding: 'clamp(28px,4vw,52px)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,3vw,40px)', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ flex: '1 1 380px', minWidth: 280, display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.6vw,18px)' }}>
        <Eyebrow>Il tuo soggiorno</Eyebrow>
        <h2 style={{ fontFamily: HEAD, fontWeight: 400, lineHeight: 1.1, fontSize: 'clamp(26px,3.6vw,40px)', margin: 0, color: 'var(--ink)' }}>{content.titolo}</h2>
        <Testo>{content.testo}</Testo>
      </div>
      <Button content={content} />
    </div>
  </section>
);

// ── 03 · "any" — centrato su bg, bottone forte ────────────────────────────────
const Cta03: React.FC<{ content: CtaContent }> = ({ content }) => (
  <section style={{ background: 'var(--surface)', padding: 'clamp(44px,6vw,80px) clamp(20px,5vw,56px)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
    <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'clamp(14px,2.2vw,22px)' }}>
      <Eyebrow center>Il tuo soggiorno</Eyebrow>
      <h2 style={{ fontFamily: HEAD, fontWeight: 400, lineHeight: 1.1, fontSize: 'clamp(28px,4.4vw,48px)', margin: 0, color: 'var(--ink)' }}>{content.titolo}</h2>
      <Testo center>{content.testo}</Testo>
      <div style={{ marginTop: 8 }}><Button content={content} /></div>
    </div>
  </section>
);

// ── 04 · "elegante" — box centrato con cornice doppia sottile su bg ────────────
const Cta04: React.FC<{ content: CtaContent }> = ({ content }) => (
  <section style={{ background: 'var(--bg)', padding: SECTION_PAD }}>
    <div style={{ maxWidth: 820, margin: '0 auto', border: '1px solid var(--line)', padding: 'clamp(8px,1vw,14px)' }}>
      <div style={{ border: '1px solid var(--line)', padding: 'clamp(36px,5.5vw,72px) clamp(24px,5vw,60px)', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'clamp(16px,2.4vw,26px)' }}>
        <Eyebrow center>Il tuo soggiorno</Eyebrow>
        <h2 style={{ fontFamily: HEAD, fontWeight: 400, lineHeight: 1.12, fontSize: 'clamp(28px,4.4vw,46px)', margin: 0, color: 'var(--ink)' }}>{content.titolo}</h2>
        <Rule center />
        <Testo center>{content.testo}</Testo>
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}><Button content={content} /></div>
      </div>
    </div>
  </section>
);

export const ctaVariants: Variant<CtaContent>[] = [
  { id: 'cta-01', mood: 'caldo', Component: Cta01 },
  { id: 'cta-02', mood: 'moderno', Component: Cta02 },
  { id: 'cta-03', mood: 'any', Component: Cta03 },
  { id: 'cta-04', mood: 'elegante', Component: Cta04 },
];
