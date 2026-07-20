# Design & Theme Guide — Paige & Benji Wedding Website

## Purpose

This is the official **Save the Date / Wedding Information website** for **Paige Grecco and Benji Sills**, getting married on **October 4–5, 2026** at **Club Getaway**, 59 S Kent Rd, Kent, CT 06757 — an adult summer camp in the Berkshire foothills of Connecticut.

The site serves as:
1. A **Save the Date** announcement
2. A **live countdown** to the ceremony (a camp "departure board" of split-flap cards)
3. A source of **event logistics** (venue, schedule, packing)
4. A **camp atmosphere setter** to get guests excited
5. A **roster / RSVP sign-up form** so guests can register for the formal invite
6. A **gift registry** ("The Adventure Fund" honeymoon fund, linking out to Honeyfund)
7. A **playful collectible layer** — the Wedding Weekend Passport (stamps), Sir Nutsworth's acorn hunt, and hidden easter eggs that reward exploring

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
**File:** `content/letter.html` | **CSS:** `public/styles/site.css` (Postcard / Countdown block)

**Design:** A full-width postcard image (`public/images/campgetaway.png`) displayed at natural aspect ratio. Over the bottom-right sits a **camp "departure board" countdown** styled as a warm wooden trail-sign plaque (amber border, slight `rotate(-1.2deg)`), headed "🔥 Days 'til Camp" in Caveat script.

**Split-flap countdown cards:** Each unit (Days / Hrs / Min / Sec) is a **true split-flap card** (a Solari/airport departure board) that mechanically flips when its value changes. Each card is a green enamel camp-sign tile with a center hinge seam, brass rivets on the sides, and cream serif numbers. The Days card is widened (`.flip--wide`) to fit 3 digits.

**How the flip works:** each card has **four layers** — a static top half (`.flip__half--top`) and bottom half (`.flip__half--bottom`), plus an **upper flap** (`.flip__flap--upper`) that folds *down* (`rotateX 0 → -91deg`) and a **lower flap** (`.flip__flap--lower`) that swings *up* (`rotateX 91 → 0deg`). Every layer renders a **full-height glyph clipped to one half**, so the seam is a geometric crop at the card's centre — a 1px shadow + catch-light groove, never a bar slicing the digit. On a change the JS paints the new digit onto the static top + lower flap and the old digit onto the upper flap + static bottom; the upper flap folds away to reveal the new top, the lower flap drops the new bottom over the old, then commits all four layers to the new value — always forward, no reset flash. The fold is one CSS cycle gated by `.flip.is-flipping`, with a shade scrim and a small overshoot "thunk." Ticking is **aligned to the wall clock** (a `setTimeout` re-scheduled to each real second) so the seconds flap never drifts, skips, or double-flips. Targets October 4, 2026 at 2:00 PM ET (18:00 UTC). A visually-hidden `aria-live` mirror (`#cdReadout`) announces the remaining time, updated only when minutes-or-larger change.

**Key classes:** `.postcard__countdown`, `.countdown__heading`, `.countdown__row`, `.flip`, `.flip--wide`, `.flip.is-flipping`, `.flip__card`, `.flip__half` (`--top` / `--bottom`), `.flip__flap` (`--upper` / `--lower`), `.flip__num`, `.flip__pin`, `.flip__label`. CSS vars `--cd-card-w` / `--cd-card-h` / `--cd-num` scale it (smaller at `max-width: 600px`).

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

**Context:** Paige and Benji met in 2015 at Rutgers University during a production of Avenue Q in a prop closet, where Benji was looking for peace and quiet and Paige immediately derailed that plan.

**Easter egg — the prop-closet door (`#storyDoor`):** a little closet door that opens on tap to reveal a hiding squirrel ("Benji was trying to hide here"). Opening it also surfaces a green pulsing CTA (`#propPlayBtn`, "🎬 Watch Benji & Paige reenact the meet-cute").

**Easter egg — "The Closet Where It Happened" (`#propShow`):** the CTA launches a full-screen mini-theatre overlay staging the meet-cute as a **two-squirrel interactive play** starring **Benji** (top hat + bow tie) and a new **Paige** squirrel (ear daisy, eyelashes, forest scarf, warmer fur). Both are drawn as inline SVG and injected once by JS, sharing one skeleton but swapping expressions via `data-pose` (calm / sleepy / startle / smitten). It runs as a **7-beat storybook** (`data-beat` 0–6 on `#propStage`): a title card → *Avenue Q* at Rutgers → Benji slips into the open closet (sleepy, 💤) → **Paige bursts in from the right** with a flash as Benji startles → a spark + floating hearts → an NYC-skyline montage → a campfire finale with confetti and the "next chapter with you" line. Scenery cross-fades behind them (theatre → NYC → camp) under a spotlight with drifting dust motes.

