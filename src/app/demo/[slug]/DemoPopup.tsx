'use client';

import React, { useEffect, useState } from 'react';

const C = { teal: '#163A46', terra: '#C25E3C', muted: '#5b6270' };
const serif = 'Fraunces, Georgia, serif';

export function DemoPopup({ slug }: { slug: string }) {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 15000); // dopo 15 secondi
    return () => clearTimeout(t);
  }, []);

  if (!show || closed) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,42,51,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}
      onClick={() => setClosed(true)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: 460, background: '#fff', color: C.teal, borderRadius: 20, padding: 'clamp(24px,4vw,34px)', boxShadow: '0 30px 90px -30px rgba(0,0,0,.6)', textAlign: 'center' }}
      >
        <button
          aria-label="Chiudi"
          onClick={() => setClosed(true)}
          style={{ position: 'absolute', top: 12, right: 14, border: 'none', background: 'none', fontSize: 22, color: C.muted, cursor: 'pointer', lineHeight: 1 }}
        >
          ×
        </button>
        <h2 style={{ fontFamily: serif, fontSize: 26, margin: '0 0 8px' }}>Cosa ne pensi?</h2>
        <p style={{ color: C.muted, fontSize: 16, margin: '0 0 22px' }}>
          Questa è la bozza del tuo sito. Vuoi ritoccarla o sei pronto a metterla online?
        </p>
        <div style={{ display: 'grid', gap: 12 }}>
          <a
            href={`/demo/${slug}/modifica`}
            style={{ background: '#fff', color: C.teal, border: `2px solid ${C.teal}`, fontWeight: 700, fontSize: 16, padding: '14px 20px', borderRadius: 999, textDecoration: 'none' }}
          >
            Vuoi cambiare qualcosa? Clicca qui
          </a>
          <a
            href={`/demo/${slug}/acquista`}
            style={{ background: C.terra, color: '#fff', fontWeight: 700, fontSize: 16, padding: '14px 20px', borderRadius: 999, textDecoration: 'none' }}
          >
            Vuoi acquistare il sito? Clicca qua
          </a>
        </div>
        <button
          onClick={() => setClosed(true)}
          style={{ marginTop: 16, border: 'none', background: 'none', color: C.muted, fontSize: 14, cursor: 'pointer', textDecoration: 'underline' }}
        >
          Continua a guardare
        </button>
      </div>
    </div>
  );
}

export default DemoPopup;
