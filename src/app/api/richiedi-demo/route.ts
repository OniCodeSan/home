import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createDemoSite } from '@/lib/demo';
import type { DemoForm } from '@/lib/boilerplate';

export const dynamic = 'force-dynamic';

// Redirect RELATIVO: il browser lo risolve sull'origine richiesta (IP:porta o dominio),
// evitando di esporre l'host interno del container.
function seeOther(path: string) {
  return new NextResponse(null, { status: 303, headers: { Location: path } });
}

// Endpoint POST usato dal form della landing statica.
export async function POST(req: NextRequest) {
  const data = await req.formData();
  const form: DemoForm = {
    nome: String(data.get('nome') || '').trim(),
    struttura: String(data.get('struttura') || '').trim(),
    citta: String(data.get('citta') || '').trim(),
    whatsapp: String(data.get('whatsapp') || '').trim(),
    email: String(data.get('email') || '').trim(),
    dove: String(data.get('dove') || '').trim(),
  };
  if (!form.struttura) return seeOther('/richiedi-demo?error=struttura');
  const slug = await createDemoSite(form);
  return seeOther(`/demo/${slug}`);
}
