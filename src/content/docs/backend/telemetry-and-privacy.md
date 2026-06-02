---
title: Telemetry & Privacy
description: How to measure adoption, conversion, and crashes without breaking the privacy wedge — by measuring the funnel from backend-resident signals, not client surveillance.
sidebar:
  order: 6
---

## The tension
We need product metrics (activation, retention, conversion, crash rates). But our entire wedge is **privacy and no surveillance**, and the [trust contract](/rambo/product/positioning-and-trust/) promises the local tier makes **zero unexpected network calls** (developers *will* verify with a packet sniffer). These look irreconcilable. They aren't.

## The resolution — measure the funnel server-side, not on the client
The key insight: **the paid funnel already runs through our backend**, so we can measure it from signals that are legitimately ours — *without* any client telemetry:

| Metric | Measured from (server-side) |
|---|---|
| Activation | first successful **sync** (relay event) |
| Team formation | first invited member |
| Conversion | free-*X* → paid (billing) |
| Retention / NRR | subscription + seat changes (billing) |
| Expansion | seat / consumption growth |

These come from the [sync relay](/rambo/specs/02-sync-protocol/) and [billing](/rambo/backend/billing-and-metering/) — **no client tracking required.**

## What about the local/free tier?
- **Zero calls by default.** No account → no tracking. The offline binary stays verifiably silent (the contract).
- **Opt-in, anonymous, aggregate** product analytics only — clearly disclosed, no PII, **never** request/response/secret data. Off until the user agrees.
- **Crash reporting:** opt-in, **scrubbed** (no request bodies, no secrets, symbolicated stacks only).

## Primitives (portable, no PII leakage to third parties)
- A **self-hostable** analytics sink — **PostHog or Plausible (self-hosted)**, or a minimal Postgres-backed event endpoint we own. Never a third-party tag that ships user data off to an ad-tech cloud.
- Crash reporting via a self-hostable collector (e.g. self-hosted Sentry) with strict scrubbing.

## The discipline
- **Scoped, precise claims** — state exactly what is/ isn't collected; let users verify. (Don't promise "zero telemetry" absolutely, then ship an update check — that's how trust dies.)
- **Opt-in for anything client-side**; server-side funnel metrics need no opt-in because they're inherent to providing the synced service.
- The result: we get the metrics a SaaS needs **and** keep the wedge — because the measurement lives where the value (and the user's consent to sync) already is.

## Open decisions
- Opt-in vs. opt-out for the *account-required* paid tier's client analytics.
- Crash-reporter choice + scrubbing rules.
- Exactly which relay/billing events power the canonical funnel dashboard.
