import React from 'react';
import type { BlockInstance, SiteConfig } from '@/blocks/types';
import { registry } from '@/blocks/registry';
import { palettes, type PaletteTokens } from '@/schemes/palettes';

// I token diventano variabili CSS inline sul root della pagina.
// Cambiare palette = cambiare questi token. Nessun colore vive nei componenti.
function tokensToStyle(tokens: PaletteTokens): React.CSSProperties {
  return tokens as unknown as React.CSSProperties;
}

function renderBlock(block: BlockInstance, key: number) {
  // registry[type] è tipizzato per blocco; cerchiamo la variante salvata.
  const variants = registry[block.type] as { id: string; Component: React.FC<{ content: unknown }> }[];
  const variant = variants.find((v) => v.id === block.variantId) ?? variants[0];
  if (!variant) return null;
  const Component = variant.Component;
  return <Component key={`${block.type}-${key}`} content={block.content} />;
}

// Render deterministico: ordine fisso dei blocchi salvati nel config.
export function Compose({ config }: { config: SiteConfig }) {
  const palette = palettes[config.schemeId];
  return (
    <div
      data-scheme={config.schemeId}
      data-mood={config.mood}
      style={{
        ...tokensToStyle(palette.tokens),
        background: 'var(--bg)',
        color: 'var(--ink)',
        minHeight: '100vh',
      }}
    >
      {config.blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}

export default Compose;
