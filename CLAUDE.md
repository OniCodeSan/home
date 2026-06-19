# contentmug · hotel — Specifica di progetto

> Implementa il progetto seguendo questa specifica. È la fonte di verità: rispettala alla lettera, in particolare le **Regole d'oro**.

## Cosa costruiamo

Piattaforma **multi-tenant** che pubblica landing page per piccole strutture ricettive (B&B, affittacamere, agriturismi, case vacanza, piccoli hotel). Ogni sito vive su `hotel.contentmug.it/{slug}`.

Le pagine sono **assemblate meccanicamente** da blocchi statici intercambiabili: una sequenza fissa di slot, ognuno con più varianti di layout in archivio (non visibili al cliente). Per ogni sito il sistema pesca una variante per slot, applica una palette colore e inietta i contenuti del cliente. Il cliente vede solo il risultato finito.

**Niente AI/LLM da nessuna parte.** Solo meccanica: selezione + sostituzione.

## Parametri decisi (modificabili)

- **Scope varianti:** per **blocco** (combinatorie). Ogni slot ha N varianti, si mescolano in modo indipendente.
- **Coerenza:** ogni palette ha un `mood`; le varianti sono taggate per mood; il random pesca **solo tra le varianti compatibili col mood della palette** (o taggate `any`).
- **Testi base:** boilerplate con segnaposto riempiti dai campi del cliente (es. `"${struttura}, nel cuore di ${citta}…"`), sempre modificabili in admin. Nessuna generazione.

## Regole d'oro (non violare mai)

1. **Le varianti sono solo presentazione.** Tutte le varianti dello stesso blocco accettano lo **stesso contratto di contenuto** (stessa interfaccia TS). Mai aggiungere o togliere campi tra varianti dello stesso blocco.
2. **I colori vivono solo nei token semantici** (`--bg --surface --ink --muted --primary --cta --accent --line`). **Nessun colore hardcoded** dentro i componenti. Cambiare palette = cambiare i token sul root della pagina. Qualsiasi variante deve funzionare con qualsiasi palette.
3. **Niente AI** nel rendering o nella generazione.
4. **Il random gira una sola volta**, alla creazione del sito. Si salva la composizione (`schemeId` + `variantId` per slot) nel config. Da lì il render è **deterministico**.

## Stack

- Next.js (App Router) + TypeScript.
- Styling: CSS variables per i token + il tuo CSS/Tailwind per il layout. I token NON passano da Tailwind: stanno sul `:root` della pagina.
- **Nessun setup DB in questa fase.** Lavora sul tipo `SiteConfig` dietro un'interfaccia di storage:
  ```ts
  getSiteConfig(slug: string): Promise<SiteConfig | null>
  saveSiteConfig(config: SiteConfig): Promise<void>
  listSites(): Promise<SiteConfig[]>
  ```
  Implementala con un mock in-memory / file JSON per ora. La sostituiremo con Postgres dopo.

## Modello dati

```ts
type SchemeId =
  | 'costiera' | 'toscana' | 'salvia' | 'notte' | 'sabbia'
  | 'bosco' | 'bordeaux' | 'ardesia' | 'tramonto' | 'pietra';

type Mood = 'caldo' | 'naturale' | 'elegante' | 'moderno' | 'minimal' | 'fresco';

type ImageRef = { src: string; alt: string };

type SiteConfig = {
  slug: string;
  status: 'draft' | 'review' | 'published';
  schemeId: SchemeId;
  mood: Mood;                 // mood effettivo = mood della palette scelta
  blocks: BlockInstance[];    // ordine fisso degli slot
};

type BlockInstance =
  | { type: 'header';       variantId: string; content: HeaderContent }
  | { type: 'prenotazioni'; variantId: string; content: PrenotazioniContent }
  | { type: 'stanze';       variantId: string; content: StanzeContent }
  | { type: 'cta';          variantId: string; content: CtaContent }
  | { type: 'vicinanze';    variantId: string; content: VicinanzeContent }
  | { type: 'confort';      variantId: string; content: ConfortContent }
  | { type: 'contatti';     variantId: string; content: ContattiContent }
  | { type: 'footer';       variantId: string; content: FooterContent };
```

## Slot dei blocchi (ordine fisso)

1. `header` · 2. `prenotazioni` · 3. `stanze` · 4. `cta` · 5. `vicinanze` · 6. `confort` · 7. `contatti` · 8. `footer`

## Contratti di contenuto (`src/blocks/types.ts`)

Uguali per **tutte** le varianti del rispettivo blocco.

