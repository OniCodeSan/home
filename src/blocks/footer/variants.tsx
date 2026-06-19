import React from 'react';
import type { Variant } from '../variant';
import type { FooterContent } from '../types';

const serif = 'Fraunces, Georgia, serif';

// Stile link condiviso: focus visibile, outline non rimosso.
function linkStyle(onColor: boolean): React.CSSProperties {
  return {
    color: onColor ? '#fff' : 'var(--ink)',
    textDecoration: 'none',
    borderBottom: '1px solid currentColor',
    outlineOffset: 2,
  };
}

// Variante 01 — "elegante": banda scura var(--primary), testo #fff, colonne che si impilano.
const Footer01: React.FC<{ content: FooterContent }> = ({ content }) => {
  const { ragioneSociale, piva, indirizzo, email, telefono, note } = content;
  return (
    <footer
      style={{
        background: 'var(--primary)',
        color: '#fff',
        padding: 'clamp(32px,5vw,64px) clamp(20px,5vw,48px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(24px,4vw,48px)',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ minWidth: 240, flex: '1 1 240px' }}>
          <div
            style={{
              fontFamily: serif,
              fontSize: 'clamp(22px,3vw,30px)',
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            {ragioneSociale}
          </div>
          <div style={{ fontSize: 'clamp(14px,1.6vw,16px)', lineHeight: 1.6, color: '#fff' }}>
            {indirizzo}
          </div>
          {piva && (
            <div style={{ fontSize: 'clamp(13px,1.4vw,14px)', marginTop: 6, opacity: 0.85 }}>
              P.IVA {piva}
            </div>
          )}
        </div>

        <div
          style={{
            minWidth: 200,
            flex: '1 1 200px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            fontSize: 'clamp(14px,1.6vw,16px)',
          }}
        >
          {email && (
            <a href={'mailto:' + email} style={linkStyle(true)}>
              {email}
            </a>
          )}
          {telefono && (
            <a href={'tel:' + telefono} style={linkStyle(true)}>
              {telefono}
            </a>
          )}
        </div>
      </div>

      {note && (
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            marginTop: 'clamp(24px,4vw,40px)',
            fontSize: 'clamp(12px,1.3vw,13px)',
            color: 'var(--muted)',
            lineHeight: 1.5,
          }}
        >
          {note}
        </div>
      )}
    </footer>
  );
};

// Variante 02 — "minimal": centrato su var(--bg), pulito, nome struttura in serif.
const Footer02: React.FC<{ content: FooterContent }> = ({ content }) => {
  const { ragioneSociale, piva, indirizzo, email, telefono, note } = content;
  return (
    <footer
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)',
        padding: 'clamp(32px,5vw,64px) clamp(20px,5vw,48px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'clamp(10px,1.5vw,16px)',
        }}
      >
        <div
          style={{
            fontFamily: serif,
            fontSize: 'clamp(24px,3.5vw,34px)',
            lineHeight: 1.1,
            color: 'var(--primary)',
          }}
        >
          {ragioneSociale}
        </div>

        <div style={{ fontSize: 'clamp(14px,1.6vw,16px)', color: 'var(--ink)', lineHeight: 1.6 }}>
          {indirizzo}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(12px,2vw,24px)',
            fontSize: 'clamp(14px,1.6vw,16px)',
          }}
        >
          {email && (
            <a href={'mailto:' + email} style={linkStyle(false)}>
              {email}
            </a>
          )}
          {telefono && (
            <a href={'tel:' + telefono} style={linkStyle(false)}>
              {telefono}
            </a>
          )}
        </div>

        {piva && (
          <div style={{ fontSize: 'clamp(13px,1.4vw,14px)', color: 'var(--muted)' }}>
            P.IVA {piva}
          </div>
        )}

        {note && (
          <div
            style={{
              fontSize: 'clamp(12px,1.3vw,13px)',
              color: 'var(--muted)',
              lineHeight: 1.5,
              marginTop: 'clamp(8px,1.5vw,16px)',
            }}
          >
            {note}
          </div>
        )}
      </div>
    </footer>
  );
};

// Variante 03 — "any": chiaro su var(--surface) con bordo-top var(--line), layout a colonne.
const Footer03: React.FC<{ content: FooterContent }> = ({ content }) => {
  const { ragioneSociale, piva, indirizzo, email, telefono, note } = content;
  return (
    <footer
      style={{
        background: 'var(--surface)',
        color: 'var(--ink)',
        borderTop: '1px solid var(--line)',
        padding: 'clamp(32px,5vw,64px) clamp(20px,5vw,48px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(20px,4vw,48px)',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ minWidth: 240, flex: '2 1 280px' }}>
          <div
            style={{
              fontFamily: serif,
              fontSize: 'clamp(20px,2.6vw,26px)',
              lineHeight: 1.2,
              color: 'var(--primary)',
              marginBottom: 8,
            }}
          >
            {ragioneSociale}
          </div>
          <div style={{ fontSize: 'clamp(14px,1.6vw,16px)', color: 'var(--ink)', lineHeight: 1.6 }}>
            {indirizzo}
          </div>
        </div>

        <div
          style={{
            minWidth: 200,
            flex: '1 1 200px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            fontSize: 'clamp(14px,1.6vw,16px)',
          }}
        >
          {email && (
            <a href={'mailto:' + email} style={linkStyle(false)}>
              {email}
            </a>
          )}
          {telefono && (
            <a href={'tel:' + telefono} style={linkStyle(false)}>
              {telefono}
            </a>
          )}
          {piva && <span style={{ color: 'var(--muted)' }}>P.IVA {piva}</span>}
        </div>
      </div>

      {note && (
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            marginTop: 'clamp(20px,3vw,32px)',
            paddingTop: 'clamp(16px,2vw,24px)',
            borderTop: '1px solid var(--line)',
            fontSize: 'clamp(12px,1.3vw,13px)',
            color: 'var(--muted)',
            lineHeight: 1.5,
          }}
        >
          {note}
        </div>
      )}
    </footer>
  );
};

export const footerVariants: Variant<FooterContent>[] = [
  { id: 'footer-01', mood: 'elegante', Component: Footer01 },
  { id: 'footer-02', mood: 'minimal', Component: Footer02 },
  { id: 'footer-03', mood: 'any', Component: Footer03 },
];
