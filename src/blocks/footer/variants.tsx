import React from 'react';
import type { Variant } from '../variant';
import type { FooterContent } from '../types';

// Stile Grand Hotel Santa Lucia — Belle Époque: serif elegante per i titoli,
// label MAIUSCOLO con letter-spacing .14em, linee sottili var(--line), sobrio e raffinato.

// Label "kicker" maiuscolo, ricorrente nello stile della struttura.
function label(onColor: boolean): React.CSSProperties {
  return {
    textTransform: 'uppercase',
    letterSpacing: '.14em',
    fontSize: 'clamp(10px,1.1vw,12px)',
    color: onColor ? 'rgba(255,255,255,.7)' : 'var(--muted)',
  };
}

// Stile link condiviso: focus visibile, outline non rimosso. Sottile e composto.
function linkStyle(onColor: boolean): React.CSSProperties {
  return {
    color: onColor ? '#fff' : 'var(--ink)',
    textDecoration: 'none',
    borderBottom: '1px solid var(--line)',
    paddingBottom: 1,
    outlineOffset: 3,
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
        padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,48px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(28px,5vw,64px)',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ minWidth: 240, flex: '1 1 280px' }}>
          <div style={{ ...label(true), marginBottom: 14 }}>La struttura</div>
          <div
            style={{
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(26px,3.4vw,36px)',
              lineHeight: 1.12,
              fontWeight: 400,
              marginBottom: 18,
            }}
          >
            {ragioneSociale}
          </div>
          <div style={{ fontSize: 'clamp(14px,1.5vw,15px)', lineHeight: 1.7, color: '#fff', opacity: 0.92 }}>
            {indirizzo}
          </div>
          {piva && (
            <div style={{ fontSize: 'clamp(12px,1.3vw,13px)', marginTop: 10, opacity: 0.7 }}>
              P.IVA {piva}
            </div>
          )}
        </div>

        <div
          style={{
            minWidth: 200,
            flex: '1 1 220px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={label(true)}>Contatti</div>
          {email && (
            <a href={'mailto:' + email} style={{ ...linkStyle(true), fontSize: 'clamp(14px,1.6vw,16px)' }}>
              {email}
            </a>
          )}
          {telefono && (
            <a href={'tel:' + telefono} style={{ ...linkStyle(true), fontSize: 'clamp(14px,1.6vw,16px)' }}>
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
            marginTop: 'clamp(28px,5vw,48px)',
            paddingTop: 'clamp(18px,3vw,28px)',
            borderTop: '1px solid var(--line)',
            fontSize: 'clamp(12px,1.3vw,13px)',
            color: 'var(--muted)',
            lineHeight: 1.6,
          }}
        >
          {note}
        </div>
      )}
    </footer>
  );
};

