import React from 'react';
import type { Variant } from '../variant';
import type { PrenotazioniContent } from '../types';

const sectionPadding = 'clamp(40px,6vw,88px) clamp(20px,5vw,48px)';
const titleFont = 'Fraunces, Georgia, serif';

const ctaButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  border: 'none',
  cursor: 'pointer',
  background: 'var(--cta)',
  color: '#fff',
  fontSize: 'clamp(0.95rem,1.4vw,1.05rem)',
  fontWeight: 600,
  padding: 'clamp(12px,1.4vw,16px) clamp(22px,3vw,34px)',
  borderRadius: 10,
  transition: 'opacity 0.15s ease',
};

/* Placeholder calendario prenotazioni — compatto, due mesi affiancati.
   Mockup non interattivo: verrà sostituito dall'integrazione Google Calendar (fase 2). */
const MiniMese: React.FC<{ nome: string; offset: number; liberi: Set<number> }> = ({ nome, offset, liberi }) => {
  const giorni = Array.from({ length: 35 }, (_, i) => i - offset);
  return (
    <div style={{ flex: '1 1 150px', minWidth: 140 }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 5 }}>{nome}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, opacity: 0.7 }} aria-hidden="true">
        {['L', 'M', 'M', 'G', 'V', 'S', 'D'].map((d, i) => (
          <div key={`h${i}`} style={{ textAlign: 'center', fontSize: '0.55rem', color: 'var(--muted)', fontWeight: 600 }}>{d}</div>
        ))}
        {giorni.map((n, i) => (
          <div
            key={i}
            style={{
              aspectRatio: '1 / 1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              fontSize: '0.55rem',
              border: '1px solid var(--line)',
              background: n > 0 && liberi.has(n) ? 'var(--accent)' : 'var(--surface)',
              color: n > 0 ? 'var(--ink)' : 'transparent',
            }}
          >
            {n > 0 ? n : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

const CalendarPlaceholder: React.FC = () => (
  <div
    style={{
      width: '100%',
      maxWidth: 440,
      margin: '0 auto',
      border: '1px solid var(--line)',
      background: 'var(--surface)',
      borderRadius: 12,
      padding: 14,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
      <strong style={{ fontFamily: titleFont, color: 'var(--ink)', fontSize: '0.95rem' }}>Disponibilità</strong>
      <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#fff', background: 'var(--primary)', borderRadius: 999, padding: '3px 8px' }}>
        in arrivo
      </span>
    </div>
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
      <MiniMese nome="Questo mese" offset={2} liberi={new Set([4, 5, 11, 12, 18, 19, 25, 26])} />
      <MiniMese nome="Prossimo mese" offset={5} liberi={new Set([2, 3, 9, 10, 16, 17, 23, 24, 30])} />
    </div>
    <p style={{ margin: '10px 0 0', textAlign: 'center', color: 'var(--muted)', fontSize: '0.75rem' }}>
      Presto potrai prenotare in tempo reale.
    </p>
  </div>
);

/* -------------------------------------------------------------------------- */
/* Variante 01 — "caldo": card centrata e accogliente                          */
/* -------------------------------------------------------------------------- */
const Prenotazioni01: React.FC<{ content: PrenotazioniContent }> = ({ content }) => {
  const { titolo, testo, calendarSlot } = content;

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
          gap: 'clamp(16px,2.5vw,28px)',
        }}
      >
        {titolo && (
          <h2
            style={{
              fontFamily: titleFont,
              color: 'var(--ink)',
              fontSize: 'clamp(1.9rem,4.5vw,3rem)',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {titolo}
          </h2>
        )}

        {testo && (
          <p
            style={{
              color: 'var(--muted)',
              fontSize: 'clamp(1rem,1.6vw,1.2rem)',
              lineHeight: 1.6,
              maxWidth: 640,
              margin: 0,
            }}
          >
            {testo}
          </p>
        )}

        {calendarSlot && <CalendarPlaceholder />}

        <button type="button" style={ctaButtonStyle}>
          Verifica disponibilità
        </button>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Variante 02 — "moderno": layout a due colonne, testo a sinistra            */
/* -------------------------------------------------------------------------- */
const Prenotazioni02: React.FC<{ content: PrenotazioniContent }> = ({ content }) => {
  const { titolo, testo, calendarSlot } = content;

  return (
    <section style={{ background: 'var(--surface)', padding: sectionPadding }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(24px,4vw,56px)',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            flex: '1 1 320px',
            minWidth: 280,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'clamp(14px,2vw,22px)',
          }}
        >
          {titolo && (
            <h2
              style={{
                fontFamily: titleFont,
                color: 'var(--ink)',
                fontSize: 'clamp(1.9rem,4vw,2.8rem)',
                lineHeight: 1.1,
                margin: 0,
                borderLeft: '4px solid var(--primary)',
                paddingLeft: 'clamp(12px,1.5vw,18px)',
              }}
            >
              {titolo}
            </h2>
          )}

          {testo && (
            <p
              style={{
                color: 'var(--muted)',
                fontSize: 'clamp(1rem,1.5vw,1.15rem)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {testo}
            </p>
          )}

          <div>
            <button type="button" style={ctaButtonStyle}>
              Verifica disponibilità
            </button>
          </div>
        </div>

        {calendarSlot && (
          <div style={{ flex: '1 1 340px', minWidth: 280, display: 'flex', alignItems: 'center' }}>
            <CalendarPlaceholder />
          </div>
        )}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Variante 03 — "any": banda con accent, calendario sopra e CTA a fondo      */
/* -------------------------------------------------------------------------- */
const Prenotazioni03: React.FC<{ content: PrenotazioniContent }> = ({ content }) => {
  const { titolo, testo, calendarSlot } = content;

  return (
    <section style={{ background: 'var(--bg)', padding: sectionPadding }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          borderTop: '3px solid var(--accent)',
          background: 'var(--surface)',
          borderRadius: '0 0 18px 18px',
          padding: 'clamp(28px,4vw,52px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(18px,2.6vw,30px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 'clamp(12px,2vw,24px)',
          }}
        >
          {titolo && (
            <h2
              style={{
                fontFamily: titleFont,
                color: 'var(--ink)',
                fontSize: 'clamp(1.8rem,4vw,2.7rem)',
                lineHeight: 1.1,
                margin: 0,
                flex: '1 1 260px',
                minWidth: 240,
              }}
            >
              {titolo}
            </h2>
          )}

          {testo && (
            <p
              style={{
                color: 'var(--muted)',
                fontSize: 'clamp(0.95rem,1.5vw,1.1rem)',
                lineHeight: 1.6,
                margin: 0,
                flex: '1 1 280px',
                minWidth: 240,
              }}
            >
              {testo}
            </p>
          )}
        </div>

        {calendarSlot && <CalendarPlaceholder />}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <button type="button" style={ctaButtonStyle}>
            Verifica disponibilità
          </button>
        </div>
      </div>
    </section>
  );
};

export const prenotazioniVariants: Variant<PrenotazioniContent>[] = [
  { id: 'prenotazioni-01', mood: 'caldo', Component: Prenotazioni01 },
  { id: 'prenotazioni-02', mood: 'moderno', Component: Prenotazioni02 },
  { id: 'prenotazioni-03', mood: 'any', Component: Prenotazioni03 },
];
