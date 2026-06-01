---
title: "Feature 14 — Shared Workspaces"
description: "Team workspaces with shared collections/environments — free for small teams (countering Postman's removal of free team collaboration), with safe explicit sharing."
sidebar:
  order: 14
---

# Feature 14 — Shared Workspaces

## What it is
Team workspaces: a shared space where a team's collections, environments, and (safely-shared) config live together, synced via [12 team sync](/rambo/features/12-realtime-team-sync/). **Free for up to X members** ([D3/D4](/rambo/strategy/decision-log/)); paid beyond that.

## ⭐ Pain points & competitor complaints (validated)
- **Postman removed free team collaboration (March 2026)** — the Free tier is now single-user, pushing small teams to look elsewhere ([Research-Findings §3](/rambo/evidence/research-findings/)). A fresh, exploitable wound.
- **Shared workspaces are the leakage surface** when sharing is ambient/implicit (CloudSEK; Postman #13760) — so "shared" must mean "explicitly and safely shared," not "everything syncs to everyone."

## Differentiation
**Free small-team shared workspaces** (direct counter-position to Postman's removal) with **explicit, safe sharing** baked in (secrets stay local-by-default; you choose what's shared). Local-first: the workspace works offline and syncs when online.

## UX
Create a workspace, invite members (up to the free X), share specific collections/environments explicitly; clear indicators of what's shared vs local; presence from [13](/rambo/features/13-collaboration-and-merge-ux/).

## Feasibility
**Medium** — a workspace is a sync scope on the [12](/rambo/features/12-realtime-team-sync/) backend + membership/permissions ([16 RBAC](/rambo/features/16-rbac-and-governance/) at the enterprise end).

## Implementation & tech choices
- Workspace = a named sync scope (CRDT doc set) + membership; explicit per-collection/per-environment sharing toggles; secrets shared only via the encrypted-shareable path ([04](/rambo/features/04-environments-variables-secrets/)).

## Dependencies
Built on [12 team sync](/rambo/features/12-realtime-team-sync/); membership/roles extend into [15 SSO](/rambo/features/15-sso-and-identity/)/[16 RBAC](/rambo/features/16-rbac-and-governance/); sharing safety depends on [04 secrets](/rambo/features/04-environments-variables-secrets/).

## Open questions
- The free-tier **X-member threshold** (pricing-sensitive). Whether workspaces nest or are flat.
