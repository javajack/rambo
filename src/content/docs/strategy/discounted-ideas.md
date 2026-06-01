---
title: Discounted Ideas — and Why
description: Every idea considered and rejected, with the verified reason — so settled questions don't get relitigated.
sidebar:
  order: 2
---

Ideas explicitly considered and **rejected**, each with its reason. Adopted counterparts: [Decision Log](/rambo/strategy/decision-log/).

## Business model
- **Source-available / FSL / open-source core** — *discounted* for closed-source. FSL auto-converts each version to OSS after 2 years, which **conflicts with a lasting license**; plus fork risk and licensing complexity. (Trade accepted: closed-source carries a behavioral trust burden.)
- **Pure one-time / perpetual license as the primary model** — *discounted.* Bruno's founder: *"one time payments… does not scale for a team"* (killed its $19 edition). Also lumpy cash flow, org license abuse, tax/ops complexity, dual-model confusion.
- **Metering on local artifact counts (collections/APIs)** — *discounted.* Requires telemetry that **breaks the privacy wedge**; no local-first tool does it; penalizes the usage we want.
- **Proprietary cloud-first model (Postman-style)** — *discounted.* It *is* the betrayed-trust pattern we're countering; high infra; trust friction.
- **VC-scale ambition / sales-led from day one** — *discounted* for lean bootstrapped; the SAM is modest and capital-efficiency fits.

## Market / positioning
- **Competing in API *management* (gateways)** — *discounted.* Wrong market — Kong/Apigee/AWS territory, not our SAM.
- **Pure offline-only client (full Bruno/Yaak clone)** — *discounted* as the whole product; no recurring-revenue engine. We keep offline as the free core and add a metered sync tier.
- **Betting *revenue* on LLM-testing** — *discounted/demoted.* In-client WTP unproven; the dedicated category is well-funded/consolidating; basics are catchable. Kept as the adoption hook.

## Trust / accounts
- **Forced login from first launch** — *discounted* for login-optional-until-sync. Forced accounts are the #1 pain; the refinement loses no revenue.

## Architecture
- **Automerge (CRDT)** — *discounted.* Slowest, OOMs, can't finish large runs.
- **Per-room (Liveblocks) / per-call (Convex) sync backends as the core** — *discounted.* Cost scales punitively with activity; object-storage (Yjs + S3) is cheapest and self-hostable.

## Refuted research claims — *do not resurrect*
- "Postman MCP supports STDIO+SSE+streamable-HTTP" (refuted) — treat as a *gap*, not a strength.
- "73% AI-API-traffic growth" stat (refuted).
- "Local-first apps need no backend" (refuted) — minimal-infra ≠ no-infra.
- "Bruno is fully local, nothing touches cloud" (refuted) — don't overstate.
