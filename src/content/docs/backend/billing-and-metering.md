---
title: Billing & Metering
description: Stripe for the commodity heavy-lifting, plus a server-side metering pipeline that counts only backend-synced resources — enforced at the relay, never client-trusted.
sidebar:
  order: 4
---

## Responsibility
Subscriptions, **seats**, usage→invoice, tax, trials, and dunning — the apparatus that turns the [pricing model](/rambo/business/pricing-and-plans/) into money.

## Outsource the commodity: Stripe
Payments are not our differentiator, so **Stripe** does the heavy lifting: subscriptions, payment methods, **Stripe Tax** (VAT/sales tax), invoicing, dunning, proration, trials. Stripe is a payment *processor*, not a cloud lock-in — it's the portable standard, swappable, and keeps PCI scope off us. We mirror only minimal state (customer id, subscription status) into **Postgres**.

## Own the metering pipeline
Per [the metering principle](/rambo/business/metering/), we meter **only backend-synced resources** — and enforce it **server-side**, never trusting the client:

```
sync relay  ──emits──▶  usage events (active seats, synced bytes, cloud runs)
                            │
                            ▼
                    metering counters (Postgres)
                            │
                   ┌────────┴─────────┐
                   ▼                  ▼
            enforce limits      report to Stripe
          (block over-seat)   (usage-based lines)
```

- **Seat counting** happens at the [sync relay](/rambo/specs/02-sync-protocol/) — count active members in a workspace; the relay is the source of truth (clients can't fake it).
- **Backend-consumption** (synced storage, cloud runs) accrues to a Postgres counter and reconciles to Stripe.
- **Local artifacts are never counted** — they never reach us.

## Cloud vs self-hosted
- **Cloud (Team):** Stripe subscription + metering above.
- **Self-hosted (Enterprise):** *not* Stripe metering — a signed [license](/rambo/backend/licensing/) (sales-led, annual). The self-hosted backend enforces seats from the license, offline.

## Trust + portability
- Metering reads **only** server-resident signals — consistent with the privacy wedge.
- Stripe + Postgres = portable; no cloud-vendor coupling.

## Open decisions
- Pure per-seat vs. seat + metered cloud-consumption at launch (start simple — per-seat).
- Exactly which usage events the relay emits and at what granularity.
- Free-tier-*X*-member threshold (pricing-sensitive).
