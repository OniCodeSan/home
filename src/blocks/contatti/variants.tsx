import React from 'react';
import type { Variant } from '../variant';
import type { ContattiContent } from '../types';

/* ------------------------------------------------------------------ */
/* Dove siamo — Belle Époque: elegante, sobrio, ariosa   */
/* ------------------------------------------------------------------ */

const cleanPhone = (n: string) => n.replace(/[^0-9]/g, '');

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 'clamp(11px,1vw,12px)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: 6,
};

const linkStyle: React.CSSProperties = {
  color: 'var(--ink)',
  textDecoration: 'none',
  fontSize: 'clamp(15px,1.7vw,18px)',
  outlineColor: 'var(--primary)',
  outlineOffset: 3,
  transition: 'color 0.2s ease',
};

const Mappa: React.FC<{ src: string }> = ({ src }) => (
  <iframe
    src={src}
    style={{ border: 0, width: '100%', height: '100%', minHeight: 280 }}
    loading="lazy"
    title="Mappa"
  />
);

const Riga: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <span style={labelStyle}>{label}</span>
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/* Variante 01 — elegante: dati (sx) + mappa grande (dx)              */
/* ------------------------------------------------------------------ */
const Contatti01: React.FC<{ content: ContattiContent }> = ({ content }) => {
  const { telefono, whatsapp, email, indirizzo, mappaEmbed } = content;
  return (
    <section id="contatti"
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)',
        padding: 'clamp(28px,4vw,60px) clamp(24px,6vw,72px)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(40px,6vw,88px)',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            flex: '1 1 340px',
            minWidth: 280,
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(28px,4vw,44px)',
          }}
        >
          <header>
            <span style={labelStyle}>Dove siamo</span>
            <h2
              style={{
                fontFamily: 'var(--font-head)',
                fontWeight: 400,
                fontSize: 'clamp(34px,5vw,56px)',
                lineHeight: 1.1,
                margin: '8px 0 0',
                color: 'var(--ink)',
              }}
            >
              Dove siamo
            </h2>
          </header>

          <div
            style={{
              height: 1,
              width: 72,
              background: 'var(--line)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3vw,32px)' }}>
            <Riga label="Indirizzo">
              <p
                style={{
                  margin: 0,
                  fontSize: 'clamp(15px,1.7vw,18px)',
                  lineHeight: 1.6,
                  color: 'var(--ink)',
                }}
              >
                {indirizzo}
              </p>
            </Riga>

            {telefono && (
              <Riga label="Telefono">
                <a href={`tel:${telefono}`} style={linkStyle}>
                  {telefono}
                </a>
              </Riga>
            )}

            {whatsapp && (
              <Riga label="WhatsApp">
                <a href={`https://wa.me/${cleanPhone(whatsapp)}`} style={linkStyle}>
                  {whatsapp}
                </a>
              </Riga>
            )}

            {email && (
              <Riga label="Email">
                <a href={`mailto:${email}`} style={linkStyle}>
                  {email}
                </a>
              </Riga>
            )}
          </div>
        </div>

        {mappaEmbed && (
          <div
            style={{
              flex: '1.4 1 420px',
              minWidth: 300,
              minHeight: 'clamp(320px,42vw,520px)',
              overflow: 'hidden',
              border: '1px solid var(--line)',
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
/* Variante 02 — minimal: intestazione centrata, mappa grande sotto   */
/* ------------------------------------------------------------------ */
const Contatti02: React.FC<{ content: ContattiContent }> = ({ content }) => {
  const { telefono, whatsapp, email, indirizzo, mappaEmbed } = content;
  return (
    <section id="contatti"
      style={{
        background: 'var(--surface)',
        color: 'var(--ink)',
        padding: 'clamp(28px,4vw,60px) clamp(24px,6vw,72px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(40px,6vw,80px)',
        }}
      >
        <header style={{ textAlign: 'center', maxWidth: 640 }}>
          <span style={{ ...labelStyle, marginBottom: 14 }}>Contatti</span>
          <h2
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 400,
              fontSize: 'clamp(36px,5.5vw,60px)',
              lineHeight: 1.1,
              margin: 0,
              color: 'var(--ink)',
            }}
          >
            Restiamo in contatto
          </h2>
          <div
            style={{
              height: 1,
              width: 72,
              background: 'var(--line)',
              margin: 'clamp(24px,3vw,36px) auto 0',
            }}
          />
        </header>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(32px,5vw,72px)',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Riga label="Indirizzo">
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(15px,1.7vw,18px)',
                lineHeight: 1.6,
                maxWidth: 260,
                color: 'var(--ink)',
              }}
            >
              {indirizzo}
            </p>
          </Riga>

          {telefono && (
            <Riga label="Telefono">
              <a href={`tel:${telefono}`} style={linkStyle}>
                {telefono}
              </a>
            </Riga>
          )}

          {whatsapp && (
            <Riga label="WhatsApp">
              <a href={`https://wa.me/${cleanPhone(whatsapp)}`} style={linkStyle}>
                {whatsapp}
              </a>
            </Riga>
          )}

          {email && (
            <Riga label="Email">
              <a href={`mailto:${email}`} style={linkStyle}>
                {email}
              </a>
            </Riga>
          )}
        </div>

        {mappaEmbed && (
          <div
            style={{
              width: '100%',
              minHeight: 'clamp(320px,40vw,480px)',
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
/* Variante 03 — any: titolo a banda, dati e mappa affiancati         */
/* ------------------------------------------------------------------ */
const Contatti03: React.FC<{ content: ContattiContent }> = ({ content }) => {
  const { telefono, whatsapp, email, indirizzo, mappaEmbed } = content;
  return (
    <section id="contatti"
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)',
        padding: 'clamp(28px,4vw,60px) clamp(24px,6vw,72px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <header
          style={{
            textAlign: 'center',
            paddingBottom: 'clamp(28px,4vw,48px)',
            marginBottom: 'clamp(40px,5vw,64px)',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <span style={{ ...labelStyle, marginBottom: 14 }}>Dove siamo</span>
          <h2
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 400,
              fontSize: 'clamp(34px,5vw,56px)',
              lineHeight: 1.1,
              margin: 0,
              color: 'var(--ink)',
            }}
          >
            Dove siamo
          </h2>
        </header>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(40px,6vw,80px)',
            alignItems: 'stretch',
          }}
        >
          {mappaEmbed && (
            <div
              style={{
                flex: '1.5 1 420px',
                minWidth: 300,
                minHeight: 'clamp(320px,40vw,500px)',
                overflow: 'hidden',
                border: '1px solid var(--line)',
                background: 'var(--surface)',
                order: 2,
              }}
            >
              <Mappa src={mappaEmbed} />
            </div>
          )}

          <div
            style={{
              flex: '1 1 300px',
              minWidth: 260,
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(24px,3vw,36px)',
              order: 1,
            }}
          >
            <Riga label="Indirizzo">
              <p
                style={{
                  margin: 0,
                  fontSize: 'clamp(15px,1.7vw,18px)',
                  lineHeight: 1.6,
                  color: 'var(--ink)',
                }}
              >
                {indirizzo}
              </p>
            </Riga>

            {telefono && (
              <Riga label="Telefono">
                <a href={`tel:${telefono}`} style={linkStyle}>
                  {telefono}
                </a>
              </Riga>
            )}

            {whatsapp && (
              <Riga label="WhatsApp">
                <a href={`https://wa.me/${cleanPhone(whatsapp)}`} style={linkStyle}>
                  {whatsapp}
                </a>
              </Riga>
            )}

            {email && (
              <Riga label="Email">
                <a href={`mailto:${email}`} style={linkStyle}>
                  {email}
                </a>
              </Riga>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const contattiVariants: Variant<ContattiContent>[] = [
  { id: 'contatti-01', mood: 'elegante', Component: Contatti01 },
  { id: 'contatti-02', mood: 'minimal', Component: Contatti02 },
  { id: 'contatti-03', mood: 'any', Component: Contatti03 },
];
