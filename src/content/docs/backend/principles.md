---
title: Principles — Simple, Portable Primitives
description: The "boring, portable, self-hostable" backend doctrine — Postgres + object storage + containers over standard protocols, so we never port between clouds.
sidebar:
  order: 1
---

## The doctrine
> **Build on primitives that run anywhere — so changing clouds is a config change, not a rewrite.**

A bootstrapped, enterprise-self-hosting product cannot afford to be welded to one cloud's proprietary services. So we restrict ourselves to a tiny, universal toolkit.

## The portable trio (almost everything is one of these)
| Primitive | Used for | Why portable |
|---|---|---|
| **Postgres** | accounts, subscriptions, licenses, metering counters, audit | managed on *every* cloud; trivially self-hosted; swap providers freely |
| **S3-compatible object storage** | sync snapshots, file/blob storage, update artifacts | AWS S3, Cloudflare R2, Backblaze, **MinIO** (self-host) — identical API |
| **OCI containers** | every service | run on a VPS, Kubernetes, Fly, Render, or on-prem — unchanged |

Over **standard protocols only**: HTTP/REST, WebSocket, gRPC. State lives in Postgres + object storage; **services stay stateless** → any instance is disposable, scaling and migration are trivial.

## What we deliberately avoid
- **Proprietary serverless / datastores** as a *sole* dependency — Lambda, DynamoDB, Firebase, Cloudflare Durable Objects, Vercel-only runtimes. (Fine as an *optional* accelerator, never the only path.)
- **Cloud-specific managed services** with no portable equivalent (proprietary queues, proprietary auth that can't be self-hosted).
- Anything that **can't run in the enterprise self-host build.** If a feature can't ship on-prem, it can't depend on a non-portable service.

## The payoff
- **No migration tax.** Move from a $20 VPS to managed Postgres + R2 to a customer's air-gapped cluster — same code, same artifacts.
- **Self-host parity for free.** The portable stack *is* the [enterprise on-prem product](/rambo/features/18-self-hosting/) — one architecture, three deployment targets (our cloud, a single box, the customer's data center).
- **Lean cost.** A single small box (Postgres + a relay + object storage) serves early paid users; scale horizontally only when revenue demands.

## Managed ≠ locked-in
Using *managed* Postgres or *managed* S3-compatible storage is encouraged — it's lean — **as long as the API is the portable standard.** Then "switching cloud" means repointing a connection string, not re-architecting.
