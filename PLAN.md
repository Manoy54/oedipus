# Oedipus Rex: A Search for Truth

> Revised project plan — 11 November 2026, Asia/Manila.
> Status: the frontend has been implemented locally after verifying the Next.js starter. Build, test, and review evidence is recorded in VERIFICATION.md. Backend/database integration and publication remain deferred.
> Second iteration: the user approved implementation of Section 13 with guided discovery leading the experience and a more pronounced Greek exhibition aesthetic. The frontend now implements phases V, A, B, and C; verification and review evidence are recorded in VERIFICATION.md. The existing palette and typography remain authoritative.
> Confirmed: build the interface only for now; integrate the backend and database later. Feature Oedipus Rex; use Next.js; install and verify Next.js before building the website. Author substantive literary content from the play and reliable historical sources. Grading: Data/Information 50%, Creativity 10%, Informativeness 30%, Interactivity 10%. The user has approved the contemporary literary exhibition theme, palette, typography, and Greek figures, backgrounds, and symbols in Section 10; apply that visual system across all seven routes.

## 1. Project brief

Create an interactive literary study guide that helps students understand how Sophocles turns an investigation into a discovery of identity. Readers should move between story episodes, characters, interpretations, and textual evidence without losing their place.

The audience is students studying the play and the teacher assessing the project. The primary task is reading and understanding; activities support that purpose. The signature interaction compares when events happened with when the play reveals information about them.

Working title: **Oedipus Rex: A Search for Truth**. Retain the proposed seven-page structure. The warm literary exhibition direction and Greek visual language are user-approved design decisions, rather than teacher requirements. Section 10 is the authoritative visual specification.

### Learning outcomes

A visitor should be able to:

1. Explain the central conflict and major developments.
2. Identify important characters and distinguish their relationships.
3. Compare chronological events with the order of revelation.
4. Support a thematic interpretation with cited evidence.
5. Recognize dramatic irony, foreshadowing, recognition, and reversal.
6. Write a supported personal response.

### Improvements over the previous proposal

- Install and verify Next.js before custom website implementation.
- Separate the complete first release from optional enhancements.
- Give each page a route, content requirements, and observable completion criteria.
- Model historical events separately from episodes and revelations.
- Define a frontend-only Next.js implementation, local literary content, and a narrow future integration boundary.
- Include quotation review, storage failures, accessibility, and production verification in acceptance.

## 2. Decisions, assumptions, and requirements

| Topic | Decision or assumption | What changes the plan |
|---|---|---|
| Work | Oedipus Rex by Sophocles; one-work guide | User changes the featured-work scope |
| Framework | Next.js, TypeScript, App Router | Confirmed user choice |
| Sequence | Scaffold, install, verify starter, then build website | Confirmed user preference |
| Pages | Seven routes below | Rubric or deadline requires a smaller submission |
| Delivery scope | Interface only in this phase; backend and database are deferred | User explicitly starts the integration phase |
| Content | Original, sourced literary copy in reviewed local JSON | Later integration changes the content provider |
| Visitor activity | In-memory interaction; optional on-device storage only | Future backend scope defines shared persistence |
| Rendering | Static export for the interface phase, with focused Client Components | Revisit deployment when backend integration starts |
| Main text | Recommend F. Storr unless a class edition is supplied | Assigned translation takes precedence |
| Styling | CSS Modules and global tokens | Existing project conventions take precedence |
| Visual system | Approved literary exhibition theme, six-color palette, typography, and Greek art direction in Section 10 | User requests a design change; accessibility fixes preserve the approved identity |
| Hosting | Local preview and static production package for now | User selects hosting or later runtime integration |
| Quiz | Browser-side comprehension practice; no submitted grades | Later integration explicitly adds submissions |

The user has confirmed the current phase is purely interface work. Backend selection, relational tables, API endpoints, authentication, and shared submissions are deferred and do not block the frontend. The supplied grading rubric does not itself specify a database technology or additional literary works; do not infer either requirement from its category names.

Deadline, citation style, group details, submission format, and hosting restrictions remain unknown. They do not block the interface phase. Use consistent source attribution and provide a local preview/build package; adapt the final submission format when supplied.

The interface phase has no backend services, database installation, ORM, API routes, Server Actions, login, admin dashboard, CMS, shared grades, analytics, or runtime content-generation service. Literary copy may be authored for the site from the play and verified references. Personal experiences, names, and reasons for choosing the work must come from the student; these are optional additions rather than blockers for a complete literary interface. Implementation was subsequently authorized in this conversation. Publication has not been requested.

### Grading rubric and delivery priorities

The teacher-supplied weights are:

| Category | Weight | Evidence the interface should provide |
|---|---|---|
| Data/Information | 50% | Accurate, substantive, organized material about the story, origins, author, characters, context, literary form, themes, and passages; traceable sources |
| Creativity | 10% | The approved Greek literary exhibition identity, coherent artwork, and the meaningful contrast between occurrence and revelation |
| Informativeness | 30% | Clear explanations of why events, quotations, and techniques matter; useful context, connected examples, glossary, and readable progression |
| Interactivity | 10% | Working timeline comparison, character search, passage filters, quiz feedback/retry, reflection editing/copy, and cross-links |

Data/Information and Informativeness account for 80% combined. Complete and review the literary material before spending time on optional visual effects, extra artwork variants, or saved-state enhancements. The interpretation of each category above is an implementation guide, not an additional teacher-provided sub-rubric or a promised score.

For internal review, check both substance and explanation: information must be accurate and well organized, while explanations must help readers understand its significance. A large volume of disconnected text is insufficient. Match each rubric category to concrete pages and demonstrate the relevant interactions locally; a database connection is not necessary for the current interface phase.

## 3. Release scope

### First release: complete frontend experience

| Area | Required scope |
|---|---|
| Reading | Seven routes, consistent navigation, working cross-links |
| Literary context | Origins, Sophocles, Greek theatre context, literary form, and influence, with sources |
| Story | Eight episodes, expand/collapse, chronological comparison |
| Characters | Ten initial profiles, name/alias search, relationship list |
| Analysis | Five themes, four techniques, approximately eight glossary terms |
| Evidence | Approximately ten verified passages; keyword, speaker, and theme filters |
| Quiz | Ten questions; feedback, evidence links, final review, retry |
| Reflection | Four prompts; plain-text editors, word count, copy action |
| Sources | Main edition, historical/literary references, editorial attribution, visual credits |
| Visual identity | Shared approved tokens, Sphinx artwork, vase-inspired character figures, and page-specific Greek motifs |
| Quality | Keyboard access, responsive layouts, content validation, production checks |

### Enhancements after the core works

Add bookmarks, resume-reading, reflection saving, a saved-passages view, and the five-item ordering activity after the first release meets its checks. This preserves the original feature set without making persistence a prerequisite for a readable, assessable site.

Later options: relationship diagram, side-by-side evidence comparison, and print-friendly study sheet.

Backend/database integration is a later phase and is not a frontend acceptance requirement. Prioritize complete, accurate information and its explanation before enhancements. Counts are planning targets, not teacher-supplied scoring thresholds.

## 4. Navigation and reading flow

| Route | Label | Main visitor question |
|---|---|---|
| `/` | Home | What is this guide and where do I begin? |
| `/story/` | Story | What happens, and how is the truth revealed? |
| `/characters/` | Characters | Who is involved and how are they connected? |
| `/analysis/` | Analysis | What interpretations does the evidence support? |
| `/passages/` | Passages | Where is the textual evidence? |
| `/activities/` | Activities | What do I understand and what do I think? |
| `/about/` | About & Sources | Where does the work come from, who wrote it, and what supports this guide? |

Guided path: Home → Story → Characters → Analysis → Passages → Activities. About & Sources remains directly accessible in navigation and the footer.

Every page has a descriptive title, one primary heading, active navigation, a skip link, and a contextual next step. Mobile navigation uses an ordinary expandable menu with a visible label and keyboard support.

