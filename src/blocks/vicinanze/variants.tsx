import React from 'react';
import type { Variant } from '../variant';
import type { VicinanzeContent } from '../types';

// ─────────────────────────────────────────────────────────────
// Grand Hotel Santa Lucia — stile Belle Époque
// Elegante, sobrio, editoriale: molta aria, titoli serif,
// label MAIUSCOLO con letter-spacing, linee sottili var(--line),
// badge distanza discreti.
// ─────────────────────────────────────────────────────────────

const SECTION_PAD = 'clamp(56px,9vw,128px) clamp(20px,5vw,56px)';
const INNER: React.CSSProperties = { maxWidth: 1180, margin: '0 auto' };
const HEAD = 'var(--font-head)';

const LABEL: React.CSSProperties = {
  margin: 0,
  fontSize: 'clamp(11px,1vw,12px)',
  fontWeight: 600,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--primary)',
};

const HAIRLINE: React.CSSProperties = {
  width: 'clamp(40px,6vw,68px)',
  height: 1,
  background: 'var(--line)',
  border: 'none',
};

// Badge distanza sobrio: bordo sottile, testo primary, sfondo neutro.
const DistanceBadge: React.FC<{ value: string; onPhoto?: boolean }> = ({
  value,
  onPhoto,
}) => (
  <span
    style={{
      display: 'inline-block',
      fontSize: 'clamp(10px,1vw,12px)',
      fontWeight: 600,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      padding: '5px 12px',
      whiteSpace: 'nowrap',
      color: onPhoto ? '#fff' : 'var(--primary)',
      border: onPhoto ? '1px solid rgba(255,255,255,0.55)' : '1px solid var(--line)',
      background: onPhoto ? 'rgba(0,0,0,0.18)' : 'var(--surface)',
    }}
  >
    {value}
  </span>
);

