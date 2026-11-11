---
name: "Oedipus Rex: A Search for Truth"
description: "A contemporary literary exhibition of Greek tragedy."
colors:
  paper: "#f5f0e6"
  ink: "#211e1b"
  burgundy: "#7a263a"
  bronze: "#70542b"
  stone: "#d8cfbf"
  muted-ink: "#5c5851"
typography:
  display:
    fontFamily: '"Libre Baskerville", Georgia, serif'
    fontSize: "clamp(70px, 7.2vw, 96px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Libre Baskerville", Georgia, serif'
    fontSize: "clamp(36px, 4.4vw, 62px)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"Libre Baskerville", Georgia, serif'
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: '"Source Sans 3", sans-serif'
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: '"Source Sans 3", sans-serif'
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.65
rounded:
  control: "3px"
spacing:
  "8": "8px"
  "12": "12px"
  "16": "16px"
  "20": "20px"
  "24": "24px"
  "28": "28px"
  "32": "32px"
  "40": "40px"
  "48": "48px"
  "64": "64px"
  "72": "72px"
  "80": "80px"
components:
  button-primary:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-secondary-hover:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.burgundy}"
    padding: "8px 0"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  timeline-selected:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.paper}"
    padding: "12px 18px"
  episode-current:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.paper}"
    padding: "12px 10px"
  relationship-filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  relationship-filter-selected:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.paper}"
---

# Design System: Oedipus Rex

## Overview

**Creative North Star: "A contemporary literary exhibition of Greek tragedy"**

The exhibition pairs a theatrical opening with calm, evidence-led reading. Charcoal stages give the title and Greek figures room to command attention; ivory invitations and reading areas carry the actions, explanations, and writing. Occasional burgundy source quotations punctuate the sequence. Large literary headings, modern vase-inspired artwork, fine rules, and familiar controls keep the experience serious and reflective.

This is the built second iteration of the identity approved in PLAN.md Sections 10 and 13. Each route has a distinct composition while retaining the same six colors, two font families, and flat reading surfaces. `src/app/globals.css`, `src/app/home.module.css`, and the current `src/components/*module.css` files supply the extracted values and states. The final desktop, mobile, detail, and tablet captures in `.impeccable/review-v2/` record the rendered result. `design-references/v2/` holds development references; `ASSETS.md` records shipping artwork and provenance.

The frontmatter records reused implementation values, not an additional theme layer. Spacing entries are recurring measurements extracted from CSS; the implementation has no spacing custom properties. Route-specific type sizes remain documented variants rather than a manufactured universal ramp.

**Key Characteristics:**

- Warm ivory reading areas, charcoal artwork stages, and occasional burgundy quotations.
- Libre Baskerville headings and quotations; Source Sans 3 reading text and controls.
- Flat, rule-separated evidence and writing workspaces with restrained framing.
- One consistent family of modern Greek illustrations and deliberate meander boundaries.
- Native controls, explicit selected and saved states, and reading order preserved as columns stack.

## Colors

The six global tokens form one palette across the site. Illustration pigments are not interface tokens. The sidecar preserves synthesized eight-step OKLCH ramps as preview metadata; those ramps do not add shipping interface colors.

### Primary

- **Burgundy:** primary actions, links, selected episodes and relationship controls, current navigation, focus outlines, and textual feedback. It also fills the Home quotation and two selected Analysis quotations, paired with paper text. Important states include words, icons, an underline, or programmatic state.

### Secondary

- **Bronze:** field and control boundaries, reading-rail rules, timeline markers, relationship linework, supporting headings, the brand icon, and meander ornament. It stays subordinate to the primary action and reading text.

### Neutral

- **Paper:** the main reading ground, the Home invitation, light text on dark surfaces, and the open evidence interior inside burgundy quotation stages.
- **Ink:** main text and headings, the Home stage, guided episode portrait stages, shared footer, and primary-button hover.
- **Stone:** quiet dividers, metadata separators, progress tracks, secondary-button hover, literal search highlighting, and the assembled-response surface. On charcoal, it carries supporting captions and footer copy.
- **Muted ink:** captions, citations, metadata, leads, inactive navigation, and supporting labels on paper.

**The Shared Palette Rule.** Reuse the six global CSS color properties on every route. Checked choices and quiz feedback use faint transparent burgundy derivatives, not separate success or error palettes.

**The Contrast Punctuation Rule.** Use the implemented charcoal artwork stages and occasional burgundy source quotations as distinct moments; keep sustained explanation, evidence details, and form work on paper.

