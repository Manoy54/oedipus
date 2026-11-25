import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Columns } from "@phosphor-icons/react/ssr";
import { SpoilerNote, NextStep } from "@/components/shell";
import { ExhibitionMotion } from "@/components/exhibition-motion";
import { PassageLibrary } from "@/components/passage-library";
import { passages } from "@/lib/content";
import e from "@/components/exhibition.module.css";
import s from "@/components/passages.module.css";

export const metadata: Metadata = { title: "Passages & Evidence" };

export default function PassagesPage() {
  return (
    <div data-exhibition className={e.exhibition}>
      <header className={s.archiveHeader}>
        <picture className={s.archiveArt}>
          <source
            media="(max-width: 767px)"
            srcSet="/images/archive-still-life-small.webp"
          />
          <Image
            src="/images/archive-still-life.webp"
            width={1100}
            height={733}
            fetchPriority="high"
            loading="eager"
            alt=""
          />
        </picture>
        <div className={s.archiveCopy}>
          <h1>
            Return to <i>the words.</i>
          </h1>
          <p>
            Search {passages.length} passages, compare their contexts, and
            collect evidence for your interpretation.
          </p>
          <div className={s.archiveActions}>
            <a className="button" href="#browse-passages">
              Browse passages <ArrowDown size={17} />
            </a>
            <a href="#compare-passages">
              <Columns size={18} /> Compare passages
            </a>
          </div>
        </div>
      </header>
      <SpoilerNote />
      <ExhibitionMotion>
        <PassageLibrary />
      </ExhibitionMotion>
      <p className={s.edition}>
        All excerpts are from Sophocles’ <i>Oedipus the King</i>, translated by
        F. Storr (1912). Scene descriptions locate passages in the linked text.
        Interpretations are editorial.{" "}
        <Link href="/about/#source-storr">Edition and citation notes</Link>.
      </p>
      <NextStep
        href="/activities/"
        title="What does the evidence lead you to think?"
      >
        Check your understanding, then write an interpretation of your own.
      </NextStep>
    </div>
  );
}
