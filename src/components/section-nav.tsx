"use client";
import { useEffect, useState } from "react";
import s from "./reading.module.css";
export function SectionNav({
  items,
  title = "In this reading",
}: {
  items: { id: string; label: string }[];
  title?: string;
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -65% 0px" },
    );
    for (const item of items) {
      const target = document.getElementById(item.id);
      if (target) observer.observe(target);
    }
    return () => observer.disconnect();
  }, [items]);
  return (
    <nav className={s.contents} aria-label={title}>
      <h2>{title}</h2>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={active === item.id ? "location" : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
