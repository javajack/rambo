---
title: Enterprise & Multi-Tenancy — Overview
description: The enterprise endgame — the validated can't-buy-without dealbreakers, and a tenancy model that bills at the org but scopes access at the team, learned from GitLab/GitHub/Figma.
sidebar:
  order: 0
---

Enterprise is the [compounding revenue tier](/rambo/business/unit-economics/) — and the place current tools are weakest. This section captures what enterprises *can't adopt without*, and the org/tenancy model that makes "one big org, many teams, each with projects" actually work.

## The headline finding
The single strongest *validated* enterprise dealbreaker is **data control** — and it validates Rambo's whole thesis. A paying Insomnia user's employer: *"a hard requirement that NOTHING I use can sync to the cloud. Full stop… an audited, fireable offense"* ([Kong/insomnia#6624](https://github.com/Kong/insomnia/issues/6624)). Kong's CTO conceded the mistake and reinstated local-only storage. **Local-first + login-optional isn't just a developer nicety — it's an enterprise procurement requirement** that cloud-first incumbents structurally cannot meet.

## The tenancy thesis
A big org has **many teams, each with their own projects**. Billing must roll up to the org; access and sync must scope to the team/project. The validated answer (from the best precedents):

- **Decouple the billing axis from the collaboration axis** (Figma's "billing groups" vs "workspaces") — they're orthogonal entities.
- **Bill at the org with per-unique-user seat dedup** (GitLab/GitHub) — a person in five teams is one seat.
- **Scope access additively and explicitly** — and **avoid GitLab's strict downward inheritance** (which can't grant a narrower role deeper and never truly revokes — breaking least-privilege, contractors, and offboarding).
- **Deprovision via SCIM + a managed-identity/domain-capture boundary** — SSO alone does *not* deprovision.

→ Full design in the [tenancy & org data model](/rambo/enterprise/tenancy-model/).

## In this section
- [Enterprise dealbreakers](/rambo/enterprise/dealbreakers/) — the validated can't-buy-without list (+ honest gaps).
- [Tenancy & org data model](/rambo/enterprise/tenancy-model/) — the recommended entity model.
- [Collaboration & account boundaries](/rambo/enterprise/collaboration/) — cross-team, cross-org, and the personal-vs-work boundary.
- [Customer segments](/rambo/enterprise/customer-segments/) — individual → small team → mid-market → enterprise, and what each tool gets wrong.
- [Disruptive opportunities](/rambo/enterprise/disruptive-opportunities/) — the one validated unowned feature (Git-shareable encrypted secrets) + honest hypotheses.
