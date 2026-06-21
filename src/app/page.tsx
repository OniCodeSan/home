import React from 'react';
import { requestDemoAction } from './richiedi-demo/actions';

export const dynamic = 'force-dynamic';

// Riprova sociale: attivare SOLO con numeri veri.
const SHOW_SOCIAL_PROOF = false;

const C = {
  ink: '#241436',
  cream: '#FCF2E9',
  sand: '#FBEFE3',
  purple: '#5B2A86',
  magenta: '#C13C7B',
  orange: '#E8743B',
  gold: '#F2A65A',
  line: '#6C4BF0',
  muted: '#6E5C7A',
  white: '#FFFFFF',
};
const SUNSET = 'linear-gradient(135deg, #321A52 0%, #6E2A86 26%, #C13C7B 54%, #E8743B 82%, #F2A65A 100%)';
const script = "'Yellowtail', cursive";

const sectionPad: React.CSSProperties = { padding: 'clamp(52px,8vw,100px) clamp(20px,5vw,48px)' };
const inner: React.CSSProperties = { maxWidth: 1080, margin: '0 auto' };
const eyebrow: React.CSSProperties = { textTransform: 'uppercase', letterSpacing: '.18em', fontSize: 13, fontWeight: 700, margin: 0 };

// linee diagonali decorative (cifra del mood)
const Diagonals = () => (
  <>
    <span aria-hidden style={{ position: 'absolute', top: '14%', left: '-6%', width: '112%', height: 3, background: C.line, transform: 'rotate(-8deg)', opacity: 0.9 }} />
    <span aria-hidden style={{ position: 'absolute', bottom: '20%', left: '-6%', width: '112%', height: 3, background: C.line, transform: 'rotate(-8deg)', opacity: 0.7 }} />
  </>
);

function FormCard() {
  const label: React.CSSProperties = { display: 'block', fontSize: 13, color: '#5b4a66', marginBottom: 6, fontWeight: 600 };
  const input: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '1px solid #e6d8d0', background: '#fff', color: C.ink, borderRadius: 12, fontSize: 15, fontFamily: 'inherit', marginBottom: 12 };
  return (
    <form id="anteprima" action={requestDemoAction} style={{ background: '#fff', borderRadius: 20, padding: 'clamp(20px,3vw,30px)', boxShadow: '0 30px 70px -30px rgba(40,20,54,.6)' }}>
      <p style={{ ...eyebrow, color: C.magenta, marginBottom: 10 }}>La tua anteprima gratuita</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 170px' }}>
          <label style={label}>Il tuo nome</label>
          <input style={input} name="nome" placeholder="Mario Rossi" />
        </div>
        <div style={{ flex: '1 1 170px' }}>
          <label style={label}>Nome attività *</label>
          <input style={input} name="struttura" placeholder="Villa Il Mandorlo" required />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 170px' }}>
          <label style={label}>Città</label>
          <input style={input} name="citta" placeholder="Sorrento" />
        </div>
        <div style={{ flex: '1 1 170px' }}>
          <label style={label}>WhatsApp</label>
          <input style={input} name="whatsapp" type="tel" placeholder="+39 ..." />
        </div>
      </div>
      <label style={label}>Dove ti trovano oggi (facoltativo)</label>
      <input style={input} name="dove" placeholder="Link Booking, Airbnb o profilo Google" />
      <button type="submit" style={{ width: '100%', marginTop: 6, background: C.magenta, color: '#fff', fontWeight: 700, fontSize: 16, padding: '15px 24px', border: 'none', borderRadius: 999, cursor: 'pointer' }}>
        Guarda l’anteprima del tuo sito →
      </button>
      <p style={{ textAlign: 'center', color: '#9784a0', fontSize: 13, margin: '12px 0 0' }}>
        Gratis · Nessun impegno · Prima la vedi, poi scegli
      </p>
    </form>
  );
}

