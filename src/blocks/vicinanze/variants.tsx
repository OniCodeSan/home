import React from 'react';
import type { Variant } from '../variant';
import type { VicinanzeContent } from '../types';

const SECTION_PAD = 'clamp(40px,6vw,88px) clamp(20px,5vw,48px)';
const INNER: React.CSSProperties = { maxWidth: 1100, margin: '0 auto' };
const SERIF = 'Fraunces, Georgia, serif';

// ─────────────────────────────────────────────────────────────
// Variante 01 — griglia di card con foto (mood: naturale)
// ─────────────────────────────────────────────────────────────
const Vicinanze01: React.FC<{ content: VicinanzeContent }> = ({ content }) => {
  const { titolo, intro, luoghi } = content;
  return (
    <section
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)',
        padding: SECTION_PAD,
      }}
    >
      <div style={INNER}>
        {titolo && (
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 600,
              margin: 0,
              fontSize: 'clamp(26px,4vw,44px)',
              color: 'var(--ink)',
            }}
          >
            {titolo}
          </h2>
        )}
        {intro && (
          <p
            style={{
              margin: 'clamp(8px,1.5vw,16px) 0 0',
              maxWidth: 620,
              fontSize: 'clamp(15px,1.4vw,18px)',
              lineHeight: 1.6,
              color: 'var(--muted)',
            }}
          >
            {intro}
          </p>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(16px,2.5vw,28px)',
            marginTop: 'clamp(24px,4vw,48px)',
          }}
        >
          {luoghi.map((l, i) => (
            <article
              key={`${l.nome}-${i}`}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 16,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {l.immagine && (
                <div style={{ position: 'relative' }}>
                  <img
                    src={l.immagine.src}
                    alt={l.immagine.alt}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'clamp(150px,20vw,200px)',
                      objectFit: 'cover',
                    }}
                  />
                  {l.distanza && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: 'var(--accent)',
                        color: 'var(--ink)',
                        fontSize: 'clamp(11px,1.1vw,13px)',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: 999,
                      }}
                    >
                      {l.distanza}
                    </span>
                  )}
                </div>
              )}
              <div
                style={{
                  padding: 'clamp(16px,2vw,22px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 600,
                    margin: 0,
                    fontSize: 'clamp(18px,1.8vw,22px)',
                    color: 'var(--ink)',
                  }}
                >
                  {l.nome}
                </h3>
                {!l.immagine && l.distanza && (
                  <span
                    style={{
                      alignSelf: 'flex-start',
                      background: 'var(--accent)',
                      color: 'var(--ink)',
                      fontSize: 'clamp(11px,1.1vw,13px)',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: 999,
                    }}
                  >
                    {l.distanza}
                  </span>
                )}
                {l.descrizione && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'clamp(14px,1.3vw,16px)',
                      lineHeight: 1.6,
                      color: 'var(--muted)',
                    }}
                  >
                    {l.descrizione}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// Variante 02 — lista compatta con badge distanza (mood: fresco)
