'use client';

import React from 'react';
import type { BlockInstance, SchemeId } from '@/blocks/types';
import { registry } from '@/blocks/registry';
import { palettes, type PaletteTokens } from '@/schemes/palettes';

// Anteprima renderizzata lato client: si aggiorna in tempo reale con lo stato dell'editor.
// Replica la logica di Compose, ma come client component.
export function LivePreview({ blocks, schemeId }: { blocks: BlockInstance[]; schemeId: SchemeId }) {
  const palette = palettes[schemeId];
  return (
    <div
      style={{
        ...(palette.tokens as unknown as React.CSSProperties),
        background: 'var(--bg)',
        color: 'var(--ink)',
        minHeight: '100%',
      }}
    >
      {blocks.map((block, i) => {
        const variants = registry[block.type] as { id: string; Component: React.FC<{ content: unknown }> }[];
        const variant = variants.find((v) => v.id === block.variantId) ?? variants[0];
        if (!variant) return null;
        const Cmp = variant.Component;
        return <Cmp key={`${block.type}-${i}`} content={block.content} />;
      })}
    </div>
  );
}

export default LivePreview;

export type { PaletteTokens };