## Typography

**Display Font:** Libre Baskerville, with Georgia and serif fallbacks. Locally bundled Latin faces are regular (400), italic (400), and bold (700).

**Body Font:** Source Sans 3, with a sans-serif fallback. Locally bundled Latin faces are regular (400), semibold (600), and bold (700). Fontsource imports supply the assets without remote font requests.

The serif carries the literary voice and source quotations. The sans carries explanations, navigation, labels, and interaction. There is no pseudo-Greek or monospaced display face. Heading sizes vary with route and purpose rather than following a mathematical scale.

### Hierarchy

- **Display:** the frontmatter display role is the Home title, in paper on charcoal. At widths up to 1050px it becomes 76px; up to 767px it becomes 64px; up to 390px it becomes 54px. Its line height remains 1.08. The forced title break disappears at 767px, then returns at 390px. The italic burgundy invitation subtitle is 31px/1.3, then 26px at 1050px and 25px at 390px.
- **Headline:** shared route titles use the frontmatter headline role. Story uses the compact title variant (`clamp(36px, 3.5vw, 48px)`). Shared leads are sans (21px), muted ink, with a 58ch cap; at 600px they become 19px.
- **Title:** the global second-level heading uses the frontmatter title role, becoming 28px at 767px. Global third-level headings are 24px, then 22px. Reading articles use 34px/29px headings; selected character names use 34px/30px; Activities and reflection openings use 36px/30px. These are observed content variants.
- **Chapter:** guided stage titles use serif (`clamp(27px, 2.8vw, 40px)`, line height 1.28), then 36px at 1100px, 28px at 767px, and 24px at 390px. Takeaways are burgundy serif (22px/1.55, then 21px). Knowledge-area copy is sans (15px/1.7).
- **Body:** the frontmatter body role stays 18px on mobile. General prose is capped at 70ch; route measures range from 65ch to 74ch. Guided summaries use line height 1.8. The Home invitation lead uses 18px/1.5 with a 37ch cap, then 17px at 1050px.
- **Quotation:** global blockquotes are serif (25px/1.65), then 22px at 767px. Passage entries use 28px with a 48ch cap, then 23px at 600px. Inline evidence previews use 24px, then 21px at 600px. Comparison quotes use 23px/1.7, then 22px at 767px. Analysis quotation stages use 28px/1.65, then 23px; the Home quotation uses `clamp(26px, 3.3vw, 42px)`/1.5 and a 31ch cap.
- **Label:** the frontmatter label role describes field labels. Site navigation and shared primary controls use 16px sans; primary controls are semibold. Other supporting controls use 14–16px. Captions and attribution use 12–15px according to context. Home fact labels use uppercase 12px with 0.08em tracking; tabular numerals support episode ordinals and quiz progress.

**The Reading Roles Rule.** Keep navigation, field labels, and control copy in the sans family even when a generated reference shows serif controls.

## Layout

The outer container has a maximum width of 1280px including 40px horizontal padding. Header and main content cap at 1200px. At 767px, shell gutters become 22px. Home stages and the shared footer extend through those gutters with matching negative margins; prose narrows independently.

Major sections commonly separate by 64px; the shared section margin becomes 44px on mobile. Shared headings have 64px top and 32px bottom padding, reduced to 44px top at 900px and 36px/24px at 600px. Story's compact opening uses 38px/22px. Home introduction margins are 80px, becoming 52px on mobile; exploration uses 72px, then 48px. Gaps of 8–32px connect related controls and text, while 40–64px gaps separate larger regions. The Home introduction's wide-screen gap is 96px. These are observed rhythms, not a requirement that every measurement be divisible by eight.

### Responsive behavior

| CSS maximum width | Implemented change |
|---|---|
| 1100px | Story changes from three columns to a 160px episode rail plus main column; knowledge moves below the chapter in the main column with two internal columns. The relationship portrait column narrows to 260–300px and network buttons narrow to 104px. |
| 1050px | Desktop navigation gaps tighten; Home title, invitation padding, subtitle, illustration ratio, and introduction spacing reduce. |
| 900px | Site navigation becomes a native Menu disclosure. Reading rails narrow to 180px with 32px gaps; passage filters become two columns and metadata rails narrow to 180px. Relationship identity and network regions stack, with portrait and identity text beside each other. |
| 767px | Shell gutters become 22px. Home, reading layouts, and comparison excerpts stack. Story replaces the desktop episode list with a labeled native selector; knowledge becomes one column. Reading contents become static wrapping links. Activity section links appear above the workspace. Profile descriptions span the full mobile row beneath the portrait/name. Glossary, recommendations, argument evidence choices, and author milestones become single columns. |
| 680px | Relationship identity stacks with a centered portrait up to 340px wide. Filter buttons and character choices become two-column grids; diagram lines and their redundant legend are hidden while the explanatory relationship list remains. |
| 600px | Passage filters and metadata stack; passage quotes reduce; redundant page-heading motifs disappear. Footer and continuation regions stack. |
| 390px | Home title becomes 54px; guided stage uses a 110px portrait column and a 24px title. |

