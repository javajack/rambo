---
title: Business Model
description: Closed-source, free-forever local tier, metered team sync, and a self-hosted enterprise tier — the shape of how Rambo makes money.
sidebar:
  order: 1
---

## Shape
**Closed-source** core; **free local tier → metered team tier → self-hosted enterprise tier.** Closed-source was chosen to remove fair-source/perpetual-license complexity and fork risk while keeping the trust wedge ([why we discounted source-available](/rambo/strategy/discounted-ideas/)).

## The three revenue motions
1. **Free → Team (PLG):** individuals and small teams adopt the free local-first client; teams convert when they grow past the free-*X* members or want managed real-time sync.
2. **Team → Enterprise:** larger orgs buy self-hosting + governance (SSO/SCIM/RBAC/audit) — the compounding, higher-ACV motion.
3. **Expansion:** seats and backend-resident usage grow within accounts.

## What we charge for
- **Seats** beyond the free tier.
- **Backend-synced collaboration** (real-time sync, shared workspaces).
- **Enterprise governance & support** (SSO/SCIM/RBAC/audit, self-host, SLA).

## What stays free, forever
The local-first client, offline use, **git-sync**, the MCP server, the CLI, and client-side LLM testing — because they cost us ~$0 to host, so there's no pressure to ever paywall them. This permanence is the trust contract.

## Why this beats a cloud-first model
The incumbents' cloud-first model carries high infra cost *and* the trust friction that drives churn. Rambo inverts it: **near-zero fixed infra**, trust as a feature, and the highest-value tier (enterprise) **self-hosted by the customer** — so our infra cost stays low precisely as we move up-market.

Next: [pricing & plans](/rambo/business/pricing-and-plans/) · [metering](/rambo/business/metering/) · [unit economics](/rambo/business/unit-economics/) · [moat](/rambo/business/moat/).
