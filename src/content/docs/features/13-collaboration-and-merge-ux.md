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

## Differentiation
**Safe-by-default collaboration:** explicit, reviewable sharing (never silent sync of secrets), plus **clean conflict resolution** — CRDT auto-merge for most edits and a readable conflict UI for the rest (the thing git-as-sync does badly).

## UX
Presence + live change awareness; explicit "share this with X" (not ambient sync); a human-readable conflict resolver; change history.

## Feasibility
**Medium** — rides the [12](/rambo/features/12-realtime-team-sync/) CRDT backend (Yjs auto-merges most edits; surface true conflicts clearly).

## Implementation & tech choices
- CRDT (Yjs) gives automatic merge for concurrent edits; design a clear conflict-resolution UI for genuine clashes.
- Comments/change-awareness as CRDT-synced metadata (if validated — see below).

## Dependencies
Requires [12 team sync](/rambo/features/12-realtime-team-sync/); pairs with [04 secrets](/rambo/features/04-environments-variables-secrets/) (safe sharing) and [14 shared workspaces](/rambo/features/14-shared-workspaces/).

## Open questions *(honest evidence gap)*
- **Demand for comments / change-awareness / diff-review / PR-style review is NOT yet validated.** Research found collaboration pain only as *sharing-as-leakage* — no surviving complaints about missing review/comment features. **Do not over-invest** in review workflows until validated; build safe sharing + conflict UX first, treat comments/review as a probe. (Flagged in [Open-Questions](/rambo/strategy/open-questions/).)