// ─────────────────────────────────────────────────────────────
const Vicinanze02: React.FC<{ content: VicinanzeContent }> = ({ content }) => {
  const { titolo, intro, luoghi } = content;
  return (
    <section
      style={{
        background: 'var(--surface)',
        color: 'var(--ink)',
        padding: SECTION_PAD,
      }}
    >
      <div style={INNER}>
        {titolo && (
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 600,
              margin: 0,
              fontSize: 'clamp(26px,4vw,44px)',
              color: 'var(--ink)',
            }}
          >
            {titolo}
          </h2>
        )}
        {intro && (
          <p
            style={{
              margin: 'clamp(8px,1.5vw,16px) 0 0',
              maxWidth: 620,
              fontSize: 'clamp(15px,1.4vw,18px)',
              lineHeight: 1.6,
              color: 'var(--muted)',
            }}
          >
            {intro}
          </p>
        )}

        <ul
          style={{
            listStyle: 'none',
            margin: 'clamp(24px,4vw,48px) 0 0',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(10px,1.5vw,16px)',
          }}
        >
          {luoghi.map((l, i) => (
            <li
              key={`${l.nome}-${i}`}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 'clamp(12px,2vw,20px)',
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                borderRadius: 14,
                padding: 'clamp(12px,1.8vw,18px)',
              }}
            >
              {l.immagine && (
                <img
                  src={l.immagine.src}
                  alt={l.immagine.alt}
                  style={{
                    display: 'block',
                    width: 'clamp(64px,8vw,96px)',
                    height: 'clamp(64px,8vw,96px)',
                    objectFit: 'cover',
                    borderRadius: 10,
                    flexShrink: 0,
                  }}
                />
              )}
              <div style={{ flex: '1 1 220px', minWidth: 220 }}>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 600,
                    margin: 0,
                    fontSize: 'clamp(17px,1.7vw,21px)',
                    color: 'var(--ink)',
                  }}
                >
                  {l.nome}
                </h3>
                {l.descrizione && (
                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: 'clamp(13px,1.3vw,15px)',
                      lineHeight: 1.55,
                      color: 'var(--muted)',
                    }}
                  >
                    {l.descrizione}
                  </p>
                )}
              </div>
              {l.distanza && (
                <span
                  style={{
                    flexShrink: 0,
                    color: 'var(--primary)',
                    border: '1px solid var(--line)',
                    background: 'var(--surface)',
                    fontSize: 'clamp(12px,1.2vw,14px)',
                    fontWeight: 600,
                    padding: '6px 12px',
                    borderRadius: 999,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {l.distanza}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// Variante 03 — mosaico (mood: any)
// ─────────────────────────────────────────────────────────────
const Vicinanze03: React.FC<{ content: VicinanzeContent }> = ({ content }) => {
  const { titolo, intro, luoghi } = content;
  return (
    <section
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)',
        padding: SECTION_PAD,
      }}
    >
      <div style={INNER}>
        {(titolo || intro) && (
          <div style={{ textAlign: 'center', marginBottom: 'clamp(24px,4vw,48px)' }}>
            {titolo && (
              <h2
                style={{
                  fontFamily: SERIF,
                  fontWeight: 600,
                  margin: 0,
                  fontSize: 'clamp(26px,4vw,44px)',
                  color: 'var(--ink)',
                }}
              >
                {titolo}
              </h2>
            )}
            {intro && (
              <p
                style={{
                  margin: 'clamp(8px,1.5vw,16px) auto 0',
                  maxWidth: 620,
                  fontSize: 'clamp(15px,1.4vw,18px)',
                  lineHeight: 1.6,
                  color: 'var(--muted)',
                }}
              >
                {intro}
              </p>
            )}
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gridAutoRows: 'clamp(180px,24vw,260px)',
            gap: 'clamp(12px,2vw,20px)',
          }}
        >
          {luoghi.map((l, i) => {
            const wide = i % 5 === 0; // ritmo mosaico
            return (
              <article
                key={`${l.nome}-${i}`}
                style={{
                  position: 'relative',
                  gridColumn: wide ? 'span 2' : 'span 1',
                  minWidth: 0,
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid var(--line)',
                  background: 'var(--surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                {l.immagine && (
                  <img
                    src={l.immagine.src}
                    alt={l.immagine.alt}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
                {l.immagine && (
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.05) 55%, rgba(0,0,0,0))',
                    }}
                  />
                )}
                <div
                  style={{
                    position: 'relative',
                    padding: 'clamp(14px,2vw,20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  {l.distanza && (
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        background: 'var(--accent)',
                        color: 'var(--ink)',
                        fontSize: 'clamp(11px,1.1vw,13px)',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: 999,
                      }}
                    >
                      {l.distanza}
                    </span>
                  )}
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 600,
                      margin: 0,
                      fontSize: 'clamp(18px,1.9vw,24px)',
                      color: l.immagine ? '#fff' : 'var(--ink)',
                    }}
                  >
                    {l.nome}
                  </h3>
                  {l.descrizione && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: 'clamp(13px,1.3vw,15px)',
                        lineHeight: 1.55,
                        color: l.immagine ? 'rgba(255,255,255,0.88)' : 'var(--muted)',
                      }}
                    >
                      {l.descrizione}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const vicinanzeVariants: Variant<VicinanzeContent>[] = [
  { id: 'vicinanze-01', mood: 'naturale', Component: Vicinanze01 },
  { id: 'vicinanze-02', mood: 'fresco', Component: Vicinanze02 },
  { id: 'vicinanze-03', mood: 'any', Component: Vicinanze03 },
];
