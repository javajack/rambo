---
title: "Feature 08 — Scripting & Testing"
description: "Pre/post-request scripts, assertions, the collection runner, and data-driven tests — a modern, non-leaking, lock-in-free scripting engine, identical across GUI/CLI/MCP, backed by validated sandbox and runner complaints."
sidebar:
  order: 8
---

# Feature 08 — Scripting & Testing

## What it is
Pre/post-request scripts (JS), assertions, the **collection runner**, and data-driven/iteration testing — plus the CI story, which is really the [09 deterministic CLI](/rambo/features/09-agent-pillar-mcp-cli/). Determinism across **GUI = CLI = MCP** is the goal.

## ⭐ Pain points & competitor complaints (validated)
- **Postman's sandbox is restrictive.** It lacked native Promises/async-await for **~5 years** (2018 → shipped only in v10.6, Dec 2022 — [#4131](https://github.com/postmanlabs/postman-app-support/issues/4131)); it is **not a full Node environment**, so npm packages that depend on Node built-ins (`crypto`/`fs`/`process`) **silently fail**, and `pm.require` exposes only a small allowlist (Postman's own docs disclose this; [#3646](https://github.com/postmanlabs/postman-app-support/issues/3646)).
- **The Collection Runner / Newman leaks memory at scale.** It retains *all* request/response data for reporting → RAM climbs to **16GB+** and the run **crashes** before completing (e.g. dies ~1,000 of a 2,000+ run); raising Node's heap to 60GB doesn't help — a design limit, not a knob ([#2440](https://github.com/postmanlabs/postman-app-support/issues/2440), [#10453](https://github.com/postmanlabs/postman-app-support/issues/10453)). Large CSV data files freeze the UI.
- **Newman silently passes failing CI.** It does **not** fail a request on 4xx/5xx unless the collection carries an explicit status assertion — pipelines go green on broken APIs.
- **Scripting lock-in is real and costly.** Bruno auto-translates only a *subset* of `pm.*`; unsupported calls (`pm.sendRequest`, `pm.variables`, `pm.cookies`) throw and need manual rewrite (Bruno lacked a native `pm.sendRequest` until mid-2025) — raising switching cost (the [10 migration](/rambo/features/10-import-and-migration/) wedge).

## Differentiation
**Powerful scripting without lock-in:**
- **Modern JS sandbox** — real async/await, fuller built-ins, and **direct ESM/CDN module imports** (the Hoppscotch-2025 direction), not Postman's restricted browser sandbox.
- A **`pm.*`-compat shim** more complete than Bruno's, so Postman scripts run with minimal changes (lowers switching cost — the [10 migration](/rambo/features/10-import-and-migration/) wedge).
- A **runner that doesn't leak** — bounded/streamed result retention so large runs (thousands of requests) actually finish.
- **Sane CI defaults** — fail on 4xx/5xx without requiring boilerplate assertions.
- **Identical execution** in the GUI, the deterministic CLI (CI), and via MCP — same script, same result, everywhere.

## UX
Familiar JS editor with autocomplete; clear pass/fail assertion output; runner with CSV/JSON data files; "runs the same in CI" guarantee.

## Feasibility
**Medium** — an embeddable, sandboxed JS runtime is the core build.

## Implementation & tech choices *(JS sandbox is complex → dedicated deliberation note)*
- Embeddable JS sandbox: **`deno_core`** (V8 isolate + native Promise→Future async via tokio) is the leading Rust path for real async + fuller APIs; **`rquickjs`** (QuickJS) is the lighter, smaller-footprint alternative. Tradeoff = footprint vs completeness.
- **Direct ESM/CDN module imports** (esm.sh / Skypack / JSR) so users aren't trapped behind a fixed allowlist — the validated user want.
- A **`pm.*`-compat layer** (more complete than Bruno's) to ease migration ([10](/rambo/features/10-import-and-migration/)); the same runner engine powers the [09 CLI](/rambo/features/09-agent-pillar-mcp-cli/) and must use **bounded/streamed result retention** to avoid the Postman/Newman memory-leak failure mode.

## Dependencies
Operates on [02 requests](/rambo/features/02-http-request-response/) + [03 collections](/rambo/features/03-collections-and-organization/); runner powers [09 CLI/MCP](/rambo/features/09-agent-pillar-mcp-cli/); `pm.*` shim aids [10 migration](/rambo/features/10-import-and-migration/).

## Open questions
- **Gap closed by follow-up research** (validated complaints above). Remaining: **`deno_core` vs `rquickjs`** for the sandbox; how complete the `pm.*` shim must be; and whether to allow arbitrary ESM/CDN imports by default (power vs supply-chain risk). (Tracked in [Open-Questions](/rambo/strategy/open-questions/).)
