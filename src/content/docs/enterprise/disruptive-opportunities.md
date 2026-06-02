---
title: Disruptive Opportunities
description: The unowned, validated-demand features that could disrupt — led by Git-syncable team-shareable encrypted secrets — with an honest line between proven and merely-plausible.
sidebar:
  order: 5
---

The brief: find features *not* well served by **any** current API client that have **validated** demand. Unbiased — proven vs. plausible kept separate.

## ✅ Validated & disruptive: Git-syncable, team-shareable *encrypted* secrets
The clearest evidence-backed opening. Today, teams sharing secrets resort to **manually passing `.env` files** around. The demand is explicit and current:
- Bruno open request [#7275](https://github.com/usebruno/bruno/issues/7275): *"Support Secret Encryption… using key like Yaak… otherwise I'll have to move to .env file based variables and share the .env file with everyone manually… Adding this feature will help me stay with Bruno and better collaboration."*
- **Yaak already ships it** — sensitive fields encrypted (ChaCha20-Poly1305), a backup-able 32-byte workspace key, environments markable "sharable" for Git/directory sync.
- **And Yaak's is buggy** (cross-machine decryption failures, orphaned data after key loss) — so there's room to do it *better*.

This is **already our [Spec 03](/rambo/specs/03-secrets-encryption/)** (shareable-yet-encrypted) — E2 independently re-validated it as a disruptive, unmet need. **High-confidence bet.**

## 🟡 Plausible but NOT yet validated (research before betting)
The brief named several candidates. Be honest: **only the secrets one produced surviving validated-pain evidence this pass.** The rest are *under-searched, not disproven* — the non-obvious sources (Reddit, X, G2/Capterra/TrustRadius, Gartner Peer Insights, Canny/roadmap boards) were largely absent from the surviving evidence, so absence of evidence ≠ evidence of absence:
- **Internal API catalog / discoverability** (find/reuse your org's APIs)
- **Environments-as-code** (env config in version control, reviewable)
- **Spec-first / OpenAPI round-tripping** (drift detection between spec and requests)
- **Contract testing** in the client
- **Response diffing / snapshotting** (catch regressions across runs)
- **Governance / linting of API standards at scale**
- **AI-assisted request/test authoring** (beyond the [LLM-testing wedge](/rambo/features/07-client-side-llm-testing/))

## The disciplined stance
**Bet on the validated one** (encrypted shareable secrets — already core). Hold the rest as **hypotheses to validate**, not roadmap commitments — exactly the no-build-on-unvalidated-assumptions discipline this whole project runs on. A dedicated pass against the non-obvious sources (per [Open Questions](/rambo/strategy/open-questions/)) is the way to promote any of them from "plausible" to "proven."

:::tip[Why this matters]
Several of these (API catalog, environments-as-code, spec round-tripping) would, *if validated*, extend Rambo from "a better API client" toward "the team's API system of record" — a larger, stickier position. Worth validating deliberately; not worth assuming.
:::
