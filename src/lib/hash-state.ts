"use client";
import { useSyncExternalStore } from "react";

export function useLocationHash() {
  return useSyncExternalStore(
    (listener) => {
      window.addEventListener("hashchange", listener);
      return () => window.removeEventListener("hashchange", listener);
    },
    () => window.location.hash,
    () => "",
  );
}

export function replaceHash(hash: string) {
  window.history.replaceState(window.history.state, "", hash);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}
