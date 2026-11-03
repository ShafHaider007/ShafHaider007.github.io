# Design direction

## The idea: every figure carries its provenance

Shaf's work measures land change and then asks how sure the measurement is: accuracy against reference data, confidence intervals, and what each dataset can and cannot see. The site holds itself to the same standard.

**Every figure is a numbered plate.** Its caption states:

- the place
- the date
- the data source
- whether it comes from a project or was recomputed for this site from open data

**Every claim about Shaf traces to a source document:** the CV, the transcript or a public link.

The look follows from this. It is laid out like a well-made technical report: white page, dark text, figures in thin-framed plates, captions under figures, numbers in a monospaced face. The only strong colour on the site is inside the figures, where it carries meaning: the land-cover legend, a vegetation scale, loss in red.

**Name-swap test.** Put another researcher's name on the site and it stops making sense. The figures show Murree, Cholistan, Islamabad, Sahiwal, Lagos and DHA Lahore, and each caption names the project and the dataset behind it. The colours come from Shaf's own classification legends. Nothing in the design is decoration that would fit anyone else.

## Rules

**Type**
- IBM Plex Sans for headings, navigation, labels, tables and captions:
  - 600 for headings
  - 400 or 500 for everything else
- IBM Plex Serif for reading text: research statements, project text and walk-through steps.
  - 17 px with a 1.65 line height on desktop
  - 16 px on phones
  - lines no longer than about 68 characters
- IBM Plex Mono only for data: dates and coordinates in captions, values in tables and figures.
- Sizes: 13, 15, 17, 20, 24, 30 and 40 px. No display type above 40 px.
- No italic for emphasis in headings, and no letter-spaced capitals for body labels.

**Colour**
- Page `#ffffff`. Text `#15191c`.
- Secondary text `#465057` (8:1). Tertiary text `#5a636a` (6:1). No text lighter than tertiary.
- Rules `#d9dde0`.
- Links `#1c4f8a` (8:1), underlined. Hover darkens the colour and thickens the underline.
- Focus: a 2 px outline in the link colour with a 2 px offset, on every interactive element.
- Figure ground `#f6f4ef`, the paper colour already baked into the figure images. It is used only inside plates.
- Semantic figure colours:
  - land-cover legend
  - red `#b8452a` for loss or degraded
  - teal `#2f6f7e` for gain or improved
- None of these colours is used in the interface chrome.

**Spacing**
- 4 px base unit.
- 16 px side gutters on phones and 32 px from 640 px wide.
- 64 px between sections on phones and 96 px on desktop.
- One column of reading text. A side column on wide screens holds only metadata: role, dates, sources.

**Images and figures**
- Only figures made from open data by the scripts in `scripts/viz/`. No stock photos, no illustrations, no decorative images.
- Each figure is numbered within its page ("Figure 2") and framed by a 1 px neatline.
- Each caption sits directly below and states the place, date, source and what was computed.
- Figures recomputed for this site say so in the caption, and say that they are not project results.
- Alt text describes what the figure shows, not what it is called.

**Tables**
- Caption above the table, one header row, numbers right-aligned, no zebra stripes.
- The methods-by-project matrix becomes a list on phones, so nothing scrolls sideways.

**Links**
- Underlined text links.
- Link text names the destination: "Download CV (PDF, 2 pages)", "Move Smart case study", "nfmspak.org (external)".
- No "read more" and no "click here".

**Motion**
- Nothing moves on page load or on scroll, apart from a walk-through figure changing when the reader reaches a new step. That change explains the analysis.
- No smooth-scroll override, no counters, no parallax and no fade-ins.
- With reduced motion turned on, state changes are instant.

**Print**
- Navigation, interactive maps and walk-through graphics are hidden.
- Text prints black on white, with link URLs after external links.
- The outputs page and CV links print as a clean list.