```ts
type HeaderContent = {
  eyebrow?: string;           // es. "B&B · Sorrento"
  struttura: string;          // nome struttura
  sottotitolo: string;        // boilerplate riempito
  immagine: ImageRef;
};

type PrenotazioniContent = {
  titolo: string;
  testo: string;
  calendarSlot?: boolean;     // fase 2: collegamento Google Calendar (per ora placeholder)
};

type StanzeContent = {
  titolo?: string;
  intro?: string;
  camere: {
    nome: string;
    descrizione: string;
    immagine?: ImageRef;
    prezzoIndicativo?: string;   // es. "da 89€"
    caratteristiche?: string[];  // es. ["Vista mare", "Bagno privato"]
  }[];
};

type CtaContent = {
  titolo: string;
  testo?: string;
  label: string;              // es. "Prenota ora"
  target: 'whatsapp' | 'form' | 'calendar';
  valore?: string;            // numero WhatsApp o ancora del form
};

type VicinanzeContent = {
  titolo?: string;
  intro?: string;
  luoghi: {
    nome: string;
    descrizione?: string;
    distanza?: string;        // es. "5 min a piedi"
    immagine?: ImageRef;
  }[];
};

type ConfortContent = {
  titolo?: string;
  servizi: { icona: string; label: string }[];   // icona = nome icona, non colore
};

type ContattiContent = {
  telefono?: string;
  whatsapp?: string;
  email?: string;
  indirizzo: string;
  mappaEmbed?: string;        // URL embed mappa
  coordinate?: { lat: number; lng: number };
};

type FooterContent = {
  ragioneSociale: string;
  piva?: string;
  indirizzo: string;
  email?: string;
  telefono?: string;
  note?: string;
};
```

## Palette (`src/schemes/palettes.ts`)

Dieci palette già pronte. Ognuna è un set di token + un `mood`.

```ts
type Palette = {
  id: SchemeId;
  nome: string;
  mood: Mood;
  tokens: {
    '--bg': string; '--surface': string; '--ink': string; '--muted': string;
    '--primary': string; '--cta': string; '--accent': string; '--line': string;
  };
};

export const palettes: Record<SchemeId, Palette> = {
  costiera: { id:'costiera', nome:'Costiera', mood:'fresco',
    tokens:{'--bg':'#F4F6F4','--surface':'#FFFFFF','--ink':'#1B2B33','--muted':'#5E6E72','--primary':'#1C5B6B','--cta':'#E0883C','--accent':'#7FB3B8','--line':'rgba(27,43,51,.12)'} },
  toscana: { id:'toscana', nome:'Toscana', mood:'caldo',
    tokens:{'--bg':'#FAF4EA','--surface':'#FFFFFF','--ink':'#2E2620','--muted':'#6A5E50','--primary':'#6E3B2A','--cta':'#C2603C','--accent':'#B89150','--line':'rgba(46,38,32,.12)'} },
  salvia: { id:'salvia', nome:'Salvia', mood:'naturale',
    tokens:{'--bg':'#F3F2EA','--surface':'#FFFFFF','--ink':'#2A2E25','--muted':'#5E6151','--primary':'#41513A','--cta':'#A8602F','--accent':'#8C9A7E','--line':'rgba(42,46,37,.12)'} },
  notte: { id:'notte', nome:'Notte', mood:'elegante',
    tokens:{'--bg':'#F5F3EE','--surface':'#FFFFFF','--ink':'#1E2733','--muted':'#5A6470','--primary':'#19314B','--cta':'#C0703B','--accent':'#C9A24B','--line':'rgba(30,39,51,.12)'} },
  sabbia: { id:'sabbia', nome:'Sabbia', mood:'caldo',
    tokens:{'--bg':'#FBF6EE','--surface':'#FFFFFF','--ink':'#34291F','--muted':'#6E5E4C','--primary':'#8A5A36','--cta':'#CE7A45','--accent':'#D9B27C','--line':'rgba(52,41,31,.12)'} },
  bosco: { id:'bosco', nome:'Bosco', mood:'naturale',
    tokens:{'--bg':'#F2F4EE','--surface':'#FFFFFF','--ink':'#20281F','--muted':'#566053','--primary':'#2E4730','--cta':'#B5662F','--accent':'#7E9466','--line':'rgba(32,40,31,.12)'} },
  bordeaux: { id:'bordeaux', nome:'Bordeaux', mood:'elegante',
    tokens:{'--bg':'#F7F1EC','--surface':'#FFFFFF','--ink':'#2A2020','--muted':'#6B5A55','--primary':'#5E2733','--cta':'#B06A3E','--accent':'#A98A55','--line':'rgba(42,32,32,.12)'} },
  ardesia: { id:'ardesia', nome:'Ardesia', mood:'moderno',
    tokens:{'--bg':'#F4F5F6','--surface':'#FFFFFF','--ink':'#1F262B','--muted':'#5E6970','--primary':'#2C3A42','--cta':'#D07B3E','--accent':'#8FA3AC','--line':'rgba(31,38,43,.12)'} },
  tramonto: { id:'tramonto', nome:'Tramonto', mood:'caldo',
    tokens:{'--bg':'#FBF3E8','--surface':'#FFFFFF','--ink':'#322620','--muted':'#71604F','--primary':'#7A3B2E','--cta':'#D98A2B','--accent':'#E0A95C','--line':'rgba(50,38,32,.12)'} },
  pietra: { id:'pietra', nome:'Pietra', mood:'minimal',
    tokens:{'--bg':'#F5F3EF','--surface':'#FFFFFF','--ink':'#292723','--muted':'#6B655B','--primary':'#4A463E','--cta':'#B07A4A','--accent':'#A89B86','--line':'rgba(41,39,35,.12)'} },
};
```

