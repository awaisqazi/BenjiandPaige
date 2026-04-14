# Design & Theme Guide — Paige & Benji Wedding Website

## Purpose

This is the official **Save the Date / Wedding Information website** for **Paige Grecco and Benji Sills**, getting married on **October 4–5, 2026** at **Club Getaway**, 59 S Kent Rd, Kent, CT 06757 — an adult summer camp in the Berkshire foothills of Connecticut.

The site serves as:
1. A **Save the Date** announcement
2. A **live countdown** to the ceremony
3. A source of **event logistics** (venue, schedule, packing)
4. A **camp atmosphere setter** to get guests excited
5. A **roster sign-up form** so guests can register their email for the formal invite

---

## Brand & Aesthetic

### Core Concept: "Adult Summer Camp Wedding"

The entire design should feel like a **summer camp scrapbook** — nostalgic, warm, handmade, and joyful. Think: corkboards, notebook paper, washi tape, typewriter fonts, campfire glow, sketch-style icons, and postcard imagery. Every section should reinforce the idea that guests are heading to camp for the most fun wedding they've ever attended.

### Tone
- Warm and inviting, not formal
- Playful but not childish
- Slightly rustic, outdoorsy, and adventurous
- Personal and intimate — this is *their* camp story

### Do Not
- Use sleek/corporate or overly minimalist design
- Use cold blues, stark whites, or harsh blacks as primary colors
- Use grid-heavy, data-table-style layouts
- Replace the handcrafted feel with polished UI component libraries

---

## Color Palette

### Wedding Colors (Primary)
These are Paige & Benji's official wedding colors. All design decisions should reference or harmonize with these three:

| Name | Hex | Usage |
|------|-----|-------|
| **Wedding Green** | `#345C0D` | Primary accent — buttons, headings, labels, borders |
| **Wedding Cream** | `#FAF9F2` | Primary background — cards, paper, notebook surfaces |
| **Wedding Navy** | `#042547` | Primary dark — text, dark overlays, dark section backgrounds |

### Extended Palette (CSS Variables)
Defined in `src/layouts/Layout.astro` under `:root`:

```css
/* Green family */
--forest-deep:  #1d3307   /* darkest green — dark bg, strong text */
--forest-mid:   #345C0D   /* PRIMARY wedding green */
--forest-light: #4a7a1a   /* lighter green — labels on dark bg */

/* Navy family (replaces old earth/bark tones) */
--bark-dark:    #042547   /* PRIMARY wedding navy — dark text, section bgs */
--bark-mid:     #0d3a6b   /* mid navy */
--bark-light:   #1a5294   /* lighter navy */
--bark-pale:    #6b8db5   /* pale steel blue — secondary text */

/* Cream family */
--cream:        #FAF9F2   /* PRIMARY wedding cream — page bg, card surfaces */
--cream-dark:   #EDE8DA   /* slightly darker cream */
--warm-white:   #FAF9F2   /* alias for cream */
--parchment:    #E8E3D5   /* aged-paper tone for corkboard paper */

/* Campfire accents (warm contrast — kept from original design) */
--fire-orange:  #e8611a   /* accent — CTAs, highlights */
--fire-amber:   #f4a300   /* hero text accents, story subheadings */
--fire-yellow:  #fdd835   /* reserved */
--fire-glow:    #ff6f00   /* reserved */
--ember:        #bf360c   /* reserved */

/* Night sky — navy based */
--night:        #021830   /* footer/hero dark bg */
--night-mid:    #042547   /* = wedding navy */
--star-white:   #fffde7   /* stars in footer */
```

### Color Usage Rules
- **Dark sections** (Activities, Footer, Story overlay, Hero overlay): navy tones (`--bark-dark`, `--night`)
- **Light sections** (Vibe, Schedule, general page bg): cream (`--cream`, `--parchment`)
- **Buttons / CTAs**: Wedding green (`--forest-mid`) with cream text
- **Script/italic labels** ("What Awaits", "The Vibe"): amber (`--fire-amber`) on dark backgrounds, green (`--forest-mid`) on light backgrounds
- **Hero script text** (prelude, ampersand, tagline): amber (`--fire-amber`) — kept for readability against the dark video
- **Headings on cream backgrounds**: navy (`--bark-dark`)
- **Headings on dark backgrounds**: cream (`--cream`)

