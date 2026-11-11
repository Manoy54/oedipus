import type { Metadata } from "next";
import { PageHeading } from "@/components/shell";
import { GuidedInvestigation } from "@/components/guided-investigation";
import { episodes } from "@/lib/content";
export const metadata: Metadata = { title: "The Investigation" };
export default function StoryPage() {
  return (
    <>
      <div className="compact-intro">
        <PageHeading
          title="The investigation."
          lead="Follow the clues. Separate what is believed from what can be established."
        />
      </div>
      <GuidedInvestigation />
      <noscript>
        <section className="section prose">
          <h2>Full story study · spoilers</h2>
          <p>
            The interactive investigation needs JavaScript. You can read the
            eight study summaries here.
          </p>
          {episodes.map((episode) => (
            <article key={episode.id}>
              <h3>{episode.title}</h3>
              <p>{episode.summary}</p>
            </article>
          ))}
        </section>
      </noscript>
    </>
  );
}