export default function Landing() {
  return (
    <main style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif", color: C.ink, background: C.sand }}>

      {/* HERO — brand + mood tramonto · Reciprocità (35%) + Impegno (25%) */}
      <header style={{ position: 'relative', overflow: 'hidden', background: SUNSET, color: '#fff' }}>
        <Diagonals />
        <div style={{ position: 'relative', ...inner, ...sectionPad, display: 'flex', gap: 'clamp(28px,5vw,64px)', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 440px', minWidth: 300 }}>
            <h1 style={{ margin: 0, fontFamily: script, fontWeight: 400, fontSize: 'clamp(44px,11vw,128px)', lineHeight: 0.95, overflowWrap: 'break-word', textShadow: '0 6px 28px rgba(0,0,0,.28)' }}>
              Saluti dal web!
            </h1>
            <p style={{ ...eyebrow, marginTop: 18, color: '#fff', opacity: 0.95 }}>Il tuo sito ti aspetta</p>
            <p style={{ marginTop: 18, fontSize: 'clamp(17px,2.2vw,21px)', lineHeight: 1.55, color: 'rgba(255,255,255,.94)', maxWidth: 520 }}>
              Ti abbiamo già preparato una <strong>bozza del sito della tua attività</strong>. La guardi in 30 secondi, e <strong>solo dopo</strong> decidi. Niente da installare, niente da pagare per vederla.
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
          <h2 style={{ fontFamily: script, fontSize: 'clamp(30px,5vw,48px)', margin: '0 0 .3em', color: C.purple, fontWeight: 400 }}>
            Pensato per chi accoglie davvero.
          </h2>
          <p style={{ fontSize: 'clamp(16px,2vw,19px)', color: C.muted, maxWidth: 720, margin: '0 auto' }}>
            Piccoli hotel, B&B, agriturismi, case vacanza e attività locali. Per chi oggi lavora soprattutto con
            Booking e Airbnb e vuole finalmente una casa propria online. <strong>Non</strong> è una soluzione per le grandi catene.
          </p>
        </div>
      </section>

      {/* SIMPATIA (10%) */}
      <section style={{ background: C.sand }}>
        <div style={{ ...inner, ...sectionPad }}>
          <div style={{ display: 'flex', gap: 'clamp(24px,4vw,56px)', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 320px', minWidth: 280 }}>
              <p style={{ ...eyebrow, color: C.orange }}>Parliamoci chiaro</p>
              <h2 style={{ fontFamily: script, fontSize: 'clamp(26px,3.6vw,40px)', margin: '.2em 0 .4em', color: C.purple, fontWeight: 400 }}>
                Se oggi i clienti ti trovano solo su Booking…
              </h2>
              <p style={{ fontSize: 'clamp(16px,2vw,18px)', color: C.muted, margin: 0 }}>
                …ogni prenotazione passa da una commissione, e nessuno conosce davvero il <em>tuo</em> nome.
                Un sito tuo cambia le regole: i clienti ti scrivono diretti, ti scelgono per quello che sei, e tornano.
                Noi te lo prepariamo già pronto — tu ci metti la tua voce.
              </p>
            </div>
            <div style={{ flex: '1 1 320px', minWidth: 280 }}>
              <div style={{ height: 'clamp(220px,32vw,320px)', borderRadius: 18, background: SUNSET, position: 'relative', overflow: 'hidden', boxShadow: '0 24px 60px -30px rgba(40,20,54,.5)' }}>
                <Diagonals />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: script, color: '#fff', fontSize: 'clamp(34px,6vw,60px)' }}>il tuo sito</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTORITÀ (15%) — dettagli concreti, numeri editoriali */}
      <section style={{ background: C.purple, color: '#fff' }}>
        <div style={{ ...inner, ...sectionPad }}>
          <p style={{ ...eyebrow, color: C.gold }}>Cosa ricevi, concretamente</p>
          <h2 style={{ fontFamily: script, fontSize: 'clamp(28px,4.2vw,46px)', margin: '.2em 0 1em', maxWidth: 720, fontWeight: 400 }}>
            Un sito pronto all’uso — non un modello vuoto.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
            {[
              ['Dominio dedicato', 'Il tuo indirizzo, non una sotto-pagina di un portale.'],
              ['Modulo contatti', 'Le richieste arrivano direttamente a te, senza intermediari.'],
              ['WhatsApp diretto', 'Pulsante che apre la chat: prenotazioni in tempo reale.'],
              ['Ottimizzazione base', 'Costruito attorno al nome della tua attività, per farti trovare.'],
              ['Foto e testi curati', 'Sezioni già impostate, con foto della tua zona.'],
              ['Online in pochi giorni', 'Tu approvi, noi pubblichiamo. Senza complicazioni tecniche.'],
            ].map(([t, d], i) => (
              <div key={t} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 16, padding: 24 }}>
                <div style={{ fontFamily: script, fontSize: 34, color: C.gold, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 style={{ fontSize: 19, margin: '12px 0 6px', fontWeight: 700 }}>{t}</h3>
                <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 15, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section style={{ background: C.sand }}>
        <div style={{ ...inner, ...sectionPad, textAlign: 'center' }}>
          <p style={{ ...eyebrow, color: C.orange }}>Come funziona</p>
          <h2 style={{ fontFamily: script, fontSize: 'clamp(28px,4.2vw,46px)', margin: '.2em 0 1.1em', color: C.purple, fontWeight: 400 }}>
            Tre passi. Il primo lo abbiamo già fatto noi.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
            {[
              ['1', 'Compila i tuoi dati', 'Nome attività, città, WhatsApp. Bastano pochi secondi.'],
              ['2', 'Guarda l’anteprima', 'Generiamo subito una bozza reale del tuo sito, con la tua zona.'],
              ['3', 'Scegli se pubblicare', 'Ti piace? La rendiamo definitiva. Altrimenti, nessun problema.'],
            ].map(([n, t, d]) => (
              <div key={n} style={{ background: '#fff', border: '1px solid #efe2d8', borderRadius: 16, padding: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: SUNSET, color: '#fff', fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>{n}</div>
                <h3 style={{ fontSize: 19, margin: '0 0 6px', color: C.purple, fontWeight: 700 }}>{t}</h3>
                <p style={{ color: C.muted, fontSize: 15, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {SHOW_SOCIAL_PROOF ? (
        <section style={{ background: C.cream }}>
          <div style={{ ...inner, ...sectionPad, textAlign: 'center' }}>
            <h2 style={{ fontFamily: script, fontSize: 'clamp(24px,3.4vw,36px)', color: C.purple }}>Chi ci ha già scelto</h2>
          </div>
        </section>
      ) : null}

      {/* SCARSITÀ (reale) + CTA finale */}
      <section style={{ background: SUNSET, color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <Diagonals />
        <div style={{ position: 'relative', ...inner, ...sectionPad, textAlign: 'center' }}>
          <p style={{ ...eyebrow, color: '#fff', opacity: 0.9 }}>Disponibilità</p>
          <p style={{ fontSize: 'clamp(15px,1.8vw,17px)', color: 'rgba(255,255,255,.9)', maxWidth: 640, margin: '8px auto 24px' }}>
            Attiviamo un numero limitato di nuove attività ogni mese: seguiamo ogni sito con cura. Le richieste si elaborano in ordine di arrivo.
          </p>
          <h2 style={{ fontFamily: script, fontSize: 'clamp(36px,7vw,80px)', margin: '0 auto .3em', maxWidth: 820, lineHeight: 0.98, fontWeight: 400 }}>
            Il tuo sito ti aspetta.
          </h2>
          <a href="#anteprima" style={{ display: 'inline-block', background: '#fff', color: C.magenta, fontWeight: 700, fontSize: 17, padding: '16px 34px', borderRadius: 999, textDecoration: 'none', marginTop: 10 }}>
            Guarda la tua anteprima gratis →
          </a>
        </div>
      </section>

      <footer style={{ background: C.ink, color: 'rgba(255,255,255,.75)', textAlign: 'center', padding: '28px 20px' }}>
        <span style={{ fontFamily: script, fontSize: 26, color: '#fff' }}>Saluti dal web</span>
        <p style={{ margin: '6px 0 10px', fontSize: 14 }}>Il tuo sito, pronto da guardare.</p>
        <p style={{ margin: 0, fontSize: 13 }}>
          <a href="/privacy" style={{ color: '#F2A65A' }}>Privacy Policy</a>
          <span style={{ opacity: 0.5, margin: '0 8px' }}>·</span>
          <a href="/cookie-policy" style={{ color: '#F2A65A' }}>Cookie Policy</a>
        </p>
      </footer>
    </main>
  );
}