---

## Typography

Four typefaces are loaded from Google Fonts (defined in `src/layouts/Layout.astro`):

| Variable | Font | Used For |
|----------|------|---------|
| `--font-script` | Caveat | Handwritten labels, prelude text, section labels, ampersand |
| `--font-serif` | Cormorant Garamond | Elegant headings, names, countdown numbers |
| `--font-sans` | Inter | Body text, descriptions, form inputs, metadata |
| `--font-typewriter` | Special Elite | Typewriter-style — schedule events, packing list, story text, venue title |

### Typography Rules
- Section decorative labels (e.g., "~ Save the Date ~", "The Vibe"): `--font-script`
- Section primary headings: `--font-serif` or `--font-typewriter` depending on section feel
- Body copy: `--font-sans`
- Camp/rustic text blocks (schedule, packing, story sign): `--font-typewriter`
- All font sizes use `clamp()` for fluid responsive scaling

---

## Section-by-Section Structure

The entire site is a **single-page app** at `src/pages/index.astro`, with all sections stacked vertically. Navigation is scroll-based. Sections in order:

---

### 1. Hero Section — `#hero` / `.hero`
**File:** `src/pages/index.astro` lines ~10–50 | **CSS:** `src/styles/main.css` lines ~1–245

**Design:** Full-viewport dark background with an embedded YouTube video (muted autoplay loop) of Club Getaway. Overlaid with a dark navy gradient (`rgba(2, 24, 48, ...)`) fading from top to bottom. Centered text stack:
- Caveat script: `~ Save the Date ~` (amber)
- Cormorant Garamond serif: `Paige & Benji` at large scale (cream)
- Caveat script: `Campfires, S'mores & I Dos` (amber)
- Inter sans: Date and location (muted cream)

**Interactive elements:**
- Scroll CTA arrow (animated bounce) at bottom center
- Floating sound toggle button (bottom-right) — switches YouTube embed between muted background mode and full audio/controls "watch" mode
- A thin green-to-amber gradient bar appears at the very bottom edge

**Key classes:** `.hero__video-wrap`, `.hero__overlay`, `.hero__content`, `.hero__names`, `.hero__sound-btn`

---

### 2. Postcard / Countdown Section — `#postcard` / `.postcard`
**File:** `src/pages/index.astro` lines ~52–82 | **CSS:** `src/styles/main.css` lines ~247–354

**Design:** A full-width postcard image (`public/images/campgetaway.png`) displayed at natural aspect ratio. A **live countdown timer** is absolutely positioned over the bottom-right of the image, in a navy glassmorphic pill (`rgba(4, 37, 71, 0.6)` with `backdrop-filter: blur`).

**Interactive elements:**
- JavaScript countdown updates every second (`cdDays`, `cdHours`, `cdMins`, `cdSecs`) counting down to October 4, 2026 at 2:00 PM ET

**Key classes:** `.postcard__countdown`, `.countdown__number`, `.countdown__sep`, `.countdown__label`

---

### 3. Venue Info Section — `#details` / `.venue`
**File:** `src/pages/index.astro` lines ~84–134 | **CSS:** `src/styles/main.css` lines ~356–566

**Design:** Full-viewport section with `public/images/logistics.mp4` as a muted looping video background (no controls). A navy-to-green gradient overlay sits above the video. Centered on the left side: a **notebook card** styled to look like graph paper torn from a spiral notebook.

**Notebook card details:**
- Background: `#FAF9F2` with a subtle CSS grid-line pattern (green-tinted lines)
- Top edge: colorful film-strip washi tape (`venue__tape-strip`) with alternating color spans in wedding green, navy, orange, amber tones
- Slight `rotate(-1.5deg)` tilt for handmade feel
- Box shadow for lifted paper look
- Content: red SVG map pin → "Club Getaway" (green) → address (navy) → interactive Google Maps iframe → "Get Directions →" button (green pill)

