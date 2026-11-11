"use client";
import { useState } from "react";
import { updateActivity } from "@/lib/storage";
import { useActivity, CopyButton } from "./browser";
import s from "./comparison.module.css";
export function PassageNote({ passageId }: { passageId: string }) {
  const { activity, loaded, error } = useActivity();
  const [draft, setDraft] = useState<string | undefined>();
  const [status, setStatus] = useState("");
  const saved = activity.annotations[passageId] ?? "";
  const text = draft ?? saved;
  const dirty = draft !== undefined && draft !== saved;
  return (
    <div className={s.note}>
      <label htmlFor={`note-${passageId}`}>Your evidence note</label>
      <textarea
        id={`note-${passageId}`}
        maxLength={2000}
        value={text}
        placeholder="Why might this passage matter to your interpretation?"
        onChange={(event) => {
          setDraft(event.target.value);
          setStatus("");
        }}
      />
      <p className="small muted">
        {text.length}/2,000 characters ·{" "}
        {dirty
          ? "Unsaved changes — save or copy before leaving."
          : saved
            ? "Saved on this device"
            : "No saved note"}
      </p>
      <div className="actions">
        <button
          className="button button-secondary"
          disabled={!loaded || !!error || !dirty}
          onClick={() => {
            const result = updateActivity((current) => ({
              ...current,
              annotations: { ...current.annotations, [passageId]: text },
            }));
            setStatus(result.message);
            if (result.ok) setDraft(undefined);
          }}
        >
          Save evidence note
        </button>
        <CopyButton text={text} label="Copy note" />
      </div>
      {(status || error) && (
        <p role="status" className="status">
          {error || status}
        </p>
      )}
    </div>
  );
}