### Route expressions and artwork

The fourteen WebP illustrations under `public/images/` retain one modern Greek vase-inspired family. They are modern interpretations, not authenticated likenesses or archaeological reconstructions. Meaningful figures remain intact; profiles are contained compositions rather than face-cropped avatars.

| Route | Built composition |
|---|---|
| `/` | Charcoal title/art stage, ivory invitation with the burgundy investigation action, complete `oedipus-sphinx.webp` composition, and meander boundary. The wide grid is `0.92fr / 1.45fr` with a 20px gap. Four-column facts become two columns on mobile; the introduction, burgundy source quotation, and rule-separated exploration links provide distinct reading beats. A resume link appears only when a real last-opened episode exists. |
| `/story/` | Compact introduction and an eight-episode guided investigation. The wide layout is `174px / minmax(0, 1fr) / 244px` with 30px gaps: episode rail, chapter, knowledge. Each chapter has a charcoal title/portrait stage. Knowledge precedes the conclusion in DOM and stacked layouts; the question, optional checkpoint, explicit reading marker, and navigation remain in the center column on desktop. Full study retains the unrestricted chronology/revelation controls and bronze timeline. |
| `/characters/` | A selected portrait up to 340px wide anchors the relationship explorer beside the network. Ten native character buttons, connection filters, typed linework, and an explanatory list communicate selection. The searchable, grouped profile-disclosure index remains below. Mobile retains the full description and text relationships while replacing diagram lines with a two-column character grid. |
| `/analysis/` | Sight motif at the opening; sticky reading contents beside a column capped at 74ch. Theme sections sequence question, claim, attributed evidence, explanation, close reading, fuller discussion, and alternative reading. The first and sight-theme quotations use burgundy stages; other evidence stays ruled and flat. Techniques have distinct anchor destinations. |
| `/passages/` | A precise comparison workspace above filters and fourteen flat evidence entries. Comparison shows at most two attributed excerpts side by side, then stacked at 767px. Library entries retain a 210px metadata rail with a 64px gap; the rail narrows at 900px and joins the flow at 600px. Saved-only entries expose evidence-note fields. |
| `/activities/` | Focused quiz and writing column with a 220px section rail and 64px gap. Progress, native radio rows, textual feedback, relevant reading recommendations, ordering controls, argument scaffold, and saved reflections share the paper workspace. The rail becomes links above the workspace on mobile. |
| `/about/` | Larger theatrical-mask opening, shared reading layout, and a four-entry author chronology with source links. Chronology dates occupy a 110px column on desktop and stack above entries on mobile. References and visual credits remain open reading sections. |

## Elevation & Depth

The reading interface is flat. Typography, spacing, solid artwork grounds, and one-pixel rules establish hierarchy. Evidence, profiles, comparison excerpts, fields, and writing surfaces have no floating shadows. Quiz feedback has a faint burgundy wash; assembled writing uses stone without elevation. The only shared shadow is the temporary mobile menu (`0 12px 24px #211e1b14`).

**The Flat Reading Rule.** Preserve open reading space and fine separators; do not add shadowed panels around every paragraph, passage, or profile.

## Shapes

Controls use the single understated control radius. Buttons, fields, timeline selectors, relationship filters and character buttons, radio rows, and ordering arrows follow it. Editorial sections, invitation and quotation surfaces remain square-edged. One-pixel bronze and stone strokes define boundaries. The full-study timeline's circular markers are specific diagram shapes, not a pill-control system.

The Home illustration and palace threshold are landscape; profiles and motifs are square. Selected portraits preserve the whole figure. The shared footer carries a repeating bronze meander in an 18px-high SVG strip; Home uses the same geometry as a stage boundary. Ornament does not surround every component.

## Components

### Buttons and links

