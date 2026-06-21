import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Cookie Policy · Saluti dal web' };

const wrap: React.CSSProperties = { maxWidth: 820, margin: '0 auto', padding: 'clamp(32px,6vw,72px) clamp(20px,5vw,32px)', fontFamily: "'Hanken Grotesk', system-ui, sans-serif", color: '#241436', lineHeight: 1.7 };
const h2: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(20px,3vw,26px)', marginTop: '1.8em', marginBottom: '.4em' };
const note: React.CSSProperties = { background: '#FCF2E9', border: '1px solid #ead9c8', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#6E5C7A' };
const th: React.CSSProperties = { textAlign: 'left', padding: '8px 10px', borderBottom: '2px solid #ead9c8', fontSize: 14 };
const td: React.CSSProperties = { padding: '8px 10px', borderBottom: '1px solid #efe2d8', fontSize: 14, verticalAlign: 'top' };

export default function CookiePolicyPage() {
  return (
    <main style={wrap}>
      <p style={{ fontFamily: "'Yellowtail', cursive", color: '#C13C7B', fontSize: 30, margin: 0 }}>Saluti dal web</p>
      <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(28px,5vw,42px)', margin: '8px 0 6px' }}>Cookie Policy</h1>
      <p style={{ color: '#6E5C7A', marginTop: 0 }}>Ultimo aggiornamento: giugno 2026.</p>

      <p style={note}>⚠️ Bozza da far validare. Aggiorna i dati del titolare e l'elenco cookie in base agli strumenti effettivamente attivi.</p>

      <h2 style={h2}>Cosa sono i cookie</h2>
      <p>I cookie sono piccoli file salvati sul tuo dispositivo. Usiamo cookie tecnici necessari e, solo con il tuo consenso, contenuti di terze parti che possono installare cookie.</p>

      <h2 style={h2}>Cookie e tecnologie utilizzate</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
        <thead>
          <tr><th style={th}>Nome</th><th style={th}>Tipo</th><th style={th}>Finalità</th><th style={th}>Durata</th></tr>
        </thead>
        <tbody>
          <tr><td style={td}>sdw_cookie_consent</td><td style={td}>Tecnico</td><td style={td}>Memorizza la tua scelta sui cookie</td><td style={td}>Persistente</td></tr>
          <tr><td style={td}>cm_admin</td><td style={td}>Tecnico</td><td style={td}>Sessione dell'area riservata (solo admin)</td><td style={td}>30 giorni</td></tr>
          <tr><td style={td}>Google Maps</td><td style={td}>Terze parti</td><td style={td}>Mappa incorporata nelle pagine contatti</td><td style={td}>Definita da Google</td></tr>
          <tr><td style={td}>Cloudflare</td><td style={td}>Tecnico</td><td style={td}>Sicurezza e distribuzione dei contenuti</td><td style={td}>Definita da Cloudflare</td></tr>
        </tbody>
      </table>

      <h2 style={h2}>Gestione del consenso</h2>
      <p>Al primo accesso mostriamo un banner per accettare o rifiutare i cookie non essenziali. Puoi modificare la scelta in qualsiasi momento cancellando i dati del sito dal tuo browser.</p>

      <h2 style={h2}>Maggiori informazioni</h2>
      <p>Per il trattamento dei dati personali consulta la <Link href="/privacy">Privacy Policy</Link>.</p>

      <p style={{ marginTop: '2.4em' }}><Link href="/" style={{ color: '#C13C7B' }}>← Torna al sito</Link></p>
    </main>
  );
}
