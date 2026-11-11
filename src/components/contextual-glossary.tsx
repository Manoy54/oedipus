"use client";
import { useId, useState } from "react";
import { glossary } from "@/lib/content";
import s from "./evidence.module.css";

function Term({ text, definition }: { text: string; definition: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span>
      <button
        className={s.term}
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen(!open)}
      >
        {text}
      </button>
      {open && (
        <span id={id} role="note" className={s.definition}>
          {definition}
        </span>
      )}
    </span>
  );
}

export function GlossaryText({ text }: { text: string }) {
  const terms = glossary
    .filter((entry) => text.toLowerCase().includes(entry.term.toLowerCase()))
    .sort((a, b) => b.term.length - a.term.length);
  if (!terms.length) return <>{text}</>;
  const pattern = terms
    .map((entry) => entry.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "gi"));
  const seen = new Set<string>();
  return (
    <>
      {parts.map((part, index) => {
        const term = terms.find(
          (entry) => entry.term.toLowerCase() === part.toLowerCase(),
        );
        if (!term || seen.has(term.id)) return part;
        seen.add(term.id);
        return (
          <Term
            key={`${term.id}-${index}`}
            text={part}
            definition={term.definition}
          />
        );
      })}
    </>
  );
}
