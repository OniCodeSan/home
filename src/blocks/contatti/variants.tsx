import React from 'react';
import type { Variant } from '../variant';
import type { ContattiContent } from '../types';

const SECTION_PADDING = 'clamp(40px,6vw,88px) clamp(20px,5vw,48px)';
const TITLE_FONT = 'Fraunces, Georgia, serif';

const focusableLink: React.CSSProperties = {
  color: 'var(--primary)',
  textDecoration: 'none',
  outlineOffset: 2,
};

const cleanPhone = (n: string) => n.replace(/[^0-9]/g, '');

const Mappa: React.FC<{ src: string }> = ({ src }) => (
  <iframe
    src={src}
    style={{ border: 0, width: '100%', height: '100%', minHeight: 260 }}
    loading="lazy"
    title="Mappa"
  />
);

/* ------------------------------------------------------------------ */
/* Variante 01 — elegante: split mappa (sx) + dati (dx)               */
/* ------------------------------------------------------------------ */
const Contatti01: React.FC<{ content: ContattiContent }> = ({ content }) => {
  const { telefono, whatsapp, email, indirizzo, mappaEmbed } = content;
  return (
    <section style={{ background: 'var(--bg)', color: 'var(--ink)', padding: SECTION_PADDING }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(20px,4vw,48px)',
          alignItems: 'stretch',
        }}
      >
        {mappaEmbed && (
          <div
            style={{
              flex: '1 1 320px',
              minWidth: 280,
              minHeight: 260,
              borderRadius: 14,
              overflow: 'hidden',
              border: '1px solid var(--line)',
            }}
          >
            <Mappa src={mappaEmbed} />
          </div>
        )}
        <div
          style={{
            flex: '1 1 320px',
            minWidth: 280,
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 14,
            padding: 'clamp(20px,3vw,36px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(12px,2vw,20px)',
          }}
        >
          <h2
            style={{
              fontFamily: TITLE_FONT,
              fontSize: 'clamp(26px,4vw,40px)',
              margin: 0,
              color: 'var(--ink)',
            }}
          >
            Dove siamo
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'clamp(15px,1.6vw,18px)' }}>
            {indirizzo}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 'clamp(15px,1.6vw,18px)' }}>
            {telefono && (
              <a href={`tel:${telefono}`} style={focusableLink}>
                Tel: {telefono}
              </a>
            )}
            {whatsapp && (
              <a
                href={`https://wa.me/${cleanPhone(whatsapp)}`}
                style={focusableLink}
              >
                WhatsApp: {whatsapp}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} style={focusableLink}>
                Email: {email}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Variante 02 — minimal: card centrata con elenco, mappa sotto       */
/* ------------------------------------------------------------------ */
const Contatti02: React.FC<{ content: ContattiContent }> = ({ content }) => {
  const { telefono, whatsapp, email, indirizzo, mappaEmbed } = content;
  return (
    <section style={{ background: 'var(--surface)', color: 'var(--ink)', padding: SECTION_PADDING }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(20px,4vw,40px)',
        }}
      >
        <div
          style={{
            maxWidth: 560,
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(12px,2vw,18px)',
          }}
        >
          <h2
            style={{
              fontFamily: TITLE_FONT,
              fontSize: 'clamp(28px,4.5vw,44px)',
              margin: 0,
              color: 'var(--ink)',
            }}
          >
            Contatti
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'clamp(15px,1.7vw,19px)' }}>
            {indirizzo}
          </p>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              fontSize: 'clamp(15px,1.7vw,19px)',
            }}
          >
            {telefono && (
              <li>
                <a href={`tel:${telefono}`} style={focusableLink}>
                  {telefono}
                </a>
              </li>
            )}
            {whatsapp && (
              <li>
                <a href={`https://wa.me/${cleanPhone(whatsapp)}`} style={focusableLink}>
                  WhatsApp {whatsapp}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`} style={focusableLink}>
                  {email}
                </a>
              </li>
            )}
          </ul>
        </div>
        {mappaEmbed && (
          <div
            style={{
              width: '100%',
              minHeight: 260,
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid var(--line)',
              background: 'var(--bg)',
            }}
          >
            <Mappa src={mappaEmbed} />
          </div>
        )}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Variante 03 — any: banda a colonne (titolo | dati | mappa)         */
/* ------------------------------------------------------------------ */
const Contatti03: React.FC<{ content: ContattiContent }> = ({ content }) => {
  const { telefono, whatsapp, email, indirizzo, mappaEmbed } = content;
  return (
    <section style={{ background: 'var(--bg)', color: 'var(--ink)', padding: SECTION_PADDING }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(20px,3vw,40px)',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: '1 1 200px', minWidth: 200 }}>
          <h2
            style={{
              fontFamily: TITLE_FONT,
              fontSize: 'clamp(26px,4vw,42px)',
              margin: 0,
              color: 'var(--accent)',
            }}
          >
            Dove siamo
          </h2>
        </div>
        <div
          style={{
            flex: '1 1 240px',
            minWidth: 220,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            fontSize: 'clamp(15px,1.6vw,18px)',
          }}
        >
          <p style={{ margin: 0, color: 'var(--muted)' }}>{indirizzo}</p>
          {telefono && (
            <a href={`tel:${telefono}`} style={focusableLink}>
              {telefono}
            </a>
          )}
          {whatsapp && (
            <a href={`https://wa.me/${cleanPhone(whatsapp)}`} style={focusableLink}>
              WhatsApp {whatsapp}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} style={focusableLink}>
              {email}
            </a>
          )}
        </div>
        {mappaEmbed && (
          <div
            style={{
              flex: '1 1 320px',
              minWidth: 280,
              minHeight: 260,
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid var(--line)',
              background: 'var(--surface)',
            }}
          >
            <Mappa src={mappaEmbed} />
          </div>
        )}
      </div>
    </section>
  );
};

export const contattiVariants: Variant<ContattiContent>[] = [
  { id: 'contatti-01', mood: 'elegante', Component: Contatti01 },
  { id: 'contatti-02', mood: 'minimal', Component: Contatti02 },
  { id: 'contatti-03', mood: 'any', Component: Contatti03 },
];
