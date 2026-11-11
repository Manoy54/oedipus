# Website visual references — original iteration

The current amplification is documented in [the second-iteration references](design-references/v2/DESIGN-REFERENCE-V2.md) and [direction contract](design-references/v2/DIRECTION-V2.md). This file preserves the original implementation evidence.

Generated 11 November 2026 using the built-in image generation tool. These are image-first implementation references for the user-approved PLAN.md, not screenshots of the implemented site. Each route has its own fresh, readable 1536 × 1024 image. All seven were opened and visually inspected before this document was written.

The approved plan remains authoritative where a generated image departs from the brief. In particular, verified literary copy must replace model-generated sample prose. Pixel estimates below describe the visible composition rather than claiming automated measurement.

## Files and provenance

| Route | Reference |
|---|---|
| Home | `design-references/home.png` |
| Story | `design-references/story.png` |
| Characters | `design-references/characters.png` |
| Analysis | `design-references/analysis.png` |
| Passages | `design-references/passages.png` |
| Activities | `design-references/activities.png` |
| About | `design-references/about.png` |

Exact full prompts for all seven calls are in `design-references/prompts.json`. Each call generated one independent viewport, not a collage or a crop of another page. The existing generated Oedipus/Sphinx illustration was supplied as an art-style reference. UI mockups are not shipping artwork: render real HTML controls/text and use separately produced assets in the site.

## Shared design extraction

- **Hierarchy:** a thin-rule header, one strong serif page title, readable lead, then the task-specific reading or interaction surface. Wordmark and page titles carry the identity without decorative badges or fake metrics.
- **Palette:** use the approved exact tokens: paper `#F5F0E6`, ink `#211E1B`, burgundy `#7A263A`, bronze `#70542B`, stone `#D8CFBF`, muted ink `#5C5851`. Do not sample incidental generated shades into new page-specific palettes.
- **Typography:** maintain Libre Baskerville headings/selected excerpts and Source Sans 3 body/navigation/controls. The images repeatedly drift toward serif control labels; that is an identified model defect, not a new font-role decision.
- **Spacing:** roughly 64–88px horizontal desktop gutters, an approximately 80–100px header, generous space above major headings, and tighter spacing inside a related text/action group. Bind the implementation to the plan's 1,200px general width and 65–75ch prose measure.
- **Components:** lightly rounded rectangular inputs/buttons, burgundy primary actions, underlined secondary reading links, thin stone/bronze rules, no shadow stacks, no nested panel framing.
- **Illustration:** ivory/bronze incised Greek figures on charcoal, restrained geometric ornaments, interpretive historical framing. Reuse actual source assets; never crop figures out of a UI mockup to ship them.
- **Navigation:** use one shared wordmark and navigation component. The plain Home wordmark is the baseline; generated laurel additions in other images are rejected. Active navigation uses a thin burgundy underline with a programmatic current-page state.
- **Responsive translation:** preserve content priority rather than shrinking the entire reference. Stack the hero, collapse reading rails into in-page contents, stack filters and profile rows as needed, keep 44px touch targets, and retain clear primary actions.
- **Motion:** the references show static compositions. Implement only the plan's brief state transitions and reduced-motion behavior; no decorative entrance animation is implied.

## Home: image analysis

**Visual priority:** the large title at left and Oedipus facing the Sphinx at right. The two-line title, italic burgundy subtitle, short lead, and primary action form one compact reading path.

**Visible text to retain:** Oedipus Rex; A search for truth.; A king. A city in crisis. A search that changes everything.; Explore the story; Meet the characters; An investigation into the self. Metadata shows Sophocles, Greek tragedy, Thebes, F. Storr.

**Composition:** at 1536px, the hero begins around y123 after the header. Text occupies roughly 40% and art roughly 60% of the usable row. The art is a clean landscape rectangle with a small caption immediately below. At approximately y690, a horizontal metadata band introduces four equal factual columns; the next editorial section begins around y830.

