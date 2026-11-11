import type { Metadata } from "next";
import { PageHeading, SpoilerNote, NextStep } from "@/components/shell";
import { CharacterIndex } from "@/components/character-index";
import { RelationshipExplorer } from "@/components/relationship-explorer";
export const metadata: Metadata = { title: "Characters & Relationships" };
export default function CharactersPage() {
  return (
    <>
      <PageHeading
        title="The people behind the truth."
        lead="Rulers, witnesses, and family. Understand each role, then follow the relationships that make the discoveries matter."
      />
      <SpoilerNote />
      <RelationshipExplorer />
      <h2 id="profiles">The complete character index.</h2>
      <CharacterIndex />
      <section className="section prose">
        <h2>Read the relationships carefully.</h2>
        <p>
          Biological kinship, adoption, marriage, public office, and testimony
          connect these people in different ways. A single pair may share more
          than one relationship. Polybus and Merope are Oedipus’s adoptive
          parents; Laius and Jocasta are his biological parents. The Chorus
          represents a collective civic voice rather than a single witness.
        </p>
        <p className="small muted">
          The collection distinguishes principal participants from background
          figures. All portraits are modern interpretations, not authenticated
          likenesses.
        </p>
      </section>
      <NextStep href="/analysis/" title="From relationships to interpretation.">
        Examine how knowledge, power, and responsibility shape the tragedy.
      </NextStep>
    </>
  );
}
