"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react";
import { characters, episodes, themes, passages } from "@/lib/content";
import { matchesSearch } from "@/lib/search";
import s from "./reading.module.css";
import { EvidencePreview } from "./evidence-preview";
export function CharacterIndex() {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const clearForAnchor = () => setQuery("");
    window.addEventListener("hashchange", clearForAnchor);
    return () => window.removeEventListener("hashchange", clearForAnchor);
  }, []);
  const categoryOrder = [
    "Principal participant",
    "Collective voice",
    "Background figure",
  ];
  const filtered = characters
    .filter((character) =>
      matchesSearch(query, [character.name, ...character.aliases]),
    )
    .sort(
      (a, b) =>
        categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category),
    );
  function jump(id: string) {
    setQuery("");
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
        target.scrollIntoView();
      }
    });
  }
  return (
    <section aria-label="Character collection">
      <div className={s.search}>
        <div>
          <label htmlFor="character-search">Find a character</label>
          <input
            type="search"
            id="character-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a name or alternate spelling…"
          />
        </div>
        {query && (
          <button className="text-button" onClick={() => setQuery("")}>
            Clear search
          </button>
        )}
      </div>
      <p className={s.count} role="status">
        {filtered.length} {filtered.length === 1 ? "character" : "characters"} ·
        Open a profile to explore connections.
      </p>
      {!filtered.length && (
        <div className="empty-state">
          <h2>No characters match that name.</h2>
          <p>Try another spelling or clear the search.</p>
          <button
            className="button button-secondary"
            onClick={() => setQuery("")}
          >
            Show all characters
          </button>
        </div>
      )}
      {filtered.map((character, index) => (
        <Fragment key={character.id}>
          {(index === 0 ||
            filtered[index - 1].category !== character.category) && (
            <p className={s.groupLabel}>
              {character.category === "Principal participant"
                ? "Principal participants"
                : character.category === "Collective voice"
                  ? "The civic voice"
                  : "Background figures"}
            </p>
          )}
          <details className={s.profile} id={character.id}>
            <summary>
              <Image
                src={`/images/${character.id}.webp`}
                width={150}
                height={150}
                alt={`Modern vase-inspired illustration representing ${character.name}.`}
              />
              <div className={s.profileIntro}>
                <p className={s.role}>
                  {character.category} · {character.role}
                </p>
                <h2>{character.name}</h2>
                <p className={s.description}>{character.description}</p>
              </div>
              <CaretDown size={22} />
            </summary>
            <div className={s.profileBody}>
              <h3>Actions and contribution</h3>
              <p>{character.actions}</p>
              <h3>Relationships</h3>
              <ul className={s.relations}>
                {character.relationships.map((relationship) => {
                  const other = characters.find(
                    (item) => item.id === relationship.characterId,
                  );
                  return (
                    <li
                      key={`${relationship.characterId}-${relationship.label}`}
                    >
                      <a
                        href={`#${relationship.characterId}`}
                        onClick={() => jump(relationship.characterId)}
                      >
                        {other?.name}
                      </a>
                      <span>{relationship.label}</span>
                    </li>
                  );
                })}
              </ul>
              <h3>Follow the connections</h3>
              <div className={s.linkList}>
                {episodes
                  .filter((episode) =>
                    character.episodeIds.includes(episode.id),
                  )
                  .map((episode) => (
                    <Link key={episode.id} href={`/story/#${episode.id}`}>
                      {episode.title}
                    </Link>
                  ))}
                {themes
                  .filter((theme) => character.themeIds.includes(theme.id))
                  .map((theme) => (
                    <Link key={theme.id} href={`/analysis/#${theme.id}`}>
                      {theme.title}
                    </Link>
                  ))}
              </div>
              <h3>Supporting evidence</h3>
              {character.passageIds.slice(0, 1).map((id) => (
                <EvidencePreview passageId={id} key={id} />
              ))}
              <div className={s.linkList}>
                {passages
                  .filter((passage) =>
                    character.passageIds.includes(passage.id),
                  )
                  .map((passage) => (
                    <Link key={passage.id} href={`/passages/#${passage.id}`}>
                      {passage.title}
                    </Link>
                  ))}
              </div>
            </div>
          </details>
        </Fragment>
      ))}
    </section>
  );
}