**Type and controls:** the image title is approximately 130px and strongly contrasts with the roughly 28px supporting copy. The primary burgundy button is a generous rectangle with a small radius; secondary action is an underline rather than a second filled button.

**Implementation consequence:** cap the display title around 72–96px depending on viewport so the message/action remain visible at 1366 × 768. Keep the title at no more than two lines. Preserve the open split composition, action hierarchy, separate caption, and metadata band. Use the actual 3:2 hero asset without clipping the figures.

**Corrections:** use approved sans for navigation/buttons and source-verified introductory content. The shown body paragraph is draft editorial material, not evidence. Keep the first-time introduction free of the central revelation.

## Story: image analysis

**Visual priority:** compare the investigation order with earlier events, then open an episode. The visible controls communicate the educational mechanism directly.

**Composition:** title/crossroads motif at the top; a two-column synopsis and compact palace-threshold illustration below. A thin divider precedes the two timeline buttons and a right-aligned Expand all action. The main timeline is flat: ordinal circles on a bronze path, large episode titles, and stone horizontal separators. Episode 1 is open; episodes 2–4 are collapsed in the viewport.

**Type and spacing:** roughly 56–64px page title, 28–36px episode titles, and 18–20px readable body. The first episode has a concise summary, a smaller What changes heading, and underlined character/evidence links. The marker path provides structure without wrapping the reading content in cards.

**Visible labels:** Story & timeline; During the investigation; Earlier events & aftermath; Expand all; A City in Crisis; The Investigation Begins; A Difficult Accusation; Suspicion and Authority.

**Implementation consequence:** retain the visible distinction between views, clear expansion state, and links to evidence. Actual data supplies separate event/revelation records, rather than sorting the same summaries arbitrarily. Use ordinary keyboard-operable controls and label the active view.

**Corrections:** move the spoiler notice before the revealing synopsis. Use vetted plot information; the generated synopsis/episode paragraph is not the content source. Remove the extra laurel wordmark and keep shared typography.

## Characters: image analysis

**Visual priority:** search by name, scan identifiable profiles, then open a role/relationship explanation.

**Composition:** title and spoiler note precede a wide, comfortably sized search field, with result count at the right. The image resolves into a full-width editorial list rather than the prompted two-column index. Each profile row pairs a square portrait at left with name, italic role, short description, and disclosure action on the right. Oedipus is expanded, exposing labeled relationships and an evidence link. The following rows show Jocasta, Creon, and Tiresias. Stone dividers and a meander footer establish rhythm.

**Type and spacing:** names are approximately 32–40px; body is approximately 18–20px. Expanded portraits are around 180–200px; collapsed portraits are smaller. The search row has a visible label, meaningful placeholder, and result count.

**Implementation consequence:** a full-width row is especially useful for the plan's long profile content; a desktop multi-column variation may reuse the same grammar if it remains readable. Keep descriptions and relationships as real text, preserve names in search results, and make disclosures available without hover.

**Corrections:** use separately generated character portraits. The mock reuses the Sphinx face for Jocasta and therefore cannot supply the actual profile imagery. Do not copy the added laurel/palmette into every page heading. Expanded disclosure text/state must accurately reflect its action.

## Analysis: image analysis

**Visual priority:** a theme question and explanation, supported by a passage and another reading.

**Composition:** title/lead at upper left, an eye/profile motif at upper right, then a full-width spoiler notice. A left contents rail is separated from the reading column by a thin vertical rule. The selected Fate and free will item is burgundy. The right column has a serif theme heading, burgundy italic question, two paragraphs, a flat excerpt between horizontal rules, and an Another reading section.

**Type and spacing:** about 56px page title, 44–48px theme heading, and 18–20px prose. Paragraphs are open rather than separately boxed. The body column in the generated image is too wide; cap actual prose at the plan's 65–75ch measure.

**Implementation consequence:** preserve the contents/reading relationship, section anchors, evidence linkage, and distinct alternative reading. A small eye or obscured-profile motif can remain decorative and non-graphic.

