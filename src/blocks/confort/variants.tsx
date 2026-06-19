import React from 'react';
import type { Variant } from '../variant';
import type { ConfortContent } from '../types';

const sectionPadding = 'clamp(40px,6vw,88px) clamp(20px,5vw,48px)';
const titleFont = 'Fraunces, Georgia, serif';

/* -------------------------------------------------------------------------- */
/* Mappa nome icona -> glifo. Default '✓' per nomi sconosciuti.               */
/* -------------------------------------------------------------------------- */
function iconFor(name: string): string {
  const map: Record<string, string> = {
    wifi: '📶',
    ac: '❄️',
    breakfast: '🥐',
    parking: '🅿️',
    terrace: '🌅',
    pets: '🐾',
    pool: '🏊',
    bar: '🍸',
    gym: '🏋️',
    spa: '💆',
    bike: '🚲',
    tv: '📺',
    coffee: '☕',
    shower: '🚿',
    garden: '🌿',
    reception: '🛎️',
  };
  return map[name?.toLowerCase()] ?? '✓';
}

const titleStyle: React.CSSProperties = {
  fontFamily: titleFont,
  color: 'var(--ink)',
  fontSize: 'clamp(1.9rem,4.5vw,3rem)',
  lineHeight: 1.1,
  margin: 0,
};

/* -------------------------------------------------------------------------- */
/* Variante 01 — "minimal": griglia di tessere con icona grande in cerchio    */
/* -------------------------------------------------------------------------- */
const Confort01: React.FC<{ content: ConfortContent }> = ({ content }) => {
  const { titolo, servizi } = content;

  return (
    <section style={{ background: 'var(--bg)', padding: sectionPadding }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(24px,4vw,48px)',
        }}
      >
        {titolo && (
          <h2 style={{ ...titleStyle, textAlign: 'center' }}>{titolo}</h2>
        )}

        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'clamp(14px,2.2vw,26px)',
          }}
        >
          {servizi.map((s, i) => (
            <li
              key={`${s.label}-${i}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 'clamp(10px,1.6vw,16px)',
                border: '1px solid var(--line)',
                background: 'var(--surface)',
                borderRadius: 16,
                padding: 'clamp(20px,3vw,32px) clamp(14px,2vw,20px)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'clamp(56px,8vw,76px)',
                  height: 'clamp(56px,8vw,76px)',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  fontSize: 'clamp(1.5rem,3.4vw,2rem)',
                  lineHeight: 1,
                }}
              >
                {iconFor(s.icona)}
              </span>
              <span
                style={{
                  color: 'var(--ink)',
                  fontSize: 'clamp(0.95rem,1.5vw,1.1rem)',
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Variante 02 — "moderno": lista a due colonne con icona inline a sinistra   */
/* -------------------------------------------------------------------------- */
const Confort02: React.FC<{ content: ConfortContent }> = ({ content }) => {
  const { titolo, servizi } = content;

  return (
    <section style={{ background: 'var(--surface)', padding: sectionPadding }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(20px,3vw,40px)',
        }}
      >
        {titolo && (
          <h2
            style={{
              ...titleStyle,
              fontSize: 'clamp(1.9rem,4vw,2.8rem)',
              borderLeft: '4px solid var(--primary)',
              paddingLeft: 'clamp(12px,1.5vw,18px)',
            }}
          >
            {titolo}
          </h2>
        )}

        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(12px,1.8vw,22px)',
          }}
        >
          {servizi.map((s, i) => (
            <li
              key={`${s.label}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(12px,1.6vw,18px)',
                background: 'var(--bg)',
                borderRadius: 12,
                padding: 'clamp(12px,1.8vw,18px) clamp(14px,2vw,22px)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flex: '0 0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'clamp(40px,5vw,52px)',
                  height: 'clamp(40px,5vw,52px)',
                  borderRadius: 12,
                  border: '1px solid var(--line)',
                  background: 'var(--accent)',
                  fontSize: 'clamp(1.2rem,2.4vw,1.5rem)',
                  lineHeight: 1,
                }}
              >
                {iconFor(s.icona)}
              </span>
              <span
                style={{
                  color: 'var(--ink)',
                  fontSize: 'clamp(0.95rem,1.5vw,1.1rem)',
                  fontWeight: 600,
                  lineHeight: 1.35,
                }}
              >
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Variante 03 — "any": riga di pill che vanno a capo (flex-wrap)             */
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
          gap: 'clamp(20px,3vw,38px)',
        }}
      >
        {titolo && <h2 style={titleStyle}>{titolo}</h2>}

        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(10px,1.6vw,16px)',
          }}
        >
          {servizi.map((s, i) => (
            <li
              key={`${s.label}-${i}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(8px,1.2vw,12px)',
                border: '1px solid var(--line)',
                background: 'var(--surface)',
                borderRadius: 999,
                padding: 'clamp(8px,1.2vw,12px) clamp(14px,2vw,20px)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'clamp(28px,4vw,34px)',
                  height: 'clamp(28px,4vw,34px)',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  fontSize: 'clamp(0.95rem,1.8vw,1.15rem)',
                  lineHeight: 1,
                }}
              >
                {iconFor(s.icona)}
              </span>
              <span
                style={{
                  color: 'var(--ink)',
                  fontSize: 'clamp(0.9rem,1.4vw,1.05rem)',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                }}
              >
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
