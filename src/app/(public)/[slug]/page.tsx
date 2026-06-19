import React from 'react';
import { notFound } from 'next/navigation';
import { storage } from '@/storage';
import { Compose } from '@/assembler/compose';

// ISR: rigenerato on-demand alla pubblicazione (revalidatePath dello slug).
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const sites = await storage.listSites();
    return sites
      .filter((s) => s.status === 'published')
      .map((s) => ({ slug: s.slug }));
  } catch {
    // DB non raggiungibile al build: le pagine si generano comunque on-demand (ISR)
    return [];
  }
}

export default async function SitePage({ params }: { params: { slug: string } }) {
  const config = await storage.getSiteConfig(params.slug);
  if (!config || config.status !== 'published') notFound();
  return <Compose config={config} />;
}
