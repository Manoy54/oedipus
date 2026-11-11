"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CaretDown } from "@phosphor-icons/react";
import { episodes, characters, revelations } from "@/lib/content";
import {
  guidedEpisodes,
  checkpoints,
  type EvidenceCheckpoint,
} from "@/lib/discovery-content";
import { replaceHash, useLocationHash } from "@/lib/hash-state";
import { updateActivity } from "@/lib/storage";
import { useActivity } from "./browser";
import { EvidencePreview } from "./evidence-preview";
import { StoryExplorer } from "./story-explorer";
import { SpoilerNote } from "./shell";
import s from "./guided.module.css";

const witnessIds = [
  "chorus",
  "creon",
  "tiresias",
  "creon",
  "jocasta",
  "messenger",
  "shepherd",
  "oedipus",
];

function Checkpoint({ checkpoint }: { checkpoint: EvidenceCheckpoint }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  return (
    <section className={s.checkpoint} aria-label="Evidence checkpoint">
      <h3>Pause and weigh the evidence.</h3>
      <p>{checkpoint.prompt}</p>
      <fieldset>
        <legend className="sr-only">Choose a reading of this evidence</legend>
        {checkpoint.choices.map((choice, index) => (
          <label key={choice}>
            <input
              type="radio"
              name={checkpoint.id}
              checked={selected === index}
              onChange={() => {
                setSelected(index);
                setChecked(false);
                setError("");
              }}
            />
            {choice}
          </label>
        ))}
      </fieldset>
      <button
        className="button button-secondary"
        onClick={() => {
          if (selected === null)
            setError(
              "Choose an option to see its explanation, or continue reading.",
            );
          else {
            setChecked(true);
            setError("");
          }
        }}
      >
        Consider this answer
      </button>
      {error && (
        <p role="alert" className="status">
          {error}
        </p>
      )}
      {checked && selected !== null && (
        <p role="status" className={s.checkpointFeedback}>
          {checkpoint.explanations[selected]}
        </p>
      )}
      <p className="small muted">
        Optional practice. Your answer never locks the next episode.
      </p>
    </section>
  );
}

