# Oedipus Rex — A Search for Truth

A seven-page literary exhibition built with Next.js 16.4.6, React 19.3, TypeScript, and CSS Modules. The interface uses reviewed local content; no backend, database, account, or external runtime API is connected.

## Run locally

Verified environment: Node 24.1.0 and npm 11.4.1 on Windows. Use a currently supported Node LTS release meeting Next.js requirements.

```text
npm ci
npm run dev
```

Open http://localhost:3000. Fonts and artwork are bundled locally. No API keys or environment secrets are required. Internet is needed for the initial dependency install, not the reading interface. Original source links open external websites.

## Production preview

```text
npm run build
npm run preview
```

Open http://127.0.0.1:3100. The build exports static files into `out/`. Serve that folder over HTTP; do not open its HTML files directly or use `next start` for the exported site. A different preview port can be selected with the `PORT` environment variable. No deployment was performed.

## Checks

```text
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

The test server serves production output, so build before testing. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to an existing Chromium/headless-shell executable if using a preinstalled browser; otherwise Playwright uses its installed browser. `scripts/capture-v2.mjs` uses the same override for desktop/mobile screenshots and expanded evidence, relationship, and comparison states. Test artifacts are written to `test-results/`; current design-review captures are in `.impeccable/review-v2/`. Original iteration evidence remains in `.impeccable/review/`.

Baseline was verified before replacing the starter: lint, TypeScript, production build, and an HTTP 200 rendering. See VERIFICATION.md for final results and the rubric map.

## Content and structure

- `/`: theatrical Greek exhibition opening, guided entry, and real reading resume.
- `/story/`: eight guided episodes, authored knowledge states, three nonblocking evidence checkpoints, reading markers, and an unrestricted full-study/chronological view.
- `/characters/`: ten selectable illustrated figures, typed relationship network with an explanatory text alternative, and an alias-searchable profile index.
- `/analysis/`: five evidence-led themes with close reading and alternative interpretations, four techniques, contextual definitions, dramatic form, and eight glossary entries.
- `/passages/`: fourteen verified F. Storr excerpts, combined filters and literal highlighting, two-passage comparison, suggested pairings, attribution copying, bookmarks, and saved evidence notes.
- `/activities/`: ten-question quiz with targeted reading suggestions, keyboard-friendly ordering, an attributed argument builder, and four saved reflection prompts.
- `/about/`: origins, Sophocles and four sourced career milestones, theatre context, form, influence, source bibliography, and visual credits.

`src/content/guide.json` owns the original literary records. `src/content/discovery.json` adds reviewed guided summaries, checkpoints, close readings, four additional excerpts, comparison questions, author milestones, and quiz-topic links. `src/lib/relationships.ts` stores typed connections and their explanations. `src/lib/content.ts` is the small access boundary for a later backend provider. Keep stable IDs when changing content; validate all cross-links and quiz answers. Missing personal student information is intentionally not invented.

`PLAN.md` remains the approved specification. `DESIGN-REFERENCE.md` explains how generated route references were translated into the approved system; source text takes precedence over mockup sample copy. `design-references/v2/` preserves the new Home, Story, and Analysis compositions, their exact prompts, and translation notes. `ASSETS.md` records all artwork prompts, conversion details, and credits. Shipped images are optimized WebP; source PNGs are retained under `design-references/assets-source/`.

## Local visitor activity

Bookmarks, last deliberately selected episode, explicit reading markers, evidence notes, and saved reflections use `oedipus-guide:activity:v1` in this browser's local storage. Compatible original records gain empty note/marker fields while retaining their bookmarks and writing. Opening an episode does not mark it as read. They are not teacher submissions or synchronized accounts. Other tabs share the same browser storage; simultaneous saves can replace older text. Use Copy for important writing. Manage saved activity at the bottom of Activities. Storage failure retains open drafts and reports the error.

Quiz attempts, checkpoint answers, comparison selections, the unsaved argument-builder scaffold, and ordering answers stay in memory. Reloading resets them. Copy the assembled argument or paste it into a reflection and explicitly save it. Evidence notes appear in the Saved only passage view and require an explicit save. The answer key is visible in shipped client data because the quiz is practice, not a secure assessment.

## Deferred integration

Database selection, API endpoints, authentication, shared grades, and submitted responses are future work. No fake submission buttons or simulated server saves are present. Revisit static export and runtime hosting when the backend requirements are known.
