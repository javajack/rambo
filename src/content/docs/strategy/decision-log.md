---
title: Decision Log
description: Every locked decision — context, decision, and rationale — so settled questions aren't relitigated.
sidebar:
  order: 1
---

Each decision: **context → decision → rationale.** Rejected alternatives live in [Discounted Ideas](/rambo/strategy/discounted-ideas/).

## D1 — Closed-source core
Earlier leaning was source-available/FSL. **Decision:** keep code private. **Why:** dissolves the FSL-vs-perpetual contradiction and fork risk; trust is achievable closed-source (Obsidian, the local-first manifesto), shifted onto provable behavior.

## D2 — Lean bootstrapped, enterprise endgame
**Decision:** bootstrap with minimal infra + bottom-up PLG; bias toward an eventual enterprise motion. **Why:** sub-$5K-ACV products struggle on NRR → enterprise compounds; minimal infra keeps survival cheap.

## D3 — Three tiers: free local / metered team / self-hosted enterprise
**Why:** proven structure (GitLab/Obsidian/AFFiNE); the free tier counters Postman's removal of free team collaboration.

## D4 — Login optional until you sync
**Decision:** solo/offline use needs **no account**; login only when syncing/collaborating. **Why:** preserves the no-forced-account wedge *and* the widest funnel; loses zero revenue (metering only touches synced resources).

## D5 — Meter only backend-synced resources
**Decision:** meter seats, synced storage/collections, cloud runs — **never** local artifacts. **Why:** verified — every local-first tool does this; metering local artifacts needs telemetry that breaks the privacy wedge.

## D6 — Sync architecture: git-as-sync free, Yjs + S3 paid
**Why:** git-as-sync breaks on merge/co-edit → that's the paid value; object-storage persistence undercuts per-room/per-call metering; the self-hostable backend doubles as enterprise on-prem. CRDT = Yjs (Loro alt; Automerge rejected).

## D7 — LLM testing = adoption hook, not primary revenue
**Decision:** position live LLM/agent-API testing as the free hook + brand differentiator; rest **revenue** on team sync. **Why:** de-risk — in-client WTP is unproven and basics are catchable; keeps the unique wedge without betting the model on it.

## D8 — LLM testing is client-side only (no LLM backend)
**Decision:** a client-side feature (smart HTTP/SSE client for LLM-shaped requests), synced like any data. **No** hosted eval/observability backend. **Why:** keeps infra near-zero and execution fast; revisit only after everything else is built and selling.

## D9 — Only two features deferred; everything else prioritized
**Decision:** defer indefinitely only **(a)** hosted monitors/alerting and **(b)** hosted LLM eval/observability; other backend features ship as a sequenced [backend wave](/rambo/product/backend-wave/). **Why:** lean early execution + a full-featured roadmap; the two deferrals are the heaviest/least-validated backend bets.
