# Visual references — guided discovery, second iteration

Prepared 11 November 2026 for the approved implementation of PLAN.md Section 13. Generated with the built-in image generation tool, one fresh independent readable viewport per composition. All three images were opened and inspected. These are design references, not screenshots of implemented UI.

## Files and source assets

- `home.png` — 1536 × 1024.
- `story.png` — 1536 × 1024.
- `analysis.png` — 1536 × 1024.
- `prompts.json` — exact full prompts for the three built-in generation calls.

These compositions, exact prompts, and interpretation notes are preserved here as development references. They are not runtime artwork or screenshots of the application. The fourteen existing optimized illustrations remain the shipping artwork.

The actual existing hero, Oedipus portrait, Tiresias portrait, and sight motif were inspected before generation. They were supplied to the tool as art references. They remain separately rendered shipping assets; do not crop images or text out of these UI mockups.

## Governing rules

PLAN.md Section 13 preserves the existing identity while amplifying composition. Keep the exact six tokens: ivory `#F5F0E6`, charcoal `#211E1B`, burgundy `#7A263A`, bronze `#70542B`, stone `#D8CFBF`, and muted ink `#5C5851`. Use Libre Baskerville for headings/selected excerpts and Source Sans 3 for prose, navigation, and controls. Generated incidental shades or font approximations are not new tokens.

The shared ivory header and underlined burgundy active navigation are preserved across the references. There are no decorative laurel logos, nested card grids, glass surfaces, or gradients. The amplified identity comes from a charcoal stage, meaningful portrait scale, one expressive quotation surface, and calm reading areas.

The original reviewed guide dataset remains the content source. Text visible in a generated mockup does not establish a new literary fact, source, theme name, or knowledge state. Differences from the approved data must be corrected explicitly as listed below.

Approximate dimensions below are visual estimates, not automated pixel measurements.

## Home: theatrical opening

### Observed composition

The ivory header occupies roughly 80px of the 1024px viewport. Below it, charcoal spans the full width, allowing the existing hero image ground to merge into the exhibition stage. A large ivory two-line Oedipus Rex sits at left, while the Oedipus/Sphinx composition occupies most of the right two-thirds. Art is no longer a small rectangle accompanying a heading; it determines the visual balance of the opening.

An ivory editorial inset joins the lower-left portion of the stage. It contains the italic burgundy A search for truth., a compact body, the primary Begin the investigation, and secondary Explore the study guide. Burgundy remains on ivory, never unreadably on charcoal. The art caption is subdued ivory at lower right. A meander boundary makes a deliberate transition to the calmer four-part factual metadata row.

### Extracted hierarchy and copy

1. Oedipus Rex — large ivory display, two lines maximum.
2. A search for truth. — italic burgundy on ivory.
3. Follow the clues. Examine the evidence. Discover how a search for truth becomes a search for identity. — seventeen-word editorial lead.
4. Begin the investigation — sole primary action.
5. Explore the study guide — ordinary underlined secondary link.
6. Oedipus and the Sphinx · modern interpretation — artwork caption.
7. Author Sophocles; Form Greek tragedy; Setting Thebes; Translation F. Storr — metadata.

### Implementation implications

- Preserve the stage/art/title relationship and immediate starting action, rather than merely changing the baseline hero background to dark.
- Keep the actual hero file intact with both meaningful figures visible. Do not isolate or invert the figures through crude CSS filters.
- The mock title is oversized at approximately 140px. Use a controlled fluid scale, preserving two lines and a visible action at a 1366 × 768 laptop. Larger type is not the main source of amplification.
- The stage consumes approximately y80–915 in the 1536px mock. Reduce its vertical footprint when translating to a small laptop; keep Begin the investigation in the first viewport.
- The generated ivory inset has a large curved edge. Its functional purpose is an ivory text/action area adjoining the stage. A more restrained architectural contour can preserve the approved exhibition grammar if the rounded panel becomes decorative or awkward on mobile.
- On phones, retain the ivory navigation, then readable title/action and a complete art composition. Do not shrink a three-part desktop arrangement uniformly or use fixed viewport-height clipping.

## Story: one chapter of the investigation

### Observed composition

The investigation appears beneath the shared header, with Open the full study timeline as an ordinary link to unrestricted study access. Three desktop regions have distinct priorities: a narrow eight-stop chapter rail, a dominant central reading area, and quieter knowledge summaries at right. Thin architectural rules separate regions without turning each into another box.

Episode 3 of 8 is selected. The central opening is a charcoal stage with the ivory title A Difficult Accusation at left and the actual Tiresias portrait in a retained ivory field at right. Keeping the existing portrait ground preserves artwork quality and coherent margins. Below, reading returns to ivory: short scene development, a source excerpt, and Read the evidence. Previous/next controls and a nonblocking question close the chapter.