The visitor can **drive the story** — tap the stage (or →/Space/Enter), use the ‹ / › buttons, jump via the dot scrubber, or poke the shelf props to wiggle them — and an **autoplay** ▶/⏸ toggle runs it hands-free (the first manual tap pauses it). Honours `prefers-reduced-motion` (opens straight to a static camp tableau with both squirrels), restores focus to the trigger on close, and closes via ✕, backdrop tap, or Escape, with an "🔁 Encore" replay.

**Key classes:** `.story__backdrop`, `.story__sign`, `.story__heading`, `.story__subheading`, `.story__text`, `.story__door`, `.story__door-cta`, `.propshow`, `.propshow__stage`, `.ps-scene` (`--theatre`/`--nyc`/`--camp`), `.ps-motes`, `.propshow__closet`, `.propshow__door`, `.ps-actor` (`--benji`/`--paige`), `.ps-sq` (`--paige`), `.ps-doorburst`, `.ps-fire`, `.ps-title`, `.propshow__controls`, `.propshow__dot`, `.propshow__caption`, `.propshow__fly`

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

### 10. Gift Registry — `#registry` / `.registry`
**File:** `content/letter.html` | **CSS:** `public/styles/site.css` (Gift Registry block)

**Design:** "The Adventure Fund" — a cinematic **dusk** that begins in parchment (a seamless seam with the Vibe section above) and melts down through amber/rose into `--night`, handing off seamlessly into the footer's campfire night. Twinkling stars fill the lower half. There is **no traditional product registry**; it frames Honeyfund contributions as **recommended donations toward the honeymoon** (not purchases).

