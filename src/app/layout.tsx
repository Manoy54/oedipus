import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/shell";
import { AnchorReveal } from "@/components/browser";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Oedipus Rex — A Search for Truth",
    template: "%s | Oedipus Rex",
  },
  description:
    "An interactive literary guide to Sophocles’ Oedipus Rex. Explore the story, characters, themes, and textual evidence in F. Storr’s translation.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="site-container">
          <Navigation />
          <main id="main" className="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
        <AnchorReveal />
      </body>
    </html>
  );
}
