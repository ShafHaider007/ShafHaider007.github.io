# Editorial and design audit

Site reviewed at commit `6f8024f`, the live version on 3 November 2026. I checked every page at 375, 768 and 1440 px wide, with and without reduced motion. The pages were `/`, `/projects/`, the seven project pages and the 404 page. I checked every factual claim against three sources:

- the CV (`public/Shaf_Haider_CV.docx`)
- the NUST transcript (issued 30 October 2025)
- what Shaf has told me directly

Severity:

- **High**: misleading, inaccurate, inaccessible or broken.
- **Medium**: weakens trust or usability.
- **Low**: polish.

## 1. Accuracy and attribution

| # | Where | Problem | Why it fails | Sev. | Fix |
|---|---|---|---|---|---|
| A1 | Walk-through text: `JfrelStory`, `UnccdStory`, `MottainaiStory` | First person describing the demo analyses: "For each year I used…", "I kept only change that…", "For every pixel I took…", "the ArcGIS Online setup I run", "Running the engine ourselves". | The walk-throughs were computed for this website from open data. They are not project results, and the text credits them to Shaf as his own analysis. | High | Describe the demos in the third person ("this walk-through uses…"). Keep "I" only for work listed in the CV. Label every demo figure as made for this site. |
| A2 | Home, research question 1 (`lib/site.ts` `questions[0]`) and its bar chart | Compares Hansen loss (2.3 ha) with a quick local classification (566 ha loss, 999 ha gain) as evidence that degradation is being missed. The link text says "From the forest-carbon study". | The local numbers come from this site's demo, not the study. They include large map error: the demo's own forest producer's accuracy is 56%. The two products also define loss differently. This overstates certainty and blurs the study with the demo. | High | Remove the chart and the numbers. Base the question on what each product is designed to measure, and on Shaf's study work. |
| A3 | Home, research question 2 | "Under the SDG 15.3.1 rules these places… lose soil carbon… one negative result is enough to call the land degraded." | The result depends on which transition scores and soil-carbon factors are chosen. The walk-through used one set of choices. Stated as a general rule, it overstates certainty. | High | Say that the result depends on these choices, and make that dependence the research question. |
| A4 | Outputs list, thesis entry | Title shortened to "…a live tool for heat-aware urban routes". It is also called a "thesis". | The title must match the CV exactly. The CV and transcript call it a Final-Year Design Project. | High | Use the exact title: "Urban Mobility and Urban Microclimate: A Live Tool for Best Urban Routes in the Wake of Growing Urban Heat Island Phenomena". Label it a final-year design project. |
| A5 | Outputs list, UNOPS study | Shown as a titled 2025 output, "Jurisdictional forest-carbon study, supported by UNOPS". | Neither the report title nor its year is in any source. It reads like a citation. | High | Show it as a report with placeholders for the title, year and availability. |
| A6 | Outputs list and UNCCD project | Workshops dated 2025, described as "Trained government and technical staff" and "Ran provincial workshops". | The CV says "Participate and delivered provincial workshops" and gives no date. | High | Say "took part in and delivered". Remove the year and add a placeholder for dates and provinces. |
| A7 | Facts band | "Almost 3 years of full-time GIS and remote sensing work". | "Full-time" has no source, and Shaf was a student until June 2025. Shaf's own words are "almost 3 years of experience working in the GIS industry". | High | Use Shaf's wording and remove "full-time". |
| A8 | Hero "Currently" panel, facts band, experience | "I lead the GIS work for Pakistan's 2026 national report to the UNCCD". | The CV says Shaf leads the GIS and remote sensing workstream of GISPLUS's support to IUCN Pakistan for the national reporting. The site's wording suggests a wider role. | Medium | Use the CV's scope. |
| A9 | JFREL walk-through, uncertainty step | "it misses some sparse tree cover". | The demo's producer's accuracy for forest is 56%: 44% of reference forest is mapped as something else. "Some" understates this. The reference labels are ESA WorldCover, not field data. | High | Give the figure plainly and name the reference data. |
| A10 | JFREL walk-through, land-cover step | "forest is the most reliable class". | Per-class accuracy is not in the stored results, so this cannot be checked. | Medium | Remove. |
| A11 | JFREL walk-through | "Hansen… records only 2.3 ha". | "Only" implies the local map is more correct. The products measure different things. | Medium | Present it as a comparison with a different definition of loss. |
| A12 | UNCCD walk-through, measure 1 | An 8-year Sentinel-2 NDVI trend is presented as the productivity measure. | The UNCCD good practice guidance uses longer records and three productivity sub-indicators. | Medium | Add one sentence on this limit. |
| A13 | Home heat figure | Shows r = −0.74 beside text quoting r = −0.72. | The figure was recomputed for this site and the text quotes the project. The difference is not explained. | Medium | Caption the figure as a re-computation and give the project's value. |
| A14 | Project periods (`lib/projects.ts`) | "2025" for JFREL, NFMS, GeoFasal and DHA; "2021 – present" for Mottainai. | The CV dates only the employers: GISPLUS from June 2025, Upwork from June 2021. It gives no project dates. | Medium | Show the employer and its dates as context. Use placeholders where a date is needed. |
| A15 | Move Smart | "Trained… on 450 labelled street images". PyTorch is listed as a tool. | The CV says "Fine-tuned… on 450 annotated images" and does not name PyTorch for this project. | Medium | Follow the CV and remove PyTorch. |
| A16 | Upwork experience, Mottainai | Present tense ("Run the ArcGIS Online setup…") and "Lagos". | The CV uses the past tense ("Administered") and says "Nigeria". | Medium | Use the past tense and "Nigeria". Keep "Lagos" only as the place where the demo was computed. |
| A17 | UNCCD "Why it matters" | "shapes national restoration targets and funding". | "Funding" has no source. | Low | Say only that the figure is used to set and track Land Degradation Neutrality targets. |
| A18 | Footer credits | Overture Maps credited, but not OpenStreetMap. Copernicus DEM, Hansen and ESA WorldCover credits are incomplete. | Overture's street and building data include ODbL data from OpenStreetMap, which requires "© OpenStreetMap contributors". The other datasets ask for specific credit lines. | High | Add complete credits for every dataset. |

