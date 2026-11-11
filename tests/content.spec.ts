import { test, expect } from "@playwright/test";
import { guide } from "../src/lib/content";
import { filterPassages } from "../src/lib/passages";
import { normalizeSearch, countWords } from "../src/lib/search";
import { scoreQuiz, moveItem } from "../src/lib/activities";
import { parseActivity } from "../src/lib/storage";

test("content references and answer keys are complete", () => {
  const characterIds = guide.characters.map((record) => record.id);
  const episodeIds = guide.episodes.map((record) => record.id);
  const passageIds = guide.passages.map((record) => record.id);
  const sourceIds = guide.sources.map((record) => record.id);
  for (const ids of [characterIds, episodeIds, passageIds, sourceIds])
    expect(new Set(ids).size).toBe(ids.length);
  expect(guide.episodes).toHaveLength(8);
  expect(guide.characters).toHaveLength(10);
  expect(guide.passages).toHaveLength(14);
  for (const episode of guide.episodes) {
    for (const id of episode.characterIds) expect(characterIds).toContain(id);
    for (const id of episode.passageIds) expect(passageIds).toContain(id);
    expect(episode.summary.split(/\s+/).length).toBeGreaterThan(75);
  }
  for (const character of guide.characters)
    for (const relationship of character.relationships)
      expect(characterIds).toContain(relationship.characterId);
  for (const passage of guide.passages) {
    expect(sourceIds).toContain(passage.sourceId);
    expect(episodeIds).toContain(passage.episodeId);
    expect(passage.excerpt.length).toBeGreaterThan(10);
  }
  for (const event of guide.events)
    for (const id of event.episodeIds) {
      expect(episodeIds).toContain(id);
      expect(
        guide.revelations.some(
          (record) => record.eventId === event.id && record.episodeId === id,
        ),
      ).toBe(true);
    }
  for (const record of guide.revelations) {
    expect(guide.events.map((event) => event.id)).toContain(record.eventId);
    expect(episodeIds).toContain(record.episodeId);
    expect(record.claim.length).toBeGreaterThan(20);
    expect(record.speakerLabel.length).toBeGreaterThan(0);
    expect(record.informedParty.length).toBeGreaterThan(0);
    for (const id of record.passageIds) expect(passageIds).toContain(id);
  }
  for (const question of guide.questions) {
    expect(passageIds).toContain(question.passageId);
    expect(question.correctIndex).toBeGreaterThanOrEqual(0);
    expect(question.correctIndex).toBeLessThan(question.choices.length);
  }
});
test("search normalization and AND filters preserve the expected evidence", () => {
  expect(normalizeSearch("  TEIRESIAS   ")).toBe("teiresias");
  const records = filterPassages(
    guide.passages,
    {
      query: "  BURDEN ",
      speaker: "Oedipus",
      theme: "authority",
      savedOnly: false,
    },
    [],
  );
  expect(records.map((record) => record.id)).toEqual(["shared-burden"]);
  expect(
    filterPassages(
      guide.passages,
      { query: "burden", speaker: "Jocasta", theme: "", savedOnly: false },
      [],
    ),
  ).toEqual([]);
  expect(
    filterPassages(
      guide.passages,
      { query: "", speaker: "", theme: "", savedOnly: true },
      ["last-light"],
    ).map((record) => record.id),
  ).toEqual(["last-light"]);
});
test("quiz scoring, movement boundaries, and word counting", () => {
  expect(
    scoreQuiz(
      guide.questions.map((question) => question.correctIndex),
      guide.questions,
    ),
  ).toBe(10);
  expect(scoreQuiz([], guide.questions)).toBe(0);
  expect(moveItem(["a", "b", "c"], 0, -1)).toEqual(["a", "b", "c"]);
  expect(moveItem(["a", "b", "c"], 0, 1)).toEqual(["b", "a", "c"]);
  expect(countWords(" \n ")).toBe(0);
  expect(countWords("Truth  and\nknowledge")).toBe(3);
});
test("saved content validates structure and refuses malformed writing", () => {
  expect(parseActivity(null).ok).toBe(true);
  expect(parseActivity("not json").ok).toBe(false);
  expect(
    parseActivity(
      JSON.stringify({ bookmarks: [3], lastEpisode: null, reflections: {} }),
    ).ok,
  ).toBe(false);
  expect(
    parseActivity(
      JSON.stringify({
        bookmarks: [],
        lastEpisode: "recognition",
        reflections: {
          truth: { text: "Evidence matters.", savedAt: "2026-11-11T00:00:00Z" },
        },
      }),
    ).ok,
  ).toBe(true);
});
