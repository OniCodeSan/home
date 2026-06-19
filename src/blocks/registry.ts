import type { Variant } from './variant';
import type {
  HeaderContent, PrenotazioniContent, StanzeContent, CtaContent,
  VicinanzeContent, ConfortContent, ContattiContent, FooterContent,
} from './types';

import { headerVariants } from './header/variants';
import { prenotazioniVariants } from './prenotazioni/variants';
import { stanzeVariants } from './stanze/variants';
import { ctaVariants } from './cta/variants';
import { vicinanzeVariants } from './vicinanze/variants';
import { confortVariants } from './confort/variants';
import { contattiVariants } from './contatti/variants';
import { footerVariants } from './footer/variants';

export type Registry = {
  header: Variant<HeaderContent>[];
  prenotazioni: Variant<PrenotazioniContent>[];
  stanze: Variant<StanzeContent>[];
  cta: Variant<CtaContent>[];
  vicinanze: Variant<VicinanzeContent>[];
  confort: Variant<ConfortContent>[];
  contatti: Variant<ContattiContent>[];
  footer: Variant<FooterContent>[];
};

export const registry: Registry = {
  header: headerVariants,
  prenotazioni: prenotazioniVariants,
  stanze: stanzeVariants,
  cta: ctaVariants,
  vicinanze: vicinanzeVariants,
  confort: confortVariants,
  contatti: contattiVariants,
  footer: footerVariants,
};
