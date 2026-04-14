# Paige & Benji — Wedding Website

Save the Date / wedding information site for Paige Grecco & Benji Sills.
**October 4–5, 2026 · Club Getaway · Kent, CT**

Live site: https://awaisqazi.github.io/BenjiandPaige

> For design guidelines, color palette, section breakdown, and theming rules — see [DESIGN.md](./DESIGN.md).

## Dev Commands

| Command | Action |
| :-------------- | :----------------------------------------------- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build for production to `./dist/` |
| `npm run preview` | Preview production build locally |

## Project Structure

```
src/
├── layouts/Layout.astro    # HTML shell, Google Fonts, CSS variables
├── pages/index.astro       # All page content + JavaScript
└── styles/main.css         # All styles (~1500 lines, section-commented)

public/images/              # All images and video assets
astro.config.mjs            # Base path: /BenjiandPaige
```

Deploys automatically to GitHub Pages on push to `master`.