**Corrections:** the sentence “I must pursue this trail to the end” in the image is illustrative, unverified copy. Exclude it from the website quotation dataset and substitute the verified passage selected by the content author. All generated thematic prose also yields to the sourced editorial content. Maintain approved sans on contents links and controls.

## Passages: image analysis

**Visual priority:** source information, combined filters, result count, and traceable excerpts.

**Composition:** the useful interface begins with a horizontal toolbar: Keyword field, Speaker selector, Theme selector, and Clear filters. A separate result row has a count at left and Saved only checkbox at right. Entries are flat stacked reading units with a title/speaker/excerpt/context at left, save action near the top, and a narrow right rail for theme links, Copy passage, and original-source link. Thin rules separate entries.

**Type and controls:** titles are approximately 32–40px, excerpts approximately 24px serif, body approximately 18–20px. Clear filters is an underlined action. The right rail is separated by a thin rule rather than an enclosing box. The actual interface must preserve source attribution when copying.

**Implementation consequence:** keep the toolbar/result/list hierarchy and make filters combine with AND. Stack filters and side actions naturally on phones. Empty and saved-empty states should keep the same typographic grammar.

**Corrections:** the generated giant Sphinx illustration and laurel opening are excess decoration: omit them because PLAN Section 10.7 makes typography/evidence the focus here. Use a compact heading and edition note. Verified JSON supplies all excerpts, locators, speakers, and analysis; sample text in the image is not the source.

## Activities: image analysis

**Visual priority:** question, selected answer, and Check answer. The practice-only note is visible near the action; reflection follows below.

**Composition:** page title/lead/spoiler note above a rule. The core quiz has a heading, Question 1 of 10, a thin progress line, a serif question, and four large labeled radio rows. One option is selected in burgundy. Check answer is the sole primary action. A right contents rail names Quiz, Arrange the investigation, and Written reflection. A rule separates the quiz from Make your own argument and a labeled response textarea.

**Type and controls:** question text is about 30–36px; answer rows about 20–24px, with roughly 48px row height. The response field has a visible boundary and comfortable writing area. Progress is secondary, never a score badge.

**Implementation consequence:** use real radio inputs, explicit unanswered feedback, submission locking, explanations, final review, and retry. Keep responses as plain text. The actual layout should remain a focused workspace and show only local save claims where implemented.

**Corrections:** omit the image's extra giant Oedipus figure and multiple decorative laurels. They crowd the plan's clean activity area. Use the approved sans controls and 44px+ targets. The first visible question/answer is usable only after checking it against the content dataset.

## About: image analysis

**Visual priority:** origins and author context in a reading layout, with sources accessible nearby.

**Composition:** a long but legible serif title, italic lead, and theatrical-mask motif at upper right. Below, left contents links identify Origins, Sophocles, Greek theatre, Form & influence, About this guide, References, and Visual credits. The main reading column contains Origins of the story, paragraphs, a source row, a Follow the story link, a thin ornamental divider, then Sophocles and the start of the author profile.

**Type and spacing:** approximately 56–64px title and 40–44px section headings. Body is around 18–20px, with clear paragraph separation. The thin vertical rail divider and occasional palmette reinforce the shared system without additional cards.

**Implementation consequence:** preserve direct section IDs, visible source links, and the distinction between mythical setting, historical authorship, and modern interpretation. Cap prose width; stack contents above reading on narrow screens.

**Corrections:** use one approved theatrical mask rather than the generated comedy/tragedy pair. The generated bibliography naming Harding is invented and must not appear in the website. Use verified source records for biography and context; uncertain historical dates remain qualified. No personal student details are supplied by the image.

## Verification boundary

The reference set is complete and inspected. It establishes visual composition and component relationships; it does not verify website behavior, factual claims, color contrast, keyboard access, or responsive output. Those require checks on the actual build. The plan's content and functional requirements remain fully binding beyond the first viewport shown in each image.
