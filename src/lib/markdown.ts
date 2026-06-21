// Renderer Markdown minimale e sicuro: prima fa escape dell'HTML, poi applica
// titoli, grassetto/corsivo, link e liste. Niente HTML grezzo in input -> niente XSS.

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

export function renderMarkdown(md: string): string {
  const lines = esc(md || '').replace(/\r/g, '').split('\n');
  let html = '';
  let inList = false;
  let para: string[] = [];
  const closeList = () => { if (inList) { html += '</ul>'; inList = false; } };
  const flush = () => { if (para.length) { html += '<p>' + inline(para.join(' ')) + '</p>'; para = []; } };

  for (const raw of lines) {
    const l = raw.trim();
    if (!l) { flush(); closeList(); continue; }
    if (l.startsWith('### ')) { flush(); closeList(); html += '<h3>' + inline(l.slice(4)) + '</h3>'; continue; }
    if (l.startsWith('## ')) { flush(); closeList(); html += '<h2>' + inline(l.slice(3)) + '</h2>'; continue; }
    if (l.startsWith('# ')) { flush(); closeList(); html += '<h2>' + inline(l.slice(2)) + '</h2>'; continue; }
    if (l.startsWith('- ') || l.startsWith('* ')) { flush(); if (!inList) { html += '<ul>'; inList = true; } html += '<li>' + inline(l.slice(2)) + '</li>'; continue; }
    para.push(l);
  }
  flush(); closeList();
  return html;
}
