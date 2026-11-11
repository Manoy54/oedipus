import { sources, type Passage } from "./content";

export function attributedPassage(passage: Passage): string {
  const source = sources.find((entry) => entry.id === passage.sourceId);
  if (!source) throw new Error(`Missing source for passage ${passage.id}`);
  return `${passage.excerpt}\n— ${passage.speaker}, Sophocles, Oedipus the King. F. Storr translation (1912).\n${passage.locator}\n${source.url}`;
}
