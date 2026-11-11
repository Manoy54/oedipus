export const ACTIVITY_KEY = "oedipus-guide:activity:v1";
export type Reflection = { text: string; savedAt: string };
export type Activity = {
  bookmarks: string[];
  lastEpisode: string | null;
  reflections: Record<string, Reflection>;
  annotations: Record<string, string>;
  completedEpisodes: string[];
};
export const emptyActivity: Activity = {
  bookmarks: [],
  lastEpisode: null,
  reflections: {},
  annotations: {},
  completedEpisodes: [],
};
type Result = { ok: true; value: Activity } | { ok: false; message: string };
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
export function parseActivity(raw: string | null): Result {
  if (raw === null) return { ok: true, value: emptyActivity };
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return {
      ok: false,
      message:
        "Saved activity could not be read. Copy any open writing before clearing saved activity.",
    };
  }
  if (
    !isRecord(value) ||
    !Array.isArray(value.bookmarks) ||
    !value.bookmarks.every((id) => typeof id === "string") ||
    !(value.lastEpisode === null || typeof value.lastEpisode === "string") ||
    !isRecord(value.reflections)
  )
    return {
      ok: false,
      message:
        "Saved activity has an unsupported format. Reading and activities still work.",
    };
  const reflections: Record<string, Reflection> = {};
  for (const [id, entry] of Object.entries(value.reflections)) {
    if (
      !isRecord(entry) ||
      typeof entry.text !== "string" ||
      entry.text.length > 5000 ||
      typeof entry.savedAt !== "string"
    )
      return {
        ok: false,
        message:
          "A saved response has an unsupported format. Your data has not been overwritten.",
      };
    reflections[id] = { text: entry.text, savedAt: entry.savedAt };
  }
  const annotations: Record<string, string> = {};
  if (value.annotations !== undefined) {
    if (!isRecord(value.annotations))
      return {
        ok: false,
        message:
          "Saved evidence notes have an unsupported format. Your data has not been overwritten.",
      };
    for (const [id, text] of Object.entries(value.annotations)) {
      if (typeof text !== "string" || text.length > 2000 || id === "__proto__")
        return {
          ok: false,
          message:
            "A saved evidence note is invalid. Your data has not been overwritten.",
        };
      annotations[id] = text;
    }
  }
  let completedEpisodes: string[] = [];
  if (value.completedEpisodes !== undefined) {
    if (
      !Array.isArray(value.completedEpisodes) ||
      !value.completedEpisodes.every((id) => typeof id === "string")
    )
      return {
        ok: false,
        message: "Saved reading progress has an unsupported format.",
      };
    completedEpisodes = value.completedEpisodes;
  }
  return {
    ok: true,
    value: {
      bookmarks: value.bookmarks,
      lastEpisode: value.lastEpisode,
      reflections,
      annotations,
      completedEpisodes,
    },
  };
}
export function getActivitySnapshot(): string {
  try {
    return window.localStorage.getItem(ACTIVITY_KEY) ?? "null";
  } catch {
    return "unavailable";
  }
}
export function subscribeActivity(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener("oedipus-activity", listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener("oedipus-activity", listener);
  };
}
export function updateActivity(update: (value: Activity) => Activity): {
  ok: boolean;
  message: string;
} {
  try {
    const current = parseActivity(window.localStorage.getItem(ACTIVITY_KEY));
    if (!current.ok) return current;
    window.localStorage.setItem(
      ACTIVITY_KEY,
      JSON.stringify(update(current.value)),
    );
    window.dispatchEvent(new Event("oedipus-activity"));
    return { ok: true, message: "Saved on this browser and device." };
  } catch {
    return {
      ok: false,
      message:
        "Browser storage is unavailable. Keep this page open and copy your writing.",
    };
  }
}
export function clearActivity(): { ok: boolean; message: string } {
  try {
    window.localStorage.removeItem(ACTIVITY_KEY);
    window.dispatchEvent(new Event("oedipus-activity"));
    return { ok: true, message: "This guide’s saved activity was cleared." };
  } catch {
    return { ok: false, message: "Browser storage could not be cleared." };
  }
}