// Variante 02 — "minimal": centrato su var(--bg), composto, nome struttura in serif con filetti.
const Footer02: React.FC<{ content: FooterContent }> = ({ content }) => {
  const { ragioneSociale, piva, indirizzo, email, telefono, note } = content;
  return (
    <footer
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)',
        padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,48px)',
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'clamp(12px,1.8vw,18px)',
        }}
      >
        <div style={label(false)}>La struttura</div>

        <div
          style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(28px,4vw,40px)',
            lineHeight: 1.1,
            fontWeight: 400,
            color: 'var(--primary)',
          }}
        >
          {ragioneSociale}
        </div>

        <div
          style={{
            width: 56,
            height: 1,
            background: 'var(--line)',
            margin: 'clamp(4px,1vw,8px) 0',
          }}
        />

        <div style={{ fontSize: 'clamp(14px,1.5vw,15px)', color: 'var(--ink)', lineHeight: 1.7 }}>
          {indirizzo}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(14px,2.5vw,28px)',
            fontSize: 'clamp(14px,1.6vw,16px)',
            marginTop: 4,
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
          <div style={{ fontSize: 'clamp(12px,1.3vw,13px)', color: 'var(--muted)' }}>
            P.IVA {piva}
          </div>
        )}

        {note && (
          <div
            style={{
              fontSize: 'clamp(12px,1.3vw,13px)',
              color: 'var(--muted)',
              lineHeight: 1.6,
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
        padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,48px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(24px,5vw,64px)',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ minWidth: 240, flex: '2 1 320px' }}>
          <div style={{ ...label(false), marginBottom: 12 }}>La struttura</div>
          <div
            style={{
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(22px,3vw,30px)',
              lineHeight: 1.18,
              fontWeight: 400,
              color: 'var(--primary)',
              marginBottom: 12,
            }}
          >
            {ragioneSociale}
          </div>
          <div style={{ fontSize: 'clamp(14px,1.5vw,15px)', color: 'var(--ink)', lineHeight: 1.7 }}>
            {indirizzo}
          </div>
        </div>

        <div
          style={{
            minWidth: 200,
            flex: '1 1 220px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ ...label(false), marginBottom: 4 }}>Contatti</div>
          {email && (
            <a href={'mailto:' + email} style={{ ...linkStyle(false), fontSize: 'clamp(14px,1.6vw,16px)' }}>
              {email}
            </a>
          )}
          {telefono && (
            <a href={'tel:' + telefono} style={{ ...linkStyle(false), fontSize: 'clamp(14px,1.6vw,16px)' }}>
              {telefono}
            </a>
          )}
          {piva && (
            <span style={{ color: 'var(--muted)', fontSize: 'clamp(12px,1.3vw,13px)', marginTop: 4 }}>
              P.IVA {piva}
            </span>
          )}
        </div>
      </div>

      {note && (
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            marginTop: 'clamp(24px,4vw,40px)',
            paddingTop: 'clamp(18px,3vw,28px)',
            borderTop: '1px solid var(--line)',
            fontSize: 'clamp(12px,1.3vw,13px)',
            color: 'var(--muted)',
            lineHeight: 1.6,
          }}
        >
          {note}
        </div>
      )}
    </footer>
  );
};

// Variante 04 — "caldo": banda accento var(--accent), nome grande a tutta larghezza,
// contatti su riga inferiore divisa da filetto; layout a fasce orizzontali (impilabili).
const Footer04: React.FC<{ content: FooterContent }> = ({ content }) => {
  const { ragioneSociale, piva, indirizzo, email, telefono, note } = content;
  return (
    <footer
      style={{
        background: 'var(--accent)',
        color: '#fff',
        padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,48px)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ ...label(true), marginBottom: 'clamp(14px,2vw,20px)' }}>La struttura</div>

        <div
          style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(32px,6vw,64px)',
            lineHeight: 1.04,
            fontWeight: 400,
            color: '#fff',
          }}
        >
          {ragioneSociale}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(20px,4vw,56px)',
            alignItems: 'flex-start',
            marginTop: 'clamp(28px,4vw,44px)',
            paddingTop: 'clamp(24px,3vw,32px)',
            borderTop: '1px solid rgba(255,255,255,.28)',
          }}
        >
          <div style={{ flex: '1 1 280px', minWidth: 240 }}>
            <div style={{ ...label(true), marginBottom: 10 }}>Dove siamo</div>
            <div style={{ fontSize: 'clamp(15px,1.6vw,17px)', lineHeight: 1.7, color: '#fff', opacity: 0.94 }}>
              {indirizzo}
            </div>
          </div>

          {(email || telefono) && (
            <div
              style={{
                flex: '1 1 240px',
                minWidth: 200,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ ...label(true), marginBottom: 2 }}>Contatti</div>
              {email && (
                <a href={'mailto:' + email} style={{ ...linkStyle(true), fontSize: 'clamp(15px,1.7vw,18px)' }}>
                  {email}
                </a>
              )}
              {telefono && (
                <a href={'tel:' + telefono} style={{ ...linkStyle(true), fontSize: 'clamp(15px,1.7vw,18px)' }}>
                  {telefono}
                </a>
              )}
            </div>
          )}

          {piva && (
            <div style={{ flex: '1 1 180px', minWidth: 160 }}>
              <div style={{ ...label(true), marginBottom: 10 }}>Dati fiscali</div>
              <div style={{ fontSize: 'clamp(13px,1.4vw,15px)', color: '#fff', opacity: 0.88 }}>
                P.IVA {piva}
              </div>
            </div>
          )}
        </div>

        {note && (
          <div
            style={{
              marginTop: 'clamp(24px,4vw,40px)',
              fontSize: 'clamp(12px,1.3vw,13px)',
              color: 'var(--muted)',
              lineHeight: 1.6,
            }}
          >
            {note}
          </div>
        )}
      </div>
    </footer>
  );
};

export const footerVariants: Variant<FooterContent>[] = [
  { id: 'footer-01', mood: 'elegante', Component: Footer01 },
  { id: 'footer-02', mood: 'minimal', Component: Footer02 },
  { id: 'footer-03', mood: 'any', Component: Footer03 },
  { id: 'footer-04', mood: 'caldo', Component: Footer04 },
];
