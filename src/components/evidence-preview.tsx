"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { BookmarkSimple, BookOpen, CaretDown, X } from "@phosphor-icons/react";
import { getPassage, sources } from "@/lib/content";
import { attributedPassage } from "@/lib/passage-text";
import { updateActivity } from "@/lib/storage";
import { CopyButton, useActivity } from "./browser";
import s from "./evidence.module.css";

export function BookmarkButton({ passageId }: { passageId: string }) {
  const { activity, loaded, error } = useActivity();
  const [status, setStatus] = useState("");
  const passage = getPassage(passageId);
  if (!passage) throw new Error(`Unknown passage ${passageId}`);
  const saved = activity.bookmarks.includes(passageId);
  return (
    <span className={s.bookmark}>
      <button
        className="text-button"
        disabled={!loaded || !!error}
        aria-pressed={saved}
        aria-label={`${saved ? "Remove bookmark for" : "Bookmark"} ${passage.title}`}
        onClick={() => {
          const result = updateActivity((current) => ({
            ...current,
            bookmarks: saved
              ? current.bookmarks.filter((id) => id !== passageId)
              : [...new Set([...current.bookmarks, passageId])],
          }));
          setStatus(
            result.ok
              ? saved
                ? "Bookmark removed."
                : "Saved on this device."
              : result.message,
          );
        }}
      >
        <BookmarkSimple weight={saved ? "fill" : "regular"} size={18} />
        {saved ? "Bookmarked" : "Bookmark"}
      </button>
      {(status || error) && (
        <span role="status" className="small">
          {error || status}
        </span>
      )}
    </span>
  );
}

export function EvidencePreview({
  passageId,
  guided = false,
  contextNote,
  label,
  inverse = false,
}: {
  passageId: string;
  guided?: boolean;
  contextNote?: string;
  label?: string;
  inverse?: boolean;
}) {
  const element = useRef<HTMLDetailsElement>(null);
  const passage = getPassage(passageId);
  if (!passage) throw new Error(`Unknown evidence passage ${passageId}`);
  const source = sources.find((entry) => entry.id === passage.sourceId);
  function close() {
    if (element.current) {
      element.current.open = false;
      const summary = element.current.querySelector("summary");
      summary?.focus({ preventScroll: true });
      summary?.scrollIntoView({ block: "nearest" });
    }
  }
  return (
    <details
      ref={element}
      className={`${s.preview} ${inverse ? s.inverse : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          close();
          event.preventDefault();
        }
      }}
    >
      <summary>
        <BookOpen size={20} />
        <span>{label || `Read the evidence: ${passage.title}`}</span>
        <CaretDown size={17} />
      </summary>
      <div className={s.content}>
        <h4>{passage.title}</h4>
        <blockquote>“{passage.excerpt}”</blockquote>
        <p className={s.attribution}>{passage.speaker} · F. Storr, 1912</p>
        <p className="small muted">{passage.locator}</p>
        {guided ? (
          <div>
            <strong>At this point in the investigation</strong>
            <p>{contextNote}</p>
            <p className="small muted">
              Later context and full-plot interpretation are available in the
              study entry.
            </p>
          </div>
        ) : (
          <>
            <h5>In the scene</h5>
            <p>{passage.context}</p>
            <h5>One reading</h5>
            <p>{passage.analysis}</p>
          </>
        )}
        <div className="actions">
          <BookmarkButton passageId={passage.id} />
          <CopyButton text={attributedPassage(passage)} />
        </div>
        <div className={s.footer}>
          <Link href={`/passages/#${passage.id}`}>
            {guided
              ? "Open full study entry (spoilers)"
              : "Open complete passage"}
          </Link>
          {source && (
            <a href={source.url} target="_blank" rel="noreferrer">
              Original source<span className="sr-only"> (opens a new tab)</span>
            </a>
          )}
          <button className="text-button" onClick={close}>
            <X size={16} />
            Close evidence
          </button>
        </div>
      </div>
    </details>
  );
}
