# Paige & Benji — Wedding Website

Save the Date / wedding information site for Paige Grecco & Benji Sills.
**October 4–5, 2026 · Club Getaway · Kent, CT**

Live site: https://awaisqazi.github.io/BenjiandPaige

> For design guidelines, color palette, section breakdown, and theming rules — see [DESIGN.md](./DESIGN.md).
>
> 🔒 **The site is password-protected.** Before pushing content changes you must re-encrypt — see [PUBLISHING.md](./PUBLISHING.md).

## Dev Commands

| Command | Action |
| :-------------- | :----------------------------------------------- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build for production to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run encrypt` | Re-encrypt `content/letter.html` → `src/generated/letter.enc.json` (run before pushing content changes) |

## Project Structure

```
content/letter.html         # The real (private) wedding page — edit here, then `npm run encrypt`
scripts/encrypt-content.mjs  # Encrypt tool (npm run encrypt)
src/
├── layouts/Layout.astro     # HTML shell, Google Fonts, CSS variables
├── pages/index.astro        # The sealed-envelope lock screen + unlock animation
└── generated/letter.enc.json # Encrypted wedding content (committed; built by npm run encrypt)

public/styles/site.css       # Wedding-section styles (lazy-loaded after unlock)
public/images/               # All images and video assets
astro.config.mjs             # Astro config
```

Deploys automatically to GitHub Pages on push to `master`.
The site is password-protected — see [PUBLISHING.md](./PUBLISHING.md) before editing content.
