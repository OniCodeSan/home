import React from 'react';
import { requestDemoAction } from './richiedi-demo/actions';

export const dynamic = 'force-dynamic';

// Riprova sociale: attivare SOLO con numeri veri.
const SHOW_SOCIAL_PROOF = false;

const C = {
  teal: '#163A46', tealDark: '#0F2A33', terra: '#C25E3C', terraDark: '#A44A2C',
  gold: '#E0A95C', cream: '#EFE6D4', sand: '#FAF6EE', ink: '#1B2B33',
  muted: '#5b6270', white: '#FFFFFF', line: 'rgba(0,0,0,.10)',
};
const serif = "Fraunces, Georgia, serif";

const sectionPad: React.CSSProperties = { padding: 'clamp(56px,8vw,104px) clamp(20px,5vw,48px)' };
const inner: React.CSSProperties = { maxWidth: 1080, margin: '0 auto' };
const eyebrow: React.CSSProperties = { textTransform: 'uppercase', letterSpacing: '.16em', fontSize: 13, fontWeight: 700, margin: 0 };

function FormCard() {
  const label: React.CSSProperties = { display: 'block', fontSize: 13, color: '#cfe0e4', marginBottom: 6, fontWeight: 600 };
  const input: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '1px solid rgba(255,255,255,.18)', background: 'rgba(255,255,255,.06)', color: '#fff', borderRadius: 12, fontSize: 15, fontFamily: 'inherit', marginBottom: 12 };
  return (
    <form id="anteprima" action={requestDemoAction} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 20, padding: 'clamp(20px,3vw,28px)', backdropFilter: 'blur(4px)' }}>
      <p style={{ ...eyebrow, color: C.gold, marginBottom: 10 }}>La tua anteprima gratuita</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 180px' }}>
          <label style={label}>Il tuo nome</label>
          <input style={input} name="nome" placeholder="Mario Rossi" />
        </div>
        <div style={{ flex: '1 1 180px' }}>
          <label style={label}>Nome struttura *</label>
          <input style={input} name="struttura" placeholder="Villa Il Mandorlo" required />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 180px' }}>
          <label style={label}>Città</label>
          <input style={input} name="citta" placeholder="Sorrento" />
        </div>
        <div style={{ flex: '1 1 180px' }}>
          <label style={label}>WhatsApp</label>
          <input style={input} name="whatsapp" type="tel" placeholder="+39 ..." />
        </div>
      </div>
      <label style={label}>Dove ti trovano oggi (facoltativo)</label>
      <input style={input} name="dove" placeholder="Link Booking, Airbnb o profilo Google" />
      <button type="submit" style={{ width: '100%', marginTop: 6, background: C.terra, color: '#fff', fontWeight: 700, fontSize: 16, padding: '15px 24px', border: 'none', borderRadius: 999, cursor: 'pointer' }}>
        Guarda l’anteprima del tuo sito →
      </button>
      <p style={{ textAlign: 'center', color: '#9fb6bb', fontSize: 13, margin: '12px 0 0' }}>
        Gratis · Nessun impegno · Prima la vedi, poi scegli
      </p>
    </form>
  );
}

