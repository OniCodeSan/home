import React from 'react';
import { loginAction } from '../actions';
import { ui } from '../ui';

export const dynamic = 'force-dynamic';

export default function LoginPage({ searchParams }: { searchParams: { error?: string; next?: string } }) {
  const error = searchParams?.error === '1';
  const next = searchParams?.next || '/admin';

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6f7f9', fontFamily: 'system-ui, sans-serif' }}>
      <form action={loginAction} style={{ ...ui.card, width: 360, display: 'grid', gap: 12 }}>
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 24, margin: 0 }}>contentmug · admin</h1>
        <p style={{ color: '#6b7280', margin: 0, fontSize: 14 }}>Accesso riservato.</p>
        <input type="hidden" name="next" value={next} />
        <div>
          <label style={ui.label}>Password</label>
          <input name="password" type="password" autoFocus required style={ui.input} />
        </div>
        {error ? <p style={{ color: '#b34141', fontSize: 13, margin: 0 }}>Password errata.</p> : null}
        <button type="submit" style={ui.btnPrimary}>Entra</button>
      </form>
    </main>
  );
}
