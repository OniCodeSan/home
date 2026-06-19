import React from 'react';
import type { Variant } from '../variant';
import type { CtaContent } from '../types';

// Helper interno: costruisce l'href in base al target.
function ctaHref(content: CtaContent): string {
  const { target, valore } = content;
  switch (target) {
    case 'whatsapp':
      return `https://wa.me/${(valore || '').replace(/[^0-9]/g, '')}`;
    case 'form':
      return `#${valore || 'form'}`;
    case 'calendar':
      return `#${valore || 'prenotazioni'}`;
    default:
      return '#';
  }
}

const serif = 'Fraunces, Georgia, serif';

// Stile base del bottone <a>. onColor = true quando il bottone sta sopra un fondo colorato.
function buttonStyle(): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    background: 'var(--cta)',
    color: '#fff',
    textDecoration: 'none',
    padding: 'clamp(14px,2vw,18px) clamp(24px,4vw,40px)',
    borderRadius: 999,
    fontSize: 'clamp(15px,1.6vw,18px)',
    fontWeight: 600,
    lineHeight: 1.1,
    transition: 'opacity .15s ease',
    whiteSpace: 'nowrap',
  };
}

// Variante 01 — "caldo": banda piena con background var(--primary) e testo #fff, centrata.
const Cta01: React.FC<{ content: CtaContent }> = ({ content }) => {
  const href = ctaHref(content);
  return (
    <section
      style={{
        background: 'var(--primary)',
        padding: 'clamp(40px,6vw,88px) clamp(20px,5vw,48px)',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'clamp(16px,2.5vw,24px)',
        }}
      >
        <h2
          style={{
            fontFamily: serif,
            color: '#fff',
            margin: 0,
            fontSize: 'clamp(28px,5vw,48px)',
            lineHeight: 1.1,
          }}
        >
          {content.titolo}
        </h2>
        {content.testo ? (
          <p
            style={{
              color: '#fff',
              opacity: 0.92,
              margin: 0,
              maxWidth: 640,
              fontSize: 'clamp(15px,2vw,19px)',
              lineHeight: 1.55,
            }}
          >
            {content.testo}
          </p>
        ) : null}
        <a href={href} style={buttonStyle()}>
          {content.label}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
};

// Variante 02 — "moderno": box centrato su var(--surface) con bordo var(--line).
const Cta02: React.FC<{ content: CtaContent }> = ({ content }) => {
  const href = ctaHref(content);
  return (
    <section
      style={{
        background: 'var(--bg)',
        padding: 'clamp(40px,6vw,88px) clamp(20px,5vw,48px)',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'clamp(16px,2vw,28px)',
            padding: 'clamp(28px,5vw,56px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'clamp(14px,2.5vw,22px)',
          }}
        >
          <h2
            style={{
              fontFamily: serif,
              color: 'var(--ink)',
              margin: 0,
              fontSize: 'clamp(26px,4.5vw,44px)',
              lineHeight: 1.1,
            }}
          >
            {content.titolo}
          </h2>
          {content.testo ? (
            <p
              style={{
                color: 'var(--muted)',
                margin: 0,
                maxWidth: 580,
                fontSize: 'clamp(15px,2vw,18px)',
                lineHeight: 1.55,
              }}
            >
              {content.testo}
            </p>
          ) : null}
          <a href={href} style={buttonStyle()}>
            {content.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// Variante 03 — "any": split testo-sinistra / bottone-destra, responsive via flex-wrap.
const Cta03: React.FC<{ content: CtaContent }> = ({ content }) => {
  const href = ctaHref(content);
  return (
    <section
      style={{
        background: 'var(--surface)',
        padding: 'clamp(40px,6vw,88px) clamp(20px,5vw,48px)',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(20px,4vw,48px)',
        }}
      >
        <div style={{ flex: '1 1 320px', minWidth: 280 }}>
          <h2
            style={{
              fontFamily: serif,
              color: 'var(--ink)',
              margin: 0,
              fontSize: 'clamp(26px,4.5vw,42px)',
              lineHeight: 1.1,
            }}
          >
            {content.titolo}
          </h2>
          {content.testo ? (
            <p
              style={{
                color: 'var(--muted)',
                margin: '12px 0 0',
                fontSize: 'clamp(15px,2vw,18px)',
                lineHeight: 1.55,
              }}
            >
              {content.testo}
            </p>
          ) : null}
        </div>
        <div style={{ flex: '0 0 auto', minWidth: 200 }}>
          <a href={href} style={buttonStyle()}>
            {content.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export const ctaVariants: Variant<CtaContent>[] = [
  { id: 'cta-01', mood: 'caldo', Component: Cta01 },
  { id: 'cta-02', mood: 'moderno', Component: Cta02 },
  { id: 'cta-03', mood: 'any', Component: Cta03 },
];
