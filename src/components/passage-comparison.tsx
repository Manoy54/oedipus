"use client";
import { comparisons } from "@/lib/discovery-content";
import { getPassage } from "@/lib/content";
import { EvidencePreview } from "./evidence-preview";
import s from "./comparison.module.css";

export function PassageComparison({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  const pair = comparisons.find(
    (item) =>
      item.passageIds.length === selected.length &&
      item.passageIds.every((id) => selected.includes(id)),
  );
  return (
    <section
      id="compare-passages"
      className={s.comparison}
      aria-labelledby="comparison-heading"
    >
      <div className={s.header}>
        <div>
          <h2 id="comparison-heading">
            Two passages. A different perspective.
          </h2>
          <p>Select two excerpts below, or begin with a suggested pairing.</p>
        </div>
        <div>
          <label htmlFor="suggested-comparison">Suggested comparison</label>
          <select
            id="suggested-comparison"
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
            <button className="text-button" onClick={() => onChange([])}>
              Clear comparison
            </button>
          </div>
          <div className={s.pair}>
            {selected.map((id) => {
              const passage = getPassage(id);
              if (!passage) throw new Error(`Missing comparison passage ${id}`);
              return (
                <article key={id}>
                  <div className={s.pairTitle}>
                    <h3>{passage.title}</h3>
                    <button
                      className="text-button"
                      aria-label={`Remove ${passage.title} from comparison`}
                      onClick={() =>
                        onChange(selected.filter((item) => item !== id))
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
                </article>
              );
            })}
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
