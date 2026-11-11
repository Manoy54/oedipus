"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BookmarkSimple, ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { passages, themes, sources, episodes } from "@/lib/content";
import { filterPassages } from "@/lib/passages";
import { updateActivity } from "@/lib/storage";
import { CopyButton, useActivity } from "./browser";
import s from "./passages.module.css";
import { highlightMatches } from "@/lib/annotation";
import { attributedPassage } from "@/lib/passage-text";
import { PassageComparison } from "./passage-comparison";
import { PassageNote } from "./passage-note";

function HighlightedText({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlightMatches(text, query).map((run, index) =>
        run.matched ? <mark key={index}>{run.text}</mark> : run.text,
      )}
    </>
  );
}
const initialFilters = { query: "", speaker: "", theme: "", savedOnly: false };
export function PassageLibrary() {
  const [filters, setFilters] = useState(initialFilters);
  useEffect(() => {
    const clearForAnchor = () => setFilters(initialFilters);
    window.addEventListener("hashchange", clearForAnchor);
    return () => window.removeEventListener("hashchange", clearForAnchor);
  }, []);
  const [status, setStatus] = useState("");
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const { activity, loaded, error } = useActivity();
  const filtered = filterPassages(passages, filters, activity.bookmarks);
  const speakers = [...new Set(passages.map((passage) => passage.speaker))];
  function bookmark(id: string) {
    const result = updateActivity((current) => ({
      ...current,
      bookmarks: current.bookmarks.includes(id)
        ? current.bookmarks.filter((item) => item !== id)
        : [...current.bookmarks, id],
    }));
    setStatus(
      result.ok
        ? activity.bookmarks.includes(id)
          ? "Bookmark removed."
          : "Passage bookmarked on this device."
        : result.message,
    );
  }
  return (
    <section aria-label="Passage collection">
      <PassageComparison selected={comparisonIds} onChange={setComparisonIds} />
      <div className={s.filters}>
        <div>
          <label htmlFor="passage-query">Search the text</label>
          <input
            id="passage-query"
            maxLength={120}
            type="search"
            placeholder="A word, phrase, or idea…"
            value={filters.query}
            onChange={(event) =>
              setFilters({ ...filters, query: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="speaker-filter">Speaker</label>
          <select
            id="speaker-filter"
            value={filters.speaker}
            onChange={(event) =>
              setFilters({ ...filters, speaker: event.target.value })
            }
          >
            <option value="">All speakers</option>
            {speakers.map((speaker) => (
              <option key={speaker}>{speaker}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="theme-filter">Theme</label>
          <select
            id="theme-filter"
            value={filters.theme}
            onChange={(event) =>
              setFilters({ ...filters, theme: event.target.value })
            }
          >
            <option value="">All themes</option>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.title}
              </option>
            ))}
          </select>
        </div>
        <button
          className="text-button"
          onClick={() => setFilters(initialFilters)}
        >
          Clear filters
        </button>
      </div>
      <div className={s.resultsBar}>
        <p role="status">
          {filtered.length} {filtered.length === 1 ? "passage" : "passages"}{" "}
          found
        </p>
        <label className={s.savedToggle}>
          <input
            type="checkbox"
            checked={filters.savedOnly}
            onChange={(event) =>
              setFilters({ ...filters, savedOnly: event.target.checked })
            }
          />
          Saved only (
          {
            activity.bookmarks.filter((id) =>
              passages.some((passage) => passage.id === id),
            ).length
          }
          )
        </label>
      </div>
      <p className="small muted">
        Bookmarks stay in this browser on this device. They are not submitted or
        synchronized.
      </p>
      {(error || status) && (
        <p role="status" className="status">
          {error || status}
        </p>
      )}
      {!filtered.length && (
        <div className="empty-state">
          <h2>
            {filters.savedOnly && !activity.bookmarks.length
              ? "No saved passages yet."
              : "No passages match these filters."}
          </h2>
          <p>
            {filters.savedOnly && !activity.bookmarks.length
              ? "Show all passages, then use Bookmark to keep an excerpt here."
              : "Clear the filters or try another keyword."}
          </p>
          <button
            className="button button-secondary"
            onClick={() => setFilters(initialFilters)}
          >
            Show all passages
          </button>
        </div>
      )}
      {filtered.map((passage) => {
        const saved = activity.bookmarks.includes(passage.id);
        const source = sources.find((entry) => entry.id === passage.sourceId);
        const episode = episodes.find(
          (entry) => entry.id === passage.episodeId,
        );
        const attribution = attributedPassage(passage);
        return (
          <article className={s.passage} id={passage.id} key={passage.id}>
            <div className={s.passageText}>
              <h2>
                <HighlightedText text={passage.title} query={filters.query} />
              </h2>
              <blockquote>
                “
                <HighlightedText text={passage.excerpt} query={filters.query} />
                ”
              </blockquote>
              <p className={s.attribution}>
                {passage.speaker} · F. Storr translation, 1912
              </p>
              <p className={s.locator}>{passage.locator}</p>
              <details className={s.context}>
                <summary>
                  Context & interpretation
                  <CaretDown size={18} />
                </summary>
                <h3>In the scene</h3>
                <p>
                  <HighlightedText
                    text={passage.context}
                    query={filters.query}
                  />
                </p>
                <h3>One reading</h3>
                <p>{passage.analysis}</p>
              </details>
              <CopyButton text={attribution} />
              {filters.savedOnly && <PassageNote passageId={passage.id} />}
            </div>
            <aside className={s.passageMeta}>
              <button
                className="text-button"
                aria-label={`${saved ? "Remove bookmark for" : "Bookmark"} ${passage.title}`}
                aria-pressed={saved}
                disabled={!loaded || !!error}
                onClick={() => bookmark(passage.id)}
              >
                <BookmarkSimple weight={saved ? "fill" : "regular"} />
                {saved ? "Bookmarked" : "Bookmark"}
              </button>
              <button
                className="text-button"
                aria-pressed={comparisonIds.includes(passage.id)}
                disabled={
                  comparisonIds.length === 2 &&
                  !comparisonIds.includes(passage.id)
                }
                aria-label={`${comparisonIds.includes(passage.id) ? "Deselect" : "Compare"} ${passage.title}`}
                onClick={() =>
                  setComparisonIds(
                    comparisonIds.includes(passage.id)
                      ? comparisonIds.filter((id) => id !== passage.id)
                      : [...comparisonIds, passage.id],
                  )
                }
              >
                {comparisonIds.includes(passage.id)
                  ? "Selected for comparison"
                  : "Add to comparison"}
              </button>
              {comparisonIds.length > 0 && (
                <a href="#compare-passages">
                  View comparison ({comparisonIds.length}/2)
                </a>
              )}
              <div className={s.themes}>
                {themes
                  .filter((theme) => passage.themeIds.includes(theme.id))
                  .map((theme) => (
                    <Link key={theme.id} href={`/analysis/#${theme.id}`}>
                      {theme.title}
                    </Link>
                  ))}
              </div>
              {episode && (
                <Link href={`/story/#${episode.id}`}>{episode.title}</Link>
              )}
              {source && (
                <a href={source.url} target="_blank" rel="noreferrer">
                  Original text <ArrowUpRight size={16} />
                  <span className="sr-only"> (opens a new tab)</span>
                </a>
              )}
            </aside>
          </article>
        );
      })}
    </section>
  );
}
