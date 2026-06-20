import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { storage } from '@/storage';
import { Compose } from '@/assembler/compose';
import { DemoLoading } from './DemoLoading';
import { DemoPopup } from './DemoPopup';

// Pubblica (niente auth): il lead deve poterla vedere. Sempre fresca.
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function DemoPage({ params }: { params: { slug: string } }) {
  const config = await storage.getSiteConfig(params.slug);
  if (!config) notFound();

  // Non ancora arricchito → schermata di caricamento (che avvia l'elaborazione).
  if (!config.lead?.enriched) {
    return <DemoLoading slug={params.slug} />;
  }

  const m = `/demo/${params.slug}/modifica`;
  const a = `/demo/${params.slug}/acquista`;
  const font = "'Hanken Grotesk', system-ui, sans-serif";

  // Pronto → sito di test con barra demo in alto + pulsanti fissi sempre visibili.
  return (
    <>
      {/* Barra demo (in alto, resta visibile) */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: '#163A46', color: '#fff', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, fontFamily: font, fontSize: 14, flexWrap: 'wrap' }}>
        <span>Anteprima · <strong>sito dimostrativo</strong> creato per te</span>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link href={m} style={{ background: '#fff', color: '#163A46', fontWeight: 700, padding: '9px 16px', borderRadius: 999, textDecoration: 'none', fontSize: 14 }}>Modifica contenuti e colori</Link>
          <Link href={a} style={{ background: '#C25E3C', color: '#fff', fontWeight: 700, padding: '9px 16px', borderRadius: 999, textDecoration: 'none', fontSize: 14 }}>Acquista →</Link>
        </div>
      </div>

      <Compose config={config} />

      {/* Pulsanti fissi sempre a portata di mano mentre si scorre */}
      <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 60, display: 'flex', gap: 10, fontFamily: font, boxShadow: '0 14px 36px -16px rgba(0,0,0,.5)', borderRadius: 999 }}>
        <Link href={m} style={{ background: '#163A46', color: '#fff', fontWeight: 700, padding: '13px 20px', borderRadius: 999, textDecoration: 'none', fontSize: 15 }}>Modifica il sito</Link>
        <Link href={a} style={{ background: '#C25E3C', color: '#fff', fontWeight: 700, padding: '13px 20px', borderRadius: 999, textDecoration: 'none', fontSize: 15 }}>Acquista →</Link>
      </div>

      <DemoPopup slug={params.slug} />
    </>
  );
}
