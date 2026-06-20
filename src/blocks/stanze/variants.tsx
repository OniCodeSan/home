import React from 'react';
import type { Variant } from '../variant';
import type { StanzeContent } from '../types';

// Stile "Grand Hotel Santa Lucia": Belle Époque, elegante e sobrio.
// Molta aria, titoli serif, label maiuscole con tracking, linee sottili.

// ── Atomi condivisi ────────────────────────────────────────────────────────────

// Etichetta in maiuscolo con letter-spacing tipico del lusso sobrio.
const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      display: 'inline-block',
      textTransform: 'uppercase',
      letterSpacing: '.14em',
      fontSize: 'clamp(11px,1.4vw,13px)',
      color: 'var(--primary)',
    }}
  >
    {children}
  </span>
);

// Prezzo indicativo, elegante e contenuto.
const Prezzo: React.FC<{ valore: string }> = ({ valore }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 6,
      color: 'var(--primary)',
      fontFamily: 'var(--font-head)',
      fontSize: 'clamp(17px,2.4vw,22px)',
      lineHeight: 1,
    }}
  >
    {valore}
  </span>
);

// Tag sobrio con bordo sottile per le caratteristiche della camera.
const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span
    style={{
      display: 'inline-block',
      border: '1px solid var(--line)',
      color: 'var(--muted)',
      padding: '5px 13px',
      fontSize: 'clamp(11px,1.4vw,13px)',
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      lineHeight: 1.2,
      borderRadius: 2,
    }}
  >
    {label}
  </span>
);

const TagList: React.FC<{ items?: string[] }> = ({ items }) =>
  items && items.length > 0 ? (
    <ul
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
      }}
    >
      {items.map((c, j) => (
        <li key={c + j}>
          <Tag label={c} />
        </li>
      ))}
    </ul>
  ) : null;

// Area neutra quando l'immagine manca: nessun <img>, solo una superficie sobria.
const Vuoto: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div
    aria-hidden="true"
    style={{
      width: '100%',
      height: '100%',
      background: 'var(--surface)',
      borderBottom: '1px solid var(--line)',
      ...style,
    }}
  />
);

// CTA sobrio (ancora interna), in stile Belle Époque.
const focusRing: React.CSSProperties = {
  outlineOffset: 3,
};

const Dettaglio: React.FC<{ nome: string }> = ({ nome }) => (
  <a
    href="#prenota"
    aria-label={`Scopri ${nome}`}
    style={{
      ...focusRing,
      alignSelf: 'flex-start',
      display: 'inline-block',
      textDecoration: 'none',
      color: 'var(--cta)',
      borderBottom: '1px solid var(--cta)',
      paddingBottom: 3,
      fontSize: 'clamp(12px,1.6vw,14px)',
      textTransform: 'uppercase',
      letterSpacing: '.12em',
    }}
  >
    Scopri la camera
  </a>
);

// Intestazione di sezione riusabile.
const Intestazione: React.FC<{
  titolo?: string;
  intro?: string;
  align?: 'left' | 'center';
}> = ({ titolo, intro, align = 'left' }) => {
  if (!titolo && !intro) return null;
  const centered = align === 'center';
  return (
    <header
      style={{
        maxWidth: centered ? 640 : 720,
        margin: centered ? '0 auto' : undefined,
        textAlign: align,
      }}
    >
      <Eyebrow>Le Camere</Eyebrow>
      {titolo ? (
        <h2
          style={{
            margin: '.5em 0 0',
            fontFamily: 'var(--font-head)',
            fontWeight: 400,
            fontSize: 'clamp(30px,5vw,52px)',
            lineHeight: 1.08,
            color: 'var(--ink)',
          }}
        >
          {titolo}
        </h2>
      ) : null}
      {titolo ? (
        <span
          aria-hidden="true"
          style={{
            display: 'block',
            width: 64,
            height: 1,
            background: 'var(--accent)',
            margin: centered ? 'clamp(16px,3vw,24px) auto 0' : 'clamp(16px,3vw,24px) 0 0',
          }}
        />
      ) : null}
      {intro ? (
        <p
          style={{
            margin: 'clamp(16px,3vw,24px) auto 0',
            maxWidth: 600,
            marginLeft: centered ? 'auto' : 0,
            color: 'var(--muted)',
            fontSize: 'clamp(15px,2vw,18px)',
            lineHeight: 1.7,
          }}
        >
          {intro}
        </p>
      ) : null}
    </header>
  );
};