export function GuidedInvestigation() {
  const hash = useLocationHash();
  const isLegacyEpisode = episodes.some((episode) => hash === `#${episode.id}`);
  const study = hash === "#study" || isLegacyEpisode;
  const match = episodes.findIndex(
    (episode) => hash === `#investigation-${episode.id}`,
  );
  const index = match < 0 ? 0 : match;
  const episode = episodes[index];
  const content = guidedEpisodes.find((item) => item.id === episode.id);
  if (!content) throw new Error(`Missing guided content for ${episode.id}`);
  const heading = useRef<HTMLHeadingElement>(null);
  const { activity, loaded, error: storageError } = useActivity();
  const [status, setStatus] = useState("");
  const witness = characters.find(
    (character) => character.id === witnessIds[index],
  );
  const checkpoint = checkpoints.find((item) => item.episodeId === episode.id);
  const evidenceTypes = [
    ...new Set(
      revelations
        .filter((record) => record.episodeId === episode.id)
        .map((record) => record.evidenceStatus),
    ),
  ];
  function select(next: number) {
    replaceHash(`#investigation-${episodes[next].id}`);
    const result = updateActivity((current) => ({
      ...current,
      lastEpisode: episodes[next].id,
    }));
    if (!result.ok) setStatus(result.message);
    requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: "start" });
    });
  }
  return (
    <section className={s.experience} aria-label="Story experience">
      <div className={s.modeBar}>
        <div className={s.modeButtons}>
          <button aria-pressed={!study} onClick={() => select(index)}>
            Guided investigation
          </button>
          <button aria-pressed={study} onClick={() => replaceHash("#study")}>
            Full study timeline (spoilers)
          </button>
        </div>
        <span>
          {study
            ? "All discoveries available"
            : `Episode ${index + 1} of ${episodes.length}`}
        </span>
      </div>
      {study ? (
        <div id="study">
          <SpoilerNote />
          <StoryExplorer />
        </div>
      ) : (
        <>
          <aside className={s.guidance}>
            <strong>Follow the clues in sequence.</strong> Choosing a later
            episode reveals later discoveries. Full profiles, analysis, and
            study entries contain full-plot spoilers. The play includes suicide,
            self-inflicted injury, and incest; artwork is non-graphic.
          </aside>
          <div className={s.layout}>
            <nav className={s.rail} aria-label="Investigation episodes">
              <div className={s.mobileEpisodes}>
                <label htmlFor="episode-jump">Current episode</label>
                <select
                  id="episode-jump"
                  value={index}
                  onChange={(event) => select(Number(event.target.value))}
                >
                  {episodes.map((item, position) => (
                    <option key={item.id} value={position}>
                      {position + 1}. {item.title}
                      {activity.completedEpisodes.includes(item.id)
                        ? " \u00b7 Read"
                        : ""}
                    </option>
                  ))}
                </select>
              </div>
              <h2>Your path</h2>
              <ol>
                {episodes.map((item, position) => (
                  <li key={item.id}>
                    <button
                      aria-current={position === index ? "step" : undefined}
                      aria-label={`Episode ${position + 1}: ${item.title}`}
                      onClick={() => select(position)}
                    >
                      <span>{String(position + 1).padStart(2, "0")}</span>
                      <span>{item.title}</span>
                      {activity.completedEpisodes.includes(item.id) && (
                        <Check size={15} aria-label="Marked read" />
                      )}
                    </button>
                  </li>
                ))}
              </ol>
              <p className="small muted">
                {
                  activity.completedEpisodes.filter((id) =>
                    episodes.some((item) => item.id === id),
                  ).length
                }{" "}
                marked read on this device.
              </p>
            </nav>
            <article
              className={s.chapter}
              id={`investigation-${episode.id}`}
              key={episode.id}
            >
              <div className={s.stage}>
                <div>
                  <p className={s.position}>Episode {index + 1} of 8</p>
                  <h2 ref={heading} tabIndex={-1}>
                    {episode.title}
                  </h2>
                </div>
                {witness && (
                  <figure>
                    <Image
                      src={`/images/${witness.id}.webp`}
                      width={640}
                      height={640}
                      alt={`Modern illustration of ${witness.name}.`}
                    />
                    <figcaption>{witness.name}</figcaption>
                  </figure>
                )}
              </div>
              <p className={s.takeaway}>{content.takeaway}</p>
              <p className={s.summary}>{content.guidedSummary}</p>
              <h3>Listen to the evidence.</h3>
              {content.passageIds.map((id) => (
                <EvidencePreview
                  key={id}
                  passageId={id}
                  guided
                  contextNote={content.takeaway}
                />
              ))}
            </article>
            <aside
              className={s.knowledge}
              aria-label="Knowledge at this episode"
            >
              <h2>What is known here?</h2>
              <section>
                <h3>Oedipus believes</h3>
                <p>{content.beliefs}</p>
              </section>
              <section>
                <h3>What speakers claim</h3>
                {content.claims.map((claim) => (
                  <p key={claim.speaker}>
                    <strong>{claim.speaker}</strong>
                    <br />
                    {claim.claim}
                  </p>
                ))}
              </section>
              <section>
                <h3>What the audience hears</h3>
                <p>{content.audience}</p>
              </section>
              <p className={s.evidenceStatus}>
                Evidence in this episode: {evidenceTypes.join(", ")}
              </p>
              <details>
                <summary>
                  Belief is not confirmation
                  <CaretDown size={16} />
                </summary>
                <p>
                  A character’s assertion, the audience’s inference, and later
                  corroboration are different kinds of knowledge. This panel
                  describes this point in the play.
                </p>
              </details>
            </aside>
            <section
              className={s.conclusion}
              aria-label="Consider and continue"
            >
              <p className={s.question}>{content.question}</p>
              {checkpoint && (
                <Checkpoint key={checkpoint.id} checkpoint={checkpoint} />
              )}
              <div className={s.progressAction}>
                <button
                  className="text-button"
                  disabled={!loaded || !!storageError}
                  aria-pressed={activity.completedEpisodes.includes(episode.id)}
                  onClick={() => {
                    const result = updateActivity((current) => ({
                      ...current,
                      completedEpisodes: current.completedEpisodes.includes(
                        episode.id,
                      )
                        ? current.completedEpisodes.filter(
                            (id) => id !== episode.id,
                          )
                        : [...current.completedEpisodes, episode.id],
                    }));
                    setStatus(
                      result.ok
                        ? "Reading marker updated on this device."
                        : result.message,
                    );
                  }}
                >
                  <Check size={18} />
                  {activity.completedEpisodes.includes(episode.id)
                    ? "Marked as read"
                    : "Mark this episode as read"}
                </button>
                <p className="small muted">
                  A reading marker is your choice, not a comprehension score.
                </p>
              </div>
              {(status || storageError) && (
                <p role="status" className="status">
                  {storageError || status}
                </p>
              )}
              <div className={s.controls}>
                <button
                  className="button button-secondary"
                  disabled={index === 0}
                  onClick={() => select(index - 1)}
                >
                  <ArrowLeft size={18} />
                  Previous episode
                </button>
                {index < 7 ? (
                  <button className="button" onClick={() => select(index + 1)}>
                    Next episode
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <Link className="button" href="/activities/#reflection">
                    Build your interpretation
                    <ArrowRight size={18} />
                  </Link>
                )}
              </div>
            </section>
          </div>
        </>
      )}
    </section>
  );
}
