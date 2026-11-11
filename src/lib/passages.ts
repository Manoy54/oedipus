import type { Passage } from "./content";
import { matchesSearch } from "./search";
export function filterPassages(
  records: Passage[],
  filters: {
    query: string;
    speaker: string;
    theme: string;
    savedOnly: boolean;
  },
  bookmarks: string[],
): Passage[] {
  return records.filter(
    (record) =>
      matchesSearch(filters.query, [
        record.title,
        record.excerpt,
        record.context,
      ]) &&
      (!filters.speaker || record.speaker === filters.speaker) &&
      (!filters.theme || record.themeIds.includes(filters.theme)) &&
      (!filters.savedOnly || bookmarks.includes(record.id)),
  );
}