// ── Stanze 01 · "elegante" — griglia di card con foto in alto ──────────────────
const Stanze01: React.FC<{ content: StanzeContent }> = ({ content }) => (
  <section
    style={{
      background: 'var(--bg)',
      color: 'var(--ink)',
      padding: 'clamp(28px,4vw,60px) clamp(20px,5vw,56px)',
    }}
  >
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <Intestazione titolo={content.titolo} intro={content.intro} align="center" />

      <div
        style={{
          marginTop: 'clamp(40px,6vw,80px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(24px,3.5vw,44px)',
        }}
      >
        {content.camere.map((camera, i) => (
          <article
            key={camera.nome + i}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              {camera.immagine ? (
                <img
                  src={camera.immagine.src}
                  alt={camera.immagine.alt}
                  style={{
                    width: '100%',
                    height: 'clamp(220px,28vw,300px)',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                <Vuoto style={{ height: 'clamp(220px,28vw,300px)' }} />
              )}
            </div>
            <div
              style={{
                padding: 'clamp(22px,3vw,34px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                flex: 1,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-head)',
                  fontWeight: 400,
                  fontSize: 'clamp(21px,3vw,27px)',
                  lineHeight: 1.15,
                }}
              >
                {camera.nome}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: 'var(--muted)',
                  fontSize: 'clamp(14px,1.8vw,16px)',
                  lineHeight: 1.7,
                }}
              >
                {camera.descrizione}
              </p>
              <TagList items={camera.caratteristiche} />
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: 'clamp(12px,2vw,18px)',
                  borderTop: '1px solid var(--line)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                {camera.prezzoIndicativo ? (
                  <Prezzo valore={camera.prezzoIndicativo} />
                ) : (
                  <span />
                )}
                <Dettaglio nome={camera.nome} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ── Stanze 02 · "naturale" — lista alternata immagine / testo (editoriale) ─────
const Stanze02: React.FC<{ content: StanzeContent }> = ({ content }) => (
  <section
    style={{
      background: 'var(--bg)',
      color: 'var(--ink)',
      padding: 'clamp(28px,4vw,60px) clamp(20px,5vw,56px)',
    }}
  >
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <Intestazione titolo={content.titolo} intro={content.intro} align="left" />

      <div
        style={{
          marginTop: 'clamp(48px,7vw,96px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(48px,8vw,104px)',
        }}
      >
        {content.camere.map((camera, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={camera.nome + i}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: reverse ? 'row-reverse' : 'row',
                alignItems: 'center',
                gap: 'clamp(24px,5vw,72px)',
              }}
            >
              <div style={{ flex: '1 1 360px', minWidth: 280 }}>
                {camera.immagine ? (
                  <img
                    src={camera.immagine.src}
                    alt={camera.immagine.alt}
                    style={{
                      width: '100%',
                      height: 'clamp(260px,38vw,460px)',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                ) : (
                  <Vuoto
                    style={{
                      height: 'clamp(260px,38vw,460px)',
                      border: '1px solid var(--line)',
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  flex: '1 1 360px',
                  minWidth: 280,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(16px,2.5vw,22px)',
                }}
              >
                <Eyebrow>{`Camera ${String(i + 1).padStart(2, '0')}`}</Eyebrow>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-head)',
                    fontWeight: 400,
                    fontSize: 'clamp(26px,4vw,40px)',
                    lineHeight: 1.1,
                  }}
                >
                  {camera.nome}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: 'var(--muted)',
                    fontSize: 'clamp(15px,2vw,18px)',
                    lineHeight: 1.75,
                  }}
                >
                  {camera.descrizione}
                </p>
                <TagList items={camera.caratteristiche} />
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    gap: 'clamp(16px,3vw,32px)',
                    marginTop: 'clamp(4px,1vw,8px)',
                  }}
                >
                  {camera.prezzoIndicativo ? (
                    <Prezzo valore={camera.prezzoIndicativo} />
                  ) : null}
                  <Dettaglio nome={camera.nome} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

// ── Stanze 03 · "any" — card orizzontali ampie, una per riga ───────────────────
const Stanze03: React.FC<{ content: StanzeContent }> = ({ content }) => (
  <section
    style={{
      background: 'var(--surface)',
      color: 'var(--ink)',
      padding: 'clamp(28px,4vw,60px) clamp(20px,5vw,56px)',
    }}
  >
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <Intestazione titolo={content.titolo} intro={content.intro} align="left" />

      <div
        style={{
          marginTop: 'clamp(40px,6vw,80px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(24px,3.5vw,40px)',
        }}
      >
        {content.camere.map((camera, i) => (
          <article
            key={camera.nome + i}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'stretch',
              background: 'var(--bg)',
              border: '1px solid var(--line)',
              overflow: 'hidden',
            }}
          >
            <div style={{ flex: '1 1 320px', minWidth: 280 }}>
              {camera.immagine ? (
                <img
                  src={camera.immagine.src}
                  alt={camera.immagine.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 'clamp(220px,26vw,320px)',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                <Vuoto
                  style={{
                    minHeight: 'clamp(220px,26vw,320px)',
                    borderBottom: 'none',
                    borderRight: '1px solid var(--line)',
                  }}
                />
              )}
            </div>
            <div
              style={{
                flex: '1.4 1 380px',
                minWidth: 300,
                padding: 'clamp(28px,4vw,56px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(14px,2vw,20px)',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-head)',
                    fontWeight: 400,
                    fontSize: 'clamp(24px,3.4vw,34px)',
                    lineHeight: 1.12,
                  }}
                >
                  {camera.nome}
                </h3>
                {camera.prezzoIndicativo ? (
                  <Prezzo valore={camera.prezzoIndicativo} />
                ) : null}
              </div>
              <p
                style={{
                  margin: 0,
                  color: 'var(--muted)',
                  fontSize: 'clamp(15px,2vw,17px)',
                  lineHeight: 1.75,
                  maxWidth: 640,
                }}
              >
                {camera.descrizione}
              </p>
              <TagList items={camera.caratteristiche} />
              <Dettaglio nome={camera.nome} />
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const stanzeVariants: Variant<StanzeContent>[] = [
  { id: 'stanze-01', mood: 'elegante', Component: Stanze01 },
  { id: 'stanze-02', mood: 'naturale', Component: Stanze02 },
  { id: 'stanze-03', mood: 'any', Component: Stanze03 },
];
