import React from 'react';
import type { Variant } from '../variant';
import type { ConfortContent } from '../types';

/* -------------------------------------------------------------------------- */
/* Stile condiviso — Grand Hotel Santa Lucia: Belle Époque sobrio.            */
/* Molta aria, titoli serif eleganti, label MAIUSCOLO con letter-spacing,     */
/* linee sottili var(--line). Nessun colore fisso: solo CSS vars.             */
/* -------------------------------------------------------------------------- */
const sectionPadding = 'clamp(56px,8vw,120px) clamp(20px,5vw,56px)';

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-head)',
  color: 'var(--ink)',
  fontSize: 'clamp(2rem,4.6vw,3.2rem)',
  lineHeight: 1.12,
  fontWeight: 400,
  margin: 0,
};

const eyebrowStyle: React.CSSProperties = {
  color: 'var(--muted)',
  fontSize: 'clamp(0.66rem,1vw,0.74rem)',
  textTransform: 'uppercase',
  letterSpacing: '.14em',
  margin: 0,
};

const labelStyle: React.CSSProperties = {
  color: 'var(--ink)',
  fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
  textTransform: 'uppercase',
  letterSpacing: '.14em',
  lineHeight: 1.5,
  fontWeight: 500,
};

/* -------------------------------------------------------------------------- */
/* iconFor — piccoli SVG inline a tratto. Nessuna emoji, nessuna libreria.    */
/* viewBox 0 0 24 24, stroke currentColor, strokeWidth 1.5, fill none.        */
/* -------------------------------------------------------------------------- */
function iconFor(name: string): JSX.Element {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  };

  switch (name?.toLowerCase()) {
    case 'wifi':
      return (
        <svg {...common}>
          <path d="M2.5 9.5a14 14 0 0 1 19 0" />
          <path d="M5.5 12.8a9.5 9.5 0 0 1 13 0" />
          <path d="M8.5 16a5 5 0 0 1 7 0" />
          <circle cx="12" cy="19" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'ac':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="9" rx="2" />
          <path d="M7 17.5h.01M12 18.5h.01M17 17.5h.01" />
          <path d="M7 10h10" />
        </svg>
      );
    case 'breakfast':
      return (
        <svg {...common}>
          <path d="M4 8h13a3 3 0 0 1 0 6h-1" />
          <path d="M4 8v6a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V8z" />
          <path d="M7 3c-.5.7-.5 1.3 0 2M11 3c-.5.7-.5 1.3 0 2" />
        </svg>
      );
    case 'parking':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9.5 16V8h3a2.5 2.5 0 0 1 0 5h-3" />
        </svg>
      );
    case 'terrace':
      return (
        <svg {...common}>
          <path d="M3 11h18L12 4 3 11z" />
          <path d="M12 11v9" />
          <path d="M8 20h8" />
        </svg>
      );
    case 'pets':
      return (
        <svg {...common}>
          <circle cx="6.5" cy="10" r="1.6" />
          <circle cx="17.5" cy="10" r="1.6" />
          <circle cx="9.5" cy="6.5" r="1.6" />
          <circle cx="14.5" cy="6.5" r="1.6" />
          <path d="M12 12.5c-2.4 0-4.3 1.7-4.3 3.6 0 1.4 1.2 2.2 2.6 2.2.7 0 1.1-.3 1.7-.3s1 .3 1.7.3c1.4 0 2.6-.8 2.6-2.2 0-1.9-1.9-3.6-4.3-3.6z" />
        </svg>
      );
    case 'pool':
      return (
        <svg {...common}>
          <path d="M2 18c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1" />
          <path d="M2 14c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1" />
          <path d="M7 11V5a2 2 0 0 1 4 0M14 11V5a2 2 0 0 1 4 0" />
        </svg>
      );
    case 'spa':
      return (
        <svg {...common}>
          <path d="M12 21c0-5 .8-9 5-12-1 5-2.5 8.5-5 12z" />
          <path d="M12 21c0-5-.8-9-5-12 1 5 2.5 8.5 5 12z" />
          <path d="M9 18c1 .8 2 1.2 3 1.2s2-.4 3-1.2" />
        </svg>
      );
    case 'bar':
      return (
        <svg {...common}>
          <path d="M5 4h14l-7 8-7-8z" />
          <path d="M12 12v7" />
          <path d="M8 20h8" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M5 12.5 10 17 19 7" />
        </svg>
      );
  }
}

const focusableLi: React.CSSProperties = { outlineOffset: 2 };

