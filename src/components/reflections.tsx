"use client";
import { useEffect, useState } from "react";
import { prompts } from "@/lib/content";
import { countWords } from "@/lib/search";
import { clearActivity, updateActivity } from "@/lib/storage";
import { CopyButton, useActivity } from "./browser";
import s from "./activities.module.css";
import { ArgumentBuilder } from "./argument-builder";
function ReflectionEditor({ id, prompt }: { id: string; prompt: string }) {
  const { activity, loaded, error } = useActivity();
  const [draft, setDraft] = useState<string | undefined>();
  const [status, setStatus] = useState("");
  const saved = activity.reflections[id];
  const text = draft ?? saved?.text ?? "";
  const dirty = draft !== undefined && draft !== (saved?.text ?? "");
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function save() {
    const result = updateActivity((current) => ({
      ...current,
      reflections: {
        ...current.reflections,
        [id]: { text, savedAt: new Date().toISOString() },
      },
    }));
    setStatus(result.message);
    if (result.ok) setDraft(undefined);
  }
  function clear() {
    if (
      text &&
      !window.confirm(
        "Clear this response and its saved copy? Other responses will stay.",
      )
    )
      return;
    if (saved) {
      const result = updateActivity((current) => {
        const reflections = { ...current.reflections };
        delete reflections[id];
        return { ...current, reflections };
      });
      if (!result.ok) {
        setStatus(result.message);
        return;
      }
    }
    setDraft("");
    setStatus("This response was cleared.");
  }
  return (
    <article className={s.reflection}>
      <label htmlFor={`response-${id}`}>{prompt}</label>
      <textarea
        id={`response-${id}`}
        value={text}
        maxLength={5000}
        placeholder="Make a claim, refer to the text, and explain your reasoning…"
        onChange={(event) => {
          setDraft(event.target.value);
          setStatus("");
        }}
      />
      <div className={s.wordCount}>
        <span>
          {countWords(text)} words · {text.length}/5,000 characters
        </span>
        <span>
          {dirty
            ? "Unsaved changes — save or copy before leaving."
            : saved
              ? "Saved on this device"
              : "Not saved"}
        </span>
      </div>
      <div className="actions">
        <button
          className="button button-secondary"
          disabled={!loaded || !!error || !dirty}
          onClick={save}
        >
          Save on this device
        </button>
        <CopyButton label="Copy response" text={`${prompt}\n\n${text}`} />
        <button className="text-button" onClick={clear}>
          Clear response
        </button>
      </div>
      {(error || status) && (
        <p role="status" className="status">
          {error || status}
        </p>
      )}
    </article>
  );
}
export function Reflections() {
  const [clearStatus, setClearStatus] = useState("");
  return (
    <section id="reflection" className={s.reflections}>
      <h2>Make your own argument.</h2>
      <p className="prose">
        Choose a question or explore several. Support your position with a
        moment or passage from the play. These responses are yours; they are not
        graded or submitted.
      </p>
      <p className="small muted">
        Saving is optional and stays in this browser on this device. Browser
        clearing can remove it. Copy important work elsewhere.
      </p>
      <ArgumentBuilder />
      {prompts.map((prompt) => (
        <ReflectionEditor key={prompt.id} {...prompt} />
      ))}
      <details className={s.storageSettings}>
        <summary>Manage saved activity</summary>
        <p className="small">
          This clears bookmarks, evidence notes, reading position, reading
          markers, and saved responses for this guide only. Open unsaved drafts
          remain on screen. Another tab may have newer saved work.
        </p>
        <button
          className="text-button"
          onClick={() => {
            if (
              window.confirm(
                "Clear all saved activity for this guide on this device? Copy important responses first.",
              )
            )
              setClearStatus(clearActivity().message);
          }}
        >
          Clear all saved activity
        </button>
        <p role="status" className="status">
          {clearStatus}
        </p>
      </details>
    </section>
  );
}
