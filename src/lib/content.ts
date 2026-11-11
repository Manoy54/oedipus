import data from "@/content/guide.json";
import supplement from "@/content/discovery.json";

export const guide = {
  ...data,
  passages: [...data.passages, ...supplement.additionalPassages],
};
export const {
  episodes,
  events,
  revelations,
  characters,
  themes,
  techniques,
  passages,
  questions,
  glossary,
  prompts,
  contexts,
  sources,
} = guide;

export type Episode = (typeof episodes)[number];
export type HistoricalEvent = (typeof events)[number];
export type Revelation = (typeof revelations)[number];
export type Character = (typeof characters)[number];
export type Theme = (typeof themes)[number];
export type Technique = (typeof techniques)[number];
export type Passage = (typeof passages)[number];
export type Question = (typeof questions)[number];
export type GlossaryTerm = (typeof glossary)[number];
export type ReflectionPrompt = (typeof prompts)[number];
export type ContextSection = (typeof contexts)[number];
export type Source = (typeof sources)[number];

export function getCharacter(id: string) {
  return characters.find((character) => character.id === id);
}

export function getPassage(id: string) {
  return passages.find((passage) => passage.id === id);
}

export function getEpisode(id: string) {
  return episodes.find((episode) => episode.id === id);
}
