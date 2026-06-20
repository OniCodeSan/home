'use client';

import React, { useEffect, useState } from 'react';

type Img = { src: string; alt?: string };

// "Scopri la camera" → apre un lightbox con tutte le foto della camera.
// Niente miniature in pagina: solo il link, e la galleria nel popup.
export function RoomGallery({ nome, immagini }: { nome: string; immagini: Img[] }) {
  const fotos = (immagini || []).filter((i) => i && i.src);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const go = (d: number) => setIdx((i) => (i + d + Math.max(1, fotos.length)) % Math.max(1, fotos.length));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, fotos.length]);

  const cur = fotos[idx];

  // Senza foto: il link porta semplicemente alla prenotazione.
  if (fotos.length === 0) {
    return <a href="#prenota" style={triggerStyle} aria-label={`Prenota ${nome}`}>Prenota <span aria-hidden="true">→</span></a>;
  }

  return (
    <>
      <button type="button" onClick={() => { setIdx(0); setOpen(true); }} style={triggerStyle} aria-label={`Scopri ${nome}`}>
        Scopri la camera <span aria-hidden="true">→</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${nome}`}
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(8,12,14,.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px,4vw,48px)', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}
        >
          {/* chiudi */}
          <button type="button" aria-label="Chiudi" onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', color: '#fff', fontSize: 32, lineHeight: 1, cursor: 'pointer' }}>×</button>

          <div style={{ position: 'relative', maxWidth: 1100, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.stopPropagation()}>
            {fotos.length > 1 && (
              <button type="button" aria-label="Precedente" onClick={() => go(-1)} style={navBtn('left')}>‹</button>
            )}
            <img src={cur.src} alt={cur.alt || nome} style={{ maxWidth: '100%', maxHeight: '78vh', objectFit: 'contain', display: 'block', boxShadow: '0 30px 80px -20px rgba(0,0,0,.7)' }} />
            {fotos.length > 1 && (
              <button type="button" aria-label="Successiva" onClick={() => go(1)} style={navBtn('right')}>›</button>
            )}
          </div>

          <div style={{ marginTop: 16, color: '#fff', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(18px,2.4vw,24px)' }}>{nome}</div>
            {fotos.length > 1 && <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>{idx + 1} / {fotos.length}</div>}
          </div>
        </div>
      )}
    </>
  );
}

const triggerStyle: React.CSSProperties = {
  alignSelf: 'flex-start',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'var(--cta)',
  border: '1px solid var(--cta)',
  padding: '9px 18px',
  borderRadius: 8,
  fontSize: 'clamp(11px,1.5vw,13px)',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.12em',
  fontFamily: 'inherit',
  outlineOffset: 3,
};

function navBtn(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    [side]: 'clamp(-4px,1vw,8px)',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,.12)',
    border: '1px solid rgba(255,255,255,.3)',
    color: '#fff',
    width: 46,
    height: 46,
    borderRadius: '50%',
    fontSize: 26,
    lineHeight: 1,
    cursor: 'pointer',
  };
}

export default RoomGallery;
