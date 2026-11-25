"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import s from "@/app/home.module.css";

gsap.registerPlugin(useGSAP);

export function SphinxRelief() {
  const figure = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const image = figure.current?.querySelector("img");
      if (!image) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          paused: true,
          defaults: { ease: "power2.out" },
        });
        timeline
          .from("[data-relief]", { scale: 1.035, duration: 0.9 })
          .fromTo(
            "[data-light]",
            { xPercent: -100, opacity: 0 },
            { xPercent: 0, opacity: 0.65, duration: 0.36 },
            0,
          )
          .to("[data-light]", { xPercent: 100, opacity: 0, duration: 0.54 });
        const play = () => {
          timeline.play();
        };
        if (image.complete && image.naturalWidth > 0) play();
        else image.addEventListener("load", play, { once: true });
        return () => image.removeEventListener("load", play);
      });
      return () => media.revert();
    },
    { scope: figure },
  );

  return (
    <figure ref={figure} className={s.heroArt}>
      <picture>
        <source
          media="(max-width: 767px)"
          srcSet="/images/sphinx-relief-small.webp"
        />
        <Image
          data-relief
          src="/images/sphinx-relief.webp"
          width={1440}
          height={960}
          loading="eager"
          fetchPriority="high"
          alt="A carved relief of Oedipus facing the winged Sphinx."
        />
      </picture>
      <span data-light className={s.rakingLight} aria-hidden="true" />
      <figcaption>
        Oedipus and the Sphinx, before the play <span>· Modern relief</span>
      </figcaption>
    </figure>
  );
}
