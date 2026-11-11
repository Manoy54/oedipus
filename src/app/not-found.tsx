import Link from "next/link";
import { PageHeading } from "@/components/shell";
export default function NotFound() {
  return (
    <>
      <PageHeading
        title="A path not found."
        lead="This page is not part of the guide. Return to the story and follow the evidence from there."
      />
      <Link className="button" href="/story/">
        Explore the story
      </Link>
    </>
  );
}