## 2. Writing

| # | Where | Problem | Why it fails | Sev. | Fix |
|---|---|---|---|---|---|
| W1 | Every project title, all 35 walk-through step titles, the three research questions | About 45 headings are questions. | It becomes a formula. A professor scanning the list cannot tell what each project is. | Medium | Projects get plain titles, with the research question as the first line under the title. Steps get short descriptive titles. Research interests stay as questions, because there they are the point. |
| W2 | Hero h1 | "Mapping Pakistan's forests, land and cities from *satellite data*." | It is a tagline. It does not give the name, role, institution or research focus. | Medium | The h1 becomes the name. A plain line gives role, employer and degree, and two sentences give the research focus. |
| W3 | Calls to action | "See the work", "Research interests", seven identical "Read the case study" links. | They do not name the next step, and repeated link text is ambiguous for screen-reader users. | Medium | Name the next step: "Download CV (PDF)", "Email Shaf", "Read the research statement". Project links carry the project name. |
| W4 | Project cards | "On the project page: …" line on every card. | Scaffolding that repeats on all seven cards. | Low | Remove. |
| W5 | Research intro | "Project work has deadlines and a fixed scope…" | Narrative filler before the content. | Low | Say plainly what the section is. |
| W6 | Tagline-style labels | "Off the map", "This page isn't on any sheet." (404) | A pun where a plain message is needed. | Low | "Page not found" plus links to the main pages. |
| W7 | Scan for stock phrases (passionate, leverage, seamless, robust and so on) | None found. No em dashes in the copy. | n/a | n/a | Keep it that way: re-check after the rewrite. |

## 3. Visual design

