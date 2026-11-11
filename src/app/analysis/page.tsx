import type { Metadata } from "next";
import Link from "next/link";
import { CaretDown, MaskSad } from "@phosphor-icons/react/ssr";
import { PageHeading, SpoilerNote, NextStep } from "@/components/shell";
import { EvidencePreview } from "@/components/evidence-preview";
import { GlossaryText } from "@/components/contextual-glossary";
import { SectionNav } from "@/components/section-nav";
import {
  themes,
  techniques,
  glossary,
  getPassage,
  contexts,
} from "@/lib/content";
import { readings } from "@/lib/discovery-content";
import s from "@/components/reading.module.css";
export const metadata: Metadata = { title: "Themes & Literary Analysis" };
const sections = [
  ...themes.map((theme) => ({ id: theme.id, label: theme.title })),
  { id: "techniques", label: "Literary techniques" },
  { id: "form", label: "Dramatic construction" },
  { id: "glossary", label: "Glossary" },
];
export default function AnalysisPage() {
  return (
    <>
      <PageHeading
        title="Look beneath the story."
        lead="A claim becomes an argument when you can show how the evidence supports it."
        symbol="eye"
      />
      <SpoilerNote />
      <div className={s.readingLayout}>
        <SectionNav items={sections} />
        <div className={s.readingColumn}>
          {themes.map((theme, index) => {
            const reading = readings.find((item) => item.themeId === theme.id);
            if (!reading) throw new Error(`Missing reading ${theme.id}`);
            const evidence = getPassage(reading.closeReading.passageId);
            if (!evidence)
              throw new Error(
                `Missing evidence ${reading.closeReading.passageId}`,
              );
            const accent = index === 0 || theme.id === "sight";
            return (
              <article className={s.article} id={theme.id} key={theme.id}>
                <h2>{theme.title}</h2>
                <p className={s.question}>{theme.question}</p>
                <h3 className={s.claim}>{reading.claim}</h3>
                <p className="small muted">
                  An editorial interpretation. Test it against the words.
                </p>
                <div className={accent ? s.quotationStage : s.evidence}>
                  <blockquote>“{evidence.excerpt}”</blockquote>
                  <p>{evidence.speaker} · F. Storr translation</p>
                  <EvidencePreview
                    passageId={evidence.id}
                    inverse={accent}
                    label="Read the passage in context"
                  />
                </div>
                <h3>How the evidence works</h3>
                {reading.paragraphs.slice(0, 2).map((paragraph) => (
                  <p key={paragraph}>
                    <GlossaryText text={paragraph} />
                  </p>
                ))}
                <div className={s.closeReading}>
                  <h4>Look closely: {reading.closeReading.focus}</h4>
                  <p>
                    <GlossaryText text={reading.closeReading.explanation} />
                  </p>
                </div>
                <details className={s.deeperReading}>
                  <summary>
                    Read the fuller discussion
                    <CaretDown size={17} />
                  </summary>
                  <p>
                    <GlossaryText text={theme.discussion} />
                  </p>
                </details>
                <h3>Another reading</h3>
                <p className={s.alternative}>{theme.alternative}</p>
                <div className={s.linkList}>
                  {theme.passageIds
                    .filter((id) => id !== evidence.id)
                    .map((id) => (
                      <Link key={id} href={`/passages/#${id}`}>
                        {getPassage(id)?.title}
                      </Link>
                    ))}
                  <Link href={`/story/#${theme.episodeIds[0]}`}>
                    Return to the full study timeline
                  </Link>
                </div>
              </article>
            );
          })}
          <section className={s.article} id="techniques">
            <h2>
              <MaskSad size={30} weight="light" /> Literary techniques
            </h2>
            <p className="muted">
              Follow what each technique does to the reader’s understanding.
            </p>
            {techniques.map((technique) => (
              <article
                id={`technique-${technique.id}`}
                key={technique.id}
                className={s.technique}
              >
                <h3>{technique.title}</h3>
                <p>
                  <GlossaryText text={technique.definition} />
                </p>
                <p>{technique.example}</p>
                {technique.passageIds.slice(0, 1).map((id) => (
                  <EvidencePreview key={id} passageId={id} />
                ))}
              </article>
            ))}
            <p className="small">
              <Link href="/about/#source-poetics">
                Aristotle’s Poetics, Parts X–XI
              </Link>{" "}
              discusses recognition and reversal through Oedipus.
            </p>
          </section>
          <section className={s.article} id="form">
            <h2>Form and dramatic construction</h2>
            {contexts
              .find((context) => context.id === "form")
              ?.body.map((paragraph) => (
                <p key={paragraph}>
                  <GlossaryText text={paragraph} />
                </p>
              ))}
          </section>
          <section id="glossary">
            <h2>A reader’s glossary.</h2>
            <div className={s.glossary}>
              {glossary.map((entry) => (
                <details id={entry.id} key={entry.id}>
                  <summary>
                    {entry.term}
                    <CaretDown size={18} />
                  </summary>
                  <p>{entry.definition}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
      <NextStep href="/passages/" title="Read two pieces of evidence together.">
        Compare speakers, context, and the knowledge available in each moment.
      </NextStep>
    </>
  );
}
