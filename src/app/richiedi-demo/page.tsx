import React from 'react';
import { requestDemoAction } from './actions';
import { BRAND, SCRIPT, SUNSET, BC } from '@/lib/brand';

export const dynamic = 'force-dynamic';

const wrap: React.CSSProperties = { minHeight: '100vh', background: SUNSET, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Hanken Grotesk', system-ui, sans-serif" };
const card: React.CSSProperties = { width: '100%', maxWidth: 520, background: '#fff', borderRadius: 20, padding: '32px 28px', boxShadow: '0 30px 80px -40px rgba(40,20,54,.6)' };
const label: React.CSSProperties = { display: 'block', fontSize: 13, color: '#5b4a66', marginBottom: 6, fontWeight: 600 };
const input: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '1px solid #e6d8d0', borderRadius: 12, fontSize: 15, fontFamily: 'inherit', marginBottom: 14 };

export default function RichiediDemo({ searchParams }: { searchParams: Record<string, string> }) {
  const sp = searchParams || {};
  const err = sp.error === 'struttura';
  return (
    <main style={wrap}>
      <form action={requestDemoAction} style={card}>
        <p style={{ margin: 0, fontFamily: SCRIPT, fontSize: 34, color: BC.magenta, lineHeight: 1 }}>{BRAND}</p>
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 28, margin: '10px 0 4px', color: BC.ink }}>Richiedi la tua demo</h1>
        <p style={{ marginTop: 0, color: BC.muted, fontSize: 15 }}>Inserisci i dati: prepariamo un sito di prova in pochi secondi.</p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={label}>Il tuo nome</label>
            <input style={input} name="nome" placeholder="Mario Rossi" />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={label}>Nome attività *</label>
            <input style={input} name="struttura" placeholder="Villa Il Mandorlo" required />
          </div>
        </div>

        <label style={label}>Città</label>
        <input style={input} name="citta" placeholder="Sorrento" />

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={label}>WhatsApp</label>
            <input style={input} name="whatsapp" type="tel" placeholder="+39 ..." />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={label}>Email</label>
            <input style={input} name="email" type="email" placeholder="nome@email.it" />
          </div>
        </div>

        <label style={label}>Dove ti trovano online</label>
        <input style={input} name="dove" placeholder="Link Booking, Airbnb o profilo Google" />

        {err ? <p style={{ color: '#b34141', fontSize: 13, marginTop: 0 }}>Inserisci almeno il nome dell’attività.</p> : null}

        <button type="submit" style={{ width: '100%', marginTop: 6, background: BC.magenta, color: '#fff', fontWeight: 700, fontSize: 16, padding: '14px 24px', border: 'none', borderRadius: 999, cursor: 'pointer' }}>
          Genera il sito di prova →
        </button>
      </form>
    </main>
  );
}