// ─────────────────────────────────────────────────────────────
// Variante 01 — griglia di card editoriali con foto (mood: naturale)
// ─────────────────────────────────────────────────────────────
const Vicinanze01: React.FC<{ content: VicinanzeContent }> = ({ content }) => {
  const titolo = content?.titolo;
  const intro = content?.intro;
  const luoghi = content?.luoghi ?? [];

  return (
    <section
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)',
        padding: SECTION_PAD,
      }}
    >
      <div style={INNER}>
        <header
          style={{
            maxWidth: 640,
            margin: '0 auto clamp(40px,6vw,72px)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(14px,2vw,22px)',
          }}
        >
          <p style={LABEL}>Nei dintorni</p>
          <hr style={HAIRLINE} />
          {titolo && (
            <h2
              style={{
                fontFamily: HEAD,
                fontWeight: 500,
                margin: 0,
                fontSize: 'clamp(30px,5vw,52px)',
                lineHeight: 1.1,
                color: 'var(--ink)',
              }}
            >
              {titolo}
            </h2>
          )}
          {intro && (
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(15px,1.4vw,18px)',
                lineHeight: 1.7,
                color: 'var(--muted)',
              }}
            >
              {intro}
            </p>
          )}
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(28px,4vw,56px)',
          }}
        >
          {luoghi.map((l, i) => (
            <article
              key={`${l?.nome ?? 'luogo'}-${i}`}
              style={{
                background: 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                {l?.immagine?.src ? (
                  <img
                    src={l.immagine.src}
                    alt={l.immagine.alt ?? l?.nome ?? ''}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'clamp(220px,28vw,320px)',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div
                    aria-hidden
                    style={{
                      width: '100%',
                      height: 'clamp(220px,28vw,320px)',
                      background: 'var(--surface)',
                      borderBottom: '1px solid var(--line)',
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  paddingTop: 'clamp(18px,2.4vw,26px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(10px,1.4vw,14px)',
                }}
              >
                {l?.distanza && (
                  <span style={{ alignSelf: 'flex-start' }}>
                    <DistanceBadge value={l.distanza} />
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: HEAD,
                    fontWeight: 500,
                    margin: 0,
                    fontSize: 'clamp(20px,2.2vw,27px)',
                    lineHeight: 1.2,
                    color: 'var(--ink)',
                  }}
                >
                  {l?.nome ?? 'Luogo'}
                </h3>
                {l?.descrizione && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'clamp(14px,1.3vw,16px)',
                      lineHeight: 1.7,
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
// Variante 02 — lista compatta editoriale con badge distanza (mood: fresco)
// ─────────────────────────────────────────────────────────────
const Vicinanze02: React.FC<{ content: VicinanzeContent }> = ({ content }) => {
  const titolo = content?.titolo;
  const intro = content?.intro;
  const luoghi = content?.luoghi ?? [];

  return (
    <section
      style={{
        background: 'var(--surface)',
        color: 'var(--ink)',
        padding: SECTION_PAD,
      }}
    >
      <div style={INNER}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(24px,4vw,64px)',
            alignItems: 'end',
            marginBottom: 'clamp(36px,5vw,64px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(14px,2vw,20px)',
            }}
          >
            <p style={LABEL}>Da vivere intorno</p>
            <hr style={HAIRLINE} />
            {titolo && (
              <h2
                style={{
                  fontFamily: HEAD,
                  fontWeight: 500,
                  margin: 0,
                  fontSize: 'clamp(30px,5vw,52px)',
                  lineHeight: 1.1,
                  color: 'var(--ink)',
                }}
              >
                {titolo}
              </h2>
            )}
          </div>
          {intro && (
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(15px,1.4vw,18px)',
                lineHeight: 1.75,
                color: 'var(--muted)',
              }}
            >
              {intro}
            </p>
          )}
        </div>

        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            borderTop: '1px solid var(--line)',
          }}
        >
          {luoghi.map((l, i) => (
            <li
              key={`${l?.nome ?? 'luogo'}-${i}`}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: 'clamp(14px,2.5vw,32px)',
                padding: 'clamp(22px,3vw,38px) 0',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <span
                style={{
                  fontFamily: HEAD,
                  fontWeight: 500,
                  fontSize: 'clamp(15px,1.4vw,18px)',
                  color: 'var(--primary)',
                  flexShrink: 0,
                  minWidth: '2ch',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div style={{ flex: '1 1 240px', minWidth: 200 }}>
                <h3
                  style={{
                    fontFamily: HEAD,
                    fontWeight: 500,
                    margin: 0,
                    fontSize: 'clamp(21px,2.4vw,30px)',
                    lineHeight: 1.2,
                    color: 'var(--ink)',
                  }}
                >
                  {l?.nome ?? 'Luogo'}
                </h3>
                {l?.descrizione && (
                  <p
                    style={{
                      margin: 'clamp(8px,1vw,12px) 0 0',
                      fontSize: 'clamp(14px,1.3vw,16px)',
                      lineHeight: 1.7,
                      color: 'var(--muted)',
                      maxWidth: 560,
                    }}
                  >
                    {l.descrizione}
                  </p>
                )}
              </div>

              {l?.distanza && (
                <span style={{ flexShrink: 0, marginLeft: 'auto' }}>
                  <DistanceBadge value={l.distanza} />
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
// Variante 03 — mosaico elegante (mood: any)
// ─────────────────────────────────────────────────────────────
const Vicinanze03: React.FC<{ content: VicinanzeContent }> = ({ content }) => {
  const titolo = content?.titolo;
  const intro = content?.intro;
  const luoghi = content?.luoghi ?? [];

  return (
    <section
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)',
        padding: SECTION_PAD,
      }}
    >
      <div style={INNER}>
        <header
          style={{
            maxWidth: 680,
            margin: '0 auto clamp(40px,6vw,72px)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(14px,2vw,22px)',
          }}
        >
          <p style={LABEL}>Itinerari intorno all'hotel</p>
          <hr style={HAIRLINE} />
          {titolo && (
            <h2
              style={{
                fontFamily: HEAD,
                fontWeight: 500,
                margin: 0,
                fontSize: 'clamp(32px,5.5vw,56px)',
                lineHeight: 1.08,
                color: 'var(--ink)',
              }}
            >
              {titolo}
            </h2>
          )}
          {intro && (
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(15px,1.4vw,18px)',
                lineHeight: 1.75,
                color: 'var(--muted)',
              }}
            >
              {intro}
            </p>
          )}
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gridAutoRows: 'clamp(240px,30vw,360px)',
            gap: 'clamp(14px,2vw,24px)',
          }}
        >
          {luoghi.map((l, i) => {
            const wide = i % 5 === 0; // ritmo editoriale del mosaico
            const hasImg = Boolean(l?.immagine?.src);
            return (
              <article
                key={`${l?.nome ?? 'luogo'}-${i}`}
                style={{
                  position: 'relative',
                  gridColumn: wide ? 'span 2' : 'span 1',
                  minWidth: 0,
                  overflow: 'hidden',
                  border: '1px solid var(--line)',
                  background: 'var(--surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                {hasImg && (
                  <img
                    src={l!.immagine!.src}
                    alt={l!.immagine!.alt ?? l?.nome ?? ''}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
                {hasImg && (
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.62), rgba(0,0,0,0.08) 52%, rgba(0,0,0,0))',
                    }}
                  />
                )}
                <div
                  style={{
                    position: 'relative',
                    padding: 'clamp(18px,2.6vw,30px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(9px,1.2vw,13px)',
                  }}
                >
                  {l?.distanza && (
                    <span style={{ alignSelf: 'flex-start' }}>
                      <DistanceBadge value={l.distanza} onPhoto={hasImg} />
                    </span>
                  )}
                  <h3
                    style={{
                      fontFamily: HEAD,
                      fontWeight: 500,
                      margin: 0,
                      fontSize: 'clamp(21px,2.4vw,30px)',
                      lineHeight: 1.18,
                      color: hasImg ? '#fff' : 'var(--ink)',
                    }}
                  >
                    {l?.nome ?? 'Luogo'}
                  </h3>
                  {l?.descrizione && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: 'clamp(14px,1.3vw,16px)',
                        lineHeight: 1.65,
                        color: hasImg ? 'rgba(255,255,255,0.9)' : 'var(--muted)',
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
