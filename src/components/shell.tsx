import Link from "next/link";
import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import s from "./shell.module.css";
export function Meander() {
  return (
    <svg className={s.meander} width="1200" height="18" aria-hidden="true">
      <defs>
        <pattern
          id="meander"
          width="40"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 16h36V2H8v10h20V7H16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="18" fill="url(#meander)" />
    </svg>
  );
}
export function Footer() {
  return (
    <footer className={s.footer}>
      <Meander />
      <div className={s.footerRow}>
        <div>
          <Link href="/" className={s.footerTitle}>
            Oedipus Rex
          </Link>
          <p>A search for truth. A guide to Sophocles’ tragedy.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/about/#references">Sources & credits</Link>
          <Link href="/activities/#reflection">Your reflection</Link>
          <Link href="/about/#guide">About this guide</Link>
        </nav>
      </div>
      <div className={s.colophon}>
        <span>A modern literary exhibition · F. Storr translation</span>
        <span>Read closely. Question thoughtfully.</span>
      </div>
    </footer>
  );
}
export function PageHeading({
  title,
  lead,
  symbol,
}: {
  title: string;
  lead: string;
  symbol?: "eye" | "mask";
}) {
  return (
    <div className={s.pageHeading}>
      <div>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
      {symbol && (
        <div className={s.pageSymbol} aria-hidden="true">
          <Image
            src={`/images/${symbol === "eye" ? "sight-motif" : "theatrical-mask"}.webp`}
            width={140}
            height={140}
            alt=""
          />
        </div>
      )}
    </div>
  );
}
export function SpoilerNote() {
  return (
    <aside className="notice">
      <strong>Full-plot spoilers ahead.</strong> This study guide discusses the
      ending and relationships. Content includes suicide, self-inflicted injury,
      and incest; imagery remains non-graphic.
    </aside>
  );
}
export function NextStep({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={s.nextStep}>
      <div>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
      <Link className="button" href={href}>
        Continue exploring <ArrowRight size={20} />
      </Link>
    </section>
  );
}
