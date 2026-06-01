---
title: "Feature 12 — Real-Time Team Sync"
description: "The one backend — real-time sync of collections/environments across a team via a Yjs+S3, self-hostable sync server; reliable merge/conflict UX is the paid value."
sidebar:
  order: 12
---

# Feature 12 — Real-Time Team Sync

## What it is
The product's **one backend**: real-time sync of collections, environments, and (non-secret) config across a team — beyond what git-as-sync can do — with **reliable merge/conflict UX**. Local-first: works offline, syncs when online. Built on a **Yjs + S3-backed, self-hostable** sync server (y-sweet-style).

## ⭐ Pain points & competitor complaints (validated)
- **Git-as-sync breaks down for teams.** In Bruno, merges/branch-switches make **open requests vanish with no auto-recovery** (restart required) — [usebruno/bruno#6889](https://github.com/usebruno/bruno/issues/6889), [#6864](https://github.com/usebruno/bruno/issues/6864). And **Bruno paywalls merge-conflict resolution** — proving conflict UX is a pain teams pay for.
- **Postman's cloud sync = lock-in + forced account** (the #1 verified pain). Teams want real-time collaboration **without** surrendering their data or going cloud-only.
- See [Research-Findings §10](/rambo/evidence/research-findings/).

## Differentiation
Real-time team sync **with** local-first ownership: offline-first, no forced account for solo use ([login optional until sync, D4](/rambo/strategy/decision-log/)), clean conflict resolution, and **self-hostable** — none of which the incumbents combine.

## UX
Live presence + updates in shared workspaces; an explicit, readable **conflict-resolution UI** (not silent overwrites); offline edits queue and reconcile on reconnect.

## Feasibility
**Medium** — it's the only real backend. CRDT sync is well-trodden (**Yjs** mature; **Loro** faster), and [y-sweet](https://github.com/jamsocket/y-sweet) (MIT, Rust, S3-backed) is a ready architecture that persists to object storage — **sidestepping** Liveblocks per-room ($0.03/room) and Convex per-call ($2/1M) pricing.

## Implementation & tech choices
- CRDT = **Yjs** (ecosystem/maturity) with Loro as a watch item; model the **collection tree** as CRDT structures (not just text) — *complexity flag*.
- Sync server = y-sweet-style (Rust + S3/R2). Object-storage persistence keeps marginal cost low and **self-hostable → doubles as the enterprise on-prem backend** ([18](/rambo/features/18-self-hosting/)).
- Secrets are **not** synced as plaintext — references only; local keychain holds values ([04](/rambo/features/04-environments-variables-secrets/)).

## Dependencies
Builds on **[01 · file format](/rambo/features/01-file-format-and-storage/)** + **[03 · collections](/rambo/features/03-collections-and-organization/)**. It is the **paid tier's** core value and the substrate for **[13 · collaboration UX](/rambo/features/13-collaboration-and-merge-ux/)**, **[14 · shared workspaces](/rambo/features/14-shared-workspaces/)**, and all **enterprise** features.

## Open questions
- CRDT modeling of structured collection data (vs plain text). Per-team **sync cost at scale** unmodeled — spike before committing ([Open-Questions Q3](/rambo/strategy/open-questions/)).
