import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { storage } from '@/storage';
import { requestPurchaseAction } from '../actions';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const C = { teal: '#163A46', terra: '#C25E3C', gold: '#E0A95C', muted: '#5b6270' };
const serif = 'Fraunces, Georgia, serif';

export default async function AcquistaDemo({ params, searchParams }: { params: { slug: string }; searchParams: { ok?: string } }) {
  const config = await storage.getSiteConfig(params.slug);
  if (!config || !config.lead) notFound();
  const ok = searchParams?.ok === '1' || config.lead.purchaseRequested;

  return (
    <main style={{ minHeight: '100vh', background: C.teal, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 560, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 20, padding: 'clamp(24px,4vw,36px)' }}>
        {ok ? (
          <>
            <p style={{ textTransform: 'uppercase', letterSpacing: '.14em', fontSize: 12, color: C.gold, fontWeight: 700, margin: 0 }}>Richiesta ricevuta</p>
            <h1 style={{ fontFamily: serif, fontSize: 30, margin: '8px 0 12px' }}>Grazie! Ti ricontattiamo a breve.</h1>
            <p style={{ color: '#d8e6e9', fontSize: 16 }}>
              Abbiamo registrato la tua richiesta di acquisto per <strong>{config.slug}</strong>.
              Ti scriveremo {config.lead.whatsapp ? `su WhatsApp (${config.lead.whatsapp})` : config.lead.email ? `via email (${config.lead.email})` : 'ai contatti che ci hai lasciato'} per completare l’attivazione e mettere il sito online sul tuo dominio.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <Link href={`/demo/${params.slug}`} style={{ padding: '12px 18px', border: '1px solid rgba(255,255,255,.25)', borderRadius: 10, textDecoration: 'none', color: '#fff' }}>← Rivedi il sito</Link>
              <Link href={`/demo/${params.slug}/modifica`} style={{ padding: '12px 18px', background: C.terra, color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>Modifica ancora</Link>
            </div>
          </>
        ) : (
          <>
            <p style={{ textTransform: 'uppercase', letterSpacing: '.14em', fontSize: 12, color: C.gold, fontWeight: 700, margin: 0 }}>Attiva il tuo sito</p>
            <h1 style={{ fontFamily: serif, fontSize: 32, margin: '8px 0 6px' }}>Mettiamo online il tuo sito</h1>
            <p style={{ color: '#d8e6e9', fontSize: 16, marginTop: 0 }}>
              Pubblichiamo il sito sul tuo dominio dedicato, con modulo contatti, WhatsApp e ottimizzazione sul nome della struttura.
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '18px 0' }}>
              <span style={{ fontFamily: serif, fontSize: 40, fontWeight: 700 }}>170€</span>
              <span style={{ color: '#9fb6bb' }}>/ anno</span>
            </div>
            <ul style={{ color: '#d8e6e9', fontSize: 15, lineHeight: 1.9, paddingLeft: 18, margin: '0 0 22px' }}>
              <li>Dominio dedicato e pubblicazione</li>
              <li>Modulo contatti + pulsante WhatsApp</li>
              <li>Ottimizzazione base sul nome struttura</li>
              <li>Modifiche dei contenuti incluse</li>
            </ul>
            <form action={requestPurchaseAction}>
              <input type="hidden" name="slug" value={params.slug} />
              <button type="submit" style={{ width: '100%', background: C.terra, color: '#fff', fontWeight: 700, fontSize: 17, padding: '15px 24px', border: 'none', borderRadius: 999, cursor: 'pointer' }}>
                Voglio acquistare il sito →
              </button>
            </form>
            <p style={{ textAlign: 'center', color: '#9fb6bb', fontSize: 13, marginTop: 12 }}>
              Nessun pagamento ora: ti contattiamo noi per completare l’attivazione.
            </p>
            <p style={{ textAlign: 'center', marginTop: 14 }}>
              <Link href={`/demo/${params.slug}`} style={{ color: '#cfe0e4', fontSize: 14 }}>← Torna al sito</Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
