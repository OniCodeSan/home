import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { storage } from '@/storage';
import { Compose } from '@/assembler/compose';
import { DemoLoading } from './DemoLoading';

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

  // Pronto → mostra il sito di test con una barra demo in alto.
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: '#163A46', color: '#fff', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: "'Hanken Grotesk', system-ui, sans-serif", fontSize: 14, flexWrap: 'wrap' }}>
        <span>Questo è un <strong>sito dimostrativo</strong> generato per te.</span>
        <Link href="/richiedi-demo" style={{ color: '#E0A95C', fontWeight: 700 }}>Ti piace? Richiedi info →</Link>
      </div>
      <Compose config={config} />
    </>
  );
}