Primary buttons are burgundy with paper text, a matching one-pixel border, semibold sans (16px), a 12px icon gap, and a minimum height of 48px. Hover changes fill and border to ink. Secondary buttons use transparent fill, ink text, and bronze border; hover uses stone. At 767px, shared button padding becomes 11px/18px.

Text actions are underlined burgundy with an 8px icon gap and a minimum height of 44px. Prose links retain underlines with a 4px offset; hover thickens them from 1px to 2px. Buttons move downward by 1px when pressed; disabled buttons use a not-allowed cursor and 0.5 opacity. Relationship controls are compact rectangular buttons; passage themes remain plain links.

### Inputs / Fields

Inputs, selects, and textareas use transparent paper-facing surfaces, a one-pixel bronze boundary, inherited sans type, the control radius, and a minimum height of 46px. Field labels sit above at 15px/600. Placeholders use muted ink at full opacity. General textareas start at 160px and resize vertically; evidence-note fields start at 110px and argument fields at 100px. Search and filters have real labels.

Literal search matches use stone with burgundy text and 2px horizontal padding. Saved-evidence notes use a top rule, full-width textarea, character count, explicit unsaved/saved text, save button, copy action, and status. Notes appear in the saved-only view; they are plain text and are not autosaved.

### Navigation and shell

The header pairs a serif wordmark with a light Phosphor tragic-mask icon in bronze. Desktop links are sans (16px) with muted text; the current route is burgundy with a two-pixel underline and `aria-current="page"`. The header has a stone bottom rule and minimum height of 80px, then 72px at 900px. It remains in document flow.

The native Menu disclosure has a labeled list-icon trigger of at least 44px and a 260px-wide paper panel with a bronze border. Choosing a link closes it. Reading rails are sticky 30px from the top on wide screens and become static wrapping links on mobile. Analysis and About active section links use burgundy, an underline, and `aria-current="location"`.

The shared footer is charcoal with paper links, stone supporting text, a bronze meander, and a ruled colophon. Focus outlines on the footer are paper. It repeats the exhibition identity without adding a new reading container.

### Guided episodes and full study

The guided/full-study mode buttons are quiet text controls, with burgundy text and a two-pixel underline for the selected `aria-pressed` state. Desktop episode buttons use a stone bottom rule, numeric ordinal, and a burgundy/paper current-step fill; completed episodes add a check icon. On phones, a labeled native selector replaces the long list and includes read markers.

A chapter stage places a title beside a contained witness portrait on charcoal. Takeaway, summary, and inline evidence follow on paper. The separate knowledge area uses bronze and stone rules, sans category headings, and textual distinctions among belief, claim, and audience inference. It comes before the conclusion in DOM order. At 1100px it joins the center-column flow; at 767px the whole sequence stacks. The question, optional radio checkpoint, reading marker, and previous/next actions follow it. Selecting an episode focuses and scrolls its heading; checkpoints never lock navigation. Marking read is an explicit action, not a score.

Full study retains its two-button, bronze-outlined timeline order selector with paper-on-burgundy selected state. Bronze vertical rules, circular markers, and native episode disclosures expose the complete investigation or earlier-event order. Open markers fill burgundy, and chevrons rotate. Legacy episode anchors open this full-study view.

### Relationship explorer

The selected portrait, identity, and supporting evidence sit beside the network on desktop. Filters have bronze outlines, stone hover, and paper-on-burgundy `aria-pressed` selection. Network buttons use paper, stone borders, muted names, and small portraits. Directly connected people receive bronze borders and ink text; the selected figure uses burgundy/paper and keeps a paper square behind the portrait.

The line legend distinguishes biological (solid burgundy), adoptive (bronze, 4/4 dash), marital (burgundy, 8/4 dash), political (muted ink, 10/3/2/3 dash), and investigative (ink, 2/4 dash) ties. These SVG lines are decorative; the explanatory text list is the relationship alternative and retains multiple ties separately. Selection is announced in text. No dragging or zooming is needed. Empty filtered relationships offer a labeled recovery action; full-profile links reopen and focus the matching profile.

### Evidence previews, quotations, and definitions

The shared evidence preview is a native inline `details` disclosure between bronze/stone rules. Its summary is semibold sans (16px), at least 52px high, with book and chevron icons. Open content includes a serif quotation, speaker/edition attribution, locator, labeled context, bookmark and attributed-copy actions, source and complete-entry links, and Close evidence. Close and Escape restore focus to the summary while retaining the episode or character selection.

