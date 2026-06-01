---
title: "Feature 15 — SSO & Identity"
description: "Enterprise identity — SAML/OIDC SSO and optional SCIM — packaged to avoid the \"SSO tax\" resentment while still gating advanced controls."
sidebar:
  order: 15
---

# Feature 15 — SSO & Identity

## What it is
Enterprise sign-in via the customer's IdP — **SAML 2.0 / OIDC SSO**, with optional **SCIM** auto-provisioning/de-provisioning — for the team/enterprise tiers and for self-hosted deployments.

## ⭐ Pain points & competitor complaints (validated)
- **The "SSO tax" is widely resented.** Vendors routinely gate *basic* SSO behind their most expensive tier; [sso.tax](https://sso.tax/) documents the pattern and the developer backlash.
- **Postman gates SSO + SCIM behind Enterprise (~$49/user/mo)** — a steep jump for a security baseline ([Research-Findings §7](/rambo/evidence/research-findings/)).
- **Bruno has no real identity/RBAC** — team access is mediated entirely through git, with no roles, which enterprises can't accept.

## Differentiation
Follow the **GitLab pattern** (verified): put **basic SSO low — even in the free/self-hosted tier** — and gate only **SCIM + advanced controls** at enterprise. This neutralizes SSO-tax resentment while still monetizing the genuinely enterprise-grade identity automation.

## UX
Org admin configures IdP (metadata/endpoints); members sign in via SSO; SCIM syncs users into groups automatically.

## Feasibility
**Medium.** Standard SAML/OIDC, but SAML is fiddly in practice (*complexity flag*). Runs on the team-sync backend; for self-host the customer points it at their own IdP.

## Implementation & tech choices
- SAML SP + OIDC RP on the team backend; per-org IdP config; well-tested libraries over hand-rolled.
- SCIM endpoint for provisioning into **[16 · RBAC groups](/rambo/features/16-rbac-and-governance/)**.
- *Complexity flag:* SAML edge cases (IdP-initiated, metadata, cert rotation) merit a dedicated implementation note.

## Dependencies
Requires the **[12 · team-sync backend](/rambo/features/12-realtime-team-sync/)** (identity needs a server). Feeds **[16 · RBAC](/rambo/features/16-rbac-and-governance/)** and **[17 · audit](/rambo/features/17-audit-and-compliance/)**.

## Open questions
- Exact line between "basic SSO" (low tier) and "advanced/SCIM" (enterprise). Whether to offer SSO as a paid add-on on the team tier (Postman does).
