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

  const luoghi = nearby.length
    ? nearby.map((p) => ({ nome: p.nome, descrizione: p.categoria, distanza: p.distanza }))
    : [
        { nome: 'Centro storico', descrizione: 'Vicoli, botteghe e piazze', distanza: 'A pochi passi' },
        { nome: 'Ristoranti tipici', descrizione: 'Cucina del territorio', distanza: 'Nelle vicinanze' },
      ];

  return {
    header: {
      eyebrow: citta ? `Struttura ricettiva · ${citta}` : 'Struttura ricettiva',
      struttura,
      sottotitolo: `${struttura}, ${dove}: la tua base ideale per scoprire il territorio e rilassarti dopo ogni giornata.`,
      immagine: IMG.header,
    },
    prenotazioni: {
      titolo: 'Prenota il tuo soggiorno',
      testo: `Disponibilità tutto l'anno. Scrivici${form.whatsapp ? ' su WhatsApp' : ''} per verificare le date e ricevere una conferma rapida.`,
      calendarSlot: true,
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
      titolo: 'Pronti ad accogliervi',
      testo: 'Contattaci per disponibilità e preventivi in tempo reale.',
      label: 'Prenota ora',
      target: form.whatsapp ? 'whatsapp' : 'form',
      valore: form.whatsapp || 'prenotazioni',
    },
    vicinanze: {
      titolo: 'Cosa c’è nei dintorni',
      intro: citta ? `Il meglio di ${citta} a pochi passi.` : 'Tutto il bello del territorio a portata di mano.',
      luoghi,
    },
    confort: {
      titolo: 'Servizi e comfort',
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
      note: 'Sito dimostrativo generato da contentmug · hotel.',
    },
  };
}
