import React from 'react';

// Linguaggio visivo condiviso fra i blocchi → coerenza di spazi e tipografia.
export const HEAD = 'var(--font-head)';
export const SECTION_PAD = 'clamp(40px,5.5vw,68px) clamp(20px,5vw,56px)';
export const INNER = 1180;

export const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean; center?: boolean }> = ({ children, light, center }) => (
  <span
    style={{
      display: 'block',
      textTransform: 'uppercase',
      letterSpacing: '.14em',
      fontSize: 'clamp(11px,1.4vw,13px)',
      fontWeight: 600,
      color: light ? 'rgba(255,255,255,.85)' : 'var(--primary)',
      textAlign: center ? 'center' : 'left',
    }}
  >
    {children}
  </span>
);

export const SectionTitle: React.FC<{ children: React.ReactNode; light?: boolean; center?: boolean; style?: React.CSSProperties }> = ({ children, light, center, style }) => (
  <h2
    style={{
      fontFamily: HEAD,
      fontWeight: 400,
      lineHeight: 1.1,
      fontSize: 'clamp(28px,4.2vw,46px)',
      margin: 0,
      color: light ? '#fff' : 'var(--ink)',
      textAlign: center ? 'center' : 'left',
      ...style,
    }}
  >
    {children}
  </h2>
);

// Filetto sottile decorativo (cifra Belle Époque).
export const Rule: React.FC<{ center?: boolean; light?: boolean }> = ({ center, light }) => (
  <span aria-hidden="true" style={{ display: 'block', width: 64, height: 1, background: light ? 'rgba(255,255,255,.5)' : 'var(--accent)', margin: center ? '0 auto' : 0 }} />
);
