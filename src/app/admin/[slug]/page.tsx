import React from 'react';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { storage } from '@/storage';
import { listImages } from '@/storage/images';
import { saveConfigAction, uploadImageAction } from '../actions';
import { DemoStudio } from '@/app/demo/[slug]/DemoStudio';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

function localUploads(): string[] {
  try {
    return fs
      .readdirSync(path.join(process.cwd(), 'public', 'uploads'))
      .filter((f) => /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(f))
      .sort()
      .map((f) => `/uploads/${f}`);
  } catch {
    return [];
  }
}

export default async function EditSite({ params }: { params: { slug: string } }) {
  const config = await storage.getSiteConfig(params.slug);
  if (!config) notFound();
  const uploads = [...(await listImages(params.slug)), ...localUploads()];

  // Editor definitivo: split-screen con anteprima live (modalità admin: stato, reroll, pubblicazione).
  return (
    <DemoStudio
      admin
      config={config}
      uploads={uploads}
      saveAction={saveConfigAction}
      uploadAction={uploadImageAction}
    />
  );
}
