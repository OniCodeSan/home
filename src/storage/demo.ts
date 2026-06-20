import type { SiteContents } from '@/assembler/build';

// Contenuti demo per il sito di esempio (immagini reali in /public/uploads).
// I testi base sono boilerplate riempiti con i campi del cliente.
export const demoContents: SiteContents = {
  header: {
    eyebrow: 'B&B · Sorrento',
    struttura: 'Borgo Marina',
    sottotitolo: 'Borgo Marina, nel cuore di Sorrento, a due passi dal mare e dai vicoli del centro storico.',
    immagine: { src: '/uploads/header.png', alt: 'Vista del borgo al tramonto' },
  },
  prenotazioni: {
    titolo: 'Prenota il tuo soggiorno',
    testo: 'Disponibilità tutto l’anno. Scrivici per verificare le date e ricevere conferma immediata.',
    whatsapp: '+39 081 0000000',
  },
  stanze: {
    titolo: 'Le nostre camere',
    intro: 'Tre camere curate nei dettagli, ognuna con il suo carattere.',
    camere: [
      {
        nome: 'Camera Vista Mare',
        descrizione: 'Camera matrimoniale con balcone affacciato sul golfo.',
        immagine: { src: '/uploads/camera.png', alt: 'Camera con vista mare' },
        prezzoIndicativo: 'da 119€',
        caratteristiche: ['Vista mare', 'Bagno privato', 'Aria condizionata'],
      },
      {
        nome: 'Camera Terrazza',
        descrizione: 'Accesso diretto alla terrazza panoramica, ideale per le serate.',
        immagine: { src: '/uploads/terrazza.png', alt: 'Terrazza al tramonto' },
        prezzoIndicativo: 'da 99€',
        caratteristiche: ['Terrazza privata', 'Colazione inclusa'],
      },
      {
        nome: 'Camera Borgo',
        descrizione: 'Camera tranquilla affacciata sui vicoli del borgo.',
        immagine: { src: '/uploads/borgo.png', alt: 'Vista sul borgo' },
        prezzoIndicativo: 'da 89€',
        caratteristiche: ['Silenziosa', 'Wi-Fi gratuito'],
      },
    ],
  },
  cta: {
    titolo: 'Pronti ad accogliervi',
    testo: 'Contattaci su WhatsApp per disponibilità e preventivi in tempo reale.',
    label: 'Prenota ora',
    target: 'whatsapp',
    valore: '+39 081 0000000',
  },
  vicinanze: {
    titolo: 'Cosa c’è nei dintorni',
    intro: 'Tutto il meglio di Sorrento a pochi passi.',
    luoghi: [
      { nome: 'Spiaggia di Marina Grande', descrizione: 'Il borgo dei pescatori e le sue acque.', distanza: '5 min a piedi', immagine: { src: '/uploads/borgo.png', alt: 'Marina Grande' } },
      { nome: 'Centro storico', descrizione: 'Vicoli, botteghe e piazze.', distanza: '8 min a piedi' },
      { nome: 'Colazione tipica', descrizione: 'Dolci e prodotti locali ogni mattina.', distanza: 'In struttura', immagine: { src: '/uploads/colazione.png', alt: 'Colazione tipica' } },
    ],
  },
  confort: {
    titolo: 'Servizi e comfort',
    servizi: [
      { icona: 'wifi', label: 'Wi-Fi gratuito' },
      { icona: 'ac', label: 'Aria condizionata' },
      { icona: 'breakfast', label: 'Colazione inclusa' },
      { icona: 'parking', label: 'Parcheggio convenzionato' },
      { icona: 'terrace', label: 'Terrazza panoramica' },
      { icona: 'pets', label: 'Pet friendly' },
    ],
  },
  contatti: {
    telefono: '+39 081 0000000',
    whatsapp: '+39 081 0000000',
    email: 'info@borgomarina.it',
    indirizzo: 'Via Marina Grande 12, 80067 Sorrento (NA)',
    mappaEmbed: 'https://www.google.com/maps?q=Sorrento&output=embed',
    coordinate: { lat: 40.626, lng: 14.376 },
  },
  footer: {
    ragioneSociale: 'Borgo Marina di Mario Rossi',
    piva: 'IT01234567890',
    indirizzo: 'Via Marina Grande 12, 80067 Sorrento (NA)',
    email: 'info@borgomarina.it',
    telefono: '+39 081 0000000',
    note: 'CIR 0000000000 · Tutti i diritti riservati.',
  },
};
