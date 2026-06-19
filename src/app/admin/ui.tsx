import React from 'react';

// Stili condivisi dell'admin (UI di servizio, NON usa i token dei siti).
export const ui = {
  page: { maxWidth: 1280, margin: '0 auto', padding: '24px 20px', color: '#1f2430' } as React.CSSProperties,
  h1: { fontFamily: 'Fraunces, Georgia, serif', fontSize: 28, margin: '0 0 4px' } as React.CSSProperties,
  card: { background: '#fff', border: '1px solid #e3e6ee', borderRadius: 12, padding: 16 } as React.CSSProperties,
  label: { fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em', color: '#6b7280' } as React.CSSProperties,
  input: { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 8, font: 'inherit' } as React.CSSProperties,
  btn: { padding: '8px 14px', border: '1px solid #d1d5db', borderRadius: 8, background: '#fff', cursor: 'pointer', font: 'inherit' } as React.CSSProperties,
  btnPrimary: { padding: '8px 14px', border: '1px solid #1c5b6b', borderRadius: 8, background: '#1c5b6b', color: '#fff', cursor: 'pointer', font: 'inherit' } as React.CSSProperties,
  badge: (status: string): React.CSSProperties => ({
    fontSize: 12,
    padding: '2px 8px',
    borderRadius: 999,
    background: status === 'published' ? '#e6f4ea' : status === 'review' ? '#fef3e2' : '#eef0f4',
    color: status === 'published' ? '#1f7a3d' : status === 'review' ? '#92600c' : '#5b6270',
    border: '1px solid rgba(0,0,0,.06)',
  }),
};
