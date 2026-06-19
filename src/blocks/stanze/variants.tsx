import React from 'react';
import type { Variant } from '../variant';
import type { StanzeContent } from '../types';

const SERIF = 'Fraunces, Georgia, serif';

// Chip riusabile per le caratteristiche della camera.
const Chip: React.FC<{ label: string }> = ({ label }) => (
  <span
    style={{
      display: 'inline-block',
      border: '1px solid var(--line)',
      color: 'var(--muted)',
      borderRadius: 999,
      padding: '4px 12px',
      fontSize: 13,
      lineHeight: 1.3,
    }}
  >
    {label}
  </span>
);

// Prezzo evidenziato.
const Prezzo: React.FC<{ valore: string }> = ({ valore }) => (
  <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 'clamp(16px,2.4vw,20px)' }}>
    {valore}
  </span>
);

// Placeholder neutro quando l'immagine manca.
const Placeholder: React.FC<{ minHeight?: string }> = ({ minHeight = '180px' }) => (
  <div
    aria-hidden="true"
    style={{
      width: '100%',
      minHeight,
      height: '100%',
      background:
        'repeating-linear-gradient(45deg, var(--line), var(--line) 1px, transparent 1px, transparent 12px)',
      border: '1px solid var(--line)',
    }}
  />
);

// ── Stanze 01 · "elegante" — griglia di card verticali ─────────────────────────
const Stanze01: React.FC<{ content: StanzeContent }> = ({ content }) => (
  <section
    style={{
      background: 'var(--bg)',
      color: 'var(--ink)',
      padding: 'clamp(40px,6vw,88px) clamp(20px,5vw,48px)',
    }}
  >
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {content.titolo ? (
        <h2
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 'clamp(28px,4.5vw,46px)',
            lineHeight: 1.1,
          }}
        >
          {content.titolo}
        </h2>
      ) : null}
      {content.intro ? (
        <p
          style={{
            margin: '.6em 0 0',
            maxWidth: 640,
            color: 'var(--muted)',
            fontSize: 'clamp(15px,2vw,18px)',
            lineHeight: 1.6,
          }}
        >
          {content.intro}
        </p>
      ) : null}

      <div
        style={{
          marginTop: 'clamp(24px,4vw,48px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(20px,3vw,32px)',
        }}
      >
        {content.camere.map((camera, i) => (
          <article
            key={camera.nome + i}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 14,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {camera.immagine ? (
              <img
                src={camera.immagine.src}
                alt={camera.immagine.alt}
                style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <Placeholder minHeight="200px" />
            )}
            <div
              style={{
                padding: 'clamp(16px,2.5vw,24px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                flex: 1,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <h3 style={{ margin: 0, fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(19px,2.6vw,24px)' }}>
                  {camera.nome}
                </h3>
                {camera.prezzoIndicativo ? <Prezzo valore={camera.prezzoIndicativo} /> : null}
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15, lineHeight: 1.6 }}>
                {camera.descrizione}
              </p>
              {camera.caratteristiche && camera.caratteristiche.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto', paddingTop: 4 }}>
                  {camera.caratteristiche.map((c, j) => (
                    <Chip key={c + j} label={c} />
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ── Stanze 02 · "naturale" — lista alternata immagine / testo ──────────────────
const Stanze02: React.FC<{ content: StanzeContent }> = ({ content }) => (
  <section
    style={{
      background: 'var(--bg)',
      color: 'var(--ink)',
      padding: 'clamp(40px,6vw,88px) clamp(20px,5vw,48px)',
    }}
  >
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {content.titolo ? (
        <h2
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 'clamp(28px,4.5vw,46px)',
            lineHeight: 1.1,
            textAlign: 'center',
          }}
        >
          {content.titolo}
        </h2>
      ) : null}
      {content.intro ? (
        <p
          style={{
            margin: '.6em auto 0',
            maxWidth: 640,
            color: 'var(--muted)',
            fontSize: 'clamp(15px,2vw,18px)',
            lineHeight: 1.6,
            textAlign: 'center',
          }}
        >
          {content.intro}
        </p>
      ) : null}

      <div style={{ marginTop: 'clamp(28px,5vw,56px)', display: 'flex', flexDirection: 'column', gap: 'clamp(28px,5vw,64px)' }}>
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
                gap: 'clamp(20px,4vw,48px)',
              }}
            >
              <div style={{ flex: '1 1 320px', minWidth: 280 }}>
                {camera.immagine ? (
                  <img
                    src={camera.immagine.src}
                    alt={camera.immagine.alt}
                    style={{ width: '100%', height: 'clamp(220px,32vw,360px)', objectFit: 'cover', borderRadius: 16, display: 'block' }}
                  />
                ) : (
                  <Placeholder minHeight="clamp(220px,32vw,360px)" />
                )}
              </div>
              <div style={{ flex: '1 1 320px', minWidth: 280, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                  <h3 style={{ margin: 0, fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(22px,3.2vw,30px)' }}>
                    {camera.nome}
                  </h3>
                  {camera.prezzoIndicativo ? <Prezzo valore={camera.prezzoIndicativo} /> : null}
                </div>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'clamp(15px,2vw,17px)', lineHeight: 1.65 }}>
                  {camera.descrizione}
                </p>
                {camera.caratteristiche && camera.caratteristiche.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {camera.caratteristiche.map((c, j) => (
                      <Chip key={c + j} label={c} />
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

// ── Stanze 03 · "any" — card larghe orizzontali, una per riga ──────────────────
const Stanze03: React.FC<{ content: StanzeContent }> = ({ content }) => (
  <section
    style={{
      background: 'var(--surface)',
      color: 'var(--ink)',
      padding: 'clamp(40px,6vw,88px) clamp(20px,5vw,48px)',
    }}
  >
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {content.titolo ? (
        <h2
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 'clamp(28px,4.5vw,46px)',
            lineHeight: 1.1,
          }}
        >
          {content.titolo}
        </h2>
      ) : null}
      {content.intro ? (
        <p
          style={{
            margin: '.6em 0 0',
            maxWidth: 640,
            color: 'var(--muted)',
            fontSize: 'clamp(15px,2vw,18px)',
            lineHeight: 1.6,
          }}
        >
          {content.intro}
        </p>
      ) : null}

      <div style={{ marginTop: 'clamp(24px,4vw,48px)', display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.5vw,24px)' }}>
        {content.camere.map((camera, i) => (
          <article
            key={camera.nome + i}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'stretch',
              gap: 0,
              background: 'var(--bg)',
              border: '1px solid var(--line)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            <div style={{ flex: '1 1 260px', minWidth: 240 }}>
              {camera.immagine ? (
                <img
                  src={camera.immagine.src}
                  alt={camera.immagine.alt}
                  style={{ width: '100%', height: '100%', minHeight: 200, objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <Placeholder minHeight="200px" />
              )}
            </div>
            <div
              style={{
                flex: '2 1 360px',
                minWidth: 280,
                padding: 'clamp(20px,3vw,36px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <h3 style={{ margin: 0, fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(21px,3vw,28px)' }}>
                  {camera.nome}
                </h3>
                {camera.prezzoIndicativo ? <Prezzo valore={camera.prezzoIndicativo} /> : null}
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'clamp(15px,2vw,17px)', lineHeight: 1.65 }}>
                {camera.descrizione}
              </p>
              {camera.caratteristiche && camera.caratteristiche.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {camera.caratteristiche.map((c, j) => (
                    <Chip key={c + j} label={c} />
                  ))}
                </div>
              ) : null}
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
