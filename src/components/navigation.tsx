"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, MaskSad } from "@phosphor-icons/react";
import s from "./shell.module.css";
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
  function items() {
    return links.map(([href, name]) => (
      <Link
        key={href}
        href={href}
        aria-current={
          pathname.replace(/\/$/, "") === href.replace(/\/$/, "")
            ? "page"
            : undefined
        }
      >
        {name}
      </Link>
    ));
  }
  return (
    <header className={s.header}>
      <Link href="/" className={s.brand} aria-label="Oedipus Rex home">
        <MaskSad size={28} weight="light" />
        <span>Oedipus Rex</span>
      </Link>
      <nav className={s.desktop} aria-label="Main navigation">
        {items()}
      </nav>
      <details className={s.mobile}>
        <summary>
          <List size={23} />
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
    </header>
  );
}