The right region distinguishes Oedipus believes, Tiresias claims, and Evidence status: Accusation. This shows why a true accusation and an accepted explanation are different. No later testimony or family confirmation is displayed in this early chapter.

### Text and interaction extraction

- The investigation.
- Open the full study timeline.
- Episode 3 of 8.
- A Difficult Accusation.
- Tiresias accuses Oedipus, but the accusation has not yet been established through later testimony.
- I say thou art the murderer of the man / Whose murderer thou pursuest.
- Tiresias · F. Storr.
- Read the evidence.
- Oedipus believes: The accusation is part of a plot against him.
- Tiresias claims: Oedipus is the killer he seeks.
- Evidence status: Accusation.
- Why does the accusation fail to persuade?

The excerpt comes from the actual `accusation-truth` passage in the existing dataset. Render its stored newline rather than the mock's literal slash separator. All knowledge summaries must still use the reviewed episode-specific data.

### Implementation implications and corrections

- Give the center reading area priority. Approximate mock proportions are 18% rail, 52% reading/stage, and 28% knowledge, with small gutters. Adapt these within the actual max-width rather than squeezing equal columns together.
- Keep chapter titles around 40–64px as space permits, regular prose around 18–20px, and comfortable 44px navigation/action targets.
- Use the authored current-episode/earlier-evidence limits. The mock illustrates only two knowledge roles; the real component also needs the planned audience-heard/inference distinction when supported by the data.
- The chapter rail can list future episode names, but supporting knowledge/evidence must not leak later confirmation into an earlier episode. Progress does not imply comprehension.
- Read the evidence expands the real record adjacent or inline; it does not navigate away by default or open a modal over the reading.
- On mobile, episode navigation goes above the reading, with knowledge and evidence inline below. Preserve the current step, previous/next actions, and direct full-study access.
- Move focus to the changed chapter heading and announce its position. Animate only a controlled state change and respect reduced motion.

## Analysis: a claim supported by close reading

### Observed composition

Sight and blindness has an enlarged sight motif at the top-right, intentionally shaping the composition rather than occupying a small thumbnail slot. The title and question occupy the left opening. Under them, a contents rail is separated from the reading by a thin vertical rule.

The central argument is structured visibly: The claim, one burgundy quotation field with ivory type, How the evidence works, Another reading, and a contextual glossary link. The quotation is the sole expressive color interruption. The explanation remains on calm ivory rather than turning the entire page into a dark or burgundy panel.

### Extracted hierarchy

- Sight and blindness.
- What is the difference between seeing and understanding?
- The claim: Physical sight does not guarantee understanding. The confrontation with Tiresias asks whose knowledge deserves to be trusted.
- I say thou art the murderer of the man / Whose murderer thou pursuest.
- Tiresias · F. Storr, followed by Read the evidence.
- How the evidence works.
- Another reading.
- Recognition: from ignorance toward knowledge.

The excerpt is the real `accusation-truth` record. The visible claim/explanation sentences are layout material; the final argument should come from the updated reviewed theme content and close-reading data.

### Implementation implications and corrections

- Keep all five existing thematic categories and their IDs. The model invented/reworded contents items such as Knowledge and power, Fate and freedom, Guilt and responsibility, and Truth and suffering; these are not authorized new categories.
- Remove the model-added ANALYSIS / CLOSE READING eyebrow. Restore the explicit full-plot notice before revealing content instead.
- Keep the sight art at a deliberate scale, using its actual ivory background and preserving meaningful features. It is a modern interpretive motif, not a source of biographical or archaeological claims.
- Maintain a 65–75ch prose measure; the reference center column is slightly wide. A short claim followed by one close-reading paragraph is more useful than reproducing the mock's line lengths.
- Use a shared quote component with ivory text on burgundy, a source label, and a clear evidence action. The mock literal slash becomes the stored line break. No fabricated line numbers.
- Avoid copying the narrow vertical burgundy selection bar at more than 1px if the shared component system uses an underline or text state instead. Keep consistent accessible selection cues.
- On mobile, place the art near the introduction, contents above the argument, and quotation at a readable 24–32px rather than forcing a desktop display size. Labels and copy controls retain normal touch targets.

## Cross-route extension

These three references establish a limited expressive vocabulary for the other routes: a purposeful charcoal art stage, calm ivory reading, one large selected portrait, and occasional burgundy quotation/reflection punctuation. Do not repeat all contrast treatments on every page. Each route keeps its own task and one dominant visual idea as specified in PLAN 13.7.

The references do not establish application behavior, measured contrast, keyboard accessibility, responsive layouts, source accuracy, or storage migration correctness. Those must be checked on the built interface. Reuse existing assets, stable IDs, and local state rather than treating these compositions as permission to add a backend or replace the original content model.
