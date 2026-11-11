import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { ResumeReading } from "@/components/resume-reading";
import { Meander } from "@/components/shell";
import { getPassage } from "@/lib/content";
import s from "./home.module.css";
const paths = [
  {
    href: "/story/",
    title: "Follow the investigation",
    text: "Eight moments of discovery. See how each claim changes what can be known.",
    label: "Begin with the story",
  },
  {
    href: "/characters/",
    title: "Trace the connections",
    text: "Explore the people of Thebes and the ties between family, power, and testimony.",
    label: "Meet the characters",
  },
  {
    href: "/analysis/",
    title: "Build an interpretation",
    text: "Connect a claim to evidence, close reading, and a different way of seeing.",
    label: "Look beneath the story",
  },
  {
    href: "/activities/",
    title: "Make your own argument",
    text: "Weigh what you have learned, compare passages, and write a supported response.",
    label: "Activities and reflection",
  },
];
export default function Home() {
  const passage = getPassage("shared-burden");
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <h1>
              Oedipus <br />
              Rex
            </h1>
            <div className={s.invitation}>
              <p className={s.subtitle}>A search for truth.</p>
              <p className={s.lead}>
                Follow the clues. Examine the evidence. Discover how a search
                for truth becomes a search for identity.
              </p>
              <div className="actions">
                <Link className="button" href="/story/">
                  Begin the investigation
                  <ArrowRight size={18} />
                </Link>
                <Link href="/story/#study">Explore the study guide</Link>
              </div>
            </div>
          </div>
          <figure className={s.heroArt}>
            <Image
              src="/images/oedipus-sphinx.webp"
              width={1536}
              height={1024}
              priority
              alt="Oedipus faces the winged Sphinx in a modern Greek vase-inspired illustration."
              sizes="(max-width:767px) 100vw, 65vw"
            />
            <figcaption>
              Oedipus and the Sphinx · A modern interpretation
            </figcaption>
          </figure>
        </div>
        <Meander />
      </section>
      <dl className={s.facts}>
        <div>
          <dt>Author</dt>
          <dd>
            <Link href="/about/#sophocles">Sophocles</Link>
          </dd>
        </div>
        <div>
          <dt>Literary form</dt>
          <dd>Greek tragedy</dd>
        </div>
        <div>
          <dt>Setting</dt>
          <dd>Thebes</dd>
        </div>
        <div>
          <dt>Translation</dt>
          <dd>F. Storr · 1912</dd>
        </div>
      </dl>
      <ResumeReading />
      <section className={s.introduction}>
        <div>
          <h2>
            Every answer changes
            <br />
            the question.
          </h2>
          <p>
            Thebes turns to its king for help. A city is suffering, and Oedipus
            promises to find the cause. Witnesses speak, memories return, and
            reassuring news begins to unsettle what everyone believes.
          </p>
          <p>
            This guide follows that process of discovery. Read the investigation
            in sequence, pause over a claim, and listen to the evidence before
            moving on. You can always step into the complete study guide to
            explore the play’s characters, language, and interpretations.
          </p>
          <p>
            The questions reach beyond the mystery: what does a ruler owe a
            community, how far should a person pursue knowledge, and how should
            responsibility be judged when understanding arrives too late? Follow
            the clues, then develop your own reading.
          </p>
        </div>
        <aside>
          <Image
            src="/images/theatrical-mask.webp"
            width={150}
            height={150}
            alt=""
          />
          <h3>A myth becomes a play.</h3>
          <p>
            Sophocles reshaped an inherited story for a public audience.
            Discover the origins, the author, and the world of Greek theatre.
          </p>
          <Link href="/about/#origins">
            Enter the world of the work
            <ArrowRight size={18} />
          </Link>
        </aside>
      </section>
      {passage && (
        <section className={s.quoteStage}>
          <h2>The inquiry begins with a promise.</h2>
          <blockquote>“{passage.excerpt}”</blockquote>
          <p>{passage.speaker} · F. Storr translation</p>
          <Link href={`/passages/#${passage.id}`}>
            Read the passage in context
            <ArrowRight size={18} />
          </Link>
        </section>
      )}
      <section className={s.explore}>
        <h2>Find your way through the truth.</h2>
        <div className={s.pathGrid}>
          {paths.map((path) => (
            <Link className={s.path} key={path.href} href={path.href}>
              <div>
                <h3>{path.title}</h3>
                <p>{path.text}</p>
                <span>{path.label}</span>
              </div>
              <ArrowRight size={25} />
            </Link>
          ))}
        </div>
        <p className={s.evidenceLink}>
          Already have a question?{" "}
          <Link href="/passages/">
            Search the passages and compare the evidence.
          </Link>
        </p>
      </section>
      <aside className={s.before}>
        <h2>Before you begin</h2>
        <p>
          The guided path reveals information as you select episodes. Full study
          pages discuss the ending and relationships. The play includes suicide,
          self-inflicted injury, and incest; all artwork is non-graphic.
        </p>
        <Link href="/about/#references">Sources and editorial notes</Link>
      </aside>
    </>
  );
}