## Registro varianti (`src/blocks/registry.ts`)

Ogni variante si dichiara con id, componente e mood. Il registro mappa tipo-blocco → varianti.

```ts
type Variant<C> = {
  id: string;                 // es. "header-01"
  mood: Mood | 'any';
  Component: React.FC<{ content: C }>;
};

type Registry = {
  header: Variant<HeaderContent>[];
  prenotazioni: Variant<PrenotazioniContent>[];
  stanze: Variant<StanzeContent>[];
  cta: Variant<CtaContent>[];
  vicinanze: Variant<VicinanzeContent>[];
  confort: Variant<ConfortContent>[];
  contatti: Variant<ContattiContent>[];
  footer: Variant<FooterContent>[];
};
```

## Assembler (`src/assembler/`)

- `compose(config)`: renderizza i blocchi nell'ordine fisso. Per ogni `BlockInstance` cerca nel registro la variante con quel `variantId` e le passa `content`. Il root della pagina riceve i token di `palettes[config.schemeId].tokens` come inline style (`style={{ '--primary': ... }}`).
- `pickComposition(input)` (solo alla creazione): per ogni slot, filtra `registry[type]` per `mood === palette.mood || 'any'`, poi pesca **random seeded** (seed = slug, così è riproducibile). Ritorna la lista `{ type, variantId }`. La composizione si **salva** nel config.
- `reroll(config, slot?)`: ri-pesca la variante di uno slot (o di tutti) mantenendo i contenuti.

## Admin (`src/app/admin/`)

- **Lista siti/lead** per stato (`draft → review → published`).
- **Editor sito**: form dei campi del config (per blocco) **affiancato all'anteprima live** (iframe del render in stato draft, route `/preview/[slug]`).
- **Azioni**: cambia palette · ri-tira variante (singolo slot o tutti) · pubblica (`status = 'published'` + revalidate dello slug) · spubblica.

## Rendering pubblico (`src/app/(public)/[slug]/page.tsx`)

Carica `getSiteConfig(slug)`; se `null` o non `published` → 404. Altrimenti passa il config all'assembler. Usa ISR / `revalidate` on-demand alla pubblicazione.

## Ordine di build

1. `types.ts` (contratti) + `palettes.ts` (10 palette) + scaffold `registry.ts`.
2. Assembler: `compose` + `pickComposition` (random seeded + filtro mood) + `reroll`, testati con un config mock.
3. **Header**: 3 varianti reali con mood diversi, verificate su tutte le 10 palette (stesso contenuto, nessun colore fisso).
4. Route pubblica `[slug]` che renderizza un config mock + un mock di `getSiteConfig`.
5. Gli altri 7 blocchi: 3 varianti ciascuno per partire (poi si sale a ~10 per blocco).
6. Admin: editor config + anteprima + cambia palette + ri-tira + pubblica.
7. (Dopo) Storage reale, form richiesta → Brevo, Stripe abbonamento annuale, collegamento Google Calendar nel blocco prenotazioni.

## Vincoli tecnici

- Ogni variante è un **componente puro**: riceve `content`, usa **solo i token**, nessun colore fisso, **nessuna chiamata di rete** al suo interno.
- Responsive fino a mobile. Focus visibile. `prefers-reduced-motion` rispettato.
- Tutte le immagini sono `ImageRef` con `alt` obbligatorio.
- Nessuna variante deve assumere la presenza di campi opzionali: gestisci sempre i fallback.
