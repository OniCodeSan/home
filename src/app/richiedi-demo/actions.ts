'use server';

import { redirect } from 'next/navigation';
import { createDemoSite, enrichDemo } from '@/lib/demo';
import type { DemoForm } from '@/lib/boilerplate';

// 1) Richiesta demo dal form: crea il sito e manda alla schermata di caricamento.
export async function requestDemoAction(formData: FormData) {
  const form: DemoForm = {
    nome: String(formData.get('nome') || '').trim(),
    struttura: String(formData.get('struttura') || '').trim(),
    citta: String(formData.get('citta') || '').trim(),
    whatsapp: String(formData.get('whatsapp') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    dove: String(formData.get('dove') || '').trim(),
  };
  if (!form.struttura) redirect('/richiedi-demo?error=struttura');
  const slug = await createDemoSite(form);
  redirect(`/demo/${slug}`);
}

// 2) Elaborazione dati (OSM) avviata dalla schermata di caricamento. Idempotente.
export async function processDemoAction(slug: string): Promise<{ ready: boolean }> {
  return enrichDemo(slug);
}
