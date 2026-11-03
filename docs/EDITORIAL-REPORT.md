# Editorial redesign: report

**Branch:** `redesign/scholarly-site`, ten commits on top of `main` (`6f8024f`). It has not been merged or deployed: the live site only changes when this branch is merged into `main`.

## 1. Design and writing direction

**Design.** Every figure carries its provenance. Shaf's work measures land change and asks how sure the measurement is, so the site holds itself to the same standard:

- Each figure is numbered.
- Each caption states the place, the date, the data source, and whether the figure comes from a project or was recomputed for this site.
- Every claim about Shaf traces to the CV, the transcript or a public link.

The look is a technical report:

- a white page with near-black text
- IBM Plex Sans for headings and IBM Plex Serif for reading text
- IBM Plex Mono only for data
- one link blue, with colour otherwise kept inside figures, where it carries meaning
- no decorative motion

The full rules are in `docs/DESIGN-DIRECTION.md`.

**Writing.**

- Plain English, first person for Shaf's own work only.
- Facts as the CV states them. Nothing rounded up.
- Research interests are stated as questions, each with what Shaf has done, why it is open, what he wants to find out, and a possible approach marked as a plan.
- Project titles say what the project is. The research question is the first line under each title.
- The demo walk-throughs are described in the third person ("this walk-through uses…") and labelled as made for this site.

**One conflict with an earlier request.** In the previous round you asked for GSAP and Lenis animation in Experience and Skills. This brief rules out decorative scroll animation, and I followed the brief: all of it is gone, along with the three libraries.

That removal cut the home page's JavaScript from 240 kB to 175 kB (gzipped), and no text is hidden while it waits for an animation. The only motion left is in the case-study walk-throughs, where the figure changes when you reach a new step; that change explains the analysis. With reduced motion turned on, even that change is instant.

The animated version is still on `main` (commit `6f8024f`) if you want any of it back.

## 2. Changes by page

**All pages**
- New palette, type, focus outlines (2 px blue on every link and button) and print styles.
- A skip-to-content link.
- **Header:**
  - shows Research, Projects, Outputs, Contact and "CV (PDF)" at every width (the CV link used to be hidden on phones)
  - the header is no longer sticky
  - the decorative coordinates next to the name are gone
- **Footer:** gives the full name ("Muhammad Shaf Haider"), email, LinkedIn, GitHub, the CV, and complete credits for every dataset (OpenStreetMap credit was missing before), with a link to the figure scripts.
- **Metadata:** a title, description, canonical URL and Open Graph tags on every page.

**Home (`/`)**
- **h1:** now the name. A plain line gives role, employer and degree, followed by a two-sentence statement of research focus.
- **Actions:** "Read my research interests", "Download CV (PDF)" and "Email me".
- **Figure 1:** a static Islamabad true-colour and NDVI pair with a full caption, replacing the autoplaying 3D band stack.
- **Removed:** the facts band with its counting numbers.
- **Research interests:** three short entries, each linking to its full statement and to the project it came from.
- **Projects:** one list with numbered, captioned thumbnail figures (Figures 2–8), replacing the card grid.
- **New section:** "Reports and outputs" in brief.
- **Experience:** a plain list instead of the animated timeline.
- **Education:** dates, award date and CGPA from the transcript. The design project title is exact, and courses are listed as text.
- **Methods:** the methods table is checked against the CV and becomes a list on phones. Tools are plain text lists instead of tag walls.
- **Contact:** email, CV (PDF and Word), LinkedIn and GitHub.
- Person structured data, built from verified facts only.
- Old anchors `/#work` and `/#skills` still work.

**Research (`/research/`, new)**
- Each question has four parts:
  - what I have done
  - why it is still open
  - what I want to find out
  - a possible approach
- One open-data figure per question, each with a caption saying it was made for this site:
  - canopy density near Murree, 2018 and 2024
  - the Cholistan desert edge in 2017 and 2024
  - vegetation against surface temperature for Islamabad, with the project's own r = −0.72 given beside the recomputed value

**Projects (`/projects/`)**
- Now has an h1.
- The same list as the home page.