export default function Landing() {
  return (
    <main style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif", color: C.ink, background: C.sand }}>

      {/* HERO — Reciprocità (35%) + Impegno e coerenza (25%) */}
      <header style={{ position: 'relative', color: '#fff', overflow: 'hidden', background: C.teal }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/uploads/header.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.22 }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(15,42,51,.78), rgba(15,42,51,.92))` }} />
        <div style={{ position: 'relative', ...inner, ...sectionPad, display: 'flex', gap: 'clamp(28px,5vw,64px)', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 420px', minWidth: 300 }}>
            <p style={{ ...eyebrow, color: C.gold }}>Siti per piccole strutture ricettive</p>
            <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(34px,5.4vw,60px)', lineHeight: 1.05, margin: '.25em 0 .3em' }}>
              Abbiamo già preparato una bozza del sito della tua struttura.
            </h1>
            <p style={{ fontSize: 'clamp(17px,2.2vw,21px)', color: '#d8e6e9', maxWidth: 560, margin: 0 }}>
              Vuoi vederla? La generi in 30 secondi, la guardi con calma, e <strong>solo dopo</strong> decidi.
              Niente da installare, niente da pagare per vederla.
            </p>
          </div>
          <div style={{ flex: '1 1 380px', minWidth: 300 }}>
            <FormCard />
          </div>
        </div>
      </header>

      {/* UNITÀ (15%) */}
      <section style={{ background: C.cream }}>
        <div style={{ ...inner, ...sectionPad, textAlign: 'center', paddingTop: 'clamp(40px,6vw,72px)', paddingBottom: 'clamp(40px,6vw,72px)' }}>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(24px,3.4vw,36px)', margin: '0 0 .4em', color: C.teal }}>
            Pensato per chi accoglie davvero le persone.
          </h2>
          <p style={{ fontSize: 'clamp(16px,2vw,19px)', color: C.muted, maxWidth: 720, margin: '0 auto' }}>
            Piccoli hotel, B&B, agriturismi e case vacanza. Creato per chi oggi lavora soprattutto con
            Booking e Airbnb e vuole finalmente una casa propria online. <strong>Non</strong> è una
            soluzione per le grandi catene alberghiere.
          </p>
        </div>
      </section>

      {/* SIMPATIA (10%) */}
      <section style={{ background: C.sand }}>
        <div style={{ ...inner, ...sectionPad }}>
          <div style={{ display: 'flex', gap: 'clamp(24px,4vw,56px)', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 320px', minWidth: 280 }}>
              <p style={{ ...eyebrow, color: C.terra }}>Parliamoci chiaro</p>
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(24px,3.4vw,36px)', margin: '.2em 0 .4em', color: C.teal }}>
                Se oggi i tuoi clienti ti trovano solo su Booking…
              </h2>
              <p style={{ fontSize: 'clamp(16px,2vw,18px)', color: C.muted, margin: 0 }}>
                …ogni prenotazione passa da una commissione, e nessuno conosce davvero il <em>tuo</em> nome.
                Un sito tuo cambia le regole: i clienti ti scrivono diretti, ti scelgono per quello che sei,
                e tornano. Noi te lo prepariamo già pronto — tu lo guardi e ci metti la tua voce.
              </p>
            </div>
            <div style={{ flex: '1 1 320px', minWidth: 280 }}>
              <img src="/uploads/colazione.png" alt="Accoglienza in struttura" style={{ width: '100%', height: 'clamp(220px,32vw,340px)', objectFit: 'cover', borderRadius: 18, border: `1px solid ${C.line}` }} />
            </div>
          </div>
        </div>
      </section>

      {/* AUTORITÀ (15%) — dettagli concreti */}
      <section style={{ background: C.teal, color: '#fff' }}>
        <div style={{ ...inner, ...sectionPad }}>
          <p style={{ ...eyebrow, color: C.gold }}>Cosa ricevi, concretamente</p>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(24px,3.4vw,38px)', margin: '.2em 0 1em', maxWidth: 720 }}>
            Ogni sito viene pubblicato pronto all’uso — non un modello vuoto.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
            {[
              ['Dominio dedicato', 'Il tuo indirizzo, non un sotto-pagina di un portale.'],
              ['Modulo contatti', 'Le richieste arrivano direttamente a te, senza intermediari.'],
              ['WhatsApp diretto', 'Pulsante che apre la chat: prenotazioni in tempo reale.'],
              ['Ottimizzazione base', 'Costruito attorno al nome della tua struttura, per farti trovare.'],
              ['Foto e testi curati', 'Sezioni camere, servizi e dintorni già impostate.'],
              ['Online in pochi giorni', 'Tu approvi, noi pubblichiamo. Senza complicazioni tecniche.'],
            ].map(([t, d], i) => (
              <div key={t} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 16, padding: 24 }}>
                <div style={{ fontFamily: serif, fontSize: 34, fontWeight: 600, color: C.gold, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 style={{ fontFamily: serif, fontSize: 19, margin: '12px 0 6px' }}>{t}</h3>
                <p style={{ color: '#cfe0e4', fontSize: 15, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COME FUNZIONA — rinforza Reciprocità + Impegno */}
      <section style={{ background: C.sand }}>
        <div style={{ ...inner, ...sectionPad, textAlign: 'center' }}>
          <p style={{ ...eyebrow, color: C.terra }}>Come funziona</p>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(24px,3.4vw,36px)', margin: '.2em 0 1.1em', color: C.teal }}>
            Tre passi. Il primo lo abbiamo già fatto noi.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
            {[
              ['1', 'Compila i tuoi dati', 'Nome struttura, città, WhatsApp. Bastano pochi secondi.'],
              ['2', 'Guarda l’anteprima', 'Generiamo subito una bozza reale del tuo sito, con i tuoi dintorni.'],
              ['3', 'Scegli se pubblicare', 'Ti piace? La rendiamo definitiva. Altrimenti, nessun problema.'],
            ].map(([n, t, d]) => (
              <div key={n} style={{ background: '#fff', border: `1px solid ${C.line}`, borderRadius: 16, padding: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.terra, color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>{n}</div>
                <h3 style={{ fontFamily: serif, fontSize: 19, margin: '0 0 6px', color: C.teal }}>{t}</h3>
                <p style={{ color: C.muted, fontSize: 15, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIPROVA SOCIALE — nascosta finché non ci sono numeri veri */}
      {SHOW_SOCIAL_PROOF ? (
        <section style={{ background: C.cream }}>
          <div style={{ ...inner, ...sectionPad, textAlign: 'center' }}>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(22px,3vw,32px)', color: C.teal }}>Strutture che ci hanno già scelto</h2>
            {/* TODO: inserire numeri e recensioni reali */}
          </div>
        </section>
      ) : null}

      {/* SCARSITÀ (reale) + CTA finale */}
      <section style={{ background: C.tealDark, color: '#fff' }}>
        <div style={{ ...inner, ...sectionPad, textAlign: 'center' }}>
          <p style={{ ...eyebrow, color: C.gold }}>Disponibilità</p>
          <p style={{ fontSize: 'clamp(15px,1.8vw,17px)', color: '#cfe0e4', maxWidth: 640, margin: '8px auto 28px' }}>
            Attiviamo un numero limitato di nuove strutture ogni mese: seguiamo ogni sito con cura.
            Le richieste vengono elaborate in ordine di arrivo.
          </p>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(26px,4vw,42px)', margin: '0 auto .6em', maxWidth: 760, lineHeight: 1.1 }}>
            Abbiamo già preparato una bozza del sito della tua struttura. Vuoi vederla?
          </h2>
          <a href="#anteprima" style={{ display: 'inline-block', background: C.terra, color: '#fff', fontWeight: 700, fontSize: 17, padding: '16px 34px', borderRadius: 999, textDecoration: 'none', marginTop: 8 }}>
            Guarda l’anteprima del tuo sito →
          </a>
        </div>
      </section>

      <footer style={{ background: C.teal, color: '#9fb6bb', textAlign: 'center', padding: '28px 20px', fontSize: 14 }}>
        contentmug · hotel — siti per piccole strutture ricettive.
      </footer>
    </main>
  );
}
