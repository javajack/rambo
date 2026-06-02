---
title: Collaboration & Account Boundaries
description: Cross-team, cross-org, and personal-vs-work collaboration — what's validated, what's an unmet gap, and the merit-ranked sequence to build it.
sidebar:
  order: 3
---

## Cross-team (intra-org) — validated, table-stakes
Sharing a single collection low-friction is a vendor-validated primitive: Postman shipped a dedicated **Guest role** *"to share collections instantly"* within an org. So intra-org cross-team sharing is expected — build it as a first-class "share this collection/scope with another team" grant.

## Cross-org — a real, partly-unmet gap
- **Asymmetric partner/contractor consumption is proven:** Postman's **Partner Workspaces** let external partners *consume* your APIs (scoped, email-domain boundary). This is validated.
- **Symmetric, peer-to-peer cross-org collaboration is unmet in API clients.** Postman's Guest is community-described as *"crippled"*; Partner Workspaces is one-directional. The precedent that it *can* be first-class is **Slack Connect** (shared channels across up to 20 orgs).
- **Honest calibration:** the *asymmetric* partner/contractor model is validated; *symmetric two-way* cross-org collab is an [open question](/rambo/strategy/open-questions/) (precedent exists, direct API-client demand not yet proven). So **sequence by merit**, don't build it all at once.

**Merit-ranked sequence:** ① share a collection/scope with another internal team → ② scoped guest/contractor access (time-boxable) → ③ asymmetric partner sharing (consume my APIs) → ④ symmetric cross-org *(only after validating demand)*.

## Personal accounts collaborating with personal accounts
Individuals want to collaborate with *other personal accounts*, not only within an org. Because our model is **one identity, many orgs** + **sharing = granting sync access to a scope**, a personal account can share a collection with another personal account directly — no org required. This serves the "individuals collaborating" case you flagged as first-class.

## The personal-vs-work boundary (the validated pain)
- **No account-merge exists anywhere** — Postman offers only manual export/import (and many element types don't transfer); GitHub's wrong-identity-commit / push-rejected friction is the canonical version of this pain.
- Worse: *"leaving an external team workspace **wiped** my personal workspaces"* ([Postman community #89176](https://community.postman.com/t/leaving-an-external-team-workspace-wiped-my-personal-workspaces/89176)).
- **Our answer** (detailed in the [tenancy model](/rambo/enterprise/tenancy-model/)): one identity across orgs, **data-level ownership** (personal data never wiped on org departure), per-workspace identity, and account portability/export. Getting this *right* is itself a differentiator, because everyone gets it wrong.

## Design principle
**Sharing is just a scoped sync grant.** A collection can be shared with a team, a guest, a partner org, or another personal account — same primitive, different scope + role. Local-first means the data still lives with each participant; sharing grants access, never hostage-takes.
