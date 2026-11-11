"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Copy, Check } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import {
  emptyActivity,
  getActivitySnapshot,
  parseActivity,
  subscribeActivity,
} from "@/lib/storage";
export function useActivity() {
  const snapshot = useSyncExternalStore(
    subscribeActivity,
    getActivitySnapshot,
    () => "server",
  );
  const loaded = snapshot !== "server";
  if (snapshot === "unavailable")
    return {
      loaded,
      activity: emptyActivity,
      error:
        "Browser storage is unavailable. You can still read, take the quiz, and copy responses.",
    };
  const result = parseActivity(
    snapshot === "null" || !loaded ? null : snapshot,
  );
  return {
    loaded,
    activity: result.ok ? result.value : emptyActivity,
    error: result.ok ? "" : result.message,
  };
}
export function AnchorReveal() {
  const pathname = usePathname();
  useEffect(() => {
    function reveal() {
      requestAnimationFrame(() => {
        let id: string;
        try {
          id = decodeURIComponent(window.location.hash.slice(1));
        } catch {
          return;
        }
        const target = id ? document.getElementById(id) : null;
        if (!target) return;
        let parent: HTMLElement | null = target;
        while (parent) {
          if (parent instanceof HTMLDetailsElement) parent.open = true;
          parent = parent.parentElement;
        }
        target.scrollIntoView({ block: "start" });
      });
    }
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [pathname]);
  return null;
}
export function CopyButton({
  text,
  label = "Copy passage",
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied");
    } catch {
      setStatus("Copy failed. Select the text and copy it manually.");
    }
  }
  return (
    <span className="copy-control">
      <button className="text-button" onClick={copy}>
        {status === "Copied" ? <Check /> : <Copy />}
        {label}
      </button>
      <span role="status" className="copy-status">
        {status}
      </span>
    </span>
  );
}
