---
title: "Spec 02 — Sync Protocol & Data Model"
description: A CRDT (Yjs) data model and sync protocol for real-time team collaboration without cloud lock-in — offline-first, self-hostable, with clean conflict UX.
sidebar:
  order: 2
---

## Pain it solves *(validated)*
Git-as-sync breaks for teams — open requests vanish on merge/branch-switch ([bruno#6889](https://github.com/usebruno/bruno/issues/6889)); Postman's real-time sync means cloud lock-in. See [Feature 12](/rambo/features/12-realtime-team-sync/).

## Differentiation (what sells)
**Real-time team sync that you can still walk away from** — offline-first, self-hostable, no account for solo use, and a *readable* conflict resolver. Cloud-only tools can't be local-first; git-only tools can't be real-time.

## Data model (CRDT)
A workspace is one **Yjs `Y.Doc`**. The collection tree is a `Y.Map` of nodes keyed by **stable UUIDs**, each node a `Y.Map`:
```
nodes: Y.Map {
  "uuid-1": { type: "folder", parent: null,      order: "a0",  name: "Auth" },
  "uuid-2": { type: "request", parent: "uuid-1", order: "a0V", data: Y.Map{...} },
}
```
- **Ordering by fractional index** (`order`) — same scheme as the [file format](/rambo/specs/01-file-format/); concurrent inserts never collide, no renumber.
- **Request bodies/scripts** are `Y.Text` (fine-grained merges).
- **Local-first:** the `Y.Doc` lives on disk; edits apply offline and replay on reconnect.

## Sync protocol
- **Transport:** WebSocket carrying **Yjs binary update messages** (the proven y-protocols), plus an **awareness** channel for presence/cursors.
- **Server = a thin relay + snapshot store:** broadcasts updates to a room and persists periodic snapshots to **S3-compatible object storage** (the [y-sweet](https://github.com/jamsocket/y-sweet) model). The server doesn't parse collections — it relays opaque CRDT updates.
- **Multitenancy:** a workspace = a room; a scoped access token gates join. Server-side **seat/sync metering** counts active members + synced doc bytes at the relay (this is where [metering](/rambo/business/metering/) is enforced — never client-trusted).
- **Secrets never sync as plaintext** — only `secret://` references travel in the doc; the encrypted vault is a separate blob ([Spec 03](/rambo/specs/03-secrets-encryption/)).

## The hard problem (flagged honestly)
**Concurrent tree *moves*** are the known CRDT weak spot — two users moving the same node can produce a cycle or duplicate. Mitigation: a last-writer-wins `parent` pointer + a server-side cycle check on snapshot, or adopt a tested move-aware CRDT. **Needs a prototype + a soak test before committing.**

## Tech choices
**Yjs** (mature; Loro as a watch item), `y-protocols` over WebSocket, a Rust relay (y-sweet-style) + S3/R2 persistence. Reuse the [shared backend primitive](/rambo/backend/) so desktop, extension, and CLI all sync the same way.

## Open decisions
- Move-CRDT approach (LWW-parent+cycle-check vs. a move-aware library).
- Snapshot cadence + compaction; per-team cost model ([open question Q3](/rambo/strategy/open-questions/)).
