"use client";
import Link from "next/link";
import { useActivity } from "./browser";
import { episodes } from "@/lib/content";
export function ResumeReading() {
  const { activity } = useActivity();
  const last = episodes.find((episode) => episode.id === activity.lastEpisode);
  if (!last) return null;
  return (
    <p className="small" style={{ marginTop: 20 }}>
      Last opened on this device:{" "}
      <Link href={`/story/#investigation-${last.id}`}>{last.title}</Link>
    </p>
  );
}
