import React from 'react';
import { requestDemoAction } from './actions';

export const dynamic = 'force-dynamic';

const wrap: React.CSSProperties = { minHeight: '100vh', background: '#163A46', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Hanken Grotesk', system-ui, sans-serif" };
const card: React.CSSProperties = { width: '100%', maxWidth: 520, background: '#fff', borderRadius: 20, padding: '32px 28px', boxShadow: '0 30px 80px -40px rgba(0,0,0,.6)' };
const label: React.CSSProperties = { display: 'block', fontSize: 13, color: '#5b6270', marginBottom: 6, fontWeight: 600 };
const input: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '1px solid #d8dde3', borderRadius: 12, fontSize: 15, fontFamily: 'inherit', marginBottom: 14 };

export default function RichiediDemo({ searchParams }: { searchParams: Record<string, string> }) {
  const sp = searchParams || {};
  const err = sp.error === 'struttura';
  return (
    <main style={wrap}>
      <form action={requestDemoAction} style={card}>
        <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '.14em', fontSize: 12, color: '#C25E3C', fontWeight: 700 }}>contentmug · hotel</p>
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 30, margin: '6px 0 4px', color: '#163A46' }}>Richiedi la tua demo</h1>
        <p style={{ marginTop: 0, color: '#5b6270', fontSize: 15 }}>Inserisci i dati: prepareremo un sito di prova in pochi secondi.</p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={label}>Il tuo nome</label>
            <input style={input} name="nome" placeholder="Mario Rossi" />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={label}>Nome struttura *</label>
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

        {err ? <p style={{ color: '#b34141', fontSize: 13, marginTop: 0 }}>Inserisci almeno il nome della struttura.</p> : null}

        <button type="submit" style={{ width: '100%', marginTop: 6, background: '#C25E3C', color: '#fff', fontWeight: 700, fontSize: 16, padding: '14px 24px', border: 'none', borderRadius: 999, cursor: 'pointer' }}>
          Genera il sito di prova →
        </button>
      </form>
    </main>
  );
}
