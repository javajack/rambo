---
title: Risk Ledger
description: What could go wrong — each risk with its status (verified vs unverified) and mitigation.
sidebar:
  order: 5
---

| Risk | Status | Mitigation |
|---|---|---|
| **Yaak overlaps ~70% of the thesis** | verified | Win on git-native + LLM-testing depth + the full agent suite; out-execute on polish |
| Incumbents ship streaming render (Bruno #7835 / Insomnia / Postman) | verified-adjacent | Ship the full observability + eval + MCP suite, not the easy part |
| Closed-source enterprise security reviews (SBOM/source) | unverified | Plan source escrow; validate in sales |
| **In-client LLM-testing willingness-to-pay** | **unverified — desk research can't settle** | Validate by shipping a thin prototype; LLM-testing is the adoption hook, not the revenue bet |
| Compliance bar (SOC 2 / ISO cost & timeline) | unverified | Time SOC 2 to first enterprise deals; budget + spike |
| CRDT/sync cost at scale | unverified | Spike before committing the team-tier architecture |
| Tauri-vs-Electron tradeoffs | unverified | Benchmark spike before the foundational choice |
| Free-tier trust durability | verified (Thunder Client) | **Never** paywall the free offline + git tier |
| Conversion grind (1–5% dev-tool freemium) | verified | Low burn + patience + the enterprise compounding lever |

## The honest summary
The thesis is **sound but contested**. The market opening is real (trust, secrets, bloat, the LLM gap) and the architecture is cheap and validated — but **Yaak already occupies most of the positioning**, the easy differentiators are catchable, and the single most exciting bet (in-client LLM-testing revenue) is the **least proven**. That's why LLM-testing is demoted to an adoption hook and revenue rests on the proven team-sync model. Execution quality — not the idea — is the deciding variable.

Unresolved specifics are tracked in [Open Questions](/rambo/strategy/open-questions/).
