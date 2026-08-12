# PhansiCare Ground Study

A responsive product concept for decorative coloured wood mulch and more considered landscapes in Nigeria.

## What is included

- Before-and-after landscape comparisons
- Residential, hospitality, commercial and public-space scenarios
- Decorative mulch colour explorer
- Early-access concept form
- Responsive and keyboard-accessible interactions
- Automated deployment to GitHub Pages

## Local development

Use Node.js 22 or newer.

```bash
npm ci
npm run dev
```

## Production checks

```bash
npm run build
node --test tests/rendered-html.test.mjs
```

## GitHub Pages deployment

The workflow in `.github/workflows/pages.yml` builds a static export and publishes it whenever `main` is updated. In the repository settings, Pages must use **GitHub Actions** as its source.

The early-access form is currently a front-end prototype and does not send or store submissions.

## Vercel deployment

Import this repository into Vercel without overriding the build settings. The committed `vercel.json` builds a static export and publishes `dist/client`.

If the Vercel project already has dashboard overrides, reset these project settings so the repository configuration can take effect:

- Framework Preset: Other
- Build Command: `npm run build:vercel`
- Output Directory: `dist/client`
- Install Command: `npm ci`
- Root Directory: repository root
