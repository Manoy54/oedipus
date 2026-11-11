export type HighlightRun = { text: string; matched: boolean };

export function highlightMatches(text: string, query: string): HighlightRun[] {
  const needle = query.trim();
  if (!needle) return [{ text, matched: false }];
  const pattern = needle
    .split(/\s+/)
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("\\s+");
  const runs: HighlightRun[] = [];
  let offset = 0;
  for (const match of text.matchAll(new RegExp(pattern, "giu"))) {
    const found = match.index;
    if (found > offset)
      runs.push({ text: text.slice(offset, found), matched: false });
    runs.push({ text: match[0], matched: true });
    offset = found + match[0].length;
  }
  if (offset < text.length)
    runs.push({ text: text.slice(offset), matched: false });
  return runs.length ? runs : [{ text, matched: false }];
}

export function composeArgument(
  claim: string,
  evidence: string[],
  explanation: string,
): string {
  return [claim.trim(), evidence.join("\n\n"), explanation.trim()]
    .filter(Boolean)
    .join("\n\n");
}