**Interactive elements:**
- Fully interactive Google Maps embed (`https://www.google.com/maps?q=...&output=embed`) — users can zoom, pan, click for street view
- "Get Directions →" opens Google Maps in a new tab

**Key classes:** `.venue__notebook`, `.venue__tape-strip`, `.venue__title`, `.venue__pin-row`, `.venue__map-wrap`, `.venue__directions-link`

---

### 4. Schedule of Events — `#schedule` / `.schedule`
**File:** `src/pages/index.astro` lines ~136–443 | **CSS:** `src/styles/main.css` lines ~597–811

**Design:** Cream/parchment section background. A **corkboard** (`public/images/corkboard.png`) framed with a gold wooden border serves as the container. Four red thumbtack SVGs pin the corners. Inside: a **paper note** (`public/images/campmap.png` at 72% opacity) shows the schedule.

**Schedule layout:**
- Day 1 (Sunday, Oct 4): 4+4 grid of event items
- Day 2 (Monday, Oct 5): 2-column grid
- Each item: custom hand-drawn SVG sketch icon + event name + time, all in `--font-typewriter`

**Day 1 events:** Check-in (1:15pm), Ceremony (2:00pm), Cocktail Hour (3:00pm), Camp Activities Open (4:00pm), Dinner Reception (6:30pm), Bonfire (8:00pm), Optional Overnight (9:30pm), After Party (10:00pm)

**Day 2 events:** Breakfast (8:00am), Check-out (10:00am)

**Interactive:** Schedule items have hover effects — lift + scale + background tint

**Key classes:** `.schedule__board`, `.schedule__pin`, `.schedule__paper`, `.schedule__grid--4col`, `.schedule__grid--2col`, `.schedule__item`, `.schedule__icon`

---

### 5. Our Story Section — `#story` / `.story`
**File:** `src/pages/index.astro` lines ~445–458 | **CSS:** `src/styles/main.css` lines ~813–934

**Design:** `public/images/story.png` as background (grayscale, high contrast filter). A navy glassmorphic "sign" panel is centered, slightly tilted (`rotate(-0.5deg)`), with a chalk-texture overlay feeling. Text inside mimics a theatre marquee / camp sign:
- Typewriter heading: "Cabaret Theatre" (they met doing theatre at Rutgers)
- Caveat script subheading: "Our Story" (amber)
- Typewriter body: their story text
- Link to `cabarettheatre.org`

**Context:** Paige and Benji met in 2015 at Rutgers University during a production of Avenue Q in a prop closet.

**Key classes:** `.story__backdrop`, `.story__sign`, `.story__heading`, `.story__subheading`, `.story__text`

---

### 6. Packing List / Accommodations — `#packing` / `.packing`
**File:** `src/pages/index.astro` lines ~460–501 | **CSS:** `src/styles/main.css` lines ~937–1103

**Design:** `public/images/backdrop.mp4` as a muted looping video background. Cream-tinted overlay (`rgba(237, 232, 218, 0.75)`). Two-column typewriter-styled content:
- Left: "Overnight Accommodations" — cabin info with a green left-border note block
- Right: "Packing List" — interactive checklist

**Interactive elements:**
- Custom-styled checkboxes (green border → green fill with checkmark when checked)
- Checked items get strikethrough + dimmed
- List items slide right on hover

**Key classes:** `.packing__content`, `.packing__col`, `.packing__heading`, `.packing__list`, `.packing__checkbox`, `.packing__note`

---

### 7. Camp Activities — `#activities` / `.activities`
**File:** `src/pages/index.astro` lines ~503–578 | **CSS:** `src/styles/main.css` lines ~1105–1207

**Design:** **Navy dark section** (`--bark-dark` / `#042547`). A grid of activity cards with real photos, each showing a camp activity. Card style: subtle transparent background with slight cream-tinted border, image top + text body below.

