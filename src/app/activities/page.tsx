import type { Metadata } from "next";
import { PageHeading, SpoilerNote, NextStep } from "@/components/shell";
import { Quiz } from "@/components/quiz";
import { Reflections } from "@/components/reflections";
import { Ordering } from "@/components/ordering";
import s from "@/components/activities.module.css";
export const metadata: Metadata = { title: "Activities & Reflection" };
export default function ActivitiesPage() {
  return (
    <>
      <PageHeading
        title="Make a reading of your own."
        lead="Check your understanding, retrace the discoveries, then build an argument supported by the text."
      />
      <SpoilerNote />
      <div className={s.layout}>
        <div>
          <Quiz />
          <Ordering />
          <Reflections />
        </div>
        <nav className={s.rail} aria-label="Activities">
          <h2>Choose an activity</h2>
          <a href="#quiz">Comprehension quiz</a>
          <a href="#ordering">Arrange the investigation</a>
          <a href="#reflection">Written reflection</a>
        </nav>
      </div>
      <NextStep href="/passages/" title="Every argument begins with evidence.">
        Return to the passages to develop or challenge your interpretation.
      </NextStep>
    </>
  );
}
