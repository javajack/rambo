---
title: Options & Tradeoffs
description: The major decision forks, the options at each, and what was chosen.
sidebar:
  order: 3
---

The forks navigated to reach the [locked model](/rambo/overview/the-idea/). Chosen options → [Decision Log](/rambo/strategy/decision-log/); rejected → [Discounted Ideas](/rambo/strategy/discounted-ideas/).

| Fork | Options | Tradeoff | Chosen |
|---|---|---|---|
| **Source model** | Open-source · Source-available/FSL · Closed | trust-via-audit vs simplicity/control/no-fork-risk | **Closed** |
| **Resourcing** | Bootstrapped · Funded · VC-scale | growth speed vs survival/control | **Lean bootstrapped** |
| **Beachhead** | Individuals · Small teams · Enterprise | funnel breadth vs ACV/compounding | Land individuals → **enterprise endgame** |
| **Primary monetization** | Per-seat · Usage/metered · One-time | predictability vs alignment vs lumpiness | **Per-seat + backend-usage meter** |
| **Metering surface** | Local artifacts · Backend-synced only | revenue reach vs privacy-wedge integrity | **Backend-synced only** |
| **Free-tier login** | Required · Optional-until-sync · None | identity/ops vs funnel/trust | **Optional until sync** |
| **Differentiator bet** | Protocol breadth · Agent-native · LLM-testing | catchable vs durable | **Agent-native + LLM-testing** |
| **LLM-testing role** | Primary revenue · Adoption hook | upside vs de-risk | **Adoption hook** |
| **Sync architecture** | Git-as-sync only · Managed CRDT SaaS · Self-hostable Yjs+S3 | infra cost vs capability vs control | Git-as-sync free + **Yjs+S3** paid |
| **CRDT library** | Yjs · Automerge · Loro | maturity vs speed | **Yjs** (Loro alt; Automerge out) |
| **App shell** | Electron · Tauri/Rust | maturity/consistency vs size/memory | **Tauri/Rust** (pending benchmark) |
| **Enterprise gate** | SSO low · SSO at enterprise | funnel vs ARPU | basic SSO low, **SCIM/RBAC/audit** gated |

## The tension that drove the model
The original plan was source-available + a perpetual license — but FSL open-sources each version after 2 years, making "perpetual license to the code" incoherent. Going **closed-source** dissolved it; the pivot to **backend-only metering** then produced a clean, privacy-aligned recurring model.
