"use client";
import * as m from "motion/react-m";
import { ExhibitionMotion } from "./exhibition-motion";
import s from "./shell.module.css";

export default function ExhibitionNavMark() {
  return (
    <ExhibitionMotion>
      <m.span
        className={s.navMark}
        layoutId="exhibition-navigation"
        aria-hidden="true"
      />
    </ExhibitionMotion>
  );
}
