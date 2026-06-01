---
title: "Feature 13 — Collaboration & Merge/Conflict UX"
description: "The human side of team sync — safe explicit sharing, reliable merge/conflict resolution, and (unvalidated) review/comment workflows."
sidebar:
  order: 13
---

# Feature 13 — Collaboration & Merge/Conflict UX

## What it is
The collaboration layer on top of [12 team sync](/rambo/features/12-realtime-team-sync/): how teammates share collections safely, see each other's changes, and resolve conflicts.

## ⭐ Pain points & competitor complaints (validated)
- **Sharing is itself the leak vector.** Team sharing of collections/environments is a *named* cause of the 30,000-workspace leak problem; Postman's Sept-2025 redesign explicitly targets *"accidental over-sharing"* with local-by-default + **explicit, opt-in sharing** ([#13760](https://github.com/postmanlabs/postman-app-support/issues/13760); [CloudSEK](https://www.cloudsek.com/blog/postman-data-leaks-the-hidden-risks-lurking-in-your-workspaces)). See [04 secrets](/rambo/features/04-environments-variables-secrets/).
- **Git-as-sync conflict UX breaks.** Open requests vanish on merge/branch-switch with no per-request reload ([usebruno#6889](https://github.com/usebruno/bruno/issues/6889), [#6864](https://github.com/usebruno/bruno/issues/6864)); Bruno paywalls merge-conflict resolution — conflict UX is a paid pain.
- **Validated demand for review-before-merge + legible diffs (beyond safe sync).** Postman users: *"very difficult to enforce best practices… without a pull request we can review before merging"* ([postman#8021](https://github.com/postmanlabs/postman-app-support/issues/8021)). And Bruno's git diffs are muddied because its `seq` property **renumbers every later request file on insert** (one add → many "modified" files) — multiple open issues ([bruno#2149](https://github.com/usebruno/bruno/discussions/2149), [#841](https://github.com/usebruno/bruno/issues/841), [#4066](https://github.com/usebruno/bruno/issues/4066), [#4829](https://github.com/usebruno/bruno/issues/4829)). *Comments are already table-stakes (Postman ships them); there is **no** surviving demand for real-time presence/co-editing.*

## Differentiation
**Safe-by-default sharing + git-native review done right** — the validated wants, not the speculative ones:
- **Legible git diffs by design:** deterministic file ordering so one change touches one file (avoiding Bruno's `seq` mess) — a clean "what changed" even on the free/git path (Postman paywalls diffs).
- **In-app review-before-merge gating** on top of the user's *own* git (approve / merge-check), without going cloud-only or paywalled like Postman.
- **Clean conflict resolution** — CRDT auto-merge for most edits, a readable conflict UI for the rest.
- **Explicit, reviewable sharing** (never silent sync of secrets — see [04](/rambo/features/04-environments-variables-secrets/)).
- **Don't over-build** comments (table-stakes) or presence/co-editing (no validated demand).

## UX
Presence + live change awareness; explicit "share this with X" (not ambient sync); a human-readable conflict resolver; change history.

## Feasibility
**Medium** — rides the [12](/rambo/features/12-realtime-team-sync/) CRDT backend (Yjs auto-merges most edits; surface true conflicts clearly).

## Implementation & tech choices
- CRDT (Yjs) gives automatic merge for concurrent edits; design a clear conflict-resolution UI for genuine clashes.
- Comments/change-awareness as CRDT-synced metadata (if validated — see below).

## Dependencies
Requires [12 team sync](/rambo/features/12-realtime-team-sync/); pairs with [04 secrets](/rambo/features/04-environments-variables-secrets/) (safe sharing) and [14 shared workspaces](/rambo/features/14-shared-workspaces/).

## Open questions
- **Resolved by follow-up research:** the validated collaboration want beyond safe sync is **review-before-merge gating + legible diffs** (above) — *not* comments (already table-stakes) or presence/co-editing (no demand). Remaining: how much in-app review UI to build vs. deferring to the host Git platform's PR flow; and exactly how the deterministic file-ordering scheme works in the [open format](/rambo/features/01-file-format-and-storage/). (Tracked in [Open-Questions](/rambo/strategy/open-questions/).)
