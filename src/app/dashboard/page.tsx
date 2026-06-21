import React from 'react';
import Link from 'next/link';
import { storage } from '@/storage';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Home() {
  const sites = await storage.listSites();
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 40, margin: 0 }}>Saluti dal web</h1>
      <p style={{ color: '#6b7280', fontSize: 18 }}>
        Landing page per piccole strutture ricettive, assemblate da blocchi statici.
      </p>
      <div style={{ display: 'flex', gap: 12, margin: '24px 0' }}>
        <Link href="/admin" style={{ padding: '10px 16px', background: '#C13C7B', color: '#fff', borderRadius: 8, textDecoration: 'none' }}>
          Apri admin →
        </Link>
      </div>
      <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 20 }}>Siti</h2>
      <ul style={{ lineHeight: 1.9 }}>
        {sites.map((s) => (
          <li key={s.slug}>
            <Link href={`/${s.slug}`}>{s.slug}</Link>{' '}
            <span style={{ color: '#9aa0ab' }}>({s.status})</span> ·{' '}
            <Link href={`/admin/${s.slug}`} style={{ fontSize: 14 }}>modifica</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
