"use client";
import { useRef } from "react";
import * as m from "motion/react-m";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { BookOpen } from "@phosphor-icons/react";
import { comparisons } from "@/lib/discovery-content";
import { getPassage } from "@/lib/content";
import { EvidencePreview } from "./evidence-preview";
import s from "./comparison.module.css";

export function PassageComparison({
  selected,
  onChange,
  ready,
}: {
  selected: string[];
  onChange: (ids: string[]) => void;
  ready: boolean;
}) {
  const pairingControl = useRef<HTMLSelectElement>(null);
  const reducedMotion = useReducedMotion();
  const pair = comparisons.find(
    (item) =>
      item.passageIds.length === selected.length &&
      item.passageIds.every((id) => selected.includes(id)),
  );
  function removePassages(remaining: string[]) {
    onChange(remaining);
    pairingControl.current?.focus({ preventScroll: true });
  }
  return (
    <section
      id="compare-passages"
      className={s.comparison}
      aria-labelledby="comparison-heading"
    >
      <div className={s.header}>
        <BookOpen
          className={s.bookIcon}
          size={34}
          weight="duotone"
          aria-hidden="true"
        />
        <div>
          <h2 id="comparison-heading">Compare two passages.</h2>
          <p>Select two excerpts below, or begin with a suggested pairing.</p>
        </div>
        <div>
          <label htmlFor="suggested-comparison">Suggested comparison</label>
          <select
            id="suggested-comparison"
            disabled={!ready}
            ref={pairingControl}
            value={pair?.id ?? ""}
            onChange={(event) => {
              const next = comparisons.find(
                (item) => item.id === event.target.value,
              );
              if (next) onChange(next.passageIds);
            }}
          >
            <option value="">Choose a pairing</option>
            {comparisons.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selected.length > 0 && (
        <>
          <div className={s.tray}>
            <span role="status">{selected.length} of 2 passages selected</span>
            <button className="text-button" onClick={() => removePassages([])}>
              Clear comparison
            </button>
          </div>
          <div className={s.pair}>
            <AnimatePresence mode="popLayout">
              {selected.map((id, index) => {
                const passage = getPassage(id);
                if (!passage)
                  throw new Error(`Missing comparison passage ${id}`);
                return (
                  <m.article
                    key={id}
                    layout="position"
                    initial={{
                      opacity: 0.7,
                      x: reducedMotion ? 0 : index === 0 ? -12 : 12,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  >
                    <div className={s.pairTitle}>
                      <h3>{passage.title}</h3>
                      <button
                        className="text-button"
                        aria-label={`Remove ${passage.title} from comparison`}
                        onClick={() =>
                          removePassages(selected.filter((item) => item !== id))
                        }
                      >
                        Remove
                      </button>
                    </div>
                    <blockquote>“{passage.excerpt}”</blockquote>
                    <p className={s.attribution}>
                      {passage.speaker} · F. Storr, 1912
                    </p>
                    <p>{passage.context}</p>
                    <EvidencePreview
                      passageId={id}
                      label="Inspect this evidence"
                    />
                  </m.article>
                );
              })}
            </AnimatePresence>
          </div>
          {selected.length === 1 && (
            <p className="small muted">
              Choose one more passage to compare its context and meaning.
            </p>
          )}
          {selected.length === 2 && (
            <div className={s.question}>
              <h3>
                {pair
                  ? pair.question
                  : "What changes when these passages are read together?"}
              </h3>
              <p>
                {pair
                  ? pair.explanation
                  : "Compare the speakers, the moment in the investigation, and what each person can know. Explain a similarity or tension using the words of both excerpts."}
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
