import type { SiteContents } from '@/assembler/build';
import type { GeoResult, NearbyPlace } from './osm';

export type DemoForm = {
  nome?: string;
  struttura: string;
  citta?: string;
  whatsapp?: string;
  email?: string;
  dove?: string;
};

// Immagini di default (sostituibili dal cliente nell'editor). Sono in /public/uploads.
const IMG = {
  header: { src: '/uploads/header.png', alt: 'Veduta della struttura' },
  camere: [
    { src: '/uploads/camera.png', alt: 'Camera' },
    { src: '/uploads/terrazza.png', alt: 'Camera con terrazza' },
    { src: '/uploads/borgo.png', alt: 'Camera vista borgo' },
  ],
};

function mapEmbed(geo: GeoResult | null, form: DemoForm): string {
  if (geo) return `https://www.google.com/maps?q=${geo.lat},${geo.lon}&output=embed`;
  const q = [form.struttura, form.citta].filter(Boolean).join(' ');
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
}

// Costruisce TUTTI i contenuti del sito da dati strutturati + testi boilerplate.
// Nessuna AI: solo template con segnaposto riempiti.
export function buildDemoContents(
  form: DemoForm,
  geo: GeoResult | null,
  nearby: NearbyPlace[],
): SiteContents {
  const struttura = form.struttura.trim() || 'La tua struttura';
  const citta = (form.citta || geo?.city || '').trim();
  const dove = citta ? `nel cuore di ${citta}` : 'in una posizione invidiabile';
  const indirizzo = geo?.address || citta || '—';
  const telefono = geo?.phone || form.whatsapp || undefined;

  // foto di default ruotate, così le card "dintorni" non restano vuote (il cliente le cambia)
  const POOL = ['/uploads/borgo.png', '/uploads/colazione.png', '/uploads/terrazza.png', '/uploads/camera.png', '/uploads/header.png'];
  const img = (i: number, alt: string) => ({ src: POOL[i % POOL.length], alt });
  const luoghi = (nearby.length
    ? nearby.map((p) => ({ nome: p.nome, descrizione: p.categoria, distanza: p.distanza }))
    : [
        { nome: 'Centro storico', descrizione: 'Vicoli, botteghe e piazze', distanza: 'A pochi passi' },
        { nome: 'Ristoranti tipici', descrizione: 'Cucina del territorio', distanza: 'Nelle vicinanze' },
      ]
  ).map((l, i) => ({ ...l, immagine: img(i, l.nome) }));

  return {
    header: {
      // Unità + simpatia: parla a chi cerca un soggiorno autentico, non a "tutti".
      eyebrow: citta ? `Struttura ricettiva · ${citta}` : 'Struttura ricettiva',
      struttura,
      sottotitolo: `${struttura}, ${dove}. Un soggiorno autentico e curato nei dettagli, lontano dall'anonimato delle grandi catene: qui sei un ospite, non un numero.`,
      immagine: IMG.header,
    },
    prenotazioni: {
      // Reciprocità (miglior prezzo diretto, niente commissioni) + simpatia + impegno (piccolo passo).
      titolo: 'Prenota direttamente con noi',
      testo: `Miglior prezzo prenotando diretto, senza commissioni di intermediari. Scrivici${form.whatsapp ? ' su WhatsApp' : ''}: ti rispondiamo di persona e confermiamo le date in poche ore.`,
      whatsapp: form.whatsapp || undefined,
    },
    stanze: {
      titolo: 'Le nostre camere',
      intro: 'Spazi curati e accoglienti, pensati per il tuo comfort.',
      camere: [
        { nome: 'Camera Matrimoniale', descrizione: 'Ambiente luminoso e confortevole, ideale per una coppia.', immagine: IMG.camere[0], prezzoIndicativo: 'da 89€', caratteristiche: ['Bagno privato', 'Wi-Fi gratuito', 'Aria condizionata'] },
        { nome: 'Camera con Terrazza', descrizione: 'Con spazio esterno privato per le tue serate.', immagine: IMG.camere[1], prezzoIndicativo: 'da 99€', caratteristiche: ['Terrazza privata', 'Colazione inclusa'] },
        { nome: 'Camera Tripla', descrizione: 'Perfetta per piccole famiglie o gruppi di amici.', immagine: IMG.camere[2], prezzoIndicativo: 'da 119€', caratteristiche: ['Spaziosa', 'Wi-Fi gratuito'] },
      ],
    },
    cta: {
      // Impegno e coerenza: primo passo a basso attrito, nessun impegno.
      titolo: 'Le tue date sono libere?',
      testo: 'Verifica subito la disponibilità: nessun impegno, ti confermiamo in poche ore.',
      label: 'Verifica disponibilità',
      target: form.whatsapp ? 'whatsapp' : 'form',
      valore: form.whatsapp || 'prenotazioni',
    },
    vicinanze: {
      // Autorità + simpatia: dimostra che conosci il territorio (luoghi reali da OSM).
      titolo: 'Cosa c’è nei dintorni',
      intro: citta ? `Conosciamo ${citta} a memoria: ecco cosa non perdere, a due passi da te.` : 'Conosciamo il territorio: ecco cosa non perdere, a due passi da te.',
      luoghi,
    },
    confort: {
      // Autorità nei dettagli concreti.
      titolo: 'Tutto quello che ti serve',
      servizi: [
        { icona: 'wifi', label: 'Wi-Fi gratuito' },
        { icona: 'ac', label: 'Aria condizionata' },
        { icona: 'breakfast', label: 'Colazione' },
        { icona: 'parking', label: 'Parcheggio' },
        { icona: 'check', label: 'Reception cordiale' },
      ],
    },
    contatti: {
      telefono,
      whatsapp: form.whatsapp || undefined,
      email: form.email || undefined,
      indirizzo,
      mappaEmbed: mapEmbed(geo, form),
      coordinate: geo ? { lat: geo.lat, lng: geo.lon } : undefined,
    },
    footer: {
      ragioneSociale: struttura,
      indirizzo,
      email: form.email || undefined,
      telefono,
      note: 'Sito dimostrativo generato con Saluti dal web.',
    },
  };
}
