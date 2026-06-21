'use client';

import React, { useEffect, useState } from 'react';

const KEY = 'sdw_cookie_consent'; // 'accepted' | 'rejected'

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  function choose(value: 'accepted' | 'rejected') {
    try { localStorage.setItem(KEY, value); } catch {}
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Consenso cookie"
      style={{
        position: 'fixed', left: 16, right: 16, bottom: 16, zIndex: 2000,
        maxWidth: 560, margin: '0 auto',
        background: '#241436', color: '#fff', borderRadius: 16,
        boxShadow: '0 20px 60px -20px rgba(0,0,0,.6)',
        padding: 'clamp(16px,3vw,22px)',
        fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
      }}
    >
      <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,.92)' }}>
        Usiamo cookie tecnici necessari al funzionamento del sito e, con il tuo consenso, contenuti di terze parti
        (es. mappe). Puoi accettare o rifiutare quelli non essenziali. Dettagli nella{' '}
        <a href="/cookie-policy" style={{ color: '#F2A65A', textDecoration: 'underline' }}>Cookie Policy</a> e nella{' '}
        <a href="/privacy" style={{ color: '#F2A65A', textDecoration: 'underline' }}>Privacy Policy</a>.
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button type="button" onClick={() => choose('accepted')}
          style={{ background: '#C13C7B', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', font: 'inherit', fontSize: 14 }}>
          Accetta
        </button>
        <button type="button" onClick={() => choose('rejected')}
          style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,.4)', borderRadius: 999, padding: '10px 20px', fontWeight: 600, cursor: 'pointer', font: 'inherit', fontSize: 14 }}>
          Rifiuta non essenziali
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
