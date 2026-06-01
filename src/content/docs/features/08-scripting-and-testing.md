---
title: "Feature 08 — Scripting & Testing"
description: "Pre/post-request scripts, assertions, the collection runner, and data-driven tests — powerful but not lock-in, and identical across GUI/CLI/MCP. (Complaint evidence is an honest gap.)"
sidebar:
  order: 8
---

# Feature 08 — Scripting & Testing

## What it is
Pre/post-request scripts (JS), assertions, the **collection runner**, and data-driven/iteration testing — plus the CI story, which is really the [09 deterministic CLI](/rambo/features/09-agent-pillar-mcp-cli/). Determinism across **GUI = CLI = MCP** is the goal.

## ⭐ Pain points & competitor complaints — *honest evidence gap*
> **Transparency:** the dedicated research pass returned **zero verified claims** on scripting/testing — the `pm.*` sandbox limits, collection-runner friction, and Newman/CLI complaints **did not survive verification** in this batch. The points below are *known context*, not validated complaints, and a dedicated follow-up pass is flagged in [Open-Questions](/rambo/strategy/open-questions/).

- **Known context (not yet validated as widespread):** Postman's `pm.*` sandbox + Newman are the de-facto standard, which creates **scripting lock-in** — teams invest heavily in `pm.*`-based scripts, raising switching cost (directly relevant to the [10 migration](/rambo/features/10-import-and-migration/) wedge).

## Differentiation
**Powerful scripting without lock-in:** standard/modern JS (not a bespoke dialect), a **`pm.*`-compatible shim** so Postman scripts run with minimal changes (lowers switching cost), clean assertions, data-driven runs — and **identical execution** in the GUI, the deterministic CLI (CI), and via MCP. Determinism is the differentiator: same script, same result, everywhere.

## UX
Familiar JS editor with autocomplete; clear pass/fail assertion output; runner with CSV/JSON data files; "runs the same in CI" guarantee.

## Feasibility
**Medium** — an embeddable, sandboxed JS runtime is the core build.

## Implementation & tech choices *(JS sandbox is complex → dedicated deliberation note)*
- Embeddable JS sandbox candidates: **`rquickjs`** (Rust bindings to QuickJS — small, embeddable, fits a Rust core) or **Deno-core / V8 isolates** (heavier, fuller). Tradeoff = footprint vs API completeness.
- A **`pm.*`-compat layer** to ease migration ([10](/rambo/features/10-import-and-migration/)); the same runner engine powers the [09 CLI](/rambo/features/09-agent-pillar-mcp-cli/).

## Dependencies
Operates on [02 requests](/rambo/features/02-http-request-response/) + [03 collections](/rambo/features/03-collections-and-organization/); runner powers [09 CLI/MCP](/rambo/features/09-agent-pillar-mcp-cli/); `pm.*` shim aids [10 migration](/rambo/features/10-import-and-migration/).

## Open questions *(priority follow-up)*
- **Run a dedicated research pass on scripting/testing complaints** (pm.* sandbox limits, runner, Newman, data-driven) — currently unevidenced. How much `pm.*` compatibility to guarantee. `rquickjs` vs Deno-core decision.
