# Publishing Guide — How to Update the Wedding Site

The wedding details on this site are **password-protected**. A visitor first sees a
sealed envelope; only after entering the password does the real page decrypt and
open. This guide explains how to edit content and push changes **without breaking
the password gate**.

> **The one rule:** after editing the content, run `npm run encrypt` before you
> commit and push. If you skip it, the live site keeps showing the *old* content.

---

## How the password gate works (the short version)

- The entire wedding page (all text, the schedule, the RSVP form, and its behavior
  script) lives in **`content/letter.html`** — a normal, editable file.
- `npm run encrypt` scrambles that file with the password using AES-GCM and writes
  the result to **`src/generated/letter.enc.json`**.
- The deployed site ships **only that encrypted blob**. When someone types the
  correct password, the browser decrypts it and drops the page in. A wrong password
  simply fails to decrypt — nothing is revealed, and the password is never stored
  anywhere in the page (so it can't be found in "Inspect Element").

**The password is:** `PaigeAndBenji123!`
(It is never committed to the repo — you supply it only when you run `npm run encrypt`.)

---

## To change wedding content (dates, schedule, story, RSVP, etc.)

1. **Edit `content/letter.html`.** This is the real page — plain HTML. Edit text,
   times, list items, etc. just like normal. The behavior at the bottom of that file
   is plain JavaScript (no TypeScript) on purpose — keep it that way.
2. **Re-encrypt:**
   ```bash
   WEDDING_PASSWORD='PaigeAndBenji123!' npm run encrypt
   ```
   (or just run `npm run encrypt` and type the password when prompted.)
   This regenerates `src/generated/letter.enc.json`.
3. **Preview locally:**
   ```bash
   npm run dev
   ```
   Open http://localhost:4321, tap the seal, enter the password, and confirm the page
   opens correctly.
4. **Commit and push:**
   ```bash
   git add content/letter.html src/generated/letter.enc.json
   git commit -m "Update wedding content"
   git push
   ```
   Pushing to `master` triggers the GitHub Actions deploy automatically. **No GitHub
   secret or password is needed in CI** — it just builds the already-encrypted blob.

## To change the envelope / lock screen (the public part)

Edit **`src/pages/index.astro`** — that's the sealed-envelope animation, the password
box, and the little easter eggs. No re-encryption needed for these; just commit and push.
Keep the envelope free of real wedding details (no dates, venue, or schedule out here).

## To change the password

Pick a new password, then re-encrypt with it and push:
```bash
WEDDING_PASSWORD='YourNewPassword' npm run encrypt
git add src/generated/letter.enc.json && git commit -m "Rotate password" && git push
```
Then share the new password with your guests. (The old encrypted blob can no longer be
opened with the old password once you overwrite it.)

---

## Files at a glance

| File | What it is | Commit it? |
|------|------------|-----------|
| `content/letter.html` | The real wedding page (edit here) | ✅ yes |
| `src/generated/letter.enc.json` | Encrypted output of the above | ✅ yes (after `npm run encrypt`) |
| `src/pages/index.astro` | The sealed-envelope lock screen + animation | ✅ yes |
| `public/styles/site.css` | Styles for the wedding sections (loads after unlock) | ✅ yes |
| `scripts/encrypt-content.mjs` | The encrypt tool (`npm run encrypt`) | ✅ yes |

## Common mistakes

- **Edited `content/letter.html` but forgot `npm run encrypt`** → live site shows old
  content. Re-encrypt and push again.
- **Committed a password anywhere** → don't. The password only ever goes into the
  `WEDDING_PASSWORD` env var or the interactive prompt.
- **Rewrote the content script using TypeScript syntax** (`: number`, `as HTMLElement`)
  → it won't run in the browser. Keep `content/letter.html`'s `<script>` plain JS.
