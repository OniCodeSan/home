import React from 'react';
import { notFound } from 'next/navigation';
import { storage } from '@/storage';
import { Compose } from '@/assembler/compose';

// Anteprima draft: renderizza qualsiasi stato, senza cache. Usata nell'iframe admin.
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function PreviewPage({ params }: { params: { slug: string } }) {
  const config = await storage.getSiteConfig(params.slug);
  if (!config) notFound();
  return <Compose config={config} />;
}
