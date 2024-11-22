// Importing the Label type from types module
import { Label } from './types.js';

// Enums for consistent language and identifier usage
enum Language {
  English = 'en',
  Spanish = 'es' // Example additional language
}

enum Identifier {
  BlackOwnedBusiness = 'blackownedbusiness',
  BlackContentCreator = 'blackcontentcreator',
  Blerd = 'blerd',
  BlackAuthor = 'blackauthor',
  BlackInTech = 'blackintech',
  BlackEntrepreneur = 'blackentrepreneur',
  BlackGamer = 'blackgamer',
  BlackArtist = 'blackartist',
  BlackMusician = 'blackmusician'
}

// Locale interface for type safety
interface Locale {
  lang: Language;
  name: string;
  description: string;
}

// Utility function to create a label with type safety and simpler object structure
function createLabel(rkey: string, identifier: Identifier, locale: Locale): Label {
  return { rkey, identifier, locales: [locale] };
}

// Default values for DELETE and LABEL_LIMIT
export const DELETE = 'insert-rkey-of-delete-post-here';
export const LABEL_LIMIT = 5;  // Adjust the limit as per application requirement

// LABELS array populated using the createLabel function for cleaner and error-free initialization
export const LABELS: Label[] = [
  createLabel('insert-rkey-here', Identifier.BlackOwnedBusiness, {
    lang: Language.English,
    name: 'Black Owned Business',
    description: 'This Bluesky account belongs to a business that identifies as Black‑owned.'
  }),
  createLabel('insert-rkey-here', Identifier.BlackContentCreator, {
    lang: Language.English,
    name: 'Black Content Creator',
    description: 'User is a Black content creator.'
  }),
  createLabel('insert-rkey-here', Identifier.Blerd, {
    lang: Language.English,
    name: 'Blerd',
    description: 'User identifies as a Blerd (Black nerd).'
  }),
  createLabel('insert-rkey-here', Identifier.BlackAuthor, {
    lang: Language.English,
    name: 'Black Author',
    description: 'User is a Black author.'
  }),
  createLabel('insert-rkey-here', Identifier.BlackInTech, {
    lang: Language.English,
    name: 'Black In Tech',
    description: 'User works in the tech industry.'
  }),
  createLabel('insert-rkey-here', Identifier.BlackEntrepreneur, {
    lang: Language.English,
    name: 'Black Entrepreneur',
    description: 'User is a business owner/entrepreneur.'
  }),
  createLabel('insert-rkey-here', Identifier.BlackGamer, {
    lang: Language.English,
    name: 'Black Gamer',
    description: 'User is a gamer.'
  }),
  createLabel('insert-rkey-here', Identifier.BlackArtist, {
    lang: Language.English,
    name: 'Black Artist',
    description: 'User is a person that creates art.'
  }),
  createLabel('insert-rkey-here', Identifier.BlackMusician, {
    lang: Language.English,
    name: 'Black Musician',
    description: 'User is a musician.'
  })
];


