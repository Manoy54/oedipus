"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Meander } from "./shell";
import { List } from "@phosphor-icons/react";
import s from "./shell.module.css";
const ExhibitionNavMark = dynamic(() => import("./exhibition-nav-mark"));

const links = [
  ["/", "Home"],
  ["/story/", "Story"],
  ["/characters/", "Characters"],
  ["/analysis/", "Analysis"],
  ["/passages/", "Passages"],
  ["/activities/", "Activities"],
  ["/about/", "About"],
];
export function Navigation() {
  const pathname = usePathname();
  const route = pathname.replace(/\/$/, "");
  function items(animate = false) {
    return links.map(([href, name]) => (
      <Link
        key={href}
        href={href}
        aria-current={route === href.replace(/\/$/, "") ? "page" : undefined}
      >
        {name}
        {animate && route === href.replace(/\/$/, "") && <ExhibitionNavMark />}
      </Link>
    ));
  }
  return (
    <header className={s.header}>
      <Link href="/" className={s.brand} aria-label="Oedipus Rex home">
        <span className={s.seal}>
          <Image
            src="/images/theatrical-mask.webp"
            width={44}
            height={44}
            alt=""
          />
        </span>
        <span>
          Oedipus <i>Rex</i>
        </span>
      </Link>
      <nav className={s.desktop} aria-label="Main navigation">
        {items(true)}
      </nav>
      <details className={s.mobile}>
        <summary>
          <List size={21} weight="bold" aria-hidden="true" />
          Menu
        </summary>
        <nav
          aria-label="Mobile navigation"
          onClick={(event) => {
            if (event.target instanceof HTMLAnchorElement)
              event.currentTarget.closest("details")?.removeAttribute("open");
          }}
        >
          {items()}
        </nav>
      </details>
      <div className={s.frieze} aria-hidden="true">
        <Meander patternId="navigation-meander" />
      </div>
    </header>
  );
}
