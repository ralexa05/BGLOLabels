import { LabelValueDefinitionStrings } from '@atproto/api/dist/client/types/com/atproto/label/defs.js';

/**
 * Represents a label with localization options.
 * `rkey`: The key reference for the label, used in internal and database mappings.
 * `identifier`: A unique string identifier for the label, used in API interactions.
 * `locales`: An array of localization strings providing locale-specific names and descriptions.
 */
export interface Label {
  rkey: string; // Reference key for the label
  identifier: string; // Unique identifier for the label
  locales: LabelValueDefinitionStrings[]; // Localized names and descriptions
}
