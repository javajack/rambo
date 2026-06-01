---
title: How This Was Built
description: The research method behind these docs — multi-round deep research, 2-of-3 adversarial verification, discarded claims, and explicitly flagged evidence gaps.
---

These docs are not opinion. Every load-bearing claim comes from a structured research program designed to be hard on itself.

## The method

- **Multi-round deep research.** Successive fan-out passes (market, competitors, pricing, licensing, architecture, and per-feature complaint deep-dives) each decomposed a question into several search angles, fetched primary sources, and extracted falsifiable claims.
- **Adversarial verification.** Every candidate claim faced a **2-of-3 vote** — independent agents tried to *refute* it. Claims that failed were **discarded**, not softened. Across the program, a meaningful fraction of extracted claims were killed this way.
- **Primary sources first.** GitHub issues/PRs (verified via API), vendor docs and pricing pages, official blog posts, maintainer statements, and security research — over secondary aggregators.
- **Staleness flags.** Fast-moving facts (pricing, MCP features, bug states) are dated and marked, because they drift.

## What we refuse to do

- **No hallucination.** If evidence didn't survive verification, the claim isn't asserted as fact.
- **No silent gaps.** Where a research pass returned no verified complaints, the relevant page says so plainly (see, e.g., the honest gaps in [scripting & testing](/rambo/features/08-scripting-and-testing/) and [auth flow-UX](/rambo/features/05-auth/)).
- **No TAM mirage.** Market sizing distinguishes the large API-*management* TAM from the realistic API-*client* SAM, and labels all syndicated figures as directional.

## How to read confidence

- **High** — primary source(s), unanimous verification.
- **Medium** — split verification vote, or self-reported/vendor figures with corroboration.
- **Flagged** — estimate, anecdote, or an explicit open question.

The full evidence base lives under [Evidence → Research Findings](/rambo/evidence/research-findings/) and [Sources](/rambo/evidence/sources/); unresolved items are tracked in [Open Questions](/rambo/strategy/open-questions/).
