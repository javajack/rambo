---
title: Product Tiers
description: The three tiers — free local, metered team sync, self-hosted enterprise — and the design rule for where features live.
sidebar:
  order: 2
---

## The three tiers

### Free (local-first, forever)
The full client: all protocols, collections/environments, scripting, OpenAPI import, OS-keychain secrets, **git-sync**, the **MCP server + deterministic CLI**, and **client-side LLM testing**. **Login is optional until you sync.** Free collaboration for up to *X* team members. Costs us ≈ $0 to host (git-as-sync).

### Team (metered, paid)
Everything in Free, plus **real-time cloud sync**, shared workspaces, and reliable merge/conflict UX. **Metered only on backend-synced resources** — seats beyond *X*, synced collections, cloud runs. Never on local artifacts.

### Enterprise (self-hosted)
Everything in Team, plus **self-hosting / on-prem / air-gap**, **SSO/SAML + SCIM**, **RBAC + user groups**, **audit logs + data residency**, and support/SLA. Recurring per-seat license. The same sync backend self-hosts, so it's the on-prem story at ~$0 infra cost to us.

## The design rule

> Put features where the **cost-to-us** is, not where the **value** is.

GitLab puts *basic* self-hosted SSO in its free tier and gates only SCIM/advanced controls. So Rambo can be generous with SSO and reserve **SCIM / RBAC / audit / compliance** as the real enterprise gate — which neutralizes the resented "SSO tax" while still monetizing genuine enterprise governance.

## Table-stakes vs differentiators

- **Table-stakes (must match to enter):** all protocols, collections/environments, scripting, OpenAPI import, code-gen, a test runner. Protocol breadth is *not* differentiation — Yaak/Insomnia/Postman already have it.
- **Differentiators (where we win):** ① agent-drivability (MCP + CLI), ② live LLM/agent-API testing, ③ git-native local-first, ④ verifiable closed-source trust.

See the full [feature map](/rambo/product/feature-map/) and the per-feature [deep dives](/rambo/features/).
