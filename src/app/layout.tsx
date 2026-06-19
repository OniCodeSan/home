import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'contentmug · hotel',
  description: 'Landing page per piccole strutture ricettive.',
};

const fontLinks = (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </>
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        {fontLinks}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              *{box-sizing:border-box;}
              html{scroll-behavior:smooth;scroll-padding-top:80px;}
              img{max-width:100%;}
              a{color:inherit;}
              :focus-visible{outline:2px solid var(--cta,#C0673D);outline-offset:2px;}
              @media (prefers-reduced-motion: reduce){
                *{animation:none!important;transition:none!important;scroll-behavior:auto!important;}
              }
            `,
          }}
        />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "'Hanken Grotesk', -apple-system, system-ui, sans-serif",
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {children}
      </body>
    </html>
  );
}
