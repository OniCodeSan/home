// Abbinamenti tipografici selezionabili (titolo + corpo).
// Applicati come CSS variables sul root della pagina: --font-head / --font-body.

export type FontId = 'belle' | 'classico' | 'editoriale' | 'moderno' | 'garamond';

export type FontPair = {
  id: FontId;
  nome: string;
  head: string;   // font dei titoli
  body: string;   // font del corpo
};

export const fonts: Record<FontId, FontPair> = {
  belle: { id: 'belle', nome: 'Belle Époque', head: "'Cormorant Garamond', Georgia, serif", body: "'Hanken Grotesk', system-ui, sans-serif" },
  classico: { id: 'classico', nome: 'Classico', head: "'Playfair Display', Georgia, serif", body: "'Source Sans 3', system-ui, sans-serif" },
  editoriale: { id: 'editoriale', nome: 'Editoriale', head: "'Fraunces', Georgia, serif", body: "'Inter', system-ui, sans-serif" },
  moderno: { id: 'moderno', nome: 'Moderno', head: "'Hanken Grotesk', system-ui, sans-serif", body: "'Hanken Grotesk', system-ui, sans-serif" },
  garamond: { id: 'garamond', nome: 'Garamond', head: "'EB Garamond', Georgia, serif", body: "'Mulish', system-ui, sans-serif" },
};

export const fontList: FontPair[] = Object.values(fonts);
export const DEFAULT_FONT: FontId = 'belle';

// Tutte le famiglie da caricare da Google Fonts (un'unica richiesta).
export const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2' +
  '?family=Cormorant+Garamond:wght@400;500;600;700' +
  '&family=Playfair+Display:wght@400;500;600;700;800' +
  '&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700' +
  '&family=EB+Garamond:wght@400;500;600;700' +
  '&family=Hanken+Grotesk:wght@400;500;600;700' +
  '&family=Source+Sans+3:wght@400;500;600;700' +
  '&family=Inter:wght@400;500;600;700' +
  '&family=Mulish:wght@400;500;600;700' +
  '&family=Yellowtail' +
  '&display=swap';