**Case studies (`/projects/<slug>/`, all seven URLs unchanged)**
- **Header:** breadcrumb, plain title, then the research question.
- **Text:** summary, "Why it matters" and "My part" (CV wording).
- **Sidebar:** role, setting, when, key facts, methods and tools, and links. The counting number strip is gone.
- **Walk-throughs:**
  - an explicit statement that the figures were recomputed from open data and are not project results
  - all step text at full contrast (it used to fade to 35%), with the current step marked by a rule
  - descriptive step titles
  - numbers that change at once instead of counting up
  - a loading message, an error message if the figure data fail, and a message if the live map has no WebGL
- **Navigation:** previous and next project links.

**Outputs (`/outputs/`, new)**
- Reports, national reporting, workshops and the design project, each with:
  - setting
  - status
  - my part
  - the author line where it applies
- Missing facts are shown as highlighted placeholders.
- A table of the seven live platforms and apps, with their project pages.
- Prints as a clean list, with URLs printed after external links.

**404**
- Plain "Page not found" with links to the four main pages. It is not indexed.

## 3. Before and after copy

| Where | Before | After |
|---|---|---|
| Home h1 | "Mapping Pakistan's forests, land and cities from *satellite data*." | "Shaf Haider". Under it: "GIS and remote sensing expert, GISPLUS, Islamabad, Pakistan / Bachelor of Geoinformatics Engineering, NUST, 2025" |
| Home statement | "…almost three years of work in GIS and remote sensing. My projects measure how land changes: forests that thin, deserts that turn into farms, cities that get hotter…" | "…almost three years of experience in the GIS industry. My work measures how land changes, and how sure we can be of the measurement: forest loss and degradation, land degradation in drylands, and heat in cities." |
| Facts band | "Almost 3 / years of full-time GIS and remote sensing work" | Removed. Your own wording ("almost three years of experience in the GIS industry") is in the statement. |
| Research question 1 | "In a test area near Murree, the Hansen Global Forest Change map records about 2 hectares of forest loss… A local classification of the same area shows hundreds of hectares changing…" | "Clearing is comparatively easy to map. Degradation, where the canopy thins but the forest remains, changes only part of each pixel. Global products such as Hansen Global Forest Change are designed to detect stand-replacing loss, not gradual thinning." |
| Research question 2 | "Under the SDG 15.3.1 rules these places… lose soil carbon under the default IPCC factors, and one negative result is enough to call the land degraded." | "…soil carbon is usually estimated from the land-cover change with default factors, so the final result depends on how that conversion is scored." |
| Design project | "Urban mobility and urban microclimate: a live tool for heat-aware urban routes. Final-year thesis." | "Urban Mobility and Urban Microclimate: A Live Tool for Best Urban Routes in the Wake of Growing Urban Heat Island Phenomena. Final-year design project. Group project." |
| UNCCD role | "I lead the GIS work for Pakistan's 2026 national report to the UNCCD" | "I lead the GIS and remote sensing workstream of GISPLUS's support to IUCN Pakistan for the 2026 national reporting to the UNCCD" |
| Project title | "How much forest did four jurisdictions lose, and how sure can we be?" | "Forest-change activity data for a jurisdictional forest-carbon study". Then "Question: How much forest did four jurisdictions lose, degrade or regain between 2016 and 2024, and how certain are those areas?" |
| Walk-through step | "For each year I used scenes from the same three weeks of September…" | "For each year, this walk-through uses scenes from the same three weeks of September…" |
| Walk-through accuracy | "When the map says forest it is almost always right (96%), but it misses some sparse tree cover." | "…but it misses a large share of sparse tree cover: about 44% of the forest in the reference sample is mapped as another class." Followed by a note that the reference labels come from ESA WorldCover. |
| Mottainai | "Behind them is the ArcGIS Online setup I run" | "Behind them was the ArcGIS Online organisation I administered" |
| Calls to action | "See the work" / "Research interests" / "Read the case study →" (×7) | "Read my research interests" / "Download CV (PDF)" / "Email me". Each project link is the project title itself. |
| 404 | "404 · Off the map / This page isn't on any sheet." | "Error 404 / Page not found / The link may be out of date, or the page may have moved. These pages exist: …" |

## 4. Removed or changed claims, and why

