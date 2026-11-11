"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CaretDown,
  ArrowLeft,
  ArrowRight,
  GitBranch,
} from "@phosphor-icons/react";
import {
  episodes,
  events,
  characters,
  passages,
  revelations,
  type Revelation,
} from "@/lib/content";
import { updateActivity } from "@/lib/storage";
import s from "./reading.module.css";

function RevelationList({
  records,
  jump,
  showEpisode = false,
}: {
  records: Revelation[];
  jump: (id: string) => void;
  showEpisode?: boolean;
}) {
  return (
    <div className={s.revelations}>
      {records.map((record) => (
        <div className={s.revelation} key={record.id}>
          <p>
            <strong>{record.evidenceStatus}</strong>
            {showEpisode && (
              <>
                {" "}
                ·{" "}
                <a
                  href={`#${record.episodeId}`}
                  onClick={() => jump(record.episodeId)}
                >
                  {
                    episodes.find((episode) => episode.id === record.episodeId)
                      ?.title
                  }
                </a>
              </>
            )}
          </p>
          <p>{record.claim}</p>
          <p className={s.revelationAttribution}>
            {record.speakerLabel} · Informed: {record.informedParty}
          </p>
          <div className={s.linkList}>
            {record.passageIds.map((id) => (
              <Link key={id} href={`/passages/#${id}`}>
                {passages.find((passage) => passage.id === id)?.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function StoryExplorer() {
  const [view, setView] = useState("revelation");
  useEffect(() => {
    const revealForAnchor = () => setView("revelation");
    window.addEventListener("hashchange", revealForAnchor);
    return () => window.removeEventListener("hashchange", revealForAnchor);
  }, []);
  const [status, setStatus] = useState("");
  const root = useRef<HTMLDivElement>(null);
  function expand(open: boolean) {
    root.current?.querySelectorAll("details").forEach((item) => {
      item.open = open;
    });
  }
  function jump(id: string) {
    setView("revelation");
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
        target.scrollIntoView();
      }
    });
  }
  return (
    <section aria-labelledby="timeline-title" ref={root}>
      <h2 id="timeline-title">Two ways to follow the story.</h2>
      <p className="prose muted">
        The investigation unfolds in one order. The events it uncovers happened
        in another. Compare the two to see how knowledge changes the meaning of
        the past.
      </p>
      <div className={s.toolbar}>
        <div className={s.tabs} aria-label="Timeline order">
          <button
            aria-pressed={view === "revelation"}
            onClick={() => setView("revelation")}
          >
            During the investigation
          </button>
          <button
            aria-pressed={view === "chronology"}
            onClick={() => setView("chronology")}
          >
            Earlier events & aftermath
          </button>
        </div>
        {view === "revelation" && (
          <div className="actions">
            <button className="text-button" onClick={() => expand(true)}>
              Expand all
            </button>
            <button className="text-button" onClick={() => expand(false)}>
              Collapse all
            </button>
          </div>
        )}
      </div>
      <p className="small muted">
        {view === "revelation"
          ? "Order of revelation · Editorial study episodes, not formal acts."
          : "Chronological order · Relative sequence, not historical dates. Each event links to the investigation that reveals it."}
      </p>
      {status && (
        <p role="status" className="status">
          {status}
        </p>
      )}
      {view === "revelation" ? (
        <div className={s.timeline}>
          {episodes.map((episode, index) => (
            <details
              className={s.episode}
              id={episode.id}
              key={episode.id}
              open={index === 0}
            >
              <summary
                onClick={(event) => {
                  if (
                    !event.currentTarget.parentElement?.hasAttribute("open")
                  ) {
                    const result = updateActivity((activity) => ({
                      ...activity,
                      lastEpisode: episode.id,
                    }));
                    if (!result.ok) setStatus(result.message);
                  }
                }}
              >
                <span className={s.ordinal}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{episode.title}</h3>
                <CaretDown size={21} />
              </summary>
              <div className={s.episodeBody}>
                <p>{episode.summary}</p>
                <h4>What becomes known</h4>
                <p>{episode.discovery}</p>
                <h4>Why it matters</h4>
                <p>{episode.significance}</p>
                <h4>How the evidence is presented</h4>
                <RevelationList
                  records={revelations.filter(
                    (record) => record.episodeId === episode.id,
                  )}
                  jump={jump}
                />
                <div className={s.linkList}>
                  {characters
                    .filter((character) =>
                      episode.characterIds.includes(character.id),
                    )
                    .map((character) => (
                      <Link
                        href={`/characters/#${character.id}`}
                        key={character.id}
                      >
                        {character.name}
                      </Link>
                    ))}
                </div>
                <h4>Return to the text</h4>
                <div className={s.linkList}>
                  {passages
                    .filter((passage) =>
                      episode.passageIds.includes(passage.id),
                    )
                    .map((passage) => (
                      <Link key={passage.id} href={`/passages/#${passage.id}`}>
                        {passage.title}
                      </Link>
                    ))}
                </div>
                <h4>A question to consider</h4>
                <p className={s.question}>{episode.question}</p>
                <div className="actions">
                  {index > 0 && (
                    <a
                      className="text-button"
                      href={`#${episodes[index - 1].id}`}
                      onClick={() => jump(episodes[index - 1].id)}
                    >
                      <ArrowLeft />
                      Previous episode
                    </a>
                  )}
                  {index < episodes.length - 1 && (
                    <a
                      className="text-button"
                      href={`#${episodes[index + 1].id}`}
                      onClick={() => jump(episodes[index + 1].id)}
                    >
                      Next episode
                      <ArrowRight />
                    </a>
                  )}
                </div>
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className={s.timeline}>
          {events.map((event, index) => (
            <article key={event.id} className={s.event}>
              <h3>
                <span className={s.ordinal}>{index + 1} · </span>
                {event.title}
              </h3>
              <p>{event.summary}</p>
              <p className="small muted">
                <GitBranch size={16} /> How this past becomes known:
              </p>
              <RevelationList
                records={revelations.filter(
                  (record) => record.eventId === event.id,
                )}
                jump={jump}
                showEpisode
              />
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
