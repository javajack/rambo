---
title: Licensing & Entitlement
description: Online entitlement for cloud users (with an offline grace period the trust wedge requires), and signed, air-gap-validatable licenses for self-hosted enterprise.
sidebar:
  order: 5
---

## Responsibility
Decide *what a given install is entitled to* — across two very different cases.

## Case 1 — Cloud users (online, with offline grace)
The signed-in desktop/CLI/extension checks entitlement against [identity/billing](/rambo/backend/billing-and-metering/). But the trust wedge **demands the app work offline** — so:
- the client **caches a signed entitlement** (plan, seats, expiry) after each check;
- it keeps working through an **offline grace window** (e.g. N days) without phoning home;
- it degrades gracefully (to the free local tier), never hostage-takes data, if entitlement truly lapses.

## Case 2 — Self-hosted enterprise (must validate air-gapped)
An on-prem/air-gapped deployment **cannot call home**, so entitlement is a **signed license file**:
```json
{ "org": "acme", "seats": 250, "features": ["sso","scim","audit"],
  "issued": "2026-06-02", "expires": "2027-06-02",
  "sig": "<Ed25519 signature over the above>" }
```
- The self-hosted backend validates the **Ed25519 signature** against our **public key** — **fully offline**.
- Renewal = a new signed file (email/portal). Seats are enforced from the license at the [sync relay](/rambo/specs/02-sync-protocol/).
- This is the proven pattern (GitLab/Sentry self-hosted, keygen.sh).

## Primitives
- **Postgres** (issued licenses, history).
- **Ed25519** signing; the **private key in a hardware/secure store (HSM/KMS)** — the one secret that must never leak.
- A small **issuance service** (sales/portal triggers a signed file).

## Portability
Signed-file validation needs **no external service** at the customer — ideal for air-gap and perfectly portable. Build it, or adopt a self-hostable licensing service (keygen.sh is self-hostable); avoid any SaaS that requires the customer to call *our* cloud.

## Open decisions
- Build vs. adopt (keygen.sh self-hosted).
- Offline-grace duration (long enough to respect the wedge, short enough to enforce).
- Whether features are per-license flags or tiers.
