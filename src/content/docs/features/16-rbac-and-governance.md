---
title: "Feature 16 — RBAC & Governance"
description: "Roles, permissions, user groups, and org administration as the enterprise governance gate."
sidebar:
  order: 16
---

# Feature 16 — RBAC & Governance

## What it is
Role-based access control (named roles/permissions), **user groups**, and org/workspace administration — controlling who can view/edit/run/share which collections and environments.

## ⭐ Pain points & competitor complaints (validated)
- **Postman gates RBAC + user groups behind Enterprise** — verified as the standard governance gate ([Research-Findings §7](/rambo/evidence/research-findings/)).
- **Bruno has no workspace concept and no RBAC** — "the entire team experience [is] mediated through git," with no roles — a blocker for any org that needs access control.
- Enterprises consistently require **least-privilege access + group management** before adopting a tool org-wide ([verified — what converts to enterprise is governance, not features](/rambo/gtm/motion/)).

## Differentiation
Bring real governance **without forcing the cloud** — RBAC works on the team backend *and* in self-hosted deployments, so regulated orgs get control while keeping data on their own infra.

## UX
Admin console: assign roles (e.g., Admin / Editor / Runner / Viewer), manage groups (SCIM-fed), set per-workspace permissions; clear audit of who-can-do-what.

## Feasibility
**Medium.** Standard RBAC model on the team backend; integrates with SCIM groups from **[15 · SSO](/rambo/features/15-sso-and-identity/)**.

## Implementation & tech choices
- Role/permission model on the team-sync backend; permission checks on sync + run operations.
- Group membership fed by SCIM; map IdP groups → roles.
- *Complexity flag:* permission model granularity (workspace vs collection vs request) needs deliberate design to avoid sprawl.

## Dependencies
Requires **[12 · team-sync backend](/rambo/features/12-realtime-team-sync/)** + **[15 · SSO/SCIM](/rambo/features/15-sso-and-identity/)**. Feeds **[17 · audit](/rambo/features/17-audit-and-compliance/)**.

## Open questions
- Granularity (per-workspace vs per-collection vs per-request). Which roles ship first. How RBAC behaves in offline/local-first mode.
