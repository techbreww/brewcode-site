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
- Version numbers update themselves: on page load, `app.js` fetches the latest published `brewcode-cli` version and rewrites every element with a `data-version` attribute. It asks `/api/version` first (a Vercel serverless function in `api/version.mjs` that proxies the npm registry, edge-cached for an hour), then falls back to the registry directly (covers local dev, where `/api` doesn't exist). If both fail, the page shows the placeholder `x.x.x` hardcoded in `index.html` — deliberately obvious so a broken version lookup gets noticed instead of silently showing a stale number.
- To test the serverless function locally, use `npx vercel dev` instead of `python3 -m http.server`.
