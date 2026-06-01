---
title: Positioning & the Trust Contract
description: How Rambo positions against betrayed-trust incumbents — and how a closed-source product still earns the privacy wedge.
sidebar:
  order: 1
---

## Positioning

> **Verifiable local-first. Your data is yours. Agent-native. The first client that actually debugs LLM APIs.**

The market is defined by *betrayed* trust. Rambo positions as the client that **never holds your data hostage** — and that AI agents can drive natively.

## Closed-source can still win the trust wedge

Open source is **not** required for local-first trust — the canonical local-first manifesto says commercial, closed software can satisfy the ideals "as long as it does not artificially restrict what users can do with their files," and **Obsidian** is living proof (closed-source, no-signup, deeply trusted). Closed-source also dissolves the licensing complexity and fork risk that a source-available model carries.

But the trust burden shifts from "audit our code" to **provable behavior.**

## The five non-negotiables (our binding contract)

1. **Offline core works with no login** — and makes *zero* surprise network calls (developers will verify with a packet sniffer).
2. **Local data is never hostage** — plain files, fully usable without our servers, forever.
3. **Open, portable file format** — this *replaces* open source as the anti-lock-in proof. "Closed app, open format."
4. **Scoped, precise privacy claims** — state exactly what is/isn't collected; never an absolute promise we can't keep. AES-256 E2E for any sync, with a published verification procedure.
5. **The free offline + git tier is permanent and unmetered.**

:::caution[The cautionary tale]
Thunder Client moved its git-sync behind a 2023 paywall and bled community trust. **Never paywall something the free tier relied on.** A permanent free tier is most credible when the free thing (local + git-sync) costs us nothing to host — so there's no business pressure to ever paywall it.
:::

## Honest risk

Closed-source faces **enterprise security-review friction** (SBOM / source-access requests). Mitigation: plan **source escrow** for enterprise deals. How often this is a dealbreaker is an [open question](/rambo/strategy/open-questions/).
