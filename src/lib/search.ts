export function normalizeSearch(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}
export function matchesSearch(query: string, values: string[]): boolean {
  const normalized = normalizeSearch(query);
  return !normalized || normalizeSearch(values.join(" ")).includes(normalized);
}
export function countWords(value: string): number {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}
