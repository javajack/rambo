# Rambo

Strategy, market, business-model, and validated feature deep-dive documentation for **Rambo** — a local-first, closed-source, **agent-native** API client built to compete with Postman, Insomnia, Bruno, Yaak and Hoppscotch.

> This repository is the **documentation site** (Astro + Starlight). It synthesizes a multi-round, adversarially-verified research effort into a single readable knowledge base: the idea, the market, validated customer complaints, unfulfilled gaps, the full product & feature deep-dives, the business model (pricing, plans, metering), unit economics, go-to-market, architecture, and the decision trail.

## Run it locally

```bash
./start.sh          # install deps (first run) + dev server  → http://localhost:4321/rambo/
./start.sh build    # static build into ./dist
./start.sh preview  # build + preview the production site
```

Or directly with npm:

```bash
npm install
npm run dev
```

Requires **Node 18+** (developed on Node 22).

## Structure

- `src/content/docs/` — all documentation pages (Markdown/MDX), grouped by section.
- `astro.config.mjs` — site config + sidebar.
- `.github/workflows/deploy-docs.yml` — GitHub Pages deploy (see note below).

## Deployment

The included GitHub Actions workflow builds and deploys to GitHub Pages on every push to `main`.
**Private-repo note:** publishing GitHub Pages from a private repo requires a paid GitHub plan. Until then, the build job still validates the site in CI and you can read everything locally via `./start.sh`.

## Provenance

Content is distilled from a verified research program (multiple deep-research passes with 2-of-3 adversarial verification; refuted claims discarded). Source citations are carried inline and on the **Evidence** pages. Honest evidence gaps are flagged rather than papered over.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
