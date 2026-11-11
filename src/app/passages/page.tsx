import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading, SpoilerNote, NextStep } from "@/components/shell";
import { PassageLibrary } from "@/components/passage-library";
export const metadata: Metadata = { title: "Passages & Evidence" };
export default function PassagesPage() {
  return (
    <>
      <PageHeading
        title="Return to the words."
        lead="Fourteen passages. Search the words, compare their contexts, and collect evidence for your interpretation."
      />
      <SpoilerNote />
      <p className="prose small muted">
        All excerpts are from Sophocles’ <i>Oedipus the King</i>, translated by
        F. Storr (1912). Scene descriptions locate passages in the linked text;
        they are not line numbers. Interpretations are editorial.{" "}
        <Link href="/about/#source-storr">Edition and citation notes</Link>.
      </p>
      <PassageLibrary />
      <NextStep
        href="/activities/"
        title="What does the evidence lead you to think?"
      >
        Check your understanding, then write an interpretation of your own.
      </NextStep>
    </>
  );
}