**Activities:** Archery, Zip-lining, Water Skiing, Canoeing, High Ropes, S'mores by the Fire

**Interactive elements:**
- Cards lift and scale on hover
- Images scale up (zoom in) on hover
- A subtle green radial glow in the top-left corner of the section

**Image files:** `public/images/camp_archery_*.png`, `camp_zipline_*.png`, `camp_waterski_*.png`, `camp_canoe_*.png`, `camp_ropes_*.png`, `camp_smores_*.png`

**Key classes:** `.activities__grid`, `.activity-card`, `.activity-card__img-wrap`, `.activity-card__body`

---

### 8. Vibe Section — `#vibe` / `.vibe`
**File:** `src/pages/index.astro` lines ~580–615 | **CSS:** `src/styles/main.css` lines ~1208–1287

**Design:** Parchment/cream background (`--parchment`). Three info cards on a subtle tree-emoji decorative header. Cards are white with rounded corners and green-tinted borders.

**Cards:**
- 👗 **Dress Code** — "Rustic chic meets ready for s'mores"
- 🐿️ **Official Mascot** — The Squirrel in a Tuxedo (clickable Easter egg)
- ⛺ **What to Expect** — Camp bunk beds, sing-alongs, fun vibe

**Interactive elements (Easter egg):** Clicking the squirrel SVG spins and scales it, adding a subtle extra rotation each click — a hidden playful feature

**Key classes:** `.vibe__card`, `.squirrel-easter-egg`, `.squirrel-svg`

---

### 9. Footer / Camp Roster — `#footer` / `.footer`
**File:** `src/pages/index.astro` lines ~617–657 | **CSS:** `src/styles/main.css` lines ~1289–1546

**Design:** Deep navy night sky (`--night` / `#021830` → `#010f20`). A procedurally generated star field fills the background (120 individual `div` stars, randomized position/size/opacity/twinkle animation, generated via JavaScript). An animated campfire SVG with three flickering flame `div`s sits at the bottom center.

**Content:** Email sign-up form for the "Camp Roster" — guests drop their name and email to receive the formal invitation when it's ready.

**Form:** Submits to a Google Form (`1FAIpQLScADlNbqIw2R5mgTRxkCq8quIwmWgTDDv-aTtbYxjSGrlOIMQ`) via a hidden iframe (no page reload). Client-side validation on name and email fields. On success, a green toast notification slides up from the bottom.

**Submit button:** Green gradient (`--forest-mid` → `--forest-light`) — the primary CTA of the page.

**Key classes:** `.footer__stars`, `.footer__campfire`, `.flame`, `.footer__form`, `.footer__submit`, `.footer__toast`

---

## File Structure

```
/
├── public/
│   └── images/
│       ├── campgetaway.png        # Postcard section background image
│       ├── campmap.png            # Schedule paper background
│       ├── corkboard.png          # Schedule corkboard texture
│       ├── story.png              # Our Story section backdrop
│       ├── backdrop.mp4           # Packing section video background
│       ├── logistics.mp4          # Venue Info section video background
│       ├── camp_archery_*.png     # Activities: archery photo
│       ├── camp_zipline_*.png     # Activities: zip-lining photo
│       ├── camp_waterski_*.png    # Activities: water skiing photo
│       ├── camp_canoe_*.png       # Activities: canoeing photo
│       ├── camp_ropes_*.png       # Activities: high ropes photo
│       └── camp_smores_*.png      # Activities: s'mores photo
│
├── src/
│   ├── layouts/
│   │   └── Layout.astro           # HTML shell, Google Fonts, CSS variables (:root)
│   ├── pages/
│   │   └── index.astro            # ALL page content and JavaScript
│   └── styles/
│       └── main.css               # ALL styles (1500+ lines, section-commented)
│
├── astro.config.mjs               # Astro config — base path: /BenjiandPaige
├── DESIGN.md                      # This file
└── README.md                      # Dev commands
```

---

## CSS Architecture

