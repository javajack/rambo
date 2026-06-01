---
title: Architecture Overview
description: Client-first, one sync backend, minimal infra at every tier — the bootstrapped architecture.
sidebar:
  order: 1
---

## The principle
A local-first, git-native client needs **essentially no backend for its core** — that's the bootstrapped superpower. Spend on infra only where revenue demands it.

## The infra ladder

| Tier | Backend | Cost to us |
|---|---|---|
| **Free** | none — files on disk, sync via the user's own Git | ~$0 |
| **Team** | thin Yjs + S3 sync service | low; scales with paying users only |
| **Enterprise** | **the customer self-hosts** | ~$0 |

Metering only exists where a backend exists (paid tiers) → infra cost tracks paying users. The highest-value tier costs us the *least* to serve.

## The layers
- **Client (everything by default):** the request engine, response viewer, collections, environments, secrets (OS keychain), all protocols, **client-side LLM testing**, the **MCP server**, and the **deterministic CLI** — all on the user's machine, zero backend.
- **Storage:** plain-text files in an [open format](/rambo/features/01-file-format-and-storage/), in the user's own Git.
- **Sync backend (the one backend):** a [Yjs + S3 sync engine](/rambo/architecture/sync-engine/) for the paid team tier — which **self-hosts unchanged** to become the enterprise on-prem story.

## What this buys us
- **Near-zero fixed infra** deep into revenue.
- A **single architecture** serving all three tiers (free git-sync, team managed-sync, enterprise self-host).
- A small **SOC 2 / compliance surface** (the client touches no servers; enterprise data never leaves the customer).

The hard engineering is concentrated in a few [subsystems](/rambo/architecture/implementation-deliberations/), not in operating a fleet of services.
