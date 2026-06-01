---
title: Metering
description: The backend-only metering principle — why Rambo meters synced resources, never local artifacts, and how that reinforces the privacy wedge.
sidebar:
  order: 3
---

## The principle

> **Meter only backend-synced / cloud-resident resources. Never local artifacts.**

This is validated, not invented: **every** local-first tool studied — Obsidian, AFFiNE, Bruno, Thunder Client — meters only **seats + cloud-resident dimensions** and leaves local artifacts unlimited. Metering local collections/APIs would require telemetry that **contradicts the privacy wedge**, and there's no precedent for it.

## What we meter (all backend-resident, honest)
- **Seats** beyond the free *X* (the predictable floor).
- **Synced storage / synced collections** (not local copies).
- **Cloud runs** — mock-server calls, scheduled runs *(backend wave / CI-offload — see [sequencing](/rambo/product/backend-wave/))*.

## What we never meter
Anything on the user's machine. Local stays free and unmetered — which **reinforces** trust instead of fighting it.

## Why not meter artifacts or LLM runs (now)
- **Local artifact counts** (collections/APIs) would require surveillance and penalize the power users we want.
- **Hosted LLM-eval runs** are deferred — LLM testing is [client-side only](/rambo/features/07-client-side-llm-testing/) ([Decision D8](/rambo/strategy/decision-log/)). If a backend eval product is ever built, *those* runs become a natural, value-aligned meter — but not before.

## The result
A pricing model that's **predictable** (seat-anchored), **honest** (you pay for what we host), and **trust-reinforcing** (local is always free). It's the rare case where the revenue model and the privacy promise point the same direction.
