---
title: The Sync Engine
description: Git-as-sync for free, a Yjs + S3 sync backend for paid — the cheapest credible architecture, validated.
sidebar:
  order: 2
---

## Two sync paths

### Free: git-as-sync (zero backend)
Collections are plain-text files in the user's own Git. Bruno proved this model works and that developers love it — *"No cloud sync. Your data stays local."* Cost to us: **$0**.

### Paid: a Yjs + S3 sync backend
Where git-as-sync breaks down — real-time collaboration, and the **open-request-vanishing-on-merge** class of bugs (Bruno [#6889](https://github.com/usebruno/bruno/issues/6889)/[#6864](https://github.com/usebruno/bruno/issues/6864)) — the paid tier provides real-time sync + reliable merge/conflict UX via a CRDT backend.

## Why git-as-sync breaks (the paid value)
Verified: in Bruno, a merge/branch-switch makes open requests **disappear with no per-request reload** (restart required). And Bruno itself **paywalls merge-conflict resolution** — proving clean conflict UX is a pain teams pay for. So the paid tier sells exactly what git-as-sync does badly.

## The architecture: y-sweet-style
The cheapest credible backend is a **Yjs + S3-compatible-storage sync server** that's **self-hostable** — exemplified by the MIT-licensed [y-sweet](https://github.com/jamsocket/y-sweet) (Rust; persists documents to S3/R2 "like Figma"). Object-storage persistence **sidesteps** the expensive metering models:

| Approach | Cost model |
|---|---|
| **Yjs + S3 (y-sweet-style)** ✅ | cheap object storage; self-hostable |
| Liveblocks | $0.03 / monthly active room |
| Convex | $2 / 1M function calls (real-time sync burns calls fast) |

**Bonus:** because it self-hosts, the *same* backend is the [enterprise on-prem story](/rambo/features/18-self-hosting/) — one architecture, three tiers.

## CRDT choice
Verified benchmarks: **Loro fastest, Yjs second (~13% gap), Automerge the laggard** (OOM, can't finish large runs). We favor **Yjs** (maturity + ecosystem) for a sync-heavy team product, with Loro as a watch item. The collection tree is modeled as CRDT structures (not just text).

## Open item
Per-team **sync cost at scale** isn't yet modeled — a [spike](/rambo/strategy/open-questions/) before committing the team-tier architecture. Secrets are **never** synced as plaintext (references only; values in the OS keychain).