1. **"Full-time"** (years of experience): no source. You were a student until June 2025.
2. **Demo numbers used as research evidence** (Hansen 2.3 ha against 566 and 999 ha, with its bar chart): the numbers came from this site's quick demo, not the study. They include large map error (the demo's forest producer's accuracy is 56%), and the two products define loss differently.
3. **"One negative result is enough to call the land degraded"** as a general rule for desert farms: the result depends on the chosen factors and scoring, which is now the research question itself.
4. **Shortened design-project title and "thesis"**: replaced with the exact CV title and "final-year design project".
5. **The UNOPS study shown as a titled 2025 output**: its title, year and status are unknown, so they are now placeholders.
6. **Workshops "2025", "Trained…" and "Ran…"**: the CV says "Participate and delivered" and gives no date.
7. **Lead of "the GIS work for Pakistan's national report"**: narrowed to the CV's scope (GISPLUS's support to IUCN Pakistan).
8. **Project dates**: "2025" for four GISPLUS projects and "2021 – present" for Mottainai. The CV dates only the employers, so the sidebar now says so.
9. **Move Smart "trained… on 450 labelled street images" and PyTorch**: the CV says "fine-tuned… 450 annotated images" and does not name PyTorch for this project.
10. **Mottainai**:
    - present tense ("run") becomes past ("administered")
    - "Lagos" as the company's location becomes "Nigeria", as in the CV
    - "Running the engine ourselves" is removed: you were a contractor