Use stable content anchors, such as `/story/#recognition`, `/characters/#jocasta`, and `/passages/#passage-truth-01`. Opening an anchored item reveals its content, preserves a visible heading, and avoids hiding the target behind a fixed header. Test direct loads and client navigation.

### Spoiler policy

Home introduces the investigation without disclosing the central revelation. Detailed story, relationships, analysis, passages, and activities carry a full-plot notice before their main content. This is a study resource; there is no global spoiler-toggle system in the first release.

Include a concise content note for suicide, self-inflicted injury, family violence, and incest. Keep imagery suitable for school use.

## 5. Page requirements

### 5.1 Home

**Purpose:** establish the work and give visitors an immediate starting point.

Content, in order:

- Title, short descriptor, and a question introducing the search for truth.
- Primary action: **Explore the story**. Secondary link: **Meet the characters**.
- Work at a glance: author, form, setting, selected translator.
- A 100–150-word original editorial introduction derived from the play.
- A short context preview linking to /about/#origins and /about/#sophocles for origins and author information.
- Distinct previews of Story, Characters, Analysis, Passages, and Activities.
- Spoiler/content guidance and access to sources.

Use the approved Oedipus-and-Sphinx illustration as the opening artwork, following Section 10. At 1366 × 768, the title, descriptor, and primary action should be visible without scrolling. On phones, content order and the starting action take priority over image height.

Optional resume-reading shows the last deliberately opened episode, not a fabricated completion percentage.

**Done when:** a first-time visitor can identify the work and begin reading without navigating through promotional sections.

### 5.2 Story and Timeline

**Purpose:** explain developments and the timing of discoveries.

Provide a short synopsis and these editorial episodes:

| Order | Episode | Focus |
|---|---|---|
| 1 | A City in Crisis | The citizens' appeal and public emergency |
| 2 | The Investigation Begins | Creon's report and the search for Laius's killer |
| 3 | A Difficult Accusation | The confrontation with Tiresias |
| 4 | Suspicion and Authority | Oedipus's conflict with Creon |
| 5 | Memories Become Evidence | Jocasta's account and the crossroads |
| 6 | News from Corinth | The messenger's disclosures |
| 7 | Recognition | The shepherd's testimony |
| 8 | The Aftermath | Consequences of discovery and the ending |

These are website divisions, not claims about the play's formal acts or episodes. Review each summary against the chosen text.

Each episode contains a 100–160-word summary, characters, new information, significance, one evidence link, and an optional discussion question. Support individual expansion and **Expand all / Collapse all**. Summaries remain available in the rendered page.

#### Two timeline views

- **During the investigation:** eight episodes in dramatic order, showing what is stated, suspected, or confirmed.
- **Earlier events and aftermath:** underlying events in chronological order, linked to episodes that recall or establish them.

The views show different kinds of records. One episode can reveal several historical events; one event can be discussed repeatedly. Avoid invented dates; use reviewed relative ordering and label genuine uncertainty.

A revelation record identifies who learns or claims what and whether it is accusation, recollection, testimony, or confirmation. First mention is not automatically the moment meaning becomes known.

**Done when:** visitors can follow at least three earlier events to episodes that reveal their significance, and the views differ in content as well as ordering.

### 5.3 Characters and Relationships

**Purpose:** explain roles and relationships without requiring a complex diagram.

Initial profiles: Oedipus, Jocasta, Creon, Tiresias, Laius, Polybus, Merope, the Corinthian messenger, Laius's shepherd, and the Chorus. Distinguish onstage participants, background figures, and the collective Chorus. Include supporting speakers where needed; ten profiles is a target, not a restriction on accurate attribution.

Search names and aliases, including edition-specific variants such as Tiresias/Teiresias. Trim surrounding spaces, collapse repeated spaces, and ignore capitalization. Show result count and a useful empty state.

Each profile includes role, description, actions, relationships, themes, episodes, and evidence. Distinguish biological, adoptive, marital, political, and investigative connections. Make direction explicit and retain multiple connections between a pair where appropriate.

Use a list with expandable details and a labeled relationship overview. An optional graph must never be the only way to obtain information.

**Done when:** all initial profiles are searchable and each relationship names its type and links to the other profile where available.

### 5.4 Themes and Literary Analysis

**Purpose:** develop claims through close reading.

Five discussions:

1. Fate and free will.
2. Truth and knowledge.
3. Sight and blindness.
4. Pride and the limits of authority.
5. Identity and responsibility.

Each contains a 180–250-word discussion, a specific textual moment, a passage link, an explanation connecting evidence to claim, and a question. Include an alternative reading when it meaningfully changes the argument. Label interpretation as editorial literary analysis; do not attribute it to the student unless they have authored or adopted it.

Explain dramatic irony, foreshadowing, recognition, and reversal with a verified example each. Include approximately eight glossary terms; explain the interpretive range of hamartia rather than automatically equating it with pride.

Use a reading column and section links. Evidence opens through ordinary passage links; a side panel is optional.

**Done when:** every main theme and technique has an identifiable example and evidence; no discussion consists only of definitions or plot summary.

### 5.5 Passages and Evidence

**Purpose:** make evidence discoverable and traceable.

State the translation and citation method above the collection. Each of approximately ten short entries has:

- Stable ID and editorial title.
- Exact excerpt, speaker, source/edition, and translator.
- Verified line/page reference when available; otherwise a descriptive locator and source link.
- Context, brief interpretation, theme links, and episode links.

Do not invent line numbers or use browser page positions as printed page references.

Search covers title, excerpt, and context. Keyword, speaker selection, and theme selection combine with AND. Provide **Clear filters** and a visible result count. Empty search and filters show all entries.

**Copy passage** includes excerpt, speaker, translator, locator, and source URL. Clipboard failure leaves selectable text available and reports the problem. Optional bookmarks add **Saved only** and a browser-storage explanation.

**Done when:** known searches return expected entries, combined filters work, and every excerpt is traceable to its source.

### 5.6 Activities and Reflection

**Purpose:** distinguish comprehension checks from interpretation.

#### Quiz

Ten fixed questions: four story, three character, and three theme/technique questions. Each has one defensible correct answer, explanation, and reading/evidence links. Opinions are not auto-scored.

Flow: select answer → submit → explanation → next question → score and review. Show progress. Submission locks the answer; repeated clicks cannot add points. An unanswered submission gives a visible prompt. **Retry quiz** starts clean. Attempts stay in memory; explain that reloading starts again.

The answer key ships to the browser. This is practice, not a secure exam or verified grade submission.

#### Reflection

Four prompts address truth-seeking, responsibility, leadership, and a chosen theme. Provide a labeled plain-text editor per prompt, word count, and copy action. Count whitespace-separated words, with empty input counting as zero. Initially limit each response to 5,000 characters and show that limit.

Optional saving uses **Save on this device**, **Copy**, and **Clear**. Distinguish unsaved changes from a successful save. Confirm before clearing nonempty writing. Retain text and offer copying if saving fails. No grading or teacher submission.

#### Optional ordering activity

Arrange five reviewed developments in order of revelation. Use **Move up / Move down**; dragging is unnecessary. Retain focus on the moved item, announce position, and explain the correct sequence after checking. Retry resets the activity.

**Done when:** quiz, feedback, retry, and reflection-copy paths work by keyboard. Optional features pass their own checks before inclusion.

### 5.7 About the Work, Author, and Sources

**Purpose:** explain the work's origins, authorship, cultural context, and evidence.

Sections, in order:

1. **Origins of the story** (`#origins`): distinguish the inherited Oedipus myth from Sophocles' dramatic treatment. Explain its relationship to Thebes and the wider Theban tradition without claiming that Sophocles invented the myth.
2. **Sophocles** (`#sophocles`): a concise, sourced author profile covering biographical context, dramatic work, and literary contribution. Verify dates and historical claims rather than deriving them from the plot.
3. **The work in context**: distinguish mythical narrative setting from the historical culture of Greek theatre. Explain the Chorus, dramatic presentation, and the relevance of civic crisis and inquiry.
4. **Literary form and lasting interest**: explain why the work is studied as tragedy and how its structure, questions, and influence support further reading. Source reception claims and separate later interpretations from the play itself.
5. **About this guide**: purpose, editorial approach, main translation, and frontend-only limitations.
6. **References and visual credits**: complete attribution for literary facts, quotations, and shipped artwork.

