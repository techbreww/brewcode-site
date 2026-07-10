# brewcode-site

Marketing site for [BrewCode](https://github.com/techbreww/brewcode) — static HTML/CSS/JS, no build step.

## Design

A "quiet technical editorial" look: generous whitespace, a restrained palette (warm ink/paper
with a single honey accent), and a disciplined type hierarchy. Dark theme is the default; a light
theme lives under `[data-theme="light"]` and is toggled from the header.

Brand tokens (colors, fonts, radii, spacing) are CSS custom properties at the top of `styles.css`.
Swap the accent, fonts, or surfaces there to re-skin the whole site.

## Preview locally

```sh
python3 -m http.server 4173
# open http://localhost:4173
```

## Deploy

The site is fully static (`index.html`, `styles.css`, `app.js`, `assets/`). Drop it on GitHub Pages,
Netlify, Vercel, or Cloudflare Pages as-is — no build command, publish directory is the repo root.

For Vercel, `vercel.json` is already set up (clean URLs, security headers, long-lived caching for
`assets/`). Deploy with:

```sh
npx vercel          # preview
npx vercel --prod   # production
```

Note: `assets/` is served with `immutable` caching — if you ever change an asset, rename the file.
The `og:image` still points at `assets/brewcode.png` (the product logo); drop that PNG in for social
previews, or swap the `og:image` meta to the SVG wordmark.

## Editing content

- All copy lives directly in `index.html`, organized by section (`hero`, `features`, `privacy`,
  `providers`, `desktop`, `install`, `docs`).
- The hero demo's typed lines are the `demoLines` array in `app.js` (each entry is a command plus an
  optional output line).
- Version numbers update themselves: on page load, `app.js` fetches the latest published
  `brewcode-cli` version and rewrites every element with a `data-version` attribute. It asks
  `/api/version` first (a Vercel serverless function in `api/version.mjs` that proxies the npm
  registry, edge-cached for an hour), then falls back to the registry directly (covers local dev,
  where `/api` doesn't exist). If both fail, the page shows the placeholder `x.x.x` hardcoded in
  `index.html` — deliberately obvious so a broken version lookup gets noticed instead of silently
  showing a stale number.
- To test the serverless function locally, use `npx vercel dev` instead of `python3 -m http.server`.
