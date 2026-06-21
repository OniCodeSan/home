import type { Mood, SchemeId } from '@/blocks/types';

export type PaletteTokens = {
  '--bg': string; '--surface': string; '--ink': string; '--muted': string;
  '--primary': string; '--cta': string; '--accent': string; '--line': string;
};

export type Palette = {
  id: SchemeId;
  nome: string;
  mood: Mood;
  tokens: PaletteTokens;
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
  marina: { id:'marina', nome:'Marina', mood:'fresco',
    tokens:{'--bg':'#F0F5F7','--surface':'#FFFFFF','--ink':'#14333D','--muted':'#5B6E74','--primary':'#14617A','--cta':'#E8804A','--accent':'#7FB6C4','--line':'rgba(20,51,61,.12)'} },
  oltremare: { id:'oltremare', nome:'Oltremare', mood:'moderno',
    tokens:{'--bg':'#F2F4F8','--surface':'#FFFFFF','--ink':'#1B2333','--muted':'#5D6680','--primary':'#243B6B','--cta':'#E0703C','--accent':'#8E9FD0','--line':'rgba(27,35,51,.12)'} },
  lavanda: { id:'lavanda', nome:'Lavanda', mood:'elegante',
    tokens:{'--bg':'#F6F3F9','--surface':'#FFFFFF','--ink':'#2A2333','--muted':'#645C70','--primary':'#5B4B8A','--cta':'#C2683E','--accent':'#B6A4D8','--line':'rgba(42,35,51,.12)'} },
  glicine: { id:'glicine', nome:'Glicine', mood:'fresco',
    tokens:{'--bg':'#F5F4FA','--surface':'#FFFFFF','--ink':'#272636','--muted':'#62607A','--primary':'#6C5CA6','--cta':'#D98A4A','--accent':'#A9B3E0','--line':'rgba(39,38,54,.12)'} },
  agrumi: { id:'agrumi', nome:'Agrumi', mood:'caldo',
    tokens:{'--bg':'#FCF7E9','--surface':'#FFFFFF','--ink':'#33291A','--muted':'#6F6450','--primary':'#B5701E','--cta':'#E0922A','--accent':'#E8C26A','--line':'rgba(51,41,26,.12)'} },
  foresta: { id:'foresta', nome:'Foresta', mood:'naturale',
    tokens:{'--bg':'#EFF3EE','--surface':'#FFFFFF','--ink':'#1B2820','--muted':'#54614F','--primary':'#2C4632','--cta':'#C06A34','--accent':'#7E9B72','--line':'rgba(27,40,32,.12)'} },
  menta: { id:'menta', nome:'Menta', mood:'fresco',
    tokens:{'--bg':'#EFF6F2','--surface':'#FFFFFF','--ink':'#18302A','--muted':'#56685F','--primary':'#1F6B57','--cta':'#E08646','--accent':'#86C2A8','--line':'rgba(24,48,42,.12)'} },
  cipria: { id:'cipria', nome:'Cipria', mood:'minimal',
    tokens:{'--bg':'#FAF3F1','--surface':'#FFFFFF','--ink':'#322628','--muted':'#6E5D5F','--primary':'#9A5A5E','--cta':'#C77F58','--accent':'#E0B7B0','--line':'rgba(50,38,40,.12)'} },
};

export const paletteList: Palette[] = Object.values(palettes);
