import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticle, type Article } from '@/storage/articles';
import { ui } from '../../ui';
import { ArticleForm, DeleteArticle } from './ArticleForm';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const EMPTY: Article = { slug: '', titolo: '', contenuto: '', status: 'draft', tags: [] };

export default async function ArticleEditor({ params }: { params: { slug: string } }) {
  const isNew = params.slug === 'new';
  const article = isNew ? EMPTY : await getArticle(params.slug);
  if (!article) notFound();

  return (
    <main style={ui.page}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/admin/magazine" style={{ color: '#C13C7B', textDecoration: 'none' }}>← Magazine</Link>
          <h1 style={{ ...ui.h1, margin: 0 }}>{isNew ? 'Nuovo articolo' : 'Modifica articolo'}</h1>
        </div>
        {!isNew ? <DeleteArticle slug={article.slug} /> : null}
      </div>
      <ArticleForm article={article} isNew={isNew} />
    </main>
  );
}
