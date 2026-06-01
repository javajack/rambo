---
title: Open Questions
description: Genuinely unverified items — what we don't yet know, and how to resolve each (including what desk research cannot settle).
sidebar:
  order: 6
---

Unverified (not rejected) items, each with how to resolve it.

| # | Question | How to resolve | Priority |
|---|---|---|---|
| Q1 | **In-client LLM-testing willingness-to-pay** — will developers pay for request-level LLM testing, or reach for dedicated tools? | **Not a desk-research question** — ship a thin prototype and watch adoption / interview users. | High — the core differentiator bet |
| Q2 | **SOC 2 / ISO 27001 cost & timeline** for a bootstrapped vendor; Vanta/Drata pricing | Focused mini-spike + vendor quotes (rule-of-thumb, *unverified*: ~$20–100k, 6–12 months). | Medium — time to first enterprise deals |
| Q3 | **Per-team sync cost at scale** (Yjs+S3 vs alternatives) | Cost model + a small load test once the team tier is scoped. | Medium |
| Q4 | **Tauri-vs-Electron** tradeoffs (bundle/memory/startup/webview) | A benchmark spike, including Yaak/Bruno/Thunder Client. | Medium — foundational choice |
| Q5 | **Closed-source enterprise security-review friction** (SBOM/source/escrow) | Validate during early enterprise sales. | Medium |
| Q6 | **Full enterprise compliance checklist** beyond IAM (pen tests, audit export, residency, air-gap, VPAT) | Spike + buyer interviews. | Low until enterprise push |
| Q7 | **Scripting/testing complaints** — a follow-up pass returned *no verified complaints* | Re-run a dedicated research pass (it failed under rate limits). | Low–Medium |
| Q8 | **Auth flow-ergonomics beyond the OAuth callback** (SigV4, mTLS, refresh rotation) | Deepen — these are corroborated but low-confidence; the callback handoff *is* validated. | Low |
| Q9 | **Collaboration comments/review/change-awareness demand** | Validate whether teams want review workflows vs just safe sync. | Low |

## Verification posture
Every asserted claim in these docs passed adversarial verification or is flagged as estimate/unverified. Market-size figures are secondary syndicated research — **directional, not exact**. Refuted claims are listed in [Discounted Ideas](/rambo/strategy/discounted-ideas/). The method is described in [How This Was Built](/rambo/overview/methodology/).
