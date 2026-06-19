import { NextResponse } from 'next/server';
import { enrichDemo } from '@/lib/demo';

export const dynamic = 'force-dynamic';

// Avvia/riprende l'arricchimento dati (OSM) di un sito demo. Idempotente.
export async function POST(_req: Request, { params }: { params: { slug: string } }) {
  try {
    const r = await enrichDemo(params.slug);
    return NextResponse.json(r);
  } catch (e) {
    return NextResponse.json({ ready: false, error: e instanceof Error ? e.message : 'errore' }, { status: 500 });
  }
}
