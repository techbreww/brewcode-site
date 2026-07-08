# brewcode-site

Marketing site for [BrewCode](https://github.com/techbreww/brewcode) — static HTML/CSS/JS, no build step.

## Preview locally

```sh
python3 -m http.server 4173
# open http://localhost:4173
```

## Deploy

The site is fully static (`index.html`, `styles.css`, `app.js`, `assets/`). Drop it on GitHub Pages, Netlify, Vercel, or Cloudflare Pages as-is — no build command, publish directory is the repo root.

For Vercel, `vercel.json` is already set up (clean URLs, security headers, long-lived caching for `assets/`). Deploy with:

```sh
npx vercel          # preview
npx vercel --prod   # production
```

Note: `assets/` is served with `immutable` caching — if you ever change an asset, rename the file.

## Editing content

- All copy lives directly in `index.html`, organized by section (`hero`, `features`, `privacy`, `providers`, `desktop`, `install`, `docs`).
- Brand tokens (colors, fonts) are CSS variables at the top of `styles.css` — dark theme is the default, light theme overrides live under `[data-theme="light"]`.
- The hero terminal's typed demo lines are the `demoLines` array in `app.js`.
- The version badge (`v2.5.0`) in the header is hardcoded in `index.html` — bump it when the CLI releases.
