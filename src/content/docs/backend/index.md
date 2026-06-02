---
title: Backend & Infrastructure — Overview
description: The honest backend reality for this SaaS, kept minimal and portable — simple primitives with no cloud lock-in, carved into services shared across desktop, Chrome extension, and CLI.
sidebar:
  order: 0
---

The product story is "client-first, one backend (sync)." That's true for the *product* — but a *business* needs a few more backend services. This section designs them under two hard constraints:

1. **Simple, portable primitives** — nothing that locks us to one cloud or forces a painful migration later. ([Principles](/rambo/backend/principles/))
2. **Shared components across the whole app ecosystem** — desktop app, Chrome extension, and CLI all consume the *same* backend services. ([Multi-client architecture](/rambo/backend/multi-client/))

## The honest service map
| Service | Why it exists | Outsource? |
|---|---|---|
| [Sync](/rambo/specs/02-sync-protocol/) | real-time team collaboration | self-built (Yjs relay + S3) |
| [Identity](/rambo/backend/identity/) | accounts, sessions, tokens | self-built or an auth provider |
| [Billing & metering](/rambo/backend/billing-and-metering/) | subscriptions, seats, usage→invoice | **Stripe** does the heavy lifting |
| [Licensing](/rambo/backend/licensing/) | binary + self-hosted entitlement, air-gap | self-built (signed licenses) |
| Updates | signed desktop auto-update | a static bucket + a manifest |
| [Telemetry](/rambo/backend/telemetry-and-privacy/) | measure adoption without breaking privacy | self-built, privacy-first |

## The lean philosophy
- **Outsource commodity, own the differentiator.** Stripe for payments, an object store for blobs — but *own* the sync engine, the entitlement logic, and anything that touches the trust wedge.
- **Everything portable + self-hostable.** The same artifacts run on one VPS, a Kubernetes cluster, or a customer's air-gapped on-prem — which is *also* the [enterprise self-host](/rambo/features/18-self-hosting/) product. We never build a backend we can't hand to an enterprise.
- **Near-zero fixed infra until revenue.** Free tier touches no backend (git-as-sync); paid backend cost tracks paying users; enterprise self-hosts at ~$0 to us.

Start with the [principles](/rambo/backend/principles/) and the [multi-client architecture](/rambo/backend/multi-client/) — they shape everything else.