Write substantive original explanatory copy, with approximately 150–250 words each for origins, author, and theatre context as an initial sizing guide. Keep individual sections readable and link to Story, Analysis, and Passages rather than repeating their full discussions.

A first-person project reflection, reasons for choosing the work, and student/group details are optional until supplied. Do not invent them or leave fabricated personal claims in the interface. Visitor activity responses remain separate from project authorship.

Use consistent bibliographic attribution until a teacher-mandated citation style is supplied. Record actual access dates. Image credits identify creator, origin, usage terms, and modern interpretations.

**Done when:** origins, author, and context sections contain substantive sourced content; every quotation and shipped image has attribution; cross-links work; personal claims appear only when supplied.

## 6. Literary content and review

### Content authorship and coverage

The assistant may author original summaries, explanatory copy, character descriptions, analysis, glossary definitions, and comprehension questions based on the play and verified references. Use real, publication-ready literary content rather than lorem ipsum, generic filler, invented excerpts, or empty sections. This is content preparation, not a runtime AI feature.

| Content area | Coverage | Main placement |
|---|---|---|
| Work overview | Titles, author, genre, setting, central conflict, and selected edition | Home |
| Story | Synopsis, earlier background, eight dramatic episodes, aftermath, and two timeline views | Story |
| Origins | Mythic tradition, Theban setting, and distinction between inherited story and authored play | About; short Home preview |
| Author | Verified account of Sophocles and his dramatic contribution | About; brief Home metadata |
| Historical/cultural context | Greek theatre, performance, Chorus, and distinction between narrative and production settings | About; links from Analysis |
| Characters | Roles, relationships, choices, and contribution to the investigation | Characters |
| Literary form | Tragedy, plot construction, Chorus, dialogue, imagery, and symbols | Analysis; context introduction in About |
| Themes and techniques | Five themes, four principal techniques, evidence, and alternative readings | Analysis |
| Textual evidence | Verified excerpts, context, attribution, and explanation | Passages |
| Significance and influence | Why the work remains studied; sourced examples of reception or influence | About; concluding Analysis links |
| Learning activities | Questions, explanations, discussion prompts, glossary, and reflection tasks grounded in site content | Activities; inline glossary links |

Do not infer author biography, performance history, or influence solely from the story. Verify those topics against reliable scholarly, museum, library, or primary historical sources while preparing the copy. If the date of first performance or another historical detail is uncertain, label the uncertainty rather than asserting a precise unsupported date.

Add a concise **Form and dramatic construction** discussion to Analysis addressing the Chorus, dialogue, plot structure, and recurring imagery. Keep these distinct from the four technique definitions. Broader literary interpretations should identify their textual basis and allow supported disagreement.

### Editorial rules

