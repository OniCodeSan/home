// Contratti di contenuto — UGUALI per tutte le varianti del rispettivo blocco.
// Regola d'oro #1: le varianti sono solo presentazione, mai cambiare questi campi.

export type SchemeId =
  | 'costiera' | 'toscana' | 'salvia' | 'notte' | 'sabbia'
  | 'bosco' | 'bordeaux' | 'ardesia' | 'tramonto' | 'pietra'
  | 'marina' | 'oltremare' | 'lavanda' | 'glicine'
  | 'agrumi' | 'foresta' | 'menta' | 'cipria';

export type Mood = 'caldo' | 'naturale' | 'elegante' | 'moderno' | 'minimal' | 'fresco';

export type ImageRef = { src: string; alt: string };

export type BlockType =
  | 'header' | 'prenotazioni' | 'stanze' | 'cta'
  | 'vicinanze' | 'confort' | 'contatti' | 'footer';

export type HeaderContent = {
  eyebrow?: string;           // es. "B&B · Sorrento"
  struttura: string;          // nome struttura
  sottotitolo: string;        // boilerplate riempito
  immagine: ImageRef;
};

export type PrenotazioniContent = {
  titolo: string;
  testo: string;
  whatsapp?: string;          // numero per il bottone "Prenota su WhatsApp"
  calendarSlot?: boolean;     // (deprecato) ex placeholder calendario
};

export type StanzeContent = {
  titolo?: string;
  intro?: string;
  camere: {
    nome: string;
    descrizione: string;
    immagine?: ImageRef;         // foto principale
    immagini?: ImageRef[];       // foto aggiuntive (galleria)
    prezzoIndicativo?: string;   // es. "da 89€"
    caratteristiche?: string[];  // es. ["Vista mare", "Bagno privato"]
  }[];
};

export type CtaContent = {
  titolo: string;
  testo?: string;
  label: string;              // es. "Prenota ora"
  target: 'whatsapp' | 'form' | 'calendar';
  valore?: string;            // numero WhatsApp o ancora del form
};

export type VicinanzeContent = {
  titolo?: string;
  intro?: string;
  luoghi: {
    nome: string;
    descrizione?: string;
    distanza?: string;        // es. "5 min a piedi"
    immagine?: ImageRef;
  }[];
};

export type ConfortContent = {
  titolo?: string;
  servizi: { icona: string; label: string }[];   // icona = nome icona, non colore
};

export type ContattiContent = {
  telefono?: string;
  whatsapp?: string;
  email?: string;
  indirizzo: string;
  mappaEmbed?: string;        // URL embed mappa
  coordinate?: { lat: number; lng: number };
};

export type FooterContent = {
  ragioneSociale: string;
  piva?: string;
  indirizzo: string;
  email?: string;
  telefono?: string;
  note?: string;
};

// Mappa tipo-blocco -> contenuto, usata per tipizzare registro e istanze.
export type ContentMap = {
  header: HeaderContent;
  prenotazioni: PrenotazioniContent;
  stanze: StanzeContent;
  cta: CtaContent;
  vicinanze: VicinanzeContent;
  confort: ConfortContent;
  contatti: ContattiContent;
  footer: FooterContent;
};

export type BlockInstance =
  | { type: 'header';       variantId: string; content: HeaderContent }
  | { type: 'prenotazioni'; variantId: string; content: PrenotazioniContent }
  | { type: 'stanze';       variantId: string; content: StanzeContent }
  | { type: 'cta';          variantId: string; content: CtaContent }
  | { type: 'vicinanze';    variantId: string; content: VicinanzeContent }
  | { type: 'confort';      variantId: string; content: ConfortContent }
  | { type: 'contatti';     variantId: string; content: ContattiContent }
  | { type: 'footer';       variantId: string; content: FooterContent };

// Dati della richiesta demo (lead) + stato dell'arricchimento dati.
export type Lead = {
  nome?: string;
  email?: string;
  whatsapp?: string;
  citta?: string;
  dove?: string;        // link Booking/Airbnb/Google fornito dal cliente
  enriched?: boolean;   // true dopo la ricerca dati (OSM) completata
  purchaseRequested?: boolean;  // il cliente ha richiesto l'acquisto
};

export type SiteConfig = {
  slug: string;
  status: 'draft' | 'review' | 'published';
  schemeId: SchemeId;
  mood: Mood;                 // mood effettivo = mood della palette scelta
  fontId?: string;            // abbinamento tipografico (vedi schemes/fonts.ts); default 'belle'
  blocks: BlockInstance[];    // ordine fisso degli slot
  lead?: Lead;                // presente per i siti nati da richiesta demo
};

// Ordine fisso degli slot.
export const SLOT_ORDER: BlockType[] = [
  'header', 'prenotazioni', 'stanze', 'cta', 'vicinanze', 'confort', 'contatti', 'footer',
];
