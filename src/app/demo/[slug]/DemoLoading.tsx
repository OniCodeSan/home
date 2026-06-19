'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { processDemoAction } from '@/app/richiedi-demo/actions';

const STEPS = [
  'Cerchiamo la tua struttura su OpenStreetMap…',
  'Recuperiamo indirizzo e coordinate…',
  'Scopriamo i luoghi interessanti nei dintorni…',
  'Comporiamo le sezioni del sito…',
  'Ultimi ritocchi…',
];

export function DemoLoading({ slug }: { slug: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 1400);
    let alive = true;
    (async () => {
      try {
        await processDemoAction(slug);
      } finally {
        if (alive) {
          setStep(STEPS.length - 1);
          // piccola pausa per far leggere l'ultimo step, poi mostra il sito
          setTimeout(() => router.refresh(), 600);
        }
      }
    })();
    return () => { alive = false; clearInterval(t); };
  }, [slug, router]);

  return (
    <main style={{ minHeight: '100vh', background: '#163A46', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Hanken Grotesk', system-ui, sans-serif", padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 460 }}>
        <div style={{ width: 56, height: 56, margin: '0 auto 22px', border: '4px solid rgba(255,255,255,.2)', borderTopColor: '#E0A95C', borderRadius: '50%', animation: 'cmspin 1s linear infinite' }} />
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 26, margin: '0 0 10px' }}>Stiamo costruendo il tuo sito</h1>
        <p style={{ minHeight: 48, fontSize: 16, color: '#cfe0e4', transition: 'opacity .3s' }}>{STEPS[step]}</p>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 18 }}>
          {STEPS.map((_, i) => (
            <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i <= step ? '#E0A95C' : 'rgba(255,255,255,.25)' }} />
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: '@keyframes cmspin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){*{animation:none!important}}' }} />
    </main>
  );
}

export default DemoLoading;
