---
title: Tenancy & Org Data Model
description: The recommended entity model — billing decoupled from collaboration, per-unique-user seat dedup, additive scoping with true revocation, and a personal-vs-work boundary that never wipes your data.
sidebar:
  order: 2
---

The validated design for "one org, many teams, each with projects; bill at the org, scope access at the team." Built from the best precedents (GitLab/GitHub/Figma) and *around* their documented failure modes.

## The two-axis model
The key insight (Figma's, validated): **billing and collaboration are orthogonal axes**, not one tree.

```
Account (one identity; or anonymous + local-only)
  └── belongs to ▸ Org
        ├── BILLING axis ───────▶ Billing Groups (cost centers)  → roll up to ONE org invoice
        └── COLLABORATION axis ─▶ Teams ─▶ Projects ─▶ Collections
                                     ▲
                              Memberships = explicit, scoped role grants
```

- **Billing axis** = cost centers / "billing groups" (Figma) — for finance. A person is in **one** billing group.
- **Collaboration axis** = teams → projects → collections — for work. A person can be in **many** teams.
- They're separate entities; changing one never reshuffles the other.

## Billing: org-level, per-unique-user dedup
- The subscription attaches to the **org**; **a user with a billable role anywhere under the org counts exactly once** (GitLab/GitHub pattern) — a person in five teams is **one seat**, killing cross-team double-counting.
- Billing groups split that cost internally for chargeback; the invoice rolls up to the org.
- Guests/pending/deactivated don't consume seats (GitLab's billable-role rule).

## Access & sync: scoped, additive, truly revocable
This is where we **fix GitLab's failure mode** (strict downward inheritance that can't scope narrower deeper, silently fakes success, and never truly revokes):
- A member's effective access = the **union of explicit grants** at the scopes they're added to.
- **You can grant a narrower role deeper** (least-privilege, contractor scoping) — not just upward overrides.
- **Removal = true revocation** at that scope (not "fall back to the parent role").
- **Inheritance is optional convenience, never forced or un-removable.**
- [Sync](/rambo/specs/02-sync-protocol/) is scoped to the team/project a member can access.

## Roles & delegated admin
`org-owner` · `org-admin` · **`billing-admin`** (delegated, scoped to assigned billing groups — Figma pattern; one person can hold multiple admin roles) · `team-admin` · `member` · **`guest`** (scoped, time-boxable) · **`partner`** (cross-org — see [collaboration](/rambo/enterprise/collaboration/)).

## Identity & offboarding
- **Managed identity via domain capture + SCIM** for true deprovision and seat reclamation (SSO alone is insufficient — [dealbreakers](/rambo/enterprise/dealbreakers/)).
- On deprovision: revoke org/team access, reclaim the seat — **but never touch the user's personal/local data** (below).

## The personal-vs-work boundary (designed for local-first)
Current tools get this badly wrong — Postman has **no account-merge** (only manual export/import), and *"leaving an external team workspace **wiped** my personal workspaces"* ([community #89176](https://community.postman.com/t/leaving-an-external-team-workspace-wiped-my-personal-workspaces/89176)). Our design:
- **One identity, many orgs.** A single account can belong to multiple orgs — no duplicate accounts, no GitHub-style personal-vs-EMU split-brain.
- **Ownership at the *data* level, not the account level.** Personal/local collections are the user's and are **never** deleted when they leave an org; org/team collections are org-owned and revoked on departure. (This is the explicit fix for the "leaving wiped my data" disaster.)
- **Per-workspace identity** (like git per-repo config) so the wrong-identity-commit problem can't happen.
- **Account portability** — clean export/transfer (addresses the no-merge pain).

## Open decisions
- **Nesting depth:** flat teams (simpler, avoids GitLab's nested-permission complexity) vs. nested subgroups. **Lean flat** unless evidence demands nesting.
- Domain-capture mechanics; the exact personal-vs-org data-ownership line; whether billing groups are required or optional below a size.
