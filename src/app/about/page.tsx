import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading, NextStep } from "@/components/shell";
import { contexts, sources } from "@/lib/content";
import { milestones } from "@/lib/discovery-content";
import { SectionNav } from "@/components/section-nav";
import s from "@/components/reading.module.css";
export const metadata: Metadata = { title: "Origins, Author & Sources" };
export default function AboutPage() {
  return (
    <>
      <PageHeading
        title="A myth inherited. A tragedy shaped."
        lead="Meet the work, its author, and the world of Greek theatre. Follow the sources behind this guide."
        symbol="mask"
      />
      <div className={s.readingLayout}>
        <SectionNav
          title="About sections"
          items={[
            ...contexts.map((context) => ({
              id: context.id,
              label: context.id === "sophocles" ? "Sophocles" : context.title,
            })),
            { id: "guide", label: "About this guide" },
            { id: "references", label: "References" },
            { id: "visual-credits", label: "Visual credits" },
          ]}
        />
        <div className={s.readingColumn}>
          {contexts.map((context) => (
            <article id={context.id} className={s.article} key={context.id}>
              <h2>{context.title}</h2>
              {context.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {context.id === "sophocles" && (
                <section
                  className={s.aboutFrame}
                  aria-label="Sophocles in time"
                >
                  <h3>A life in the public world.</h3>
                  <p className="small muted">
                    Historical career milestones, distinct from the mythic
                    events of the story. Approximate dates are labeled; no
                    premiere year is asserted for this play.
                  </p>
                  <ol className={s.milestones}>
                    {milestones.map((milestone) => (
                      <li key={milestone.id}>
                        <span>{milestone.date}</span>
                        <div>
                          <h3>{milestone.title}</h3>
                          <p>{milestone.description}</p>
                          <a href={`#source-${milestone.sourceId}`}>
                            Source and context
                          </a>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
              <div className={s.linkList}>
                {context.sourceIds.map((id) => (
                  <a key={id} href={`#source-${id}`}>
                    {sources.find((source) => source.id === id)?.title}
                  </a>
                ))}
              </div>
            </article>
          ))}
          <section id="guide" className={s.article}>
            <h2>About this guide.</h2>
            <p>
              <i>A Search for Truth</i> is an interactive study of one literary
              work: Sophocles’ <i>Oedipus Rex</i>, also known as{" "}
              <i>Oedipus the King</i> and <i>Oedipus Tyrannus</i>. It connects
              story, people, interpretations, and evidence, rather than treating
              a plot summary as the end of reading.
            </p>
            <p>
              Summaries and analysis are original editorial explanations, not
              quotations or claims about the student’s personal experience. The
              eight story episodes are study divisions. Passages use F. Storr’s
              1912 translation, with descriptive scene locators because line
              numbering can vary by edition.
            </p>
            <p>
              This is a frontend-only experience. The quiz runs in the browser;
              bookmarks and optional written responses stay on the current
              device. There are no accounts, shared grades, teacher submissions,
              or connected database. Browser data may be lost if it is cleared;
              copy important writing elsewhere.
            </p>
            <p>
              Use the guide to begin an argument, not to settle one. An
              interpretation should remain answerable to its textual evidence.{" "}
              <Link href="/analysis/">Explore the analysis</Link> or{" "}
              <Link href="/activities/#reflection">
                write your own response
              </Link>
              .
            </p>
          </section>
          <section id="references" className={s.article}>
            <h2>References and edition notes.</h2>
            <p className="small muted">
              Source links open in a new tab. Access dates identify the actual
              content-review date. Descriptive locators are not printed line or
              page numbers.
            </p>
            {sources.map((source) => (
              <article
                key={source.id}
                id={`source-${source.id}`}
                className={s.source}
              >
                <h3>{source.title}</h3>
                <p>
                  {source.author}
                  {"translator" in source && source.translator
                    ? ` · Translated by ${source.translator}`
                    : ""}
                </p>
                <p>{source.note}</p>
                <a href={source.url} target="_blank" rel="noreferrer">
                  Read the source
                  <span className="sr-only"> (opens a new tab)</span>
                </a>
              </article>
            ))}
          </section>
          <section id="visual-credits">
            <h2>Visual credits.</h2>
            <p>
              The Oedipus-and-Sphinx composition, ten character illustrations,
              palace threshold, theatrical mask, and sight motif were generated
              with OpenAI image generation for this project. They are modern
              interpretations inspired by Greek vase painting, not photographs
              of ancient objects, authenticated portraits, or archaeological
              reconstructions.
            </p>
            <p>
              All figures share the approved ivory, charcoal, and bronze
              palette. The Sphinx scene represents earlier mythic background; it
              is not staged as a new encounter in the play. Meanders are
              geometric ornament; the crossroads and eye are interpretive
              motifs.
            </p>
            <p>
              Libre Baskerville and Source Sans 3 are self-hosted through
              Fontsource, with their open font licenses retained in the project
              dependencies. Interface icons are from Phosphor Icons. Source
              prompts and asset provenance are documented in the project’s asset
              record.
            </p>
            <p className="small">
              <a
                href="https://artmuseum.princeton.edu/art/collections/objects/29225"
                target="_blank"
                rel="noreferrer"
              >
                Princeton’s Oedipus-and-Sphinx vessel
              </a>{" "}
              and{" "}
              <a
                href="https://collections.lacma.org/object/14695"
                target="_blank"
                rel="noreferrer"
              >
                LACMA’s Greek vase ornament documentation
              </a>{" "}
              inform the visual references; their object photographs are not
              reproduced here.
            </p>
          </section>
        </div>
      </div>
      <NextStep href="/story/" title="Return to the investigation.">
        See how the inherited myth becomes a sequence of discoveries.
      </NextStep>
    </>
  );
}
