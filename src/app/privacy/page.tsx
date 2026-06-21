import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Privacy Policy · Saluti dal web' };

const wrap: React.CSSProperties = { maxWidth: 820, margin: '0 auto', padding: 'clamp(32px,6vw,72px) clamp(20px,5vw,32px)', fontFamily: "'Hanken Grotesk', system-ui, sans-serif", color: '#241436', lineHeight: 1.7 };
const h2: React.CSSProperties = { fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(20px,3vw,26px)', marginTop: '1.8em', marginBottom: '.4em' };
const note: React.CSSProperties = { background: '#FCF2E9', border: '1px solid #ead9c8', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#6E5C7A' };

export default function PrivacyPage() {
  return (
    <main style={wrap}>
      <p style={{ fontFamily: "'Yellowtail', cursive", color: '#C13C7B', fontSize: 30, margin: 0 }}>Saluti dal web</p>
      <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(28px,5vw,42px)', margin: '8px 0 6px' }}>Informativa sulla Privacy</h1>
      <p style={{ color: '#6E5C7A', marginTop: 0 }}>Ai sensi del Regolamento (UE) 2016/679 (GDPR). Ultimo aggiornamento: giugno 2026.</p>

      <p style={note}>⚠️ Bozza: completa i campi tra parentesi quadre con i dati reali del titolare e fai validare il testo a un professionista prima della pubblicazione.</p>

      <h2 style={h2}>1. Titolare del trattamento</h2>
      <p>Titolare del trattamento è <strong>[Ragione sociale]</strong>, [indirizzo], P.IVA [P.IVA], email <a href="mailto:[email]">[email]</a>.</p>

      <h2 style={h2}>2. Dati che raccogliamo</h2>
      <p>Raccogliamo i dati che ci fornisci tramite il modulo di richiesta demo: <strong>nome, nome dell'attività, città, numero WhatsApp, email</strong> ed eventuali link che indichi. Raccogliamo inoltre dati tecnici di navigazione (indirizzo IP, tipo di browser) tramite i log del server e del nostro provider di rete (Cloudflare).</p>

      <h2 style={h2}>3. Finalità e base giuridica</h2>
      <ul>
        <li>Predisporre e mostrarti l'anteprima del sito richiesto e ricontattarti — base giuridica: misure precontrattuali e tuo consenso.</li>
        <li>Gestire l'eventuale acquisto e l'erogazione del servizio — base giuridica: esecuzione del contratto.</li>
        <li>Adempiere a obblighi di legge (es. fatturazione) — base giuridica: obbligo legale.</li>
        <li>Sicurezza e funzionamento del sito — base giuridica: legittimo interesse.</li>
      </ul>

      <h2 style={h2}>4. Dove sono conservati i dati (responsabili e terze parti)</h2>
      <ul>
        <li><strong>Supabase</strong> (database e archiviazione): conserva i dati dei siti e delle richieste.</li>
        <li><strong>Hetzner</strong> (server di hosting, UE).</li>
        <li><strong>Cloudflare</strong> (rete/CDN e protezione).</li>
        <li><strong>Google Maps</strong> (mappe incorporate nelle pagine dei siti), <strong>Google Fonts</strong> e <strong>Wikimedia</strong> (immagini): possono ricevere il tuo indirizzo IP quando carichi i relativi contenuti.</li>
      </ul>

      <h2 style={h2}>5. Conservazione</h2>
      <p>Conserviamo i dati per il tempo necessario alle finalità indicate e secondo gli obblighi di legge; i dati delle demo non acquistate vengono cancellati periodicamente.</p>

      <h2 style={h2}>6. I tuoi diritti</h2>
      <p>Puoi esercitare i diritti di accesso, rettifica, cancellazione, limitazione, opposizione e portabilità scrivendo a <a href="mailto:[email]">[email]</a>. Hai inoltre diritto di reclamo al Garante per la protezione dei dati personali.</p>

      <h2 style={h2}>7. Cookie</h2>
      <p>Per l'uso dei cookie consulta la <Link href="/cookie-policy">Cookie Policy</Link>.</p>

      <p style={{ marginTop: '2.4em' }}><Link href="/" style={{ color: '#C13C7B' }}>← Torna al sito</Link></p>
    </main>
  );
}
