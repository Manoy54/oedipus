"use client";
import { useRef, useState } from "react";
import { ArrowUp, ArrowDown } from "@phosphor-icons/react";
import { episodes } from "@/lib/content";
import { moveItem } from "@/lib/activities";
import s from "./activities.module.css";
const correctOrder = [
  "investigation",
  "accusation",
  "memories",
  "corinth",
  "recognition",
];
const startingOrder = [
  "corinth",
  "memories",
  "recognition",
  "investigation",
  "accusation",
];
export function Ordering() {
  const [order, setOrder] = useState(startingOrder);
  const [status, setStatus] = useState("");
  const [checked, setChecked] = useState(false);
  const list = useRef<HTMLOListElement>(null);
  function move(index: number, direction: -1 | 1) {
    const id = order[index];
    setOrder(moveItem(order, index, direction));
    setChecked(false);
    setStatus(
      `${episodes.find((episode) => episode.id === id)?.title} moved to position ${index + direction + 1}.`,
    );
    requestAnimationFrame(() =>
      list.current
        ?.querySelector<HTMLButtonElement>(
          `[data-event="${id}"] button:not(:disabled)`,
        )
        ?.focus(),
    );
  }
  return (
    <section id="ordering" className={s.ordering}>
      <h2>Arrange the investigation.</h2>
      <p>
        Place these five developments in their{" "}
        <strong>order of revelation during the play</strong>, not the order of
        Oedipus’s life. Move items with the buttons, then check your sequence.
      </p>
      <ol ref={list} className={s.orderList}>
        {order.map((id, index) => (
          <li key={id} data-event={id}>
            <span>{episodes.find((episode) => episode.id === id)?.title}</span>
            <div>
              <button
                aria-label={`Move ${episodes.find((episode) => episode.id === id)?.title} up`}
                disabled={index === 0}
                onClick={() => move(index, -1)}
              >
                <ArrowUp size={18} />
              </button>
              <button
                aria-label={`Move ${episodes.find((episode) => episode.id === id)?.title} down`}
                disabled={index === order.length - 1}
                onClick={() => move(index, 1)}
              >
                <ArrowDown size={18} />
              </button>
            </div>
          </li>
        ))}
      </ol>
      <div className="actions">
        <button
          className="button button-secondary"
          onClick={() => {
            setChecked(true);
            setStatus(
              order.every((id, index) => id === correctOrder[index])
                ? "Correct. The clues lead from the public inquiry to recognition."
                : "Not quite. Compare your sequence with the explanation below.",
            );
          }}
        >
          Check sequence
        </button>
        <button
          className="text-button"
          onClick={() => {
            setOrder(startingOrder);
            setChecked(false);
            setStatus("Sequence reset.");
          }}
        >
          Retry ordering
        </button>
      </div>
      <p role="status" className="status">
        {status}
      </p>
      {checked && (
        <div className={s.feedback}>
          <h3>The order of discovery</h3>
          <ol>
            {correctOrder.map((id) => (
              <li key={id}>
                {episodes.find((episode) => episode.id === id)?.title}
              </li>
            ))}
          </ol>
          <p>
            The inquiry begins publicly, meets Tiresias’s accusation, turns to
            Jocasta’s memories, and receives new information from Corinth. The
            shepherd then confirms the identity connecting those clues.
          </p>
        </div>
      )}
    </section>
  );
}