Use the assigned edition if supplied; otherwise adopt one main translation and record it in source data. F. Storr is available in [Project Gutenberg's collection](https://www.gutenberg.org/cache/epub/31/pg31-images.html). It contains other plays, so restrict extraction to Oedipus the King.

Separate quotation, paraphrase, plot fact, and interpretation. Preserve the distinction between historical occurrence, reported testimony, and recognition. Review the ending against the selected text, including whether requested exile is completed onstage. Keep later events from other Theban plays outside this synopsis.

Avoid reducing responsibility or hamartia to one moral about pride. Support claims and allow reasoned disagreement. Consult [Aristotle's Poetics](https://classics.mit.edu/Aristotle/poetics.1.1.html), especially Parts X–XI, when developing recognition and reversal.

### Content workflow

1. Record the edition and citation convention.
2. Inventory planned records and stable IDs.
3. Draft episodes, profiles, themes, and questions.
4. Select short excerpts; verify transcription, speaker, context, and locator directly against the edition.
5. Validate links, IDs, ordering, and answer keys.
6. Have the student review interpretations and personal contributions.

Mark draft records internally. Only reviewed records enter the release dataset. Structural validation cannot certify literary accuracy; retain a simple editorial review checklist.

Every episode links to evidence; every main theme links to a passage; every quiz question links to an explanation. Every passage has a source. Author biography, historical context, and reception claims also require appropriate references. Profiles can share evidence where justified. Select passages for coverage rather than merely reaching a count.

## 7. Content model

Keep literary content separate from visitor activity. Use stable string IDs and resolve references through a small content access module. Avoid repeating excerpts across pages.

| Collection | Important fields |
|---|---|
| Work | ID, titles, author, form, setting, introduction, mainSourceId |
| Author profile | ID, name, biography, literary contribution, sourceIds |
| Context sections | ID, topic, body, related content IDs, sourceIds |
| Sources | ID, author, title, translator, edition details, URL, citation metadata |
| Characters | ID, name, aliases, role, participation category, description, themeIds |
| Relationships | ID, fromCharacterId, toCharacterId, type, explanation, passageIds |
| Episodes | ID, title, dramaticOrder, summary, characterIds, passageIds, significance |
| Historical events | ID, title, chronologicalOrder, summary, characterIds, passageIds |
| Revelations | ID, episodeId, eventId, sequenceWithinEpisode, claim, speakerId, informedCharacterIds, evidenceStatus, passageIds |
| Themes | ID, title, discussion, question, passageIds, episodeIds |
| Techniques | ID, title, definition, example, passageIds, episodeIds |
| Passages | ID, title, excerpt, speakerLabel, optional characterId, sourceId, locator, context, analysis, themeIds, episodeIds |
| Quiz questions | ID, category, prompt, choices with IDs, correctChoiceId, explanation, evidence links |
| Glossary | ID, term, definition, related content IDs |
| Reflection prompts | ID, prompt, optional suggested evidence IDs |
| Visual credits | ID, asset path, creator, origin URL, usage information, description |

### Timeline example

An earlier crossroads encounter is a historical event. One episode recalling details and another confirming identity can both have revelation links to it. Store the occurrence once; store claims and discoveries separately. Display only relationships supported by the reviewed text.

### Validation before release

Check required fields, unique IDs, valid cross-references, reviewed status, explicit timeline ordering, question choices, and exactly one valid correct answer per question. Required source omissions and dangling links fail validation; they must not silently disappear. Preserve speaker labels when full profiles do not exist.

## 8. Next.js implementation plan

### Architecture choice

Use Next.js, React, TypeScript, and App Router. Keep pages and layouts as Server Components and limit Client Components to interaction and browser APIs. In static export mode, Server Components run at build time. See the [Next.js component model](https://nextjs.org/docs/app/getting-started/server-and-client-components) and [static-export guidance](https://nextjs.org/docs/app/guides/static-exports).

Import reviewed JSON through the content module. No client fetch or API route is needed just to load bundled content. Pass small relevant datasets to interactive components. Render reading content in initial HTML so it remains useful before hydration.

Choose CSS Modules plus global tokens over a component framework: this interface needs a small set of consistent controls. Reuse conventions if an existing app is found later. Use local component state; the scope does not justify a global state library.

### Suggested structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    not-found.tsx
    story/page.tsx
    characters/page.tsx
    analysis/page.tsx
    passages/page.tsx
    activities/page.tsx
    about/page.tsx
  components/
    layout/
    story/
    characters/
    passages/
    activities/
    ui/
  content/
    work.json
    author.json
    context.json
    sources.json
    characters.json
    relationships.json
    episodes.json
    events.json
    revelations.json
    themes.json
    techniques.json
    passages.json
    questions.json
    glossary.json
    reflection-prompts.json
    visual-credits.json
  lib/
    content/
    search.ts
    quiz.ts
    storage.ts
public/
  images/
  fonts/
```

This maps responsibilities; create files as features need them. Keep route files focused on composition and metadata. Keep filtering, content validation, and scoring independently testable.

### Rendering and export constraints

Use `output: 'export'`; production artifacts go to `out/`. Prefer trailing-slash directory routes when supported by the host. Verify direct loads and unknown-route behavior on the actual host.

Static export has no runtime mutation endpoint. Use appropriately sized local images; built-in server image optimization needs an export-compatible alternative, such as unoptimized images. Confirm font usage terms. Follow [Next.js static-export constraints](https://nextjs.org/docs/app/guides/static-exports).

Use stable hash links for content items. Filter state stays within the page initially; shareable filter URLs and server search parameters are optional later work.

Access storage, clipboard, and other browser APIs in browser-side code after mounting or in user actions. A Client Component can still be prerendered; its initial render must not assume these APIs exist. Keep server and first client output consistent to avoid hydration errors. See [Next.js browser API guidance](https://nextjs.org/docs/app/getting-started/server-and-client-components).

### Future integration boundary — deferred

The present deliverable is the functioning interface with local literary content. Do not install a database or ORM, implement APIs/Server Actions, or build login/submission flows in this phase. Database vendor, schema, runtime hosting, and authentication choices belong to the later integration task.

Keep a small content access module between local JSON and page composition. Reuse stable IDs and content types; avoid coupling reading components to a database client or scattering direct content imports throughout the component tree. A later provider can change behind that module without redesigning the pages.

Use direct local reads now. Do not add artificial network delays, fake endpoints, generic repository frameworks, or simulated successful server saves. Browser-only interactions should actually work, and optional local saving must say **on this device**. Hide backend-dependent actions until they are implemented.

When integration begins, revisit content loading, persistence, deployment mode, validation, and permissions using the actual backend requirements. Static export is the current delivery choice, not a permanent constraint on the future application.

## 9. Visitor activity and failure handling

Implement this section only for the corresponding enhancement.

| Activity | Stored data | Save rule |
|---|---|---|
| Reading position | Last deliberately opened episode ID | Opening an episode; no completion claim |
| Bookmarks | Passage IDs | Explicit bookmark toggle |
| Reflections | Text per prompt and saved timestamp | Explicit save |

Use a namespaced versioned key such as `oedipus-guide:activity:v1`. Validate saved data and safely ignore removed content IDs. Load saved state before enabling writes so initial defaults cannot overwrite existing work.

Return explicit success/failure from storage operations. Handle expected browser failures at this boundary and surface them; never show a false saved status. Corrupt data must not crash reading pages or trigger automatic destructive resets.

Separate drafts from saved text. Save succeeds only after the write succeeds. Clearing one response affects that prompt only; a separate confirmed **Clear saved activity** removes only this site's keys, never all browser storage. Explain that device changes, browser clearing, and private sessions can remove saved work. There is no live synchronization between tabs or devices; simultaneous editing can overwrite an older saved response.

Render visitor text as plain text, never injected HTML. Keep responses out of URLs and logs. Clipboard failure provides selectable text and an actionable message.

## 10. Approved visual system and accessibility

**Approval:** the user approved the theme and palette, then the Greek figures, backgrounds, and symbols. This section governs every route, shared component, and interface state. Page composition may vary to fit its task; the visual identity stays consistent.

### 10.1 Theme and historical framing

**Theme: a contemporary literary exhibition of Greek tragedy.** Combine warm reading surfaces, editorial typography, restrained burgundy emphasis, Greek vase-inspired figures, and selected architectural details. The tone is serious, reflective, and suitable for a school literary guide.

The narrative setting is mythical Thebes. The artistic reference is classical Greek theatre and vase painting associated with the cultural world of Sophocles. Label the site artwork as a modern interpretation, not an archaeological reconstruction or an authenticated portrait. The reading surface is a contemporary editorial choice.

The central visual story is the search for truth: the Sphinx introduces the work, the crossroads carries the investigation, and sight/obscured vision supports the analysis. The timeline remains the signature educational interaction.

Historical references: [The Met on Greek theatre](https://www.metmuseum.org/es/essays/theater-in-ancient-greece) and [Princeton's Oedipus-and-Sphinx vessel, circa 460 BCE](https://artmuseum.princeton.edu/art/collections/objects/29225). These guide interpretation; reuse of a museum image requires checking its actual image terms.

### 10.2 Approved color scheme

Define these once as CSS custom properties in the global stylesheet. Components use semantic roles rather than introducing route-specific colors.

| Token | Value | Consistent role |
|---|---|---|
| `--color-paper` | `#F5F0E6` | Main reading background and light text on approved dark surfaces |
| `--color-ink` | `#211E1B` | Headings, body text, and selected dark artwork panels |
| `--color-burgundy` | `#7A263A` | Primary actions, active navigation, selected controls, and restrained emphasis |
| `--color-bronze` | `#70542B` | Secondary ornamental detail, timeline accents, and line illustrations |
| `--color-stone` | `#D8CFBF` | Dividers and quiet surface boundaries |
| `--color-muted-ink` | `#5C5851` | Captions, citations, metadata, and supporting labels |

Ivory dominates reading areas; charcoal defines text; burgundy directs action; bronze and stone stay secondary. A charcoal artwork panel uses ivory figures/text and restrained bronze detail. Do not put dark bronze text on charcoal.

The six base colors are approved, but actual foreground/background pairs still need measurement. Derive shared hover, active, focus, disabled, and feedback styles from these roles. If a state needs another value for accessibility, add one centrally with a documented purpose. Selected, correct, incorrect, saved, and error states include labels or icons as well as color.

Target at least 4.5:1 contrast for ordinary text and 3:1 for qualifying large text. Check control boundaries and focus indicators separately; a decorative stone divider must not become the sole visible boundary of a control. See [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

### 10.3 Typography, layout, and shared components

Use **Libre Baskerville** for major headings and selected quotations, and **Source Sans 3** for body text, navigation, labels, and controls. Apply the same font roles on every page, with system fallbacks and verified font usage terms. Avoid decorative pseudo-Greek lettering that makes English difficult to read.

Target 18px body text, 1.6–1.75 line height, and approximately 65–75 characters per reading line. Titles scale fluidly. General content width is approximately 1,200px; prose stays narrower. Mobile padding is approximately 20–24px. Use an eight-pixel spacing rhythm and more separation between major sections than between a heading and its text.

The shared shell includes the same header, wordmark treatment, navigation, active-page indicator, mobile menu, footer, and source-link styling. Reuse button, input, filter, accordion, passage, notice, and activity-feedback components. Keep consistent border weights, understated corners, spacing, and visible focus across normal, empty, error, and completed states. Prose links are underlined.

Vary layout to fit content: vertical story sequence, searchable character index, analysis reading column, filtered passage list, focused activity workspace. Different layouts inherit the same tokens and component grammar. Avoid wrapping every paragraph in another card.

### 10.4 Figures and illustration system

Use one family of modern illustrations inspired by Greek vase painting: flat silhouettes, expressive profile poses, draped clothing, strong contours, and sparse interior lines. Recolor within the approved palette instead of adding a separate terracotta palette. Maintain consistent proportions, line weight, shading restraint, and cropping throughout.

| Figure or artwork | Required treatment | Placement |
|---|---|---|
| Oedipus and the Sphinx | One dominant composition showing Oedipus as a traveler confronting the winged Greek Sphinx | Home opening; a small derivative emblem may be reused elsewhere |
| Character figures | A coherent illustration for each initial profile; identify figures through labels and distinct poses/attributes | Characters, with selective reuse in related story episodes |
| The Chorus | A small group composition in the same style, clearly labeled as collective | Chorus profile and relevant story content |
| Palace threshold | Restrained doorway, stepped platform, and cropped column details; an interpretive setting rather than a claimed reconstruction | Story opening and selected chapter artwork |
| Theatrical mask | One restrained mask motif with the same outline and material treatment | About opening and the literary-techniques introduction |

Base the Sphinx on Greek references, with wings and an appropriate human/lion form. Its encounter belongs to the story's earlier background; placing it on Home does not imply that the encounter occurs onstage in this play. Character figures are interpretive illustrations, not verified likenesses.

Ordinary profile figures should remain clear in silhouette at mobile size. Represent the Chorus as a group and background figures according to their role. Do not switch between photorealistic portraits, cartoon avatars, and vase figures from page to page. Museum object photography may appear as an explicitly captioned reference in About & Sources; it does not replace the illustration family.

### 10.5 Background system

| Surface | Treatment | Rules |
|---|---|---|
| Main reading surface | Warm ivory, optionally with extremely subtle paper grain | Shared across every route; text remains clear and steady |
| Home artwork field | Charcoal with ivory/bronze figures | One focal composition; keep burgundy primary action visually distinct |
| Selected chapter openings | Faint stone or plaster texture around illustration margins | Restrict to artwork/header areas; preserve clear reading surfaces |
| Passage entries | Flat ivory, fine rules, generous margins, source labels | Consistent evidence treatment wherever passages appear |
| Activity workspace | Clean ivory with restrained borders and burgundy controls | Texture stays outside forms and feedback regions |
| Footer | Consistent shared surface with a restrained meander boundary | Same treatment on every route |

Texture is a subtle material cue, not a full-screen filter. Keep it out of form fields and dense text, avoid motion, and measure contrast against the final composited surface. Paper is the modern editorial layer, not a claim about the original play's manuscript material. A missing texture must never conceal content or prevent reading.

### 10.6 Symbols and ornament

| Symbol | Design role | Placement and limits |
|---|---|---|
| Sphinx | Introduces the work and its association with questions and knowledge | Home focal artwork and a restrained shared emblem |
| Crossroads | Modern visual metaphor supporting investigation, choice, and discovery | Story timeline and selected episode markers; factual chronology still comes from reviewed data |
| Eye / obscured profile | Modern interpretive motif for sight, blindness, and understanding | Analysis opening and the relevant theme; keep imagery non-graphic |
| Theatrical mask | Signals the dramatic form | About and literary techniques; decorative rather than a replacement for a label |
| Greek meander | Repeating geometric ornament | Shared footer and occasional major section dividers; never a border around every component |
| Palmette | Small secondary ornament from the same reference vocabulary | Optional chapter end or source divider; subordinate to the meander |

Greek vase ornament has documented precedents, including meanders and palmettes; see [LACMA's vase documentation](https://collections.lacma.org/object/14695). Use these as ornament without inventing ancient meanings for them. Crossroads and eye motifs are the site's interpretive visual language, not claims of established ancient emblems for a theme.

Keep decoration sparse: one dominant motif per page opening, with small supporting details. Maintain a common stroke weight and visual scale for reusable symbols. Interactive icons remain familiar, labeled where needed, and distinct from ornamental artwork.

### 10.7 Consistent application across all seven pages

| Page | Lead visual | Background and supporting detail |
|---|---|---|
| Home | Oedipus facing the Sphinx | Charcoal artwork field adjoining ivory introduction; restrained shared meander |
| Story | Palace threshold and crossroads timeline | Ivory reading sequence; faint architectural texture only around opening artwork |
| Characters | Consistent vase-inspired profile figures | Ivory list with stone dividers; related episode thumbnails reuse the same assets |
| Analysis | Eye / obscured profile | Ivory reading column; small mask at techniques introduction; bronze section detail |
| Passages | Typography and evidence as the focus | Flat ivory entries, fine rules, consistent source labels; no new illustration style |
| Activities | Functional progress and response controls | Clean ivory workspace; optional small crossroads marker for ordering activity |
| About & Sources | Restrained theatrical mask | Ivory editorial layout, visual-credit references, optional small palmette divider |

All pages retain the shared shell, type hierarchy, palette roles, control states, reading width, and footer. Route-specific artwork changes the subject, not the design system. Use the same rules for loaded, empty, error, selected, and completed states.

### 10.8 Asset production and attribution

Before creating or sourcing assets, establish a single reference sheet covering silhouette style, proportions, stroke weights, palette mapping, and crop rules. Produce the Home composition and one representative character first, then use those as style references for the remaining figures. Approvals already recorded here do not require reopening the visual direction.

Required release artwork: Home Oedipus/Sphinx composition, initial profile figures including the collective Chorus, palace-threshold artwork, theatrical mask, and sight motif. Meander ornament and the data-driven crossroads timeline complete the visual vocabulary. Paper/stone textures and palmettes are optional refinements. Assets can follow the reading scaffold, but required figures must be finished before release.

Keep reusable asset files in `public/images/` and centralize their usage information in the visual-credit records. Reuse files when the subject repeats; do not create inconsistent variations per route. Use vector artwork for simple ornaments and interface symbols, and appropriately sized image assets for detailed illustrations. Preserve aspect ratios and supply mobile crops only where needed.

For each asset record creator/origin, source or generation method, usage information, whether it is a modern interpretation, meaningful description, and pages used. Label generic sculptures and museum references accurately. Art must remain suitable for school use, with no graphic depictions of injury.

### 10.9 Accessibility and motion

Use semantic headings, labeled fields, visible focus, meaningful links, and buttons for actions. Accordions communicate expanded state and associate triggers with content. Timeline selection has an explicit label and selected state. Announce result/save changes appropriately without announcing every keystroke.

Target comfortable 44px controls. Support keyboard completion of navigation, search, expansion, quizzes, and optional ordering. Respect reduced motion; use brief state transitions of approximately 150–250ms and keep decorative artwork static. Meaningful images have useful alternative text; ornamental meanders, textures, and redundant symbols have empty alternatives or are hidden from assistive technology.

Check 320–390px phones, 768px tablets, and 1366–1440px laptops, plus 200% zoom and narrow reflow. Fixed elements must not cover focused controls or anchor targets. On small screens, reduce artwork size and ornament density while preserving the same visual identity, content order, and primary actions.

### 10.10 Visual acceptance checklist

- Every route uses the shared palette tokens, approved font roles, header/footer, control styles, and spacing scale.
- Home, character figures, architecture, and symbols visibly belong to the same illustration family.
- Page-specific motifs match Section 10.7; no route introduces an unrelated theme or palette.
- Background textures remain subtle and leave prose, inputs, and evidence readable.
- All required artwork exists, loads at desktop/mobile sizes, and has accurate attribution and interpretation labels.
- Contrast, keyboard focus, touch controls, reduced motion, and alternative text are checked against the actual implementation.
- A desktop/mobile review across all seven routes confirms consistent visual treatment, including empty/error/quiz-result states.

## 11. Build sequence and phase gates

### Phase 0 — Install and verify Next.js first

Finish this phase before custom website implementation.

1. Confirm the project directory and read its instructions/files. When this plan was written, `Desktop/oedipus` was empty before adding this document; configured `Desktop/oedipux` did not exist. Recheck before changes.
2. Check Node.js and npm against the stable Next.js release's documented requirements. Choose a supported Node LTS version and record actual versions.
3. Use the official `create-next-app` installer. Choose TypeScript, App Router, ESLint, a `src/` layout, and CSS Modules/global CSS for this baseline. Install Next.js, React, React DOM, and dependencies into the project and retain the lockfile.
4. Preserve this plan and existing work. If the scaffolder rejects the nonempty directory, generate into a temporary sibling and transfer the scaffold after checking for conflicts. Do not delete the plan or force overwrites.
5. Start the untouched starter locally and verify that it loads. Run lint, TypeScript checking, and a production build. Use actual generated scripts, adding an explicit type-check script if needed. Resolve environment/dependency failures before custom UI.
6. Record the framework version, commands, and verified results. Replace starter demo content during the website phase.

Use the [official Next.js installation guide](https://nextjs.org/docs/app/getting-started/installation). Select a stable release at implementation time; no version is claimed installed by this plan. A running development server alone does not verify a production build.

**Gate:** framework dependencies exist in the project, the starter renders, and lint, type checking, and production build pass. No custom website features precede this gate.

### Phase 1 — Confirm constraints and prepare reviewed content

Use the supplied rubric to prioritize information and explanation. Select the edition, define citations, and author story, author/origin context, analysis, and activities. Validate IDs/links and verify factual claims. Optional personal material is supplied by the student; it does not block general literary content.

**Gate:** the frontend content inventory covers Section 6 and maps to the supplied rubric; claims have reviewed support and no invented personal information. Backend decisions are not prerequisites.

### Phase 2 — Build the reading foundation

Set the approved shared tokens, fonts, navigation, metadata, seven routes, readable content, anchor links, and source/credit presentation. Implement the Section 10 background, illustration, and symbol system through reusable components. Establish static export if the baseline still applies.

**Gate:** all pages and cross-links work on desktop and mobile; content is readable before interactive enhancements. Shared visual rules are in place on every route. Final artwork can follow the reading scaffold, but all required Section 10 assets must be complete before release.

### Phase 3 — Add educational interactions

Implement timeline views, character search, passage filters/copy, and quiz. Add reflection editing/copying. Validate question answers and content relationships.

**Gate:** every first-release interaction passes its scenario in Section 12.

### Phase 4 — Add selected enhancements

After the core works, add persistence and/or ordering if useful for the submission. Keep each independently reviewable.

**Gate:** enabled enhancements pass reload, storage failure, clearing, keyboard, and retry checks as applicable.

### Phase 5 — Verify and package

Review literary accuracy, context coverage, and explanations against the rubric before final visual polish. Run lint, type checking, content validation, focused tests, and production build. Serve the static output and inspect desktop/mobile, keyboard behavior, contrast, and route handling. Include student contributions only when actually supplied.

**Gate:** frontend completion checks and the rubric evidence review pass; limitations and deferred backend/database work are documented. The interface is ready for demonstration. Publish only when requested.

## 12. Verification and completion criteria

| Area | Scenario and expected result |
|---|---|
| Installation | Starter installs, opens locally, and passes baseline checks before website work |
| Routes | Seven routes open directly, reload, and navigate in production output |
| Anchors | Linked episode/profile/passage is visible and identifiable after direct load |
| Timeline | Reviewed occurrence/revelation relationships are correct; no fabricated dates |
| Search | Alias and case/spacing variants match; empty query restores profiles |
| Filters | Speaker, theme, and keyword intersect; clear restores all passages |
| Empty states | No matches and optional saved-empty views offer accurate recovery actions |
| Quiz | Missing answer prompts; submission counts once; key matches feedback; retry resets |
| Reflection | Empty word count is zero; copy works or reports failure; text stays plain text |
| Optional storage | Saved items survive reload; unavailable/corrupt storage reports failure |
| Optional editing | Failed save retains draft; unsaved state is clear; clearing affects intended data only |
| Optional ordering | Keyboard movement retains focus; positions, checking, and retry work |
| Literary accuracy | Quotes, speakers, locators, relationships, and ending checked against edition |
| Accessibility | Core flow completed by keyboard; visible focus; feedback understandable without color |
| Responsive | No accidental overflow at phone/tablet/laptop sizes, narrow reflow, or 200% zoom |
| Production | Lint, type checking, content checks, focused tests, and build pass; output inspected |
| Visual consistency | All seven routes follow Section 10: shared tokens, type, shell, figures, backgrounds, and motif placement; no unrelated page themes |
| Artwork | Required Sphinx, character figures, architecture, mask, and analysis motifs share the approved style; credits and historical labels are accurate |
| Content coverage | Story, origins, Sophocles, form/context, analysis, and influence are substantive, sourced, and linked |
| Rubric review | Evidence for all four grading categories is documented; content accuracy and explanation take priority |
| Frontend scope | Core interactions work locally; no backend connection, database, account, or submission is required |
| Sources | Shipped quotes/assets credited; personal claims appear only when supplied/reviewed |

Automate meaningful logic: filter intersections, ID/reference validation, timeline links, quiz scoring/retry, and saved-data validation if included. Use a small browser flow for cross-page anchors and quiz completion. Avoid snapshot tests for every paragraph or tests that simply repeat implementation details.

Record commands and real results in the eventual setup guide. Build success does not establish literary accuracy, keyboard usability, or production-host routing; verify those separately. For static export, serve `out/` with an HTTP static server; do not assume a runtime server command or opening files directly reproduces the deployment.

### Final deliverables

- Next.js source, reviewed content collections, local assets, and lockfile.
- Setup guide with runtime versions, install/dev/check/build commands, and deployment mode.
- References and visual credits with selected edition and citation convention.
- Static frontend production output and local preview instructions; hosted URL only if requested.
- Short demo: enter Story, compare timelines, follow character to evidence, filter passages, complete quiz feedback.
- Actual limitations, omitted enhancements, rubric evidence, and a short note identifying backend/database integration as deferred work.

The project should demonstrate a clear chain: **event → discovery → character → evidence → interpretation**. Completion depends on accurate content and working educational interactions.

## 13. Second iteration — guided discovery

### 13.1 Direction and observed opportunities

**Confirmed direction:** preserve the existing palette, Greek literary exhibition theme, serif/sans font roles, and coherent illustration family. Make guided discovery the primary experience: readers follow clues and see how the truth unfolds. Keep direct study/reference access available.

This is an enhancement of the implemented guide, not a replacement visual identity. Sections 1–12 describe the baseline; this section records proposed changes pending approval. Planning does not authorize implementation of this iteration.

The current interface is strongest at presenting sourced material consistently. Its main opportunities are experiential:

- Story presents eight expandable episodes and two orders, but readers must assemble much of the changing knowledge themselves.
- Character connections are text links; understanding the family and testimony network still requires moving between long profiles.
- Passage context and theme evidence are available, but many evidence links leave the current reading position.
- Themes, author context, and explanations are substantive but often delivered as long uninterrupted paragraphs.
- Quiz feedback explains answers, but the learning path does not yet adapt its reading suggestions to what a visitor missed.

Preserve the grading priorities: Data/Information 50%, Informativeness 30%, Creativity 10%, Interactivity 10%. Each new interaction should reveal evidence, clarify a relationship, or develop an interpretation. Review content quality alongside visual appeal.

### 13.2 Primary journey

**Begin the investigation → read an episode → inspect its evidence → compare what is believed and established → consider a question → continue → form a supported interpretation.**

The reader can leave this journey for the full story, character index, analysis, or passages at any point. Finishing a quiz or answering a checkpoint is never required to read the next episode.

Within guided discovery, reveal the selected episode's information and earlier clues. Later discoveries have a deliberate reveal action or become available as the reader advances. Display an explicit full-plot notice before switching to the unrestricted study material. This is paced presentation, not a promise that every route or stored client-side record is spoiler-free. Explain that dramatic irony may involve an audience knowing more than a character.

### 13.3 Flagship feature: guided investigation

Add a focused guided presentation to Story, while retaining the existing complete study timeline and chronological comparison.

| Area | Proposed behavior |
|---|---|
| Episode navigation | Eight named stops, current episode highlighted, previous/next controls, explicit position such as Episode 3 of 8 |
| Episode reading | A concise scene introduction, existing reviewed summary, key development, and relevant character portraits |
| Evidence at this point | Selected excerpts and revelation records limited to the current point in the investigation |
| Changing knowledge | Compare what Oedipus believes, what a speaker claims, and what the audience has heard or can infer |
| Evidence status | Keep accusation, recollection, testimony, and confirmation visibly distinct and sourced |
| Checkpoints | Three short, nonblocking evidence questions at important transitions; explain every answer |
| Resume | Remember the last deliberately selected episode on this device; distinguish position from completed reading |
| Study access | An ordinary, clearly labeled route/view action opens the full timeline and its spoiler notice |

Desktop composition: a compact episode rail, a dominant reading column, and a secondary evidence/knowledge region. On smaller screens, place episode navigation above reading and reveal supporting information inline. Avoid a desktop panel layout squeezed into three mobile columns.

Use one controlled transition when the selected episode changes, with focus moved to its heading and the current step announced. Keep the text visible without entrance animation, respect reduced motion, and avoid continuous decorative motion.

**Acceptance:** a visitor can explain how one claim changes between accusation and confirmation; move between episodes by keyboard; resume the actual selected step; and access the complete study version without completing an activity. No later confirmation should appear accidentally inside an earlier guided knowledge summary.

### 13.4 Shared evidence preview

Create one reusable **Read the evidence** interaction for Story, Characters, and Analysis.

- Open the real passage's excerpt, speaker, edition, locator, context, and short interpretation without losing the surrounding reading position.
- Offer bookmark, copy with attribution, and a direct link to the complete Passages entry.
- On wide layouts, use an adjacent reading region where space permits. On narrow layouts, expand the evidence inline. Prefer this over covering the reading with a modal or bottom sheet.
- Keep focus behavior predictable, expose expanded state, and preserve the current episode, selected character, and scroll position when the preview closes.
- Read from the same passage record everywhere. Generated mockup copy and separately duplicated excerpts do not become content sources.

**Acceptance:** the same passage has identical attribution wherever previewed; previewing and closing it preserves context; the full entry still has a shareable direct link.

### 13.5 Improvements across the seven pages

| Page | Proposed improvement | Reader benefit |
|---|---|---|
| Home | Keep the existing hero and artwork; make Begin the investigation the primary action, show real resume state, and introduce the path from clue to interpretation | A clearer first action and a visible reason to explore |
| Story | Guided investigation, contextual knowledge summaries, evidence previews, and three evidence checkpoints | Experience the logic of discovery in manageable steps |
| Characters | Add a selectable relationship overview beside/above the existing index; distinguish family, political, and investigative connections; group principal participants and background figures | Understand the network before reading every profile |
| Analysis | Restructure discussions into a claim, specific evidence, explanation, and alternative reading; add contextual glossary definitions | Understand the argument and evaluate its support |
| Passages | Highlight query matches safely; add a focused comparison of at most two passages; improve the saved-evidence view | Locate useful words and compare evidence directly |
| Activities | Keep the existing quiz, add missed-topic reading suggestions, and provide a claim–evidence–explanation reflection scaffold | Turn feedback into a next reading action and a stronger response |
| About & Sources | Break origins, author, and theatre context into shorter reading sections; add a sourced author/context chronology where dates are supported and clearer links between sources and claims | Make background knowledge easier to absorb and verify |

The relationship overview must have an equivalent labeled text list. Selection highlights the chosen character and connections; it does not require dragging, precise pointer movement, or pinch-to-zoom. Display biological, adoptive, and marital relations separately. Full-relationship disclosure retains the spoiler notice; it is not automatically safe to embed unchanged inside an early guided episode.

For comparison, use desktop columns and mobile stacking with persistent passage titles and attribution. Show why the pairing is useful, such as a change in knowledge or a competing view of authority. Avoid turning comparison into a large arbitrary grid of quotations.

### 13.6 Content improvement program

Improve explanation and evidence coverage before increasing the amount of text.

| Content task | Required result |
|---|---|
| Editorial pass | Correct errors, shorten repetition, split long paragraphs, and give each section one clear purpose |
| Layered explanation | Start major topics with a concise takeaway, then offer the fuller reading and evidence |
| Knowledge summaries | Author reviewed knowledge states per episode; distinguish belief, claim, inference, and confirmation |
| Close reading | Explain a specific word, image, exchange, or dramatic situation rather than treating a quotation as self-explanatory |
| Relationships | Explain how a connection affects the investigation, not only its family label |
| Literary terms | Pair definitions with concrete examples and avoid treating hamartia as an automatic synonym for pride |
| Greek context | Connect theatre, Chorus, public crisis, mythic tradition, and authorship to the reader's understanding of this play |
| Supported disagreement | Make alternative readings intelligible, without implying every interpretation has equal textual support |
| Source traceability | Attribute historical claims and provide verified excerpt locators; label uncertainty in dates or historical reconstruction |

Audit the existing ten passages for coverage. Expand toward approximately 14–16 only if additional excerpts support a missing scene, theme, technique, or comparison. The target is provisional, not a quota. Review every new transcription and locator against the selected Storr edition before release.

Keep the existing five themes and four principal techniques as the organizing structure. Add depth through evidence and explanation rather than proliferating overlapping topic categories. First-person student experience remains optional and must be supplied, not invented.

### 13.7 Aesthetic amplification — a more theatrical Greek exhibition

**User clarification:** visual improvement is a primary part of this iteration, alongside content and interaction. The user likes the current color design and Greek theme and wants the aesthetic to become more appealing and pronounced. The user subsequently instructed implementation of this combined direction. The treatments below guide the implemented second iteration.

#### Visual diagnosis

The current Home has a strong illustrated focal point. Much of the remaining site uses the same ivory surface, fine horizontal rules, similar heading-plus-lead introductions, and long reading rows. Small portrait/motif placements often function as accompanying illustrations instead of shaping a page's composition. That creates consistency but leaves limited contrast between major moments.

Amplify the existing identity through composition, surface contrast, art scale, and editorial rhythm. Adding more ornaments or enlarging every heading would not resolve that uniformity.

#### Selected direction

**A more theatrical Greek literary exhibition:** dramatic openings, sculptural portrait presentation, carefully placed dark stages, and calm ivory reading areas. Keep the same six base colors, Libre Baskerville/Source Sans 3 roles, Greek vase-inspired artwork family, and readable controls.

The intended progression is an arresting opening, an inviting investigation, focused reading, and a memorable final reflection. Each page should have one dominant visual idea. Keep supporting components quieter so the focal element remains clear.

#### A. Compose a stronger opening

- Preserve the recognizable Oedipus title, italic subtitle, and Oedipus/Sphinx composition.
- Develop the artwork into a deliberate stage-like field with more confident scale and framing, balanced against the editorial title rather than treated as a generic image beside copy.
- Refine title line breaks, alignment, and the relationship between headline, subtitle, and action. The current large display size already carries weight; composition takes priority over increasing it further.
- Use a clean transition from this dramatic opening into the work metadata and reading introduction. The main action remains visible on a small laptop.
- Treat art captions and source information as part of the exhibition presentation, without adding decorative labels above every heading.

#### B. Give the existing colors stronger roles

| Surface | Proposed visual use |
|---|---|
| Warm ivory | Primary prose, navigation, evidence details, and form workspace |
| Charcoal | Selected artwork stages, chapter-opening moments, or one substantial illustrated section |
| Burgundy | Primary actions and selected states, plus a limited major quotation or reflection surface where useful |
| Bronze | Architectural rules, small ornament, timeline paths, and restrained framing |
| Stone | Quiet separation between supporting elements |
| Secondary gray | Supporting text on ivory; keep dark-surface supporting text in a measured light treatment |

Use contrast as punctuation: an ivory reading stretch can give way to a dark illustrated moment and then return to ivory. Do not turn every section into a dark or burgundy panel. Use ivory text on approved dark surfaces, preserve measured contrast, and keep bronze decorative where it would not support readable text.

#### C. Let figures shape the composition

- Enlarge the selected character's illustration in the proposed relationship explorer, supported by a concise identity and relationship overview.
- Use smaller portraits purposefully in the investigation when a witness or ruler becomes relevant. Portrait size should communicate the current focus rather than making every character equally dominant everywhere.
- Give palace-threshold, mask, crossroads, and sight motifs specific compositional jobs: introduce a chapter, frame a major transition, orient the investigation, or reinforce an analytical question.
- Retain coherent margins, aspect ratios, figure proportions, and school-appropriate imagery. Any crop should preserve the meaningful parts of the artwork.
- If a composition needs a transparent figure or dark-ground variant, produce that asset properly in the existing style. Avoid using crude image inversion, mismatched backgrounds, or CSS filters to simulate a new illustration.

#### D. Strengthen the Greek visual vocabulary

Use the meander as a deliberate chapter boundary or shared footer detail, rather than decorating every card. Reuse selected architectural lines and restrained palmette details to frame the exhibition's key moments. Keep interface icons simple and clearly distinct from artwork.

English labels stay readable in the approved fonts. Modern motifs and generated artwork remain accurately identified; ornament should not imply an invented historical meaning or authenticated ancient reconstruction.

#### E. Create more editorial rhythm

Alternate a limited set of compositions for meaningful reasons:

- A strong illustrated opening for Home.
- A chapter-like investigation stage for Story.
- A portrait-led relationship composition for Characters.
- A quiet reading column interrupted by an occasional prominent source quotation for Analysis.
- A precise evidence workspace for Passages.
- An inviting, focused writing and practice space for Activities.
- An exhibition-style origins/author introduction with a sourced chronology for About.

Reuse consistent typography, spacing, and controls while varying art scale, surface contrast, and density. Group content into shorter, connected reading sections. Avoid giving all seven pages an identical title/thumbnail/long-list silhouette.

#### F. Add purposeful motion

Use motion to express an action: trace a relevant timeline connection, highlight a selected relationship, reveal an evidence preview, or transition between investigation episodes. Selected artwork may have a brief entrance treatment if it remains visible and comprehensible by default.

Keep motion restrained, predominantly around 180–250ms, and honor reduced motion. Hover effects must have keyboard equivalents. Keep the reading position stable; avoid scroll hijacking, continuous floating figures, automatic carousels, and interactions that require a pointer.

#### Page-by-page aesthetic targets

| Page | Stronger visual expression | Reading/task protection |
|---|---|---|
| Home | Confident title/art composition, a richer charcoal stage, and a clear contrast beat before exploration | Preserve an immediate starting action and concise opening copy |
| Story | Chapter-like episode openings, portrait testimony cues, and a meaningful crossroads/connection graphic | Keep current episode and evidence status legible; avoid three narrow mobile columns |
| Characters | A prominent selected portrait and clearly highlighted relationship network | Keep a full-width mobile description and accessible text relationships |
| Analysis | Stronger theme openings and one or two carefully placed large quotations or dark contrast moments | Long explanations stay on calm ivory surfaces with a controlled reading measure |
| Passages | More refined quotation typography, citation hierarchy, comparison layout, and saved-state presentation | Filters and reading remain the focus; decorative artwork stays subordinate |
| Activities | Distinctive quiz progress, clearly composed feedback, and a more inviting reflection section | Keep inputs, labels, feedback, and keyboard focus conventional and clear |
| About & Sources | A larger deliberate mask/author-context introduction, sourced chronology, and stronger exhibition-style credit presentation | Bibliography remains straightforward and easy to scan |

#### Visual proof before implementation

Prepare three separate, readable reference compositions for the amplified Home, a guided Story episode, and an Analysis section. These should demonstrate the same approved identity at different densities, rather than offering unrelated themes. Inspect the real artwork, typography, spacing, contrast, and mobile consequences before translating the references into code.

Use those references to settle the degree of visual amplification, then extend the shared rules across the other routes. Generate additional route references where the revised composition cannot be inferred reliably. This work does not reopen color or theme selection.

#### Visual acceptance criteria

- The opening and at least one major content transition have clearly stronger composition and contrast than the baseline.
- Greek figures and motifs influence layout and narrative hierarchy; they do more than fill small thumbnail positions.
- Each route has a recognizable visual role while belonging to the same exhibition.
- Burgundy, charcoal, and ivory are used more deliberately without adding a new palette.
- Large headings and quotations remain readable, meaningful, and contained at laptop/mobile sizes.
- The strengthened aesthetic preserves keyboard access, contrast, reduced motion, source attribution, and comfortable long-form reading.
- The result feels like a more confident version of the existing site, and the visitor can still quickly find the story, evidence, and activities.

### 13.8 Content/state boundaries and dependencies

Continue with local content and frontend-only interactions. Do not introduce a database, login, external runtime generation, or simulated teacher submissions.

- Extend the existing episode/revelation data with authored knowledge summaries and checkpoint references; do not infer a person's knowledge simply from event chronology.
- Reuse current character relationships for the visual overview and current passages for previews/comparison. Keep stable IDs and direct links.
- Tag quiz questions with the learning topics needed for accurate follow-up suggestions. Recommendations should come from explicit question/content links, not an invented adaptive engine.
- Add annotation text only if the saved-evidence feature is included in the selected phase. Treat it as plain text and retain explicit local save feedback.
- Preserve existing bookmarks and reflections when saved-state fields change. Validate and migrate compatible version-one data rather than silently resetting it.
- Checkpoint answers and practice scores remain private practice. Completed progress is an explicit visitor action; opening an episode alone is not proof of comprehension.

Accessibility requirements apply to every new interaction: keyboard operation, meaningful labels, visible focus, adequate contrast, reduced motion, a list alternative for diagrams, and intentional focus/scroll restoration. Test both successful and failed storage, empty selections, missing referenced content, and narrow layouts.

### 13.9 Implementation order

| Phase | Included work | Completion gate |
|---|---|---|
| V — Visual amplification | Three focused reference compositions; stronger art/title framing, surface contrast, page identity, and shared visual rules | A coherent amplified aesthetic demonstrated on Home, Story, and Analysis while retaining the approved palette/theme |
| A — Narrative foundation | Editorial pass; guided episode structure and knowledge summaries; shared evidence preview; Home entry/resume adjustments | A complete eight-episode path, working evidence preview, clear reveal boundaries, and direct study access |
| B — Connected exploration | Character relationship overview; restructured close reading; contextual glossary; refined backgrounds/spacing only where needed | A reader can follow a character to an argument and inspect evidence without losing context |
| C — Apply and compare | Two-passage comparison; improved saved-evidence view; missed-topic suggestions; reflection scaffold | Readers can compare evidence and produce/copy a supported response; existing saved work survives upgrades |
| D — Verify and finish | Content/source review; desktop/mobile visual review; keyboard/contrast checks; test expansion; static production build | New flows pass meaningful tests and the original working features remain intact |

**Implemented scope:** phases V, A, B, and C were authorized by the instruction to implement the combined plan. Three fresh reference compositions preceded the UI changes. Phase D provides production/browser checks, desktop/mobile evidence, independent finish review, and documentation.

### 13.10 Success criteria for the next iteration

1. A first-time visitor understands how to begin the investigation and sees the actual next step.
2. The guided path makes the difference between a claim and a confirmed discovery understandable through examples.
3. Important evidence can be read without repeatedly leaving the current episode or interpretation.
4. Character relationships remain comprehensible on mobile and through a text/keyboard alternative.
5. Analysis explains how evidence supports a claim; expanded content adds insight rather than repetition.
6. Quiz feedback leads to relevant reading, and reflection scaffolding helps assemble a supported response.
7. The current palette, typography, Greek visual identity, source attribution, and saved visitor work are preserved.
8. All proposed enhancements remain local/frontend-only unless the user separately authorizes backend work.

### 13.11 Implementation record

- Home uses a charcoal exhibition stage, the original Sphinx artwork, an immediate investigation action, a real resume link, and an occasional burgundy source quotation.
- Story defaults to eight guided episodes with authored knowledge states, explicit reading markers, three optional checkpoints, contextual evidence, and direct full-study access. Phones use a compact labeled episode selector.
- Characters includes ten selectable figures, typed relationship filters, a large selected portrait, an equivalent explanatory text list, and the existing searchable profile index.
- Analysis retains five themes and four techniques, with claim/evidence/explanation/alternative structure, close readings, contextual definitions, and active section navigation.
- Passages contains fourteen verified Storr excerpts, literal query highlighting, comparison of at most two entries, three suggested pairings, bookmarks, and explicitly saved plain-text notes.
- Activities adds missed-topic reading suggestions and a claim–evidence–explanation builder without overwriting existing responses. About adds four sourced author milestones.
- Existing version-one bookmarks and reflections survive additive saved-state migration. No database, authentication, or submission service was introduced.

See VERIFICATION.md for actual checks and review scope. DESIGN.md describes the built shared system; design-references/v2/ preserves the three new mockups and exact generation prompts.
