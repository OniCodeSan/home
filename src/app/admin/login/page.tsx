import React from 'react';
import { loginAction } from '../actions';
import { ui } from '../ui';
import { BRAND, SCRIPT, SUNSET, BC } from '@/lib/brand';

export const dynamic = 'force-dynamic';

export default function LoginPage({ searchParams }: { searchParams: { error?: string; next?: string } }) {
  const error = searchParams?.error === '1';
  const next = searchParams?.next || '/admin';

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: SUNSET, padding: 24, fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      <form action={loginAction} style={{ ...ui.card, width: 360, display: 'grid', gap: 12, boxShadow: '0 30px 80px -40px rgba(40,20,54,.6)' }}>
        <p style={{ fontFamily: SCRIPT, fontSize: 30, color: BC.magenta, margin: 0, lineHeight: 1 }}>{BRAND}</p>
        <p style={{ color: '#6b7280', margin: 0, fontSize: 14 }}>Area riservata · accesso admin.</p>
        <input type="hidden" name="next" value={next} />
        <div>
          <label style={ui.label}>Password</label>
          <input name="password" type="password" autoFocus required style={ui.input} />
        </div>
        {error ? <p style={{ color: '#b34141', fontSize: 13, margin: 0 }}>Password errata.</p> : null}
        <button type="submit" style={{ ...ui.btnPrimary, background: BC.magenta, borderColor: BC.magenta }}>Entra</button>
      </form>
    </main>
  );
}