/* -------------------------------------------------------------------------- */
/* Variante 01 — "minimal": griglia ariosa di voci con icona in cerchio       */
/* leggero (var(--accent)) e label maiuscola. Massima sobrietà.               */
/* -------------------------------------------------------------------------- */
const Confort01: React.FC<{ content: ConfortContent }> = ({ content }) => {
  const { titolo, servizi } = content;

  return (
    <section style={{ background: 'var(--bg)', padding: sectionPadding }}>
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(36px,5vw,64px)',
        }}
      >
        {titolo && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(14px,2vw,20px)',
              textAlign: 'center',
            }}
          >
            <p style={eyebrowStyle}>Servizi &amp; Comfort</p>
            <h2 style={{ ...titleStyle, textAlign: 'center' }}>{titolo}</h2>
            <span
              aria-hidden="true"
              style={{
                width: 'clamp(48px,7vw,72px)',
                height: 1,
                background: 'var(--primary)',
              }}
            />
          </div>
        )}

        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(28px,4vw,52px)',
          }}
        >
          {servizi.map((s, i) => (
            <li
              key={`${s.label}-${i}`}
              tabIndex={0}
              style={{
                ...focusableLi,
                width: 'clamp(130px,16vw,170px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 'clamp(14px,2vw,20px)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'clamp(58px,8vw,78px)',
                  height: 'clamp(58px,8vw,78px)',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  border: '1px solid var(--line)',
                  color: 'var(--primary)',
                }}
              >
                {iconFor(s.icona)}
              </span>
              <span style={labelStyle}>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Variante 02 — "moderno": due colonne con icona inline incorniciata e       */
/* divisori sottili var(--line) tra le voci.                                  */
/* -------------------------------------------------------------------------- */
const Confort02: React.FC<{ content: ConfortContent }> = ({ content }) => {
  const { titolo, servizi } = content;

  return (
    <section style={{ background: 'var(--surface)', padding: sectionPadding }}>
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(36px,6vw,80px)',
          alignItems: 'start',
        }}
      >
        {titolo && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(16px,2.2vw,24px)',
            }}
          >
            <p style={eyebrowStyle}>Servizi &amp; Comfort</p>
            <h2 style={titleStyle}>{titolo}</h2>
            <span
              aria-hidden="true"
              style={{ width: 56, height: 1, background: 'var(--primary)' }}
            />
          </div>
        )}

        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gridTemplateColumns: '1fr',
            borderTop: '1px solid var(--line)',
          }}
        >
          {servizi.map((s, i) => (
            <li
              key={`${s.label}-${i}`}
              tabIndex={0}
              style={{
                ...focusableLi,
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(16px,2.4vw,24px)',
                padding: 'clamp(16px,2.4vw,24px) clamp(4px,1vw,8px)',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flex: '0 0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'clamp(44px,5.5vw,54px)',
                  height: 'clamp(44px,5.5vw,54px)',
                  borderRadius: '50%',
                  border: '1px solid var(--line)',
                  background: 'var(--bg)',
                  color: 'var(--primary)',
                }}
              >
                {iconFor(s.icona)}
              </span>
              <span style={labelStyle}>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Variante 03 — "any": riga sobria di voci che vanno a capo (flex-wrap),     */
/* separate da sottili divisori verticali var(--line).                        */
/* -------------------------------------------------------------------------- */
const Confort03: React.FC<{ content: ConfortContent }> = ({ content }) => {
  const { titolo, servizi } = content;

  return (
    <section style={{ background: 'var(--bg)', padding: sectionPadding }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'clamp(32px,5vw,56px)',
        }}
      >
        {titolo && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(14px,2vw,20px)',
            }}
          >
            <p style={eyebrowStyle}>Servizi &amp; Comfort</p>
            <h2 style={titleStyle}>{titolo}</h2>
          </div>
        )}

        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 'clamp(20px,3vw,32px) 0',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(20px,3.2vw,44px)',
            width: '100%',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
          }}
        >
          {servizi.map((s, i) => (
            <li
              key={`${s.label}-${i}`}
              tabIndex={0}
              style={{
                ...focusableLi,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(10px,1.4vw,14px)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                }}
              >
                {iconFor(s.icona)}
              </span>
              <span style={{ ...labelStyle, whiteSpace: 'nowrap' }}>
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const confortVariants: Variant<ConfortContent>[] = [
  { id: 'confort-01', mood: 'minimal', Component: Confort01 },
  { id: 'confort-02', mood: 'moderno', Component: Confort02 },
  { id: 'confort-03', mood: 'any', Component: Confort03 },
];
