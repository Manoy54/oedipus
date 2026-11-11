"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { characters, getCharacter } from "@/lib/content";
import { EvidencePreview } from "./evidence-preview";
import {
  getConnections,
  networkPositions,
  otherCharacterId,
  relationshipFilters,
  relationshipKinds,
  relationshipLabel,
  type Relationship,
  type RelationshipFilter,
} from "@/lib/relationships";
import s from "./relationships.module.css";

function characterFor(id: string) {
  const character = getCharacter(id);
  if (!character)
    throw new Error(`Relationship references an unknown character: ${id}`);
  return character;
}

function positionFor(id: string) {
  const position = networkPositions.find((item) => item.id === id);
  if (!position)
    throw new Error(`Missing relationship network position: ${id}`);
  return position;
}

function linePath(relationship: Relationship, connections: Relationship[]) {
  const start = positionFor(relationship.from);
  const end = positionFor(relationship.to);
  const parallel = connections.filter(
    (item) =>
      (item.from === relationship.from && item.to === relationship.to) ||
      (item.from === relationship.to && item.to === relationship.from),
  );
  const bend = parallel.indexOf(relationship) * 4 - (parallel.length - 1) * 2;
  return `M ${start.x} ${start.y} Q ${(start.x + end.x) / 2 + bend} ${(start.y + end.y) / 2 + bend} ${end.x} ${end.y}`;
}

function openFullProfile(id: string) {
  // A repeated anchor must also clear the index search and reopen its disclosure.
  if (window.location.hash === `#${id}`) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const profile = document.getElementById(id);
      if (profile instanceof HTMLDetailsElement) {
        profile.open = true;
        profile.querySelector("summary")?.focus({ preventScroll: true });
        profile.scrollIntoView({ block: "start" });
      }
    }),
  );
}

export function RelationshipExplorer() {
  const headingId = useId();
  const networkDescriptionId = useId();
  const [selectedId, setSelectedId] = useState("oedipus");
  const [filter, setFilter] = useState<RelationshipFilter>("all");
  const selected = characterFor(selectedId);
  const connections = getConnections(selectedId, filter);
  const connectedIds = new Set(
    connections.map((relationship) =>
      otherCharacterId(relationship, selectedId),
    ),
  );
  const connectedPeople = characters.filter((character) =>
    connectedIds.has(character.id),
  );
  const evidenceId = selected.passageIds[0];

  return (
    <section className={s.explorer} aria-labelledby={headingId}>
      <div className={s.introduction}>
        <h2 id={headingId}>Follow the relationships.</h2>
        <p>
          A family tie can be a clue. Choose a person to see how kinship, power,
          and testimony connect the investigation.
        </p>
      </div>

      <div className={s.composition}>
        <div className={s.identity}>
          <figure className={s.portrait}>
            <Image
              src={`/images/${selected.id}.webp`}
              width={640}
              height={640}
              sizes="(max-width: 640px) 300px, 340px"
              alt={`Modern vase-inspired illustration representing ${selected.name}.`}
            />
            <figcaption>Modern interpretation · {selected.category}</figcaption>
          </figure>
          <h3 className={s.selectedName}>{selected.name}</h3>
          <p className={s.selectedRole}>{selected.role}</p>
          <p className={s.selectedDescription}>{selected.description}</p>
          <a
            className={s.profileLink}
            href={`#${selected.id}`}
            onClick={() => openFullProfile(selected.id)}
          >
            Read {selected.name}&apos;s full profile
          </a>
          {evidenceId && (
            <div className={s.evidence}>
              <EvidencePreview
                passageId={evidenceId}
                label="Read supporting evidence"
              />
            </div>
          )}
        </div>

        <div className={s.connections}>
          <fieldset className={s.filters}>
            <legend>Show connections</legend>
            <div className={s.filterControls}>
              {relationshipFilters.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={s.filterButton}
                  aria-pressed={filter === option.id}
                  onClick={() => setFilter(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <p className={s.selectionStatus} role="status" aria-live="polite">
            {selected.name} · {connections.length}{" "}
            {connections.length === 1 ? "connection" : "connections"}
            {filter !== "all" &&
              ` in ${relationshipFilters.find((option) => option.id === filter)?.label.toLowerCase()}`}
          </p>
          <p className={s.networkDescription} id={networkDescriptionId}>
            <span className={s.desktopHint}>
              Lines show the selected person&apos;s direct connections.{" "}
            </span>
            Every figure is selectable. The labeled list below explains each
            relationship.
          </p>

          <div
            className={s.network}
            role="group"
            aria-label="Choose a character in the relationship network"
            aria-describedby={networkDescriptionId}
          >
            <svg
              className={s.lines}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              {connections.map((relationship) => (
                <path
                  key={`${selectedId}-${relationship.id}`}
                  d={linePath(relationship, connections)}
                  className={`${s.line} ${s[relationship.kind]}`}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            {networkPositions.map((position) => {
              const character = characterFor(position.id);
              const isSelected = character.id === selectedId;
              const isConnected = connectedIds.has(character.id);
              return (
                <button
                  key={character.id}
                  type="button"
                  className={`${s.person} ${isSelected ? s.selectedPerson : ""} ${isConnected ? s.connectedPerson : ""}`}
                  style={{ left: `${position.x}%`, top: `${position.y}%` }}
                  aria-pressed={isSelected}
                  aria-label={`Select ${character.name}`}
                  onClick={() => setSelectedId(character.id)}
                >
                  <Image
                    src={`/images/${character.id}.webp`}
                    width={48}
                    height={48}
                    alt=""
                  />
                  <span>{character.name}</span>
                </button>
              );
            })}
          </div>

          <div className={s.legend} aria-label="Relationship line types">
            {relationshipKinds.map((kind) => (
              <span key={kind.id} className={s.legendItem}>
                <svg viewBox="0 0 28 8" aria-hidden="true" focusable="false">
                  <path d="M 1 4 H 27" className={`${s.line} ${s[kind.id]}`} />
                </svg>
                {kind.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={s.textOverview}>
        <h3>Connected to {selected.name}</h3>
        <p className={s.listIntroduction}>
          Biological family, adoption, and marriage are shown separately.
          Multiple ties between two people remain visible.
        </p>
        {!connections.length ? (
          <div className={s.empty}>
            <p>
              No {filter === "family" ? "family" : filter} connection is
              recorded here for {selected.name}.
            </p>
            <button
              type="button"
              className="text-button"
              onClick={() => setFilter("all")}
            >
              Show all connections
            </button>
          </div>
        ) : (
          <ul className={s.relationshipList}>
            {connectedPeople.map((person) => (
              <li key={person.id} className={s.relationshipPerson}>
                <div className={s.personHeading}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(person.id)}
                  >
                    {person.name}
                  </button>
                  <a
                    href={`#${person.id}`}
                    onClick={() => openFullProfile(person.id)}
                  >
                    Full profile
                  </a>
                </div>
                <ul className={s.personTies}>
                  {connections
                    .filter(
                      (relationship) =>
                        otherCharacterId(relationship, selectedId) ===
                        person.id,
                    )
                    .map((relationship) => (
                      <li key={relationship.id}>
                        <p className={s.tieHeading}>
                          <strong>
                            {relationshipLabel(relationship, selectedId)}
                          </strong>
                          <span>
                            {
                              relationshipKinds.find(
                                (kind) => kind.id === relationship.kind,
                              )?.label
                            }
                          </span>
                        </p>
                        <p>{relationship.explanation}</p>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
