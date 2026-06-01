---
title: The Backend Wave (Sequencing)
description: Which backend-dependent features are committed but sequenced after the core ships, and the only two features deferred indefinitely.
sidebar:
  order: 4
---

Everything is committed **except two** features. But backend-dependent features ship as a deliberate **wave** *after* the client + team-sync core is live and selling — so early execution stays lean and infra cost tracks revenue.

## The one backend we build first
**Team sync** (Yjs + S3, self-hostable). Everything client-side ships around it at ~$0 infra.

## Backend wave — committed, sequenced
Each needs its own backend beyond team sync, so it ships once the core sells:

| Feature | Why it needs backend | No-backend interim |
|---|---|---|
| Hosted mock servers | a service must answer mock requests over the internet | local/client-side mock |
| Public sharing / workspaces / "Run-in-app" links | serving public content from our servers | git-based sharing (push the repo) |
| Hosted public docs portal | publishing docs to a public URL | client-side docs generation + static export |
| Team usage analytics | aggregating usage server-side | — (deferred) |

## Deferred indefinitely — the only two
- **Hosted monitors / scheduled checks / alerting** — replaced by **CI-offload** (run our CLI in the user's own CI).
- **Hosted LLM eval / observability** — LLM testing stays **client-side only**. We may revisit *only after* the rest is built and selling.

## Why this discipline
It keeps fixed infra near-zero deep into revenue, minimizes the SOC 2 surface, and protects execution speed — the bootstrapped advantage. The full reasoning is in [Decision D9](/rambo/strategy/decision-log/).
