# FLOWBRIDGE

Open source browser workflow builder for local-first data processing.

## Features

- React + TypeScript + Vite + React Flow
- Text, JSON, CSV, and image input blocks
- Text formatting, find/replace, JSON validation/formatting, CSV↔JSON, image resize, rename, and download blocks
- Type-aware connections, topological execution, cancellation, loop guard, per-node status
- IndexedDB save, JSON import/export, responsive editor, light/dark theme, Japanese UI
- No backend, no authentication, no external AI API, no arbitrary JavaScript execution

## Setup

```bash
npm install
npm run dev
npm run test
npm run build
```

## GitHub Pages deployment

The repository includes `.github/workflows/deploy-pages.yml`. Push to `main`, then enable **Settings → Pages → Source: GitHub Actions** once in the repository settings. Every subsequent push to `main` runs tests, builds the static site, and deploys it to GitHub Pages.

## Security model

FLOWBRIDGE does not use `eval`, `Function`, or arbitrary code blocks. Files are processed in-browser. Imported workflow JSON is limited to 2MB and validated before use. No external URL fetch or data upload is performed by the MVP.

## Known limitations / roadmap

- CSV parser currently supports simple comma-separated values (quoted commas are not yet parsed).
- Image resize requires a browser with `createImageBitmap` and `OffscreenCanvas`.
- The MVP executes one input branch per node; fan-in merging is a roadmap item.
- Future: richer schema ports, workflow templates, ZIP asset packaging, optional Web Worker orchestration.

## License

MIT. Runtime dependencies are MIT-compatible or permissively licensed; verify lockfile notices before redistribution.