All styles are in a **single flat CSS file** (`src/styles/main.css`), organized into clearly commented sections matching the page sections. Section comments use the format:

```css
/* ==============================
   SECTION NAME
   ============================== */
```

**Section order in main.css:**
1. Hero
2. Postcard / Countdown
3. Venue Info
4. Section label/title/subtitle (shared utility classes)
5. Schedule of Events
6. Our Story
7. Packing List
8. Activities
9. Vibe / Quirky
10. Footer
11. Responsive (global breakpoints)

**CSS Variables** are defined in `src/layouts/Layout.astro` inside a `<style is:global>` block — this is also where the CSS Reset, scroll animation classes (`.reveal`, `.reveal-delay-N`), and `.section-container` utility live.

---

## JavaScript

All JavaScript is in a single `<script>` block at the bottom of `src/pages/index.astro`. Features:

| Feature | Description |
|---------|-------------|
| **Countdown Timer** | Updates every 1 second; targets Oct 4, 2026 18:00 UTC |
| **Scroll Reveal** | `IntersectionObserver` adds `.visible` to `.reveal` elements |
| **Star Field** | Generates 120 random star `div`s in the footer at DOM load |
| **Sound Toggle** | Swaps YouTube iframe `src` between muted background and audio+controls mode |
| **Form Submission** | Submits to Google Forms via hidden iframe; shows toast on success |
| **Squirrel Easter Egg** | Click counter on the squirrel SVG — rotates + scales per click |

---

## Animations & Motion

- **Scroll reveal:** `.reveal` elements start at `opacity: 0; transform: translateY(40px)` and transition to visible when they enter the viewport. Staggered with `.reveal-delay-1` through `.reveal-delay-5` (0.1s–0.5s).
- **Hero arrow bounce:** `bounceArrow` keyframe animation
- **Campfire flames:** `flicker` keyframe animation — three flames at different durations/delays
- **Star twinkle:** `twinkle` keyframe (opacity + scale)
- **Card hovers:** `transform: translateY()` + `box-shadow` transitions, duration 0.4s with `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)
- **Schedule item hover:** `translateY(-4px) scale(1.05)` with a spring cubic-bezier `(0.34, 1.56, 0.64, 1)`
- **Form error shake:** `shake` keyframe on invalid submission

---

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| `max-width: 900px` | Countdown repositions closer to edge |
| `max-width: 768px` | Activities grid → 1 column; Packing grid → 1 column; schedule 4-col → 2-col |
| `max-width: 600px` | Countdown scales down; Venue notebook loses tilt; postcard countdown pads reduce |
| `max-width: 480px` | Activity card images shorter; schedule grids remain 2-col; sound button text hidden |

---

## Deployment

- **Platform:** GitHub Pages
- **Base path:** `/BenjiandPaige` (configured in `astro.config.mjs`)
- **Live URL:** `https://awaisqazi.github.io/BenjiandPaige`
- **CI/CD:** GitHub Actions workflow auto-deploys on push to `master`
- **Node version:** 22
- All asset paths use `${base}/images/...` via `import.meta.env.BASE_URL` to support the subpath deployment

---

## Key Design Decisions & Rationale

| Decision | Rationale |
|----------|-----------|
| Amber/yellow for hero script text | Remains readable against the dark navy video overlay; green would be too subtle |
| Navy replaces old brown/bark tones | Aligns with wedding colors; adds sophistication while contrasting with green |
| Activities section uses navy bg | Provides visual rhythm — alternating dark (navy) and light (cream) sections |
| Campfire accents kept orange | Orange/amber adds warmth; complements green + navy without clashing |
| Section labels green on light, amber on dark | Ensures contrast and readability in both contexts |
| Corkboard frame colors kept gold (`#a07b3f`) | Represents a physical wooden frame — not a brand color, just realistic material |
| Font Special Elite for camp text | Typewriter aesthetic reinforces camp/rustic/handmade feel |
| Video backgrounds (no controls) | Immersive backdrop — content focus, not video player UX |