**Pieces:**
- A lantern-lit **camp trunk** panel (kraft + `campmap.png` texture, leather rope handle, spinning compass badge, flickering flame) with the primary CTA **"Contribute to Our Journey →"** linking to the couple's Honeyfund page (`target="_blank"`).
- A strip of **luggage-tag "idea" cards** (S'mores Under New Skies, Sunset Canoe Paddle, A Day on the Trail, A Night Under the Stars) labelled "Suggested $25/$50/$100/$150" — clearly framed as inspiration, all linking to the same fund.
- A hidden **acorn** (`data-acorn="registry"`) tucked in the trunk corner — the 6th of Sir Nutsworth's hunt (see below).

**Key classes:** `.registry`, `.registry__stars`, `.registry__trunk`, `.registry__give-btn`, `.registry__ideas`, `.registry__tag`, `.registry__tag-amt`

---

### 11. The Journey (route map) — `#route` / `.route`
**File:** `content/letter.html` | **CSS:** `public/styles/site.css` (route block)

**Design:** A cinematic dusk **trail map** on a navy panel. A camera (the SVG `viewBox`) pans/zooms between three landmarks as an animated couple walks a drawn-in trail: **Cabaret Theatre (2015)**, **NYC adventures** (skyline + a verdigris Statue of Liberty silhouette), and **Camp Getaway (2026)** with a campfire finale. Caption placards and waypoint pins pop in as the traveller passes; there's a "🔁 Replay the journey" button. Honours reduced motion.

**Key classes:** `.route`, `.route__map`, `.route__line`, `.route__landmark`, `.route__couple`, `.route__caption`, `.route__replay`

---

### 12. Wedding Weekend Passport + Easter Eggs — `#passport` / `.passport`
**File:** `content/letter.html` | **CSS:** `public/styles/site.css` (Passport / acorn / cert blocks)

**Design:** A fixed bottom-right **collectible HUD**. A pill tab shows progress (`stamps/10 · 🌰 acorns/6`); tapping it opens a passport panel that **slides + fades** open (and animates closed before it's `hidden`, for a11y). Tap-outside and Escape close it.

**Stamps (10):** earned as guests explore — `envelope` (unlock), `film`, `postcard`, `cabin`, `schedule`, `story`, `backpack`, `badges`, `registry` (🧭 "Honeymoon Fund", earned by reaching the registry or tapping Contribute), `rsvp`. Most are awarded by an `IntersectionObserver` mapping section ids → stamp ids (`window.passportAward`). State persists in `localStorage` (`grecco_passport`).

**Sir Nutsworth's Acorn Hunt (6):** six 🌰 acorns are hidden across the page (`.acorn[data-acorn]`: hero, bonfire, propcloset, packing, polaroid, registry). Each idles with a gentle bob + static amber glow, pops with confetti when collected, and updates the passport tally (`grecco_acorns`). Finding all six opens the **Certificate of Squirrelly Excellence** (`#certOverlay`). A `CERT_VERSION` flag re-shows the (updated) certificate for campers who had already completed the older 5-acorn hunt.

**Sir Nutsworth III** is the site's recurring mascot (Benji as a tuxedo squirrel) — he co-stars with Paige in the prop-closet play, and appears solo in the certificate, the envelope seal bubble, and the Vibe polaroid easter egg.

**Mobile/perf notes:** the panel uses contained overscroll + momentum scroll; interactive controls use `touch-action: manipulation` and a transparent tap highlight; the acorns' idle glow is a **static** drop-shadow (only the transform bob animates) to avoid continuous-repaint jank.

**Key classes:** `.passport`, `.passport__tab`, `.passport__panel`, `.passport__grid`, `.passport__stamp`, `.passport__acorns`, `.acorn`, `.acorn--popping`, `.cert-overlay`, `.cert-card`

---

## File Structure

```
/
├── content/
│   └── letter.html                # THE REAL PAGE — all wedding markup + behaviour
│                                   #   (plain JS in one IIFE). Edit here, then encrypt.
├── public/
│   ├── styles/
│   │   └── site.css               # ALL wedding-section styles (lazy-loaded post-unlock)
│   ├── scripts/
│   │   └── confetti.browser.js    # vendored canvas-confetti (loaded on demand)
│   └── images/
│       ├── campgetaway.png        # Postcard / countdown background image
│       ├── campmap.png            # Schedule paper + registry trunk texture
│       ├── corkboard.png          # Schedule corkboard texture
│       ├── story.png              # Our Story section backdrop
│       ├── backdrop.mp4           # Packing section video background
│       ├── logistics.mp4          # Venue Info section video background
│       ├── camp_*.png             # Activities photos (archery, zipline, canoe, ropes, smores…)
│       └── og-cover.svg, …        # social share / favicons
│
├── src/
│   ├── layouts/
│   │   └── Layout.astro           # HTML shell, Google Fonts, CSS variables (:root)
│   ├── pages/
│   │   └── index.astro            # Envelope LOCK screen + decrypt/inject/unlock animation
│   └── generated/
│       └── letter.enc.json        # Encrypted ciphertext of content/letter.html (committed)
│
├── scripts/
│   └── encrypt-content.mjs        # `npm run encrypt` — PBKDF2 → AES-GCM
├── astro.config.mjs               # Astro config (honours PORT env for local preview)
├── DESIGN.md / PUBLISHING.md / README.md
```

> The wedding content is **not** in `index.astro` anymore — it lives in `content/letter.html` and ships only as the encrypted blob. See **Password Gate & Publishing Workflow** below.

---

## CSS Architecture

All wedding-section styles live in a **single flat file** (`public/styles/site.css`), organized into clearly commented sections. It is **lazy-loaded only after unlock**. The envelope lock screen's own styles live inline in `src/pages/index.astro`. Section comment format:

```css
/* ==============================
   SECTION NAME
   ============================== */
```

**Rough section order in site.css:** Hero → Postcard / Countdown (flip cards) → Venue → shared label/title/subtitle utilities → Schedule → Story (+ prop-closet show) → Packing → Activities → Vibe → camp-broadcast marquee → The Journey (route) → Footer → Passport / acorns / certificate → Gift Registry → Story CTA + two-squirrel prop-closet story (scenes, actors, controls). Responsive tweaks and `prefers-reduced-motion` overrides are co-located with their components.

**CSS Variables** are defined in `src/layouts/Layout.astro` inside a `<style is:global>` block — also home to the CSS reset, scroll-animation classes (`.reveal`, `.reveal-delay-N`), and `.section-container`.

---

## JavaScript

All behaviour is **plain JS** (no TypeScript) in one IIFE at the bottom of `content/letter.html`, executed once after the content is decrypted and injected. Features:

| Feature | Description |
|---------|-------------|
| **Flip Countdown** | Per-unit **split-flap** controller — four layers (static halves + folding flaps); paints new/old digits and toggles `.is-flipping` for one fold per change. Wall-clock-aligned ticking; targets Oct 4, 2026 18:00 UTC |
| **Scroll Reveal + Stamps** | `IntersectionObserver` adds `.visible` to `.reveal` and awards passport stamps for section ids |
| **Wedding Weekend Passport** | Stamp grid (10) + Sir Nutsworth's acorn hunt (6) + Certificate; state in `localStorage`; animated open/close, tap-outside/Escape |
| **Prop-Closet Story** | Two-squirrel (Benji + Paige) interactive overlay narrating the meet-cute — 7 tappable beats with autoplay, dot scrubber, pokeable props, cross-fading scenes, expression poses, confetti finale, encore |
| **Star Field** | Generates 120 random star `div`s in the footer at load |
| **Sound Toggle** | Swaps the hero YouTube iframe between muted background and audio+controls modes |
| **Form Submission** | RSVP submits to Google Forms via hidden iframe; toast on success |
| **Confetti** | Vendored canvas-confetti, loaded on demand for celebrations (unlock, acorns, finale) |
| **Squirrel / misc easter eggs** | Vibe polaroid squirrel spin, postmark/stamp gags, etc. |

---

## Animations & Motion

- **Scroll reveal:** `.reveal` elements start at `opacity: 0; transform: translateY(40px)` and transition in on viewport entry. Staggered via `.reveal-delay-1`…`-5`.
- **Flip countdown:** true split-flap — an upper flap folds down (`rotateX 0 → -91deg`) then a lower flap swings up (`rotateX 91 → 0deg`) with a small overshoot "thunk" and a shade scrim; `will-change` is scoped to the active `.is-flipping` cycle.
- **Passport panel:** opacity + `translateY/scale` slide, with the panel kept in the DOM through the exit transition before `hidden` is set.
- **Acorns:** continuous `transform` bob (compositor-friendly) + a **static** amber glow; pop + ring scatter on collect.
- **Prop-closet story:** curtain part and doors swing open; the actor div handles stage position while the inner SVG carries character motion (Paige's burst-in, Benji's startle squash/stretch, the lean, idle bob, tail flick); scene cross-fades, dust motes, campfire flicker, prop "fly" bursts, confetti finale.
- **Campfire flames / star twinkle / hero arrow bounce / card hovers / form-error shake** — as before.
- A shared set of easing/duration tokens (`--ease-out-expo`, `--ease-overshoot`, `--t-*`) lives in `:root`.
- Every animated component pairs with a `@media (prefers-reduced-motion: reduce)` override.

---

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| `max-width: 900px` | Countdown plaque nudges toward the image edge |
| `max-width: 768px` | Activities grid → 1 column; Packing grid → 1 column; schedule 4-col → 2-col |
| `max-width: 600px` | Countdown flip cards scale down (smaller `--cd-card-*` vars); registry idea cards → 2-col; Venue notebook loses tilt |
| `max-width: 480px` | Activity card images shorter; schedule grids remain 2-col; sound button text hidden |

Beyond breakpoints, most sizing is fluid via `clamp()`, and the countdown/registry/passport scale through CSS custom properties rather than hard breakpoints.

---

## Deployment

- **Platform:** GitHub Pages with a custom domain
- **Custom domain:** `mapouradventures.com` (via `public/CNAME`); Astro `site` is set to `https://mapouradventures.com`, served from the root (no subpath base)
- **CI/CD:** GitHub Actions workflow auto-deploys on push to `master`
- **Node version:** ≥ 22
- Asset paths are root-absolute (`/images/...`, `/styles/site.css`)
- `astro.config.mjs` honours a `PORT` env var so the local preview tooling can bind to an assigned port (no-op for normal `npm run dev`/`build`)
- ⚠️ Remember to run `npm run encrypt` before pushing content changes (see below)

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

---

## Password Gate & Publishing Workflow

The site is **password-protected** with a sealed-envelope unlock animation. A visitor sees only a themed envelope (wax seal, "P & B" monogram, postmark, tuxedo-squirrel mascot, pine-ridge night sky); tapping the seal asks for the password; the correct password cracks the seal, opens the flap, lifts a card out, and zooms into the hero video as the full page assembles. No dates, venue, or schedule appear anywhere outside the lock.

### How it works
- **Real content** lives in **`content/letter.html`** (all the markup that used to be in `index.astro` lines 8–957, plus its behavior as **plain JS** in one IIFE at the bottom).
- **`npm run encrypt`** (`scripts/encrypt-content.mjs`) encrypts that file with the password via PBKDF2 → AES-GCM and writes **`src/generated/letter.enc.json`** (committed). The deployed site ships only this ciphertext; the password is never stored and is not visible in DevTools.
- **`src/pages/index.astro`** is now the envelope lock screen + the decrypt/inject/animation logic. The wedding-section styles moved to **`public/styles/site.css`** and are lazy-loaded only after unlock.
- **Password:** `happycamper` (supplied only at encrypt time via the `WEDDING_PASSWORD` env var or prompt — never committed).

### ⚠️ Publishing rule
After editing `content/letter.html`, **always run `npm run encrypt` before committing/pushing**, or the live site will keep the old content. Keep `content/letter.html`'s `<script>` as plain JS (no TypeScript syntax) — it runs in the browser as-is. Full step-by-step in **[PUBLISHING.md](./PUBLISHING.md)**.

> Note: some older section entries above still cite `src/pages/index.astro` / `src/styles/main.css` line numbers from before the password gate. Treat those as historical — **all** wedding-section *markup + JS* now lives in `content/letter.html`, and **all** wedding-section *styles* in `public/styles/site.css`. The lock screen itself is `src/pages/index.astro`.
