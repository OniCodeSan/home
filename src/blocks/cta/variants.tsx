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

// Stile editoriale Belle Époque: titoli serif, label maiuscolo spaziato, CTA sobri.
const headFont = 'var(--font-head)';

// Label sopra-titolo in MAIUSCOLO con ampio letter-spacing.
const eyebrowStyle = (color: string): React.CSSProperties => ({
  display: 'block',
  fontFamily: headFont,
  color,
  textTransform: 'uppercase',
  letterSpacing: '.14em',
  fontSize: 'clamp(11px,1.1vw,13px)',
  fontWeight: 500,
  margin: 0,
});

// CTA pieno e raffinato: usa var(--cta), bordi quasi netti, label spaziata.
const solidCtaStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  background: 'var(--cta)',
  color: '#fff',
  textDecoration: 'none',
  padding: 'clamp(13px,1.8vw,16px) clamp(26px,4vw,40px)',
  borderRadius: 2,
  fontSize: 'clamp(12px,1.2vw,14px)',
  fontWeight: 500,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  outlineOffset: 3,
};

// CTA a bordo sottile su fondo colorato (testo #fff).
const outlineCtaOnColor: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  background: 'transparent',
  color: '#fff',
  border: '1px solid rgba(255,255,255,.55)',
  textDecoration: 'none',
  padding: 'clamp(13px,1.8vw,16px) clamp(26px,4vw,40px)',
  borderRadius: 2,
  fontSize: 'clamp(12px,1.2vw,14px)',
  fontWeight: 500,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  outlineOffset: 3,
};

// CTA come link discreto con freccia (testo var(--cta)).
const linkCtaStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  color: 'var(--cta)',
  textDecoration: 'none',
  fontFamily: headFont,
  fontSize: 'clamp(13px,1.3vw,15px)',
  fontWeight: 500,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  lineHeight: 1,
  paddingBottom: 6,
  borderBottom: '1px solid var(--line)',
  whiteSpace: 'nowrap',
  outlineOffset: 4,
};

// Variante 01 — "caldo": banda piena var(--primary), testo #fff centrato, CTA a bordo sottile.
const Cta01: React.FC<{ content: CtaContent }> = ({ content }) => {
  const href = ctaHref(content);
  return (
    <section
      style={{
        background: 'var(--primary)',
        padding: 'clamp(28px,4vw,60px) clamp(20px,5vw,48px)',
      }}
    >
      <div
        style={{
          maxWidth: 880,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'clamp(20px,3vw,32px)',
        }}
      >
        <span style={eyebrowStyle('rgba(255,255,255,.7)')} aria-hidden="true">
          ·  ·  ·
        </span>
        <h2
          style={{
            fontFamily: headFont,
            color: '#fff',
            margin: 0,
            fontWeight: 400,
            fontSize: 'clamp(30px,5vw,52px)',
            lineHeight: 1.12,
            letterSpacing: '.005em',
          }}
        >
          {content.titolo}
        </h2>
        {content.testo ? (
          <p
            style={{
              color: '#fff',
              opacity: 0.85,
              margin: 0,
              maxWidth: 560,
              fontSize: 'clamp(15px,1.8vw,18px)',
              lineHeight: 1.7,
            }}
          >
            {content.testo}
          </p>
        ) : null}
        <a href={href} style={{ ...outlineCtaOnColor, marginTop: 'clamp(4px,1vw,12px)' }}>
          {content.label}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
};

// Variante 02 — "moderno": box su var(--surface) entro cornice sottile var(--line), CTA pieno raffinato.
const Cta02: React.FC<{ content: CtaContent }> = ({ content }) => {
  const href = ctaHref(content);
  return (
    <section
      style={{
        background: 'var(--bg)',
        padding: 'clamp(28px,4vw,60px) clamp(20px,5vw,48px)',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            padding: 'clamp(28px,4vw,60px) clamp(28px,5vw,64px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'clamp(18px,2.5vw,28px)',
          }}
        >
          <span style={eyebrowStyle('var(--accent)')}>{content.label}</span>
          <h2
            style={{
              fontFamily: headFont,
              color: 'var(--ink)',
              margin: 0,
              fontWeight: 400,
              fontSize: 'clamp(28px,4.5vw,46px)',
              lineHeight: 1.14,
              letterSpacing: '.005em',
            }}
          >
            {content.titolo}
          </h2>
          {content.testo ? (
            <p
              style={{
                color: 'var(--muted)',
                margin: 0,
                maxWidth: 540,
                fontSize: 'clamp(15px,1.8vw,18px)',
                lineHeight: 1.7,
              }}
            >
              {content.testo}
            </p>
          ) : null}
          <span
            aria-hidden="true"
            style={{
              display: 'block',
              width: 56,
              height: 1,
              background: 'var(--line)',
              margin: '4px 0',
            }}
          />
          <a href={href} style={solidCtaStyle}>
            {content.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// Variante 03 — "any": split testo a sinistra / CTA-link a destra, separati da linea sottile.
const Cta03: React.FC<{ content: CtaContent }> = ({ content }) => {
  const href = ctaHref(content);
  return (
    <section
      style={{
        background: 'var(--surface)',
        padding: 'clamp(28px,4vw,60px) clamp(20px,5vw,48px)',
      }}
    >
      <div
        style={{
          maxWidth: 1040,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(28px,5vw,64px)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          padding: 'clamp(36px,5vw,64px) 0',
        }}
      >
        <div style={{ flex: '1 1 360px', minWidth: 280 }}>
          <span style={eyebrowStyle('var(--accent)')}>{content.label}</span>
          <h2
            style={{
              fontFamily: headFont,
              color: 'var(--ink)',
              margin: '16px 0 0',
              fontWeight: 400,
              fontSize: 'clamp(26px,4vw,42px)',
              lineHeight: 1.14,
              letterSpacing: '.005em',
            }}
          >
            {content.titolo}
          </h2>
          {content.testo ? (
            <p
              style={{
                color: 'var(--muted)',
                margin: '16px 0 0',
                maxWidth: 520,
                fontSize: 'clamp(15px,1.8vw,18px)',
                lineHeight: 1.7,
              }}
            >
              {content.testo}
            </p>
          ) : null}
        </div>
        <div style={{ flex: '0 0 auto', minWidth: 200 }}>
          <a href={href} style={linkCtaStyle}>
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
