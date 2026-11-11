"use client";
import { useState } from "react";
import { passages, prompts } from "@/lib/content";
import { composeArgument } from "@/lib/annotation";
import { attributedPassage } from "@/lib/passage-text";
import { CopyButton } from "./browser";
import s from "./activities.module.css";

export function ArgumentBuilder() {
  const [promptId, setPromptId] = useState(prompts[0].id);
  const [claim, setClaim] = useState("");
  const [explanation, setExplanation] = useState("");
  const [evidenceIds, setEvidenceIds] = useState<string[]>([]);
  const [showDraft, setShowDraft] = useState(false);
  const selected = passages.filter((passage) =>
    evidenceIds.includes(passage.id),
  );
  const prompt = prompts.find((item) => item.id === promptId);
  const composed = composeArgument(
    claim,
    selected.map(attributedPassage),
    explanation,
  );
  return (
    <section className={s.builder} id="argument-builder">
      <h3>Claim. Evidence. Explanation.</h3>
      <p>
        Build a response one part at a time. This optional scaffold does not
        replace or overwrite your saved reflections below.
      </p>
      <label htmlFor="argument-prompt">Question to explore</label>
      <select
        id="argument-prompt"
        value={promptId}
        onChange={(event) => setPromptId(event.target.value)}
      >
        {prompts.map((item) => (
          <option value={item.id} key={item.id}>
            {item.prompt}
          </option>
        ))}
      </select>
      <label htmlFor="argument-claim">Your claim</label>
      <textarea
        id="argument-claim"
        maxLength={1500}
        value={claim}
        placeholder="State a position that the text can support…"
        onChange={(event) => setClaim(event.target.value)}
      />
      <fieldset>
        <legend>Choose up to two pieces of evidence</legend>
        <div className={s.evidenceChoices}>
          {passages.map((passage) => (
            <label key={passage.id}>
              <input
                type="checkbox"
                checked={evidenceIds.includes(passage.id)}
                disabled={
                  evidenceIds.length === 2 && !evidenceIds.includes(passage.id)
                }
                onChange={() =>
                  setEvidenceIds(
                    evidenceIds.includes(passage.id)
                      ? evidenceIds.filter((id) => id !== passage.id)
                      : [...evidenceIds, passage.id],
                  )
                }
              />
              <span>
                {passage.title}
                <small>{passage.speaker}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <label htmlFor="argument-explanation">Explain the connection</label>
      <textarea
        id="argument-explanation"
        maxLength={2500}
        value={explanation}
        placeholder="Which words matter, and how do they support or complicate your claim?"
        onChange={(event) => setExplanation(event.target.value)}
      />
      <div className="actions">
        <button
          className="button button-secondary"
          onClick={() => setShowDraft(!showDraft)}
        >
          {showDraft ? "Hide assembled response" : "Preview assembled response"}
        </button>
        <CopyButton
          text={`${prompt?.prompt ?? ""}\n\n${composed}`}
          label="Copy assembled response"
        />
      </div>
      {showDraft && (
        <div className={s.assembled}>
          <h4>Your assembled response</h4>
          {composed ? (
            <p>{composed}</p>
          ) : (
            <p className="muted">
              Add a claim, select evidence, and explain its significance to
              assemble a response.
            </p>
          )}
        </div>
      )}
      <p className="small muted">
        The scaffold stays in this tab and is not automatically saved. Copy the
        assembled response or paste it into a reflection below and save on this
        device.
      </p>
    </section>
  );
}
