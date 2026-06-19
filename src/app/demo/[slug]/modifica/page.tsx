import React from 'react';
import { notFound } from 'next/navigation';
import { storage } from '@/storage';
import { listImages } from '@/storage/images';
import { DemoStudio } from '../DemoStudio';
import { saveDemoConfigAction, uploadDemoImageAction } from '../actions';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function ModificaDemo({ params }: { params: { slug: string } }) {
  const config = await storage.getSiteConfig(params.slug);
  if (!config || !config.lead) notFound(); // solo siti demo
  const uploads = await listImages(params.slug);

  return (
    <DemoStudio
      config={config}
      uploads={uploads}
      saveAction={saveDemoConfigAction}
      uploadAction={uploadDemoImageAction}
    />
  );
}