Inside burgundy quotations, the closed summary is paper; opening it creates a paper interior with burgundy summary and ink reading text. The focus color follows the current surface. Guided previews show the authored episode context and a spoiler-labeled full-study link; they suppress later full-study interpretation.

Contextual glossary terms are native buttons with dotted bronze underlines. Their toggled definitions appear in flow as small stone-backed notes, capped at 32ch, with `aria-expanded`. The full glossary uses native disclosures. Neither pattern requires hover to read.

### Passage comparison and saved evidence

The comparison workspace uses a bronze top rule, a title and labeled pairing selector, a selection-count tray, and at most two ruled excerpt columns. Each excerpt retains its title, removal action, serif quotation, attribution, context, and evidence disclosure. One selected entry prompts the second; two entries reveal a comparison question. At 767px the header and excerpts stack without losing attribution. Unselected add-to-comparison actions disable when two entries are selected.

Library entries remain flat: excerpt, burgundy attribution, muted locator, context disclosure, copy action, and a narrow metadata/action rail. Bookmark controls combine an icon, words, and `aria-pressed`; selected comparison controls state their selection in words. Saving and copy results use status text. Empty results offer a clear-filter recovery action.

Saved-only entries add a labeled plain-text evidence note with a 2,000-character limit, an explicit save action, a copy action, and visible unsaved/saved feedback. Notes stay in browser storage; failed saves keep the open draft and report the problem.

### Quiz, feedback, and writing

Quiz choices are bronze-outlined native radio rows, using a faint burgundy tint and burgundy border when checked. Radios and the five-pixel progress bar use burgundy; progress labels use tabular numerals. Missing answers produce an alert. Feedback uses an icon/text heading, supported answer, explanation, evidence link, and next action on a faint burgundy wash (`#7a263a06`), with bronze/stone rules. Result recommendations link to the relevant reading; question review remains in native disclosures.

The optional argument scaffold uses labeled fields and up to two native evidence checkboxes. Its assembled-response preview is a flat stone surface with preserved line breaks. It stays in the current tab and does not overwrite saved reflections; copying or explicitly saving a reflection remains a separate action. Reflection labels are serif above full-width textareas, followed by count and save feedback. Ordering uses numbered rows and square, labeled 44px arrow controls.

### Motion and accessibility

State transitions for shared buttons, full-study episode chevrons, relationship filters, and network buttons use 180ms ease-out. Home exploration arrows use 200ms ease-out and move right by 5px. Guided chapter changes use a 220ms ease-out entrance from a 5px vertical offset. Artwork stays static; there is no continuous animation. Reduced-motion rules remove transitions and animations throughout and change smooth anchor scrolling to automatic scrolling.

Keyboard focus normally uses a two-pixel burgundy outline with a 5px offset. The Home stage, footer, and burgundy quotation surfaces use paper outlines; the ivory Home invitation and opened inverse evidence restore burgundy. A focusable skip link precedes the shell, anchor targets have a 28px scroll margin, and important states include visible text. Meaningful illustrations have descriptive alternatives; redundant motifs and meanders are hidden from assistive technology. These implementation facts do not establish accessibility conformance by themselves; verification results belong in `VERIFICATION.md`.

## Do's and Don'ts

### Do:

- **Do** reuse the six global palette tokens and shared font roles across routes and states.
- **Do** use charcoal stages and occasional burgundy quotations to punctuate calm ivory reading.
- **Do** keep evidence and interpretation distinct through source labels, quotation type, and fine rules.
- **Do** preserve knowledge-before-conclusion order and full-width descriptions as layouts stack.
- **Do** retain the explanatory relationship list and native keyboard-operable controls.
- **Do** reuse shipping artwork, preserve meaningful figures, and identify it as a modern interpretation.
- **Do** keep actions labeled, focus visible on each surface, and saved or selected states understandable through text or icons.
- **Do** respect reduced motion and keep illustrations static.

### Don't:

- **Don't** turn incidental illustration colors or mockup text into new design tokens or literary evidence.
- **Don't** use serif text for form controls or decorative pseudo-Greek lettering for English.
- **Don't** wrap every paragraph, passage, or profile in a shadowed card.
- **Don't** add textures behind reading text, form fields, or feedback.
- **Don't** communicate saved, selected, correct, or incorrect states with color alone.
- **Don't** replace the relationship text alternative with a pointer-only diagram.
- **Don't** expose later full-study interpretation inside an early guided evidence preview.
- **Don't** present illustrations as authenticated ancient portraits, museum objects, or reconstructions.