11. **UNCCD "…shapes… funding"**: no source.
12. **Walk-through, "forest is the most reliable class"**: per-class accuracy is not in the stored results.
13. **Walk-through, "Hansen records only 2.3 ha"**: "only" implied the local map is right. Now stated as a different definition of loss.
14. **Walk-through, "The study's jurisdictions and results are not public"**: you never told me this, so it now says the study's results "are not shown here".
15. **Walk-through, "The open archive used here starts in 2017"**: could not be checked, so removed.
16. **Walk-through, "In the study, the emission factors came from the field inventory, and the uncertainty in both parts was carried through to the reference level"**: replaced with the CV wording.
17. **Walk-through, "The IPCC recommends estimating areas from a random sample"**: replaced with the good-practice guidance it comes from (Olofsson and others, 2014).
18. **Walk-through, UNCCD "the same steps run for the whole country"**: the national method is not documented here, so it is replaced with your CV role.
19. **Walk-through, GeoFasal model inputs** (green-up date and so on, stated as GeoFasal's): now given as typical inputs to models of this kind. "Separates the crops" becomes "finds typical crop calendars", with a note that group names are not field-checked.
20. **Walk-through, Move Smart**:
    - "Weights set with AHP" for the demo becomes fixed demo weights, with the project's AHP named separately
    - "land-surface temperature at 30 m" adds the roughly 100 m native thermal resolution
    - "tree detection in street photos" becomes "a tree-trunk detection model"
21. **Tools**:
    - "ArcGIS Pro" becomes "ArcGIS and ArcGIS Enterprise", as in the CV
    - "SQL" is removed: it is not listed in the CV
    - tools the CV lists but the site lacked are added
22. **Methods table**: UNCCD is removed from the change-detection and vegetation-index rows, because the CV does not say so. The CV supports two rows that are now added: carbon accounting (forest-carbon study) and land degradation and drought assessment (UNCCD).

## 5. Placeholders (7, all in `lib/site.ts`, shown highlighted on `/` and `/outputs/`)

1. `[NEEDS REAL CONTENT: exact title of the UNOPS-supported forest-carbon study report]`
2. `[NEEDS REAL CONTENT: full author list in published order]`
3. `[NEEDS REAL CONTENT: year of the report]`
4. `[NEEDS REAL CONTENT: whether the report is published or internal, and where it can be read]`
5. `[NEEDS REAL CONTENT: current status, for example in preparation or submitted]` (UNCCD 2026 reporting)
6. `[NEEDS REAL CONTENT: dates]` (provincial workshops)
7. `[NEEDS REAL CONTENT: provinces and organisers]` (provincial workshops)

Fill these in before merging, or tell me the facts and I will.

## 6. Publication and link discrepancies

- **No peer-reviewed publications** are in any source. The page is therefore called "Reports and outputs", and there is no ScholarlyArticle markup and no citation metadata.
- **CV typos** to fix in the Word file. The PDF repeats them, because I did not edit your CV.
  - "Upwork Top Rasted Freelancer" should be "Top Rated".
  - "3 year of professional experience" should be "3 years". You told me "almost 3 years", which the site uses.
  - "Participate and delivered" should be "Participated in and delivered".
  - "National University of Science and Technology" should be "Sciences", as on the transcript and the site.
- **CV and transcript course names differ:** the CV says "Remote Sensing", the transcript "Introduction to Remote Sensing". The site uses the transcript names.
- **The PDF CV** was made from your Word file with LibreOffice. Times New Roman is replaced by a metric-compatible font, and the result is 3 pages. Your Word version may break pages differently. For an exact match, export the PDF from Word and replace `public/Shaf_Haider_CV.pdf` under the same name.
- **Play Store links** in the CV carry a `utm_source=chatgpt.com` tracking tag. The site links to the same pages without it.
- **The LinkedIn link** in the CV uses `http://`. The site uses `https://`.
- **"JFREL"** comes from your messages, not the CV. The CV calls it the "UNOPS-Supported Forest-Carbon Monitoring Study".
- **The remote URL** in this checkout still uses the old repository name (`v0-portfolio`). GitHub redirects it. The footer links to the new name.

## 7. Commands run and results

| Check | Result |
|---|---|
| `npm run lint` (now `eslint . --ext .ts,.tsx --max-warnings 0`; `next lint` no longer exists in Next.js 16) | Pass: 0 errors, 0 warnings |
| `npm run type-check` (`tsc --noEmit`) | Pass. Also passes on the two large intermediate commits. |
| Tests | The project has no test suite or `test` script, so nothing was run. |
| `npm run build` | Pass: 14 static pages |
| Playwright, 12 pages × 375 / 768 / 1440 px | No horizontal overflow, one h1 per page, 0 console errors, 0 failed requests |
| axe-core 4.10.2, WCAG 2.0 and 2.1 A and AA rules, 12 pages × 3 widths | 0 violations, contrast included |
| Text contrast on white | Text 17.7:1, secondary 8.3:1, tertiary 6.1:1, links 8.3:1 |
| Internal links | 13 URLs, all 200. 29 in-page anchors, all resolve. |
| Downloads | `Shaf_Haider_CV.pdf`: 200, `application/pdf`, 102,757 bytes. `Shaf_Haider_CV.docx`: 200, 32,422 bytes. |
| Keyboard | The first Tab reaches "Skip to content". All 22 focus stops checked show a 2 px blue outline. |
| Print (Chromium, A4) | Outputs 3 pages, home 10, Move Smart 4. Navigation and interactive figures are hidden, and URLs are printed after external links. |
| Live map | Renders with WebGL. With WebGL disabled it shows the fallback message. |
| JavaScript, home page first load (gzipped) | 240 kB before, 175 kB after |
| Search for stock phrases (passionate, leverage, seamless, robust and about 40 more) and em dashes | 0 in site text |
| Headings and alt text | No skipped heading levels. Every content image has alt text. The empty alt values left are 40 hidden time-lapse frames and one decorative water layer, all inside figures that the step text describes. |

## 8. Not verified

- **External links:** this environment's network blocks most outside sites, so they could not be opened. All 14 are copied from the hyperlinks in your CV.
- **Background statements not about you:** I wrote these from general knowledge and did not check them against a document here. Please read them:
  - REDD+ payments
  - the UNCCD four-year reporting cycle
  - Sentinel-2 revisit time
  - Hansen's stand-replacement definition
  - Olofsson and others (2014)
  - the three productivity sub-indicators in the UNCCD guidance
  - that many Punjab farms are small
  - that urban heat is a growing risk
- **The research statements:** the "what I want to find out" and "possible approach" parts are drafts I wrote from your projects. They are plans, labelled as such, but they speak for you. Change anything that does not match what you want to study.
- **The walk-through figures:** they were computed for this site by the scripts in `scripts/viz`, not by you during the projects. The site now says so everywhere. A professor may still ask about them, so make sure you can explain them, or ask me to remove any you are not comfortable with.
- **Your choices:**
  - whether to show your full name, "Muhammad Shaf Haider" (it is in the footer and structured data)
  - whether to name Penn State (the site does not)
  - whether Mottainai is in Lagos (the demo uses Lagos streets; your CV says only "Nigeria")
- **The final human test:** a professor reading the home page in 30 seconds learns who you are, what you work on, what you want to study, and where the CV and email are. Every number on the site either comes from your CV or transcript or is labelled as a demonstration. The real test is you reading it. If any sentence sounds unlike you, it should change.

The audit (`docs/AUDIT.md`), design direction and this report are in `docs/` of a public repository. They are not part of the website itself. Delete them before merging if you prefer not to publish them.
