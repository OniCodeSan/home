import type React from 'react';
import type { Mood } from './types';

// Una variante è solo presentazione: id, mood di compatibilità, e il componente puro.
export type Variant<C> = {
  id: string;                 // es. "header-01"
  mood: Mood | 'any';
  Component: React.FC<{ content: C }>;
};