| # | Where | Problem | Why it fails | Sev. | Fix |
|---|---|---|---|---|---|
| V1 | Whole site: `globals.css`, fonts | Cream paper (#f6f4ef), serif display headings (Newsreader) and a terracotta accent (#b8452a). | It is the stock "editorial portfolio" look the brief names. Nothing in it comes from Shaf's work. | Medium | New direction in `DESIGN-DIRECTION.md`: white page, sans headings, serif reading text. Colour appears only where figures use the land-cover legend. |
| V2 | Home facts band | Four big numbers with a counting animation. | A stat band is the cliché, and "Almost 3" makes no sense as a number. | Medium | Remove it. The facts go into the intro text. |
| V3 | `Reveal`, `SplitHeading`, `ScrubText`, `DrawRule`, card parallax, poster auto-wipe, hero intro timeline, Methods scrub, Experience fill line | Decorative scroll and load animation on almost every element. | Content is hidden until JavaScript runs and the reader scrolls, with a 2.5 s CSS fallback. It adds GSAP and Lenis: removing all of it cut the home page's JavaScript from 240 kB to 175 kB (gzipped, measured on both builds). The brief also rules it out. | High | Remove all of it. Keep only walk-through state changes, which explain the analysis. |
| V4 | `SmoothScroll` (Lenis) | Replaces native scrolling. | It changes scroll speed and inertia that people and assistive tools rely on, and needs fixes for anchor links. | Medium | Remove and use native scrolling. |
| V5 | Experience | Timeline with dots and an animated fill line. | A list does the job. | Low | Plain list. |
| V6 | Tools, A grades, project sidebars | Walls of bordered tag chips. | Hard to read and adds visual noise. | Low | Comma-separated text lists under labels. |
| V7 | Home and `/projects/` | Seven identical cards, the first one large. | Repeated card layout. Nothing shows what kind of figure each project has. | Medium | One list of entries: figure thumbnail with a caption, title, question, context line. |
| V8 | Hero figure (`HeroStack`) | 3D band stack that plays automatically. Tiny tab labels. | Decorative motion on the first screen. On phones it pushes the work about 1,800 px down. | Medium | Replace with a numbered static figure: true colour and NDVI side by side, with a full caption. |
| V9 | Header on phones | "Download CV" is hidden below 640 px, and so are Experience and Methods. | There is no one-tap route to the CV on a phone. | High | The header keeps Research, Projects, Outputs and CV at every width. |
| V10 | `/projects/` | No h1, because the section heading renders as an h2. | Heading structure is broken for screen readers and SEO. | Medium | Page h1. |
| V11 | Walk-through steps (`Scrolly`) | Inactive steps fade to 35% opacity: about 1.7:1 contrast. | Fails WCAG 1.4.3. Most of the text is unreadable at any moment. | High | Keep all text at full contrast. Mark the active step with a rule. |
| V12 | `ink-3` (#7c8481) on paper | Used for eyebrows, captions, credits and the footer: 3.5:1 contrast. | Fails WCAG AA for small text. | High | Tertiary text at 4.5:1 or better on white. |
| V13 | Section labels "§ 01" to "§ 06", coordinates next to the name in the header | Decoration. | Adds nothing for the reader. | Low | Remove. |
| V14 | Images | 22 of 25 images on the home page have empty alt text, and all 14 on `/projects/`. | Screen-reader users get nothing from the figures. | Medium | Alt text that says what each figure shows. |
| V15 | Print | No print styles. The sticky header and walk-throughs print badly. | The brief asks for clean printing, especially for outputs. | Medium | Print CSS that hides navigation and interactive maps, prints the step text and shows link URLs. |
| V16 | CV | Offered only as `.docx`. | Admissions readers expect a PDF, and `.docx` renders differently across apps. | Medium | Add `Shaf_Haider_CV.pdf`, made from the same file, and keep the `.docx` at its current URL. |
| V17 | Loading and error states | Grey pulse boxes with no text. A failed data fetch leaves "…" in the text for good. The live map has no fallback without WebGL. | Readers are not told what is happening or what failed. | Medium | Labelled loading state, an error message with what to do next, and a map fallback. |
| V18 | Metadata | No structured data, no canonical URLs, and `/projects/` has a generic description. | Weak for search and for link previews. | Low | Person JSON-LD from verified facts, canonical URLs, and a description for every page. |

## 4. Technical

| # | Where | Problem | Sev. | Fix |
|---|---|---|---|---|
| T1 | `package.json` `lint` | `next lint` was removed in Next.js 16, so the script fails. | Medium | Run ESLint directly with the existing `.eslintrc.json`. |
| T2 | Dependencies | `gsap`, `@gsap/react` and `lenis` serve only the decorative motion. | Low | Remove all three. |
| T3 | `HeroStack`, unused band images (`B02`–`B12`, `false.webp`) | Dead once the hero changes. | Low | Delete. |

## What is already sound

- **Every page passes the overflow check:** no horizontal scroll at any width, no console errors and no failed requests.
- **The open-data walk-throughs are reproducible:** the scripts are in `scripts/viz/` and every number is computed. They are useful evidence of method, provided they are labelled as demonstrations.
- **The URLs are stable and worth keeping:** `/projects/<slug>/` and `/Shaf_Haider_CV.docx`.
