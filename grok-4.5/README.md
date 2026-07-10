# brewcode-site

Marketing site for [BrewCode](https://github.com/techbreww/brewcode) — static HTML/CSS/JS, no build step.

## Preview locally

```sh
python3 -m http.server 4173
# open http://localhost:4173
```

On Windows:

```sh
python -m http.server 4173
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

- All copy lives in `index.html` by section (`hero`, `capabilities`, `models`, `privacy`, `desktop`, `install`, `docs`).
- Brand tokens (colors, fonts, radii) are CSS variables at the top of `styles.css`. Dark is default; light overrides live under `[data-theme="light"]`.
- Hero typed demo lines are the `demoLines` array in `app.js`.
- Version numbers update on load: `app.js` fetches the latest published `brewcode-cli` version and rewrites every `[data-version]` element. It tries `/api/version` first (Vercel function in `api/version.mjs`, edge-cached for an hour), then the npm registry directly. If both fail, the page keeps the obvious `x.x.x` placeholder.
- To test the serverless function locally, use `npx vercel dev` instead of a plain static server.
